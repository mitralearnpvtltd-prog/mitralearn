import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface UserProgress {
  completedDays: number[];
  completedQuizzes: { [dayId: string]: number };
  completedWeeklyAssessments: number[];
  codingChallengesCompleted: number[];
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
  completeDay: (day: number) => void;
  completeQuiz: (dayId: string, score: number) => void;
  completeWeeklyAssessment: (week: number) => void;
  completeCodingChallenge: (day: number) => void;
  updateStreak: () => void;
  getOverallProgress: () => number;
  isEligibleForCertificate: () => boolean;
  generateCertificate: () => Promise<string>;
  submitFinalProject: () => void;
  setFinalAssessmentScore: (score: number) => void;
  signOut: () => Promise<void>;
}

const defaultProgress: UserProgress = {
  completedDays: [],
  completedQuizzes: {},
  completedWeeklyAssessments: [],
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

  // Fetch progress from database
  const fetchProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching progress:', error);
      return;
    }

    if (data) {
      setProgress({
        completedDays: data.completed_days || [],
        completedQuizzes: (data.completed_quizzes as { [key: string]: number }) || {},
        completedWeeklyAssessments: data.completed_weekly_assessments || [],
        codingChallengesCompleted: data.coding_challenges_completed || [],
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

    const { error } = await supabase
      .from('user_progress')
      .update({
        completed_days: newProgress.completedDays,
        completed_quizzes: newProgress.completedQuizzes,
        completed_weekly_assessments: newProgress.completedWeeklyAssessments,
        coding_challenges_completed: newProgress.codingChallengesCompleted,
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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer Supabase calls with setTimeout to prevent deadlock
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchProgress(session.user.id);
            setIsLoading(false);
          }, 0);
        } else {
          setUser(null);
          setProgress(defaultProgress);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
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
    if (session?.user?.id && !isLoading) {
      saveProgress(progress);
    }
  }, [progress, session?.user?.id, isLoading]);

  const completeDay = (day: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: [...new Set([...prev.completedDays, day])],
    }));
    updateStreak();
  };

  const completeQuiz = (dayId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: { ...prev.completedQuizzes, [dayId]: score },
    }));
  };

  const completeWeeklyAssessment = (week: number) => {
    setProgress(prev => ({
      ...prev,
      completedWeeklyAssessments: [...new Set([...prev.completedWeeklyAssessments, week])],
    }));
  };

  const completeCodingChallenge = (day: number) => {
    setProgress(prev => ({
      ...prev,
      codingChallengesCompleted: [...new Set([...prev.codingChallengesCompleted, day])],
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
    const dayProgress = (progress.completedDays.length / 60) * 100;
    return Math.round(dayProgress);
  };

  const isEligibleForCertificate = (): boolean => {
    const allDailyQuizzesCompleted = Object.keys(progress.completedQuizzes).length >= 60;
    const allWeeklyAssessmentsCompleted = progress.completedWeeklyAssessments.length >= 8;
    const finalAssessmentPassed = (progress.finalAssessmentScore || 0) >= 60;
    const projectSubmitted = progress.finalProjectSubmitted;
    const minimumStreak = progress.longestStreak >= 40;

    return allDailyQuizzesCompleted && allWeeklyAssessmentsCompleted && finalAssessmentPassed && projectSubmitted && minimumStreak;
  };

  const generateCertificate = async (): Promise<string> => {
    const certId = `SM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    if (!session?.user?.id || !user) {
      throw new Error('User not authenticated');
    }

    // Determine overall band
    const avgScore = progress.finalAssessmentScore || 0;
    let overallBand = 'Beginner';
    if (avgScore >= 80) overallBand = 'Job-Ready';
    else if (avgScore >= 60) overallBand = 'Intermediate';

    // Save certificate to database
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
      completeDay,
      completeQuiz,
      completeWeeklyAssessment,
      completeCodingChallenge,
      updateStreak,
      getOverallProgress,
      isEligibleForCertificate,
      generateCertificate,
      submitFinalProject,
      setFinalAssessmentScore,
      signOut,
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