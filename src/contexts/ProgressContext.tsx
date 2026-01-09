import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { getTotalSubmodules, getTotalModules, getAllSubmodulesOrdered } from '@/data/curriculum';

export interface UserProgress {
  completedSubmodules: string[];
  completedQuizzes: { [submoduleId: string]: number };
  completedModuleAssessments: number[];
  codingChallengesCompleted: string[];
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number;
  lastActiveDate: string;
  finalAssessmentScore?: number;
  finalProjectSubmitted: boolean;
  projectGithubLink?: string;
  projectVideoLink?: string;
  certificateEarned: boolean;
  certificateId?: string;
}

interface UserProfile {
  name: string;
  email: string;
}

interface ProgressContextType {
  progress: UserProgress;
  user: UserProfile | null;
  session: { user: { id: string } } | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  completeSubmodule: (submoduleId: string) => void;
  completeQuiz: (submoduleId: string, score: number) => void;
  completeModuleAssessment: (module: number) => void;
  completeCodingChallenge: (submoduleId: string) => void;
  updateStreak: () => void;
  getOverallProgress: () => number;
  isEligibleForCertificate: () => boolean;
  generateCertificate: () => Promise<string>;
  submitFinalProject: (githubLink: string, videoLink: string) => void;
  setFinalAssessmentScore: (score: number) => void;
  signOut: () => Promise<void>;
  completeDay: (day: number) => void;
  completeWeeklyAssessment: (week: number) => void;
}

