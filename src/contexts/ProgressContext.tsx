import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface ProgressContextType {
  progress: UserProgress;
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  completeDay: (day: number) => void;
  completeQuiz: (dayId: string, score: number) => void;
  completeWeeklyAssessment: (week: number) => void;
  completeCodingChallenge: (day: number) => void;
  updateStreak: () => void;
  getOverallProgress: () => number;
  isEligibleForCertificate: () => boolean;
  generateCertificate: () => string;
  submitFinalProject: () => void;
  setFinalAssessmentScore: (score: number) => void;
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
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('silkMiltraProgress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('silkMiltraUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('silkMiltraProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('silkMiltraUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('silkMiltraUser');
    }
  }, [user]);

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

  const generateCertificate = (): string => {
    const certId = `SM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
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

  return (
    <ProgressContext.Provider value={{
      progress,
      user,
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
