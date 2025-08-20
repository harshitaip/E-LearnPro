// Global type definitions for the E-Learning Platform

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
  preferences: UserPreferences;
}

export interface UserProfile {
  bio?: string;
  phone?: string;
  location?: string;
  dateOfBirth?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  price: number;
  originalPrice?: number;
  rating: number;
  totalRatings: number;
  enrolled: number;
  maxEnrollments?: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  totalCourses: number;
  totalStudents: number;
  bio: string;
  expertise: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'live';
  content: string; // URL for video, text content, etc.
  duration: number; // in minutes
  order: number;
  isCompleted?: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'document' | 'image';
  url: string;
  size?: number; // file size in bytes
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  maxAttempts?: number;
  randomizeQuestions?: boolean;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'single-choice' | 'true-false' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Progress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  currentLesson?: string;
  progressPercentage: number;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
  timeSpent: number; // in minutes
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  certificateUrl: string;
  credentialId: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  progress: Progress;
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  courseCount: number;
  parentId?: string;
}

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: Pick<User, 'firstName' | 'lastName' | 'avatar'>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'instructor';
  agreeToTerms: boolean;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail?: File;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  duration?: [number, number];
  tags?: string[];
}

export interface SortOptions {
  field: 'title' | 'price' | 'rating' | 'enrolled' | 'createdAt';
  direction: 'asc' | 'desc';
}

// Analytics types
export interface AnalyticsData {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  completionRate: number;
  popularCourses: Course[];
  revenueByMonth: { month: string; revenue: number }[];
  enrollmentsByCategory: { category: string; count: number }[];
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  field?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
