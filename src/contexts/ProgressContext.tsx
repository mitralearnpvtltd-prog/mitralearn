import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface UserProgress {
  completedSubmodules: string[]; // Changed from completedDays: number[]
  completedQuizzes: { [submoduleId: string]: number };
  completedModuleAssessments: number[];
  codingChallengesCompleted: string[]; // Changed from number[]
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number;
  lastActiveDate: string;
  finalAssessmentScore?: number;
  finalProjectSubmitted: boolean;
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
  session: Session | null;
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
  submitFinalProject: () => void;
  setFinalAssessmentScore: (score: number) => void;
  signOut: () => Promise<void>;
  // Legacy aliases
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
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

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
      // Convert old number[] format to string[] if needed
      const completedDays = data.completed_days || [];
      const completedSubmodules = completedDays.map((d: number) => String(d));
      
      const codingChallenges = data.coding_challenges_completed || [];
      const codingChallengesCompleted = codingChallenges.map((d: number) => String(d));

      setProgress({
        completedSubmodules,
        completedQuizzes: (data.completed_quizzes as { [key: string]: number }) || {},
        completedModuleAssessments: data.completed_weekly_assessments || [],
        codingChallengesCompleted,
        currentStreak: data.current_streak || 0,
        longestStreak: data.longest_streak || 0,
        totalTimeSpent: data.total_time_spent || 0,
        lastActiveDate: data.last_active_date || '',
        finalAssessmentScore: data.final_assessment_score || undefined,
        finalProjectSubmitted: data.final_project_submitted || false,
        certificateEarned: data.certificate_earned || false,
        certificateId: data.certificate_id || undefined,
      });
    }
    setHasLoadedProgress(true);
  };

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, email')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      setUser({ name: data.name, email: data.email });
    }
  };

  // Save progress to database
  const saveProgress = async (newProgress: UserProgress) => {
    if (!session?.user?.id) return;

    // Convert string[] back to number[] for database compatibility
    const completedDays = newProgress.completedSubmodules.map(s => {
      // For new format like "1.1", store as string in the array
      // The database accepts integer[], so we need to handle this
      const num = parseFloat(s);
      return isNaN(num) ? 0 : Math.floor(num * 10); // Store 1.1 as 11, 2.1 as 21, etc.
    });

    const codingChallenges = newProgress.codingChallengesCompleted.map(s => {
      const num = parseFloat(s);
      return isNaN(num) ? 0 : Math.floor(num * 10);
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
        certificate_earned: newProgress.certificateEarned,
        certificate_id: newProgress.certificateId || null,
      })
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchProgress(session.user.id);
            setIsLoading(false);
          }, 0);
        } else {
          setUser(null);
          setProgress(defaultProgress);
          setHasLoadedProgress(false);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchProgress(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // Legacy alias
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

  // Legacy alias
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
    const totalSubmodules = 7; // Total from Google Sheet
    const completed = progress.completedSubmodules.length;
    return Math.round((completed / totalSubmodules) * 100);
  };

  const isEligibleForCertificate = (): boolean => {
    const totalSubmodules = 7;
    const allQuizzesCompleted = Object.keys(progress.completedQuizzes).length >= totalSubmodules;
    const allModuleAssessmentsCompleted = progress.completedModuleAssessments.length >= 4;
    const finalAssessmentPassed = (progress.finalAssessmentScore || 0) >= 60;
    const projectSubmitted = progress.finalProjectSubmitted;

    return allQuizzesCompleted && allModuleAssessmentsCompleted && finalAssessmentPassed && projectSubmitted;
  };

  const generateCertificate = async (): Promise<string> => {
    const certId = `SM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    if (!session?.user?.id || !user) {
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
        student_name: user.name,
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

  const submitFinalProject = () => {
    setProgress(prev => ({ ...prev, finalProjectSubmitted: true }));
  };

  const setFinalAssessmentScore = (score: number) => {
    setProgress(prev => ({ ...prev, finalAssessmentScore: score }));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProgress(defaultProgress);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      user,
      session,
      isLoading,
      setUser,
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
      // Legacy aliases
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
