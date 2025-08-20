import * as yup from 'yup';
import { USER_ROLES } from './constants';

// Authentication schemas
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup
    .string()
    .oneOf(Object.values(USER_ROLES), 'Please select a valid role')
    .required('Role is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

// Course schemas
export const courseSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Course title must be at least 5 characters')
    .max(100, 'Course title must be less than 100 characters')
    .required('Course title is required'),
  description: yup
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters')
    .required('Course description is required'),
  category: yup
    .string()
    .required('Course category is required'),
  level: yup
    .string()
    .oneOf(['beginner', 'intermediate', 'advanced'], 'Please select a valid level')
    .required('Course level is required'),
  duration: yup
    .number()
    .min(1, 'Duration must be at least 1 hour')
    .max(1000, 'Duration cannot exceed 1000 hours')
    .required('Course duration is required'),
  price: yup
    .number()
    .min(0, 'Price cannot be negative')
    .required('Course price is required'),
  thumbnail: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: any) => {
      if (!value || typeof value === 'string') return true; // Existing image URL or no file
      return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test('fileType', 'Unsupported file format', (value: any) => {
      if (!value || typeof value === 'string') return true; // Existing image URL or no file
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes((value as File).type);
    }),
});

// Quiz schemas
export const quizSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Quiz title must be at least 5 characters')
    .max(100, 'Quiz title must be less than 100 characters')
    .required('Quiz title is required'),
  description: yup
    .string()
    .max(500, 'Description must be less than 500 characters'),
  duration: yup
    .number()
    .min(1, 'Duration must be at least 1 minute')
    .max(300, 'Duration cannot exceed 300 minutes')
    .required('Quiz duration is required'),
  passingScore: yup
    .number()
    .min(0, 'Passing score cannot be negative')
    .max(100, 'Passing score cannot exceed 100')
    .required('Passing score is required'),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup
          .string()
          .min(10, 'Question must be at least 10 characters')
          .required('Question is required'),
        type: yup
          .string()
          .oneOf(['multiple_choice', 'true_false', 'short_answer'], 'Invalid question type')
          .required('Question type is required'),
        options: yup
          .array()
          .of(yup.string().required('Option cannot be empty'))
          .when('type', {
            is: 'multiple_choice',
            then: (schema) => schema.min(2, 'Multiple choice questions must have at least 2 options'),
            otherwise: (schema) => schema.notRequired(),
          }),
        correctAnswer: yup
          .string()
          .required('Correct answer is required'),
        explanation: yup
          .string()
          .max(500, 'Explanation must be less than 500 characters'),
      })
    )
    .min(1, 'Quiz must have at least one question')
    .required('Questions are required'),
});

// Profile update schema
export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  bio: yup
    .string()
    .max(1000, 'Bio must be less than 1000 characters'),
  website: yup
    .string()
    .url('Please enter a valid URL'),
  avatar: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: any) => {
      if (!value || typeof value === 'string') return true;
      return (value as File).size <= 2 * 1024 * 1024; // 2MB limit
    })
    .test('fileType', 'Unsupported file format', (value: any) => {
      if (!value || typeof value === 'string') return true;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes((value as File).type);
    }),
});

// Contact/Support schema
export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .required('Message is required'),
});

// File upload validation helper
export const validateFile = (file: File, maxSize: number, allowedTypes: string[]) => {
  const errors: string[] = [];

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }

  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  return errors;
};
