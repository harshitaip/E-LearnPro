import { api } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  status: 'draft' | 'published' | 'archived';
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  modules: CourseModule[];
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content: {
    videoUrl?: string;
    textContent?: string;
    quizId?: string;
    assignmentId?: string;
  };
  duration: number;
  order: number;
  isFree: boolean;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'link';
  url: string;
  size?: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
  progress: number; // 0-100
  completedLessons: string[];
  lastAccessedAt: string;
  certificateId?: string;
  status: 'enrolled' | 'completed' | 'dropped';
}

export interface CourseProgress {
  courseId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  timeSpent: number; // in minutes
  lastAccessed: string;
  nextLesson?: Lesson;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discountPrice?: number;
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  status?: 'draft' | 'published' | 'archived';
}

export interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  duration?: [number, number];
  tags?: string[];
  search?: string;
  instructor?: string;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  totalPages: number;
}

// Courses API service functions
export const coursesAPI = {
  // Get all courses with filters and pagination
  getCourses: (
    page = 1, 
    limit = 12, 
    filters?: CourseFilters
  ): Promise<CoursesResponse> =>
    api.get(API_ENDPOINTS.COURSES.LIST, {
      params: { page, limit, ...filters },
    }),

  // Get single course by ID
  getCourse: (id: string): Promise<Course> =>
    api.get(API_ENDPOINTS.COURSES.DETAIL.replace(':id', id)),

  // Create new course (instructor only)
  createCourse: (data: CreateCourseRequest): Promise<Course> =>
    api.post(API_ENDPOINTS.COURSES.CREATE, data),

  // Update course (instructor/admin only)
  updateCourse: (id: string, data: UpdateCourseRequest): Promise<Course> =>
    api.put(API_ENDPOINTS.COURSES.UPDATE.replace(':id', id), data),

  // Delete course (instructor/admin only)
  deleteCourse: (id: string): Promise<{ message: string }> =>
    api.delete(API_ENDPOINTS.COURSES.DELETE.replace(':id', id)),

  // Enroll in course
  enrollCourse: (id: string): Promise<Enrollment> =>
    api.post(API_ENDPOINTS.COURSES.ENROLL.replace(':id', id)),

  // Unenroll from course
  unenrollCourse: (id: string): Promise<{ message: string }> =>
    api.post(API_ENDPOINTS.COURSES.UNENROLL.replace(':id', id)),

  // Get course progress for current user
  getCourseProgress: (id: string): Promise<CourseProgress> =>
    api.get(API_ENDPOINTS.COURSES.PROGRESS.replace(':id', id)),

  // Update lesson progress
  updateLessonProgress: (courseId: string, lessonId: string): Promise<CourseProgress> =>
    api.post(`/courses/${courseId}/lessons/${lessonId}/progress`),

  // Get enrolled courses for current user
  getEnrolledCourses: (): Promise<Course[]> =>
    api.get('/courses/enrolled'),

  // Get courses by instructor
  getInstructorCourses: (instructorId?: string): Promise<Course[]> =>
    api.get('/courses/instructor', instructorId ? { params: { instructorId } } : undefined),

  // Get course categories
  getCategories: (): Promise<string[]> =>
    api.get('/courses/categories'),

  // Get course reviews
  getCourseReviews: (courseId: string, page = 1, limit = 10): Promise<{
    reviews: Array<{
      id: string;
      rating: number;
      comment: string;
      user: {
        firstName: string;
        lastName: string;
        avatar?: string;
      };
      createdAt: string;
    }>;
    total: number;
  }> =>
    api.get(`/courses/${courseId}/reviews`, { params: { page, limit } }),

  // Add course review
  addCourseReview: (courseId: string, rating: number, comment?: string): Promise<{ message: string }> =>
    api.post(`/courses/${courseId}/reviews`, { rating, comment }),

  // Upload course thumbnail
  uploadThumbnail: (courseId: string, file: File, onProgress?: (progress: number) => void): Promise<{ thumbnailUrl: string }> => {
    const formData = new FormData();
    formData.append('thumbnail', file);
    return api.upload(`/courses/${courseId}/thumbnail`, formData, onProgress);
  },

  // Upload lesson video
  uploadLessonVideo: (lessonId: string, file: File, onProgress?: (progress: number) => void): Promise<{ videoUrl: string }> => {
    const formData = new FormData();
    formData.append('video', file);
    return api.upload(`/lessons/${lessonId}/video`, formData, onProgress);
  },

  // Upload lesson resource
  uploadLessonResource: (lessonId: string, file: File, onProgress?: (progress: number) => void): Promise<Resource> => {
    const formData = new FormData();
    formData.append('resource', file);
    return api.upload(`/lessons/${lessonId}/resources`, formData, onProgress);
  },

  // Create course module
  createModule: (courseId: string, data: Omit<CourseModule, 'id' | 'lessons'>): Promise<CourseModule> =>
    api.post(`/courses/${courseId}/modules`, data),

  // Update course module
  updateModule: (moduleId: string, data: Partial<Omit<CourseModule, 'id' | 'lessons'>>): Promise<CourseModule> =>
    api.put(`/modules/${moduleId}`, data),

  // Delete course module
  deleteModule: (moduleId: string): Promise<{ message: string }> =>
    api.delete(`/modules/${moduleId}`),

  // Create lesson
  createLesson: (moduleId: string, data: Omit<Lesson, 'id' | 'resources'>): Promise<Lesson> =>
    api.post(`/modules/${moduleId}/lessons`, data),

  // Update lesson
  updateLesson: (lessonId: string, data: Partial<Omit<Lesson, 'id' | 'resources'>>): Promise<Lesson> =>
    api.put(`/lessons/${lessonId}`, data),

  // Delete lesson
  deleteLesson: (lessonId: string): Promise<{ message: string }> =>
    api.delete(`/lessons/${lessonId}`),

  // Get featured courses
  getFeaturedCourses: (limit = 6): Promise<Course[]> =>
    api.get('/courses/featured', { params: { limit } }),

  // Search courses
  searchCourses: (query: string, page = 1, limit = 12): Promise<CoursesResponse> =>
    api.get('/courses/search', { params: { q: query, page, limit } }),
};