const defaultProgress: UserProgress = {
  completedSubmodules: [],
  completedQuizzes: {},
  completedModuleAssessments: [],
  codingChallengesCompleted: [],
  currentStreak: 0,
  longestStreak: 0,
  totalTimeSpent: 0,
  lastActiveDate: '',
  finalProjectSubmitted: false,
  certificateEarned: false,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { signOut: clerkSignOut } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  // Create a session-like object for compatibility
  const session = clerkUser ? { user: { id: clerkUser.id } } : null;

  // Fetch progress from database
  const fetchProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching progress:', error);
      setHasLoadedProgress(true);
      return;
    }

    if (data) {
      const completedDays = data.completed_days || [];
      // Convert stored integers back to submodule IDs (e.g., 11 -> "1.1", 21 -> "2.1")
      // Handle multiple legacy data formats from buggy conversions
      const completedSubmodules = completedDays.map((d: number) => {
        // Handle large numbers from legacy buggy conversions (420000, 4100000, etc.)
        if (d >= 10000) {
          // Extract first two meaningful digits: 420000 -> "4.2", 4100000 -> "4.1"
          const str = d.toString();
          const firstDigit = str[0];
          const secondDigit = str[1];
          return `${firstDigit}.${secondDigit}`;
        } else if (d >= 10 && d < 100) {
          // Normal format: 11 -> "1.1", 42 -> "4.2"
          const moduleNum = Math.floor(d / 10);
          const subNum = d % 10;
          return `${moduleNum}.${subNum}`;
        } else {
          // Very old legacy format: 1, 2, 3... treat as "1.1", "1.2", etc.
          return `1.${d}`;
        }
      });
      
      const codingChallenges = data.coding_challenges_completed || [];
      const codingChallengesCompleted = codingChallenges.map((d: number) => {
        if (d >= 10000) {
          const str = d.toString();
          const firstDigit = str[0];
          const secondDigit = str[1];
          return `${firstDigit}.${secondDigit}`;
        } else if (d >= 10 && d < 100) {
          const moduleNum = Math.floor(d / 10);
          const subNum = d % 10;
          return `${moduleNum}.${subNum}`;
        } else {
          return `1.${d}`;
        }
      });

      // Filter to only valid submodules that exist in the curriculum
      const validSubmodules = getAllSubmodulesOrdered();
      const filteredSubmodules = completedSubmodules.filter(s => validSubmodules.includes(s));
      const filteredCodingChallenges = codingChallengesCompleted.filter(s => validSubmodules.includes(s));

      setProgress({
        completedSubmodules: filteredSubmodules,
        completedQuizzes: (data.completed_quizzes as { [key: string]: number }) || {},
        completedModuleAssessments: data.completed_weekly_assessments || [],
        codingChallengesCompleted: filteredCodingChallenges,
        currentStreak: data.current_streak || 0,
        longestStreak: data.longest_streak || 0,
        totalTimeSpent: data.total_time_spent || 0,
        lastActiveDate: data.last_active_date || '',
        finalAssessmentScore: data.final_assessment_score || undefined,
        finalProjectSubmitted: data.final_project_submitted || false,
        projectGithubLink: (data as any).project_github_link || undefined,
        projectVideoLink: (data as any).project_video_link || undefined,
        certificateEarned: data.certificate_earned || false,
        certificateId: data.certificate_id || undefined,
      });
    }
    setHasLoadedProgress(true);
  };

  // Create or update user profile in database
  const ensureUserProfile = async (userId: string, name: string, email: string, emailVerified: boolean) => {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    const now = new Date().toISOString();

    if (!existingProfile) {
      // Create new profile
      await supabase.from('profiles').insert({
        user_id: userId,
        name,
        email,
        email_verified: emailVerified,
        last_login: now,
        course_opted: true,
      });
    } else {
      // Update profile with latest Clerk data
      await supabase
        .from('profiles')
        .update({
          name,
          email,
          email_verified: emailVerified,
          last_login: now,
        })
        .eq('user_id', userId);
    }

    // Check if progress exists
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (!existingProgress) {
      // Create new progress record
      await supabase.from('user_progress').insert({
        user_id: userId,
      });
    }

    setUserProfile({ name, email });
  };

  // Save progress to database
  const saveProgress = async (newProgress: UserProgress) => {
    if (!session?.user?.id) return;

    // Convert submodule IDs to integers for storage (e.g., "1.1" -> 11, "2.1" -> 21)
    const completedDays = (newProgress.completedSubmodules || []).map(s => {
      const parts = s.split('.');
      if (parts.length === 2) {
        const moduleNum = parseInt(parts[0], 10);
        const subNum = parseInt(parts[1], 10);
        return moduleNum * 10 + subNum;
      }
      return 0;
    });

    const codingChallenges = (newProgress.codingChallengesCompleted || []).map(s => {
      const parts = s.split('.');
      if (parts.length === 2) {
        const moduleNum = parseInt(parts[0], 10);
        const subNum = parseInt(parts[1], 10);
        return moduleNum * 10 + subNum;
      }
      return 0;
    });

    const { error } = await supabase
      .from('user_progress')
      .update({
        completed_days: completedDays,
        completed_quizzes: newProgress.completedQuizzes,
        completed_weekly_assessments: newProgress.completedModuleAssessments,
        coding_challenges_completed: codingChallenges,
        current_streak: newProgress.currentStreak,
        longest_streak: newProgress.longestStreak,
        total_time_spent: newProgress.totalTimeSpent,
        last_active_date: newProgress.lastActiveDate || null,
        final_assessment_score: newProgress.finalAssessmentScore || null,
        final_project_submitted: newProgress.finalProjectSubmitted,
        project_github_link: newProgress.projectGithubLink || null,
        project_video_link: newProgress.projectVideoLink || null,
        certificate_earned: newProgress.certificateEarned,
        certificate_id: newProgress.certificateId || null,
      })
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Initialize with Clerk user
  useEffect(() => {
    if (clerkLoaded) {
      if (clerkUser) {
        const name = clerkUser.fullName || clerkUser.firstName || 'User';
        const email = clerkUser.primaryEmailAddress?.emailAddress || '';
        const emailVerified = clerkUser.primaryEmailAddress?.verification?.status === 'verified';
        
        ensureUserProfile(clerkUser.id, name, email, emailVerified);
        fetchProgress(clerkUser.id);
      } else {
        setUserProfile(null);
        setProgress(defaultProgress);
        setHasLoadedProgress(false);
      }
      setIsLoading(false);
    }
  }, [clerkUser, clerkLoaded]);

  // Save progress when it changes
  useEffect(() => {
    if (session?.user?.id && !isLoading && hasLoadedProgress) {
      saveProgress(progress);
    }
  }, [progress, session?.user?.id, isLoading, hasLoadedProgress]);

  const completeSubmodule = (submoduleId: string) => {
    setProgress(prev => ({
      ...prev,
      completedSubmodules: [...new Set([...prev.completedSubmodules, submoduleId])],
    }));
    updateStreak();
  };

  const completeDay = (day: number) => {
    completeSubmodule(String(day));
  };

  const completeQuiz = (submoduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: { ...prev.completedQuizzes, [submoduleId]: score },
    }));
  };

  const completeModuleAssessment = (module: number) => {
    setProgress(prev => ({
      ...prev,
      completedModuleAssessments: [...new Set([...prev.completedModuleAssessments, module])],
    }));
  };

  const completeWeeklyAssessment = completeModuleAssessment;

  const completeCodingChallenge = (submoduleId: string) => {
    setProgress(prev => ({
      ...prev,
      codingChallengesCompleted: [...new Set([...prev.codingChallengesCompleted, submoduleId])],
    }));
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const lastDate = prev.lastActiveDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let newStreak = prev.currentStreak;
      if (lastDate === yesterday) {
        newStreak = prev.currentStreak + 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
      };
    });
  };

  const getOverallProgress = (): number => {
    const totalSubmodules = getTotalSubmodules();
    const completed = progress.completedSubmodules.length;
    return Math.round((completed / totalSubmodules) * 100);
  };

  const isEligibleForCertificate = (): boolean => {
    const totalSubmodules = getTotalSubmodules();
    const totalModules = getTotalModules();
    const allQuizzesCompleted = Object.keys(progress.completedQuizzes).length >= totalSubmodules;
    const allModuleAssessmentsCompleted = progress.completedModuleAssessments.length >= totalModules;
    const finalAssessmentPassed = (progress.finalAssessmentScore || 0) >= 60;
    const projectSubmitted = progress.finalProjectSubmitted;

    return allQuizzesCompleted && allModuleAssessmentsCompleted && finalAssessmentPassed && projectSubmitted;
  };

  const generateCertificate = async (): Promise<string> => {
    const certId = `SM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    if (!session?.user?.id || !userProfile) {
      throw new Error('User not authenticated');
    }

    const avgScore = progress.finalAssessmentScore || 0;
    let overallBand = 'Beginner';
    if (avgScore >= 80) overallBand = 'Job-Ready';
    else if (avgScore >= 60) overallBand = 'Intermediate';

    const { error } = await supabase
      .from('certificates')
      .insert({
        certificate_id: certId,
        user_id: session.user.id,
        student_name: userProfile.name,
        final_mcq_score: progress.finalAssessmentScore || 0,
        coding_challenge_score: progress.codingChallengesCompleted.length,
        capstone_submitted: progress.finalProjectSubmitted,
        overall_band: overallBand,
      });

    if (error) {
      console.error('Error saving certificate:', error);
      throw error;
    }

    setProgress(prev => ({
      ...prev,
      certificateEarned: true,
      certificateId: certId,
    }));

    return certId;
  };

  const submitFinalProject = (githubLink: string, videoLink: string) => {
    setProgress(prev => ({ 
      ...prev, 
      finalProjectSubmitted: true,
      projectGithubLink: githubLink,
      projectVideoLink: videoLink,
    }));
  };

  const setFinalAssessmentScore = (score: number) => {
    setProgress(prev => ({ ...prev, finalAssessmentScore: score }));
  };

  const signOut = async () => {
    await clerkSignOut();
    setUserProfile(null);
    setProgress(defaultProgress);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      user: userProfile,
      session,
      isLoading,
      setUser: setUserProfile,
      completeSubmodule,
      completeQuiz,
      completeModuleAssessment,
      completeCodingChallenge,
      updateStreak,
      getOverallProgress,
      isEligibleForCertificate,
      generateCertificate,
      submitFinalProject,
      setFinalAssessmentScore,
      signOut,
      completeDay,
      completeWeeklyAssessment,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};