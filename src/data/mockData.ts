// Professional data for the E-Learning Platform - IIT Patna

import type { Course, Instructor, Category, User } from '../types';

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    title: 'Senior Software Engineer & Tech Educator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    totalCourses: 12,
    totalStudents: 50000,
    bio: 'Expert in React, Node.js, and competitive programming with 10+ years of industry experience.',
    expertise: ['React', 'Node.js', 'JavaScript', 'Data Structures', 'Algorithms']
  },
  {
    id: '2',
    name: 'Prof. Priya Sharma',
    title: 'IIT Patna Faculty & Research Scholar',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    totalCourses: 8,
    totalStudents: 75000,
    bio: 'Mathematics and Physics expert with 15 years of engineering education experience.',
    expertise: ['Mathematics', 'Physics', 'Engineering Fundamentals', 'Problem Solving']
  },
  {
    id: '3',
    name: 'Dr. Amit Singh',
    title: 'Public Administration Expert & Former Civil Servant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    totalCourses: 6,
    totalStudents: 30000,
    bio: 'Former civil servant with expertise in Public Administration and Governance studies.',
    expertise: ['Public Administration', 'Governance', 'Policy Analysis', 'Current Affairs']
  },
  {
    id: '4',
    name: 'Harshita',
    title: 'Computer Science Student & AI Research Assistant',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    totalCourses: 3,
    totalStudents: 1250,
    bio: 'Final year Computer Science student specializing in Machine Learning and AI. Active researcher with practical project experience.',
    expertise: ['Machine Learning', 'Python', 'TensorFlow', 'Data Science', 'AI Applications']
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Engineering Preparation',
    slug: 'engineering-preparation',
    description: 'Comprehensive preparation for engineering entrance examinations',
    icon: '🎯',
    courseCount: 45
  },
  {
    id: '2',
    name: 'Software Development',
    slug: 'software-development',
    description: 'Full-stack development, mobile apps, and software engineering',
    icon: '💻',
    courseCount: 38
  },
  {
    id: '3',
    name: 'Data Science & AI',
    slug: 'data-science-ai',
    description: 'Machine learning, artificial intelligence, and data analytics',
    icon: '📊',
    courseCount: 23
  },
  {
    id: '4',
    name: 'Management Studies',
    slug: 'management-studies',
    description: 'Business administration, entrepreneurship, and leadership skills',
    icon: '💼',
    courseCount: 31
  },
  {
    id: '5',
    name: 'Design & Innovation',
    slug: 'design-innovation',
    description: 'UI/UX design, product design, and creative problem-solving',
    icon: '🎨',
    courseCount: 18
  },
  {
    id: '6',
    name: 'Communication Skills',
    slug: 'communication-skills',
    description: 'Professional communication and language proficiency',
    icon: '🗣️',
    courseCount: 15
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React.js Development Bootcamp',
    description: 'Master React.js from basics to advanced concepts with hands-on projects and real-world applications.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    instructor: mockInstructors[0],
    category: 'Software Development',
    level: 'intermediate',
    duration: 2400, // 40 hours
    price: 2999,
    originalPrice: 4999,
    rating: 4.8,
    totalRatings: 1250,
    enrolled: 15000,
    status: 'published',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    lessons: [],
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    requirements: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
    learningOutcomes: [
      'Build modern React applications',
      'Understand React hooks and state management',
      'Deploy React apps to production',
      'Master React best practices'
    ]
  },
  {
    id: '2',
    title: 'JEE Main Mathematics Complete Course',
    description: 'Comprehensive JEE Main mathematics preparation with 1000+ solved problems and mock tests.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    instructor: mockInstructors[1],
    category: 'Engineering Preparation',
    level: 'advanced',
    duration: 3600, // 60 hours
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    totalRatings: 2100,
    enrolled: 25000,
    status: 'published',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
    lessons: [],
    tags: ['JEE', 'Mathematics', 'Competitive Exam', 'Engineering'],
    requirements: ['Class 12 Mathematics', 'Basic calculus knowledge'],
    learningOutcomes: [
      'Master all JEE Math topics',
      'Solve complex problems quickly',
      'Score 90+ in JEE Mathematics',
      'Build strong problem-solving skills'
    ]
  },
  {
    id: '3',
    title: 'UPSC General Studies Foundation',
    description: 'Complete UPSC GS preparation covering History, Geography, Polity, and Current Affairs.',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    instructor: mockInstructors[2],
    category: 'Engineering Preparation',
    level: 'beginner',
    duration: 4800, // 80 hours
    price: 4999,
    originalPrice: 7999,
    rating: 4.7,
    totalRatings: 1800,
    enrolled: 18000,
    status: 'published',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    lessons: [],
    tags: ['UPSC', 'General Studies', 'Civil Services', 'Government Job'],
    requirements: ['Graduate degree', 'Basic understanding of Indian polity'],
    learningOutcomes: [
      'Complete GS syllabus coverage',
      'Master current affairs',
      'Develop answer writing skills',
      'Clear UPSC Prelims and Mains'
    ]
  },
  {
    id: '4',
    title: 'Data Science with Python Masterclass',
    description: 'Learn data science from scratch with Python, pandas, NumPy, and machine learning algorithms.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    instructor: mockInstructors[0],
    category: 'Data Science & AI',
    level: 'intermediate',
    duration: 3000, // 50 hours
    price: 3499,
    originalPrice: 5499,
    rating: 4.6,
    totalRatings: 980,
    enrolled: 12000,
    status: 'published',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    lessons: [],
    tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
    requirements: ['Basic Python knowledge', 'High school mathematics'],
    learningOutcomes: [
      'Master data analysis with Python',
      'Build machine learning models',
      'Create data visualizations',
      'Work with real datasets'
    ]
  },
  {
    id: '5',
    title: 'English Speaking Course for Indians',
    description: 'Improve your English speaking skills with Indian context and practical conversations.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    instructor: mockInstructors[1],
    category: 'Communication Skills',
    level: 'beginner',
    duration: 1800, // 30 hours
    price: 1999,
    originalPrice: 2999,
    rating: 4.5,
    totalRatings: 1500,
    enrolled: 20000,
    status: 'published',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-30T00:00:00Z',
    lessons: [],
    tags: ['English', 'Speaking', 'Communication', 'Language'],
    requirements: ['Basic English reading ability'],
    learningOutcomes: [
      'Speak English confidently',
      'Improve pronunciation',
      'Build vocabulary',
      'Handle job interviews'
    ]
  },
  {
    id: '6',
    title: 'Machine Learning & AI for Engineering Students',
    description: 'Comprehensive ML course designed from personal learning journey. Covers Python fundamentals, Scikit-learn, TensorFlow with real engineering applications studied during Computer Science program.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    instructor: mockInstructors[3], // Harshita
    category: 'Data Science & AI',
    level: 'advanced',
    duration: 5400, // 90 hours
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    totalRatings: 387,
    enrolled: 1840,
    status: 'published',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    lessons: [],
    tags: ['Machine Learning', 'Python', 'TensorFlow', 'Scikit-learn', 'AI', 'Engineering'],
    requirements: [
      'Basic Python programming knowledge',
      'High school mathematics (algebra, calculus)',
      'Understanding of statistics basics',
      'Engineering background preferred'
    ],
    learningOutcomes: [
      'Master supervised and unsupervised learning algorithms',
      'Build ML models using Scikit-learn and TensorFlow',
      'Apply ML techniques to real engineering problems',
      'Understand deep learning fundamentals',
      'Create end-to-end ML projects',
      'Implement feature engineering and model evaluation',
      'Deploy ML models for practical use'
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@learninghub.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    profile: {
      bio: 'Computer Science student specializing in software development and AI research',
      phone: '+91-9876543210',
      location: 'IIT Patna, Bihar, India',
      education: 'B.Tech Computer Science & Engineering',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning']
    },
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'en',
      timezone: 'Asia/Kolkata'
    }
  }
];

// Professional data for different examination categories
export const competitiveExamData = {
  jee: {
    title: 'JEE (Joint Entrance Examination)',
    description: 'Premier engineering entrance examination for IITs, NITs, and other technical institutes',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: 'Class 12 or equivalent with PCM',
    examDate: 'January & April',
    courses: 12,
    students: 25000
  },
  neet: {
    title: 'NEET (National Eligibility cum Entrance Test)',
    description: 'National medical entrance examination for MBBS, BDS, and other medical programs',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    eligibility: 'Class 12 with PCB',
    examDate: 'May',
    courses: 8,
    students: 18000
  },
  upsc: {
    title: 'UPSC Civil Services Examination',
    description: 'Prestigious examination for IAS, IPS, IFS, and other central government services',
    subjects: ['General Studies', 'Optional Subject', 'Essay'],
    eligibility: 'Graduate degree from recognized university',
    examDate: 'June (Prelims), October (Mains)',
    courses: 15,
    students: 12000
  }
};

export default {
  mockInstructors,
  mockCategories,
  mockCourses,
  mockUsers,
  competitiveExamData
};
