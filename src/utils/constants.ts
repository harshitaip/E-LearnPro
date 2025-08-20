export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
} as const;

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const ENROLLMENT_STATUS = {
  ENROLLED: 'enrolled',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
} as const;

export const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  SHORT_ANSWER: 'short_answer',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: import.meta.env.VITE_JWT_TOKEN_KEY || 'auth_token',
  REFRESH_TOKEN: import.meta.env.VITE_JWT_REFRESH_KEY || 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  DARK_MODE: 'dark_mode',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    CREATE: '/courses',
    UPDATE: '/courses/:id',
    DELETE: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
    UNENROLL: '/courses/:id/unenroll',
    PROGRESS: '/courses/:id/progress',
  },
  QUIZZES: {
    LIST: '/courses/:courseId/quizzes',
    DETAIL: '/quizzes/:id',
    CREATE: '/courses/:courseId/quizzes',
    SUBMIT: '/quizzes/:id/submit',
    RESULTS: '/quizzes/:id/results',
  },
  UPLOADS: {
    VIDEO: '/uploads/video',
    DOCUMENT: '/uploads/document',
    IMAGE: '/uploads/image',
  },
  ADMIN: {
    USERS: '/admin/users',
    ANALYTICS: '/admin/analytics',
    SYSTEM_HEALTH: '/admin/system-health',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

export const FILE_CONSTRAINTS = {
  MAX_SIZE: import.meta.env.VITE_MAX_FILE_SIZE || '50MB',
  ALLOWED_VIDEO_FORMATS: (import.meta.env.VITE_ALLOWED_VIDEO_FORMATS || 'mp4,webm,ogg').split(','),
  ALLOWED_DOCUMENT_FORMATS: (import.meta.env.VITE_ALLOWED_DOCUMENT_FORMATS || 'pdf,doc,docx,ppt,pptx').split(','),
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  QUIZ: '/courses/:courseId/quiz/:quizId',
  QUIZ_RESULTS: '/courses/:courseId/quiz/:quizId/results',
  STUDENT_DASHBOARD: '/student/dashboard',
  INSTRUCTOR_DASHBOARD: '/instructor/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type CourseStatus = typeof COURSE_STATUS[keyof typeof COURSE_STATUS];
export type EnrollmentStatus = typeof ENROLLMENT_STATUS[keyof typeof ENROLLMENT_STATUS];
export type QuizType = typeof QUIZ_TYPES[keyof typeof QUIZ_TYPES];
