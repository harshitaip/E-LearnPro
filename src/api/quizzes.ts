import { api } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  lessonId?: string;
  duration: number; // in minutes
  passingScore: number; // percentage
  maxAttempts: number;
  isRandomized: boolean;
  showResults: boolean;
  questions: QuizQuestion[];
  totalPoints: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string>; // questionId -> answer
  score: number;
  percentage: number;
  passed: boolean;
  timeSpent: number; // in seconds
  startedAt: string;
  completedAt?: string;
  attempt: number;
}

export interface QuizResult {
  attempt: QuizAttempt;
  quiz: Quiz;
  questionResults: Array<{
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    points: number;
    explanation?: string;
  }>;
  totalQuestions: number;
  correctAnswers: number;
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  courseId: string;
  lessonId?: string;
  duration: number;
  passingScore: number;
  maxAttempts: number;
  isRandomized: boolean;
  showResults: boolean;
  questions: Omit<QuizQuestion, 'id'>[];
}

export interface UpdateQuizRequest extends Partial<CreateQuizRequest> {
  status?: 'draft' | 'published';
}

export interface SubmitQuizRequest {
  answers: Record<string, string>;
  timeSpent: number;
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  averageTime: number;
  questionStats: Array<{
    questionId: string;
    question: string;
    correctAnswers: number;
    totalAnswers: number;
    successRate: number;
  }>;
}

// Quiz API service functions
export const quizzesAPI = {
  // Get quiz by ID
  getQuiz: (id: string): Promise<Quiz> =>
    api.get(API_ENDPOINTS.QUIZZES.DETAIL.replace(':id', id)),

  // Get quizzes for a course
  getCourseQuizzes: (courseId: string): Promise<Quiz[]> =>
    api.get(API_ENDPOINTS.QUIZZES.LIST.replace(':courseId', courseId)),

  // Create new quiz (instructor only)
  createQuiz: (data: CreateQuizRequest): Promise<Quiz> =>
    api.post(API_ENDPOINTS.QUIZZES.CREATE.replace(':courseId', data.courseId), data),

  // Update quiz (instructor only)
  updateQuiz: (id: string, data: UpdateQuizRequest): Promise<Quiz> =>
    api.put(`/quizzes/${id}`, data),

  // Delete quiz (instructor only)
  deleteQuiz: (id: string): Promise<{ message: string }> =>
    api.delete(`/quizzes/${id}`),

  // Start quiz attempt
  startQuiz: (id: string): Promise<{ attemptId: string; quiz: Omit<Quiz, 'questions'> & { questions: Omit<QuizQuestion, 'correctAnswer' | 'explanation'>[] } }> =>
    api.post(`/quizzes/${id}/start`),

  // Submit quiz attempt
  submitQuiz: (id: string, data: SubmitQuizRequest): Promise<QuizResult> =>
    api.post(API_ENDPOINTS.QUIZZES.SUBMIT.replace(':id', id), data),

  // Get quiz results for user
  getQuizResults: (id: string): Promise<QuizResult[]> =>
    api.get(API_ENDPOINTS.QUIZZES.RESULTS.replace(':id', id)),

  // Get best quiz result for user
  getBestQuizResult: (id: string): Promise<QuizResult | null> =>
    api.get(`/quizzes/${id}/results/best`),

  // Get quiz attempt by ID
  getQuizAttempt: (attemptId: string): Promise<QuizAttempt> =>
    api.get(`/quiz-attempts/${attemptId}`),

  // Get user's quiz attempts
  getUserQuizAttempts: (quizId: string): Promise<QuizAttempt[]> =>
    api.get(`/quizzes/${quizId}/attempts`),

  // Get quiz statistics (instructor only)
  getQuizStats: (id: string): Promise<QuizStats> =>
    api.get(`/quizzes/${id}/stats`),

  // Duplicate quiz (instructor only)
  duplicateQuiz: (id: string): Promise<Quiz> =>
    api.post(`/quizzes/${id}/duplicate`),

  // Preview quiz (instructor only)
  previewQuiz: (id: string): Promise<Quiz> =>
    api.get(`/quizzes/${id}/preview`),

  // Get quiz leaderboard
  getQuizLeaderboard: (id: string, limit = 10): Promise<Array<{
    userId: string;
    userName: string;
    userAvatar?: string;
    bestScore: number;
    bestPercentage: number;
    attempts: number;
    bestTime: number;
  }>> =>
    api.get(`/quizzes/${id}/leaderboard`, { params: { limit } }),

  // Export quiz results (instructor only)
  exportQuizResults: (id: string, format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> =>
    api.get(`/quizzes/${id}/export`, { 
      params: { format },
      responseType: 'blob' as any
    }),

  // Import quiz questions (instructor only)
  importQuestions: (quizId: string, file: File): Promise<{ imported: number; errors: string[] }> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload(`/quizzes/${quizId}/import`, formData);
  },

  // Validate quiz answers (for practice mode)
  validateAnswers: (id: string, answers: Record<string, string>): Promise<{
    results: Array<{
      questionId: string;
      isCorrect: boolean;
      explanation?: string;
    }>;
    score: number;
    percentage: number;
  }> =>
    api.post(`/quizzes/${id}/validate`, { answers }),

  // Get quiz analytics (instructor only)
  getQuizAnalytics: (id: string): Promise<{
    totalAttempts: number;
    uniqueStudents: number;
    averageScore: number;
    scoreDistribution: Array<{ range: string; count: number }>;
    timeDistribution: Array<{ range: string; count: number }>;
    questionAnalytics: Array<{
      questionId: string;
      question: string;
      difficulty: number; // 0-1
      discrimination: number; // ability to distinguish between high and low performers
      options: Array<{
        option: string;
        selectedCount: number;
        percentage: number;
      }>;
    }>;
  }> =>
    api.get(`/quizzes/${id}/analytics`),

  // Save quiz progress (for long quizzes)
  saveQuizProgress: (attemptId: string, answers: Record<string, string>): Promise<{ message: string }> =>
    api.post(`/quiz-attempts/${attemptId}/save`, { answers }),

  // Resume quiz attempt
  resumeQuizAttempt: (attemptId: string): Promise<{
    attempt: QuizAttempt;
    quiz: Quiz;
    remainingTime: number;
  }> =>
    api.get(`/quiz-attempts/${attemptId}/resume`),
};
