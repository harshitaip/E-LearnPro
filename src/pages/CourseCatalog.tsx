import React, { useState, useMemo } from 'react';
import Card from '../components/Card/Card';
import EnrollmentModal from '../components/EnrollmentModal';

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorImage: string;
  rating: number;
  totalRatings: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  image: string;
  bestseller?: boolean;
  new?: boolean;
  featured?: boolean;
  language: string;
  lastUpdated: string;
  certificate: boolean;
  preview?: boolean;
}

const CourseCatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = [
    'All', 
    // Engineering Categories
    'Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering', 
    'Civil Engineering', 'Electrical Engineering', 'Data Structures & Algorithms', 'Programming Languages',
    'Web Development', 'Mobile App Development', 'Machine Learning & AI',
    'Database Management', 'Software Engineering', 'Embedded Systems', 'VLSI Design',
    // Competitive Exam Categories
    'Competitive Exams', 'JEE Preparation', 'NEET Preparation', 'GATE Preparation', 
    'UPSC Preparation', 'SSC Preparation', 'Banking Preparation', 'CAT Preparation', 'Defence Preparation'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const languages = ['All', 'English', 'Hindi', 'Hindi + English'];
  const priceRanges = ['All', 'Free', '₹0-₹2000', '₹2000-₹5000', '₹5000-₹10000', '₹10000+'];
  const sortOptions = ['Most Popular', 'Newest', 'Rating', 'Price: Low to High', 'Price: High to Low'];

  const courses = useMemo(() => [
    // 🌟 PREMIUM FEATURED COURSES - BEST OF THE BEST 🌟
    {
      id: 'premium-1',
      title: '🚀 Complete Full Stack Web Development Bootcamp 2025',
      instructor: 'Harshita (Ex-Google, Senior Full Stack Developer)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshita&backgroundColor=b6e3f4',
      rating: 4.9,
      totalRatings: 45230,
      students: 189000,
      duration: '120 hours',
      level: 'Beginner' as const,
      price: 2999,
      originalPrice: 9999,
      category: 'Web Development',
      subcategory: 'Full Stack Development',
      description: '🔥 Most comprehensive full-stack course! Learn React, Node.js, MongoDB, Express with 15+ real projects. Build portfolio-ready applications with modern technologies.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Full Stack', 'JavaScript', 'Portfolio Projects'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      bestseller: true,
      featured: true,
      new: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-15',
      certificate: true,
      preview: true
    },
    {
      id: 'premium-2',
      title: '🤖 Machine Learning & AI Mastery with Python - Industry Projects',
      instructor: 'Harshita (AI Research Scientist, Ex-Microsoft)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaai&backgroundColor=fecaca',
      rating: 4.8,
      totalRatings: 32150,
      students: 156000,
      duration: '100 hours',
      level: 'Intermediate' as const,
      price: 4999,
      originalPrice: 12999,
      category: 'Machine Learning & AI',
      subcategory: 'Deep Learning',
      description: '🧠 Master ML/AI from scratch! Build real-world projects: ChatBot, Image Recognition, Recommendation Systems. Includes TensorFlow, PyTorch, and deployment.',
      tags: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch', 'AI Projects'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      bestseller: true,
      featured: true,
      language: 'English',
      lastUpdated: '2025-08-10',
      certificate: true,
      preview: true
    },
    {
      id: 'premium-3',
      title: '🎯 Complete JEE Main + Advanced 2025 - Physics Mastery',
      instructor: 'Harshita (IIT Bombay, 15+ Years Teaching Experience)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaphysics&backgroundColor=e2e8f0',
      rating: 4.9,
      totalRatings: 78900,
      students: 245000,
      duration: '150 hours',
      level: 'Advanced' as const,
      price: 5999,
      originalPrice: 15999,
      category: 'JEE Preparation',
      subcategory: 'Physics',
      description: '⚡ Complete JEE Physics with 500+ solved problems, 50+ Mock tests, and exclusive tricks. Covers Mechanics, Thermodynamics, Electromagnetism & Modern Physics.',
      tags: ['JEE Main', 'JEE Advanced', 'Physics', 'Mock Tests', 'Problem Solving', 'IIT Preparation'],
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
      bestseller: true,
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-12',
      certificate: true,
      preview: true
    },
    {
      id: 'premium-4',
      title: '🩺 NEET 2025 Complete Biology + Chemistry Combo',
      instructor: 'Harshita (AIIMS Graduate, Medical Entrance Expert)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitabio&backgroundColor=fef3c7',
      rating: 4.8,
      totalRatings: 65400,
      students: 198000,
      duration: '180 hours',
      level: 'Advanced' as const,
      price: 6999,
      originalPrice: 18999,
      category: 'NEET Preparation',
      subcategory: 'Biology + Chemistry',
      description: '🔬 Complete NEET preparation with detailed Biology & Chemistry coverage. 1000+ MCQs, 30+ Mock tests, and memory techniques for better retention.',
      tags: ['NEET', 'Biology', 'Chemistry', 'Medical Entrance', 'Mock Tests', 'MCQs'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      bestseller: true,
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-08',
      certificate: true,
      preview: true
    },
    {
      id: 'premium-5',
      title: '💻 Complete GATE Computer Science 2025 - All Topics Covered',
      instructor: 'Harshita (IIT Kharagpur, GATE Topper)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitagate&backgroundColor=ddd6fe',
      rating: 4.9,
      totalRatings: 42300,
      students: 167000,
      duration: '200 hours',
      level: 'Advanced' as const,
      price: 7999,
      originalPrice: 19999,
      category: 'GATE Preparation',
      subcategory: 'Computer Science',
      description: '🎯 Complete GATE CS preparation with all subjects: DSA, OS, DBMS, Networks, COA, Compiler Design. 2000+ practice problems and previous year solutions.',
      tags: ['GATE', 'Computer Science', 'DSA', 'Operating Systems', 'DBMS', 'Networks'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      bestseller: true,
      featured: true,
      language: 'English',
      lastUpdated: '2025-08-14',
      certificate: true,
      preview: true
    },
    {
      id: 'premium-6',
      title: '📱 Complete Android App Development with Kotlin & Java',
      instructor: 'Harshita (Senior Android Developer, Ex-Flipkart)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaandroid&backgroundColor=fee2e2',
      rating: 4.7,
      totalRatings: 28600,
      students: 134000,
      duration: '90 hours',
      level: 'Intermediate' as const,
      price: 3999,
      originalPrice: 11999,
      category: 'Mobile App Development',
      subcategory: 'Android Development',
      description: '📱 Build 10+ real Android apps! Learn Kotlin, Java, Firebase, Room Database, Retrofit. Includes Play Store publishing and monetization strategies.',
      tags: ['Android', 'Kotlin', 'Java', 'Firebase', 'Mobile Development', 'Play Store'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      bestseller: true,
      new: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-16',
      certificate: true,
      preview: true
    },
    
    // 🎯 COMPETITIVE EXAM COURSES - TOP COACHING QUALITY 🎯
    {
      id: 'upsc-1',
      title: 'UPSC CSE Complete General Studies Foundation',
      instructor: 'Dr. Vikas Divyakirti (Drishti IAS Director)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikasdivyakirti&backgroundColor=f0fdf4',
      rating: 4.9,
      totalRatings: 45200,
      students: 280000,
      duration: '200 hours',
      level: 'Intermediate' as const,
      price: 15999,
      originalPrice: 29999,
      category: 'Competitive Exams',
      subcategory: 'UPSC CSE',
      description: 'Complete UPSC General Studies covering History, Geography, Polity, Economics, Environment, S&T with current affairs integration.',
      tags: ['UPSC', 'Civil Services', 'General Studies', 'History', 'Geography', 'Polity', 'Economics'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      bestseller: true,
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-15',
      certificate: true,
      preview: true
    },
    {
      id: 'jee-1',
      title: '🎯 Complete JEE Main + Advanced 2025 - Physics Mastery',
      instructor: 'Harshita (IIT Bombay, 15+ Years Teaching Experience)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaphysics&backgroundColor=dbeafe',
      rating: 4.9,
      totalRatings: 78900,
      students: 245000,
      duration: '150 hours',
      level: 'Advanced' as const,
      price: 5999,
      originalPrice: 15999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: '⚡ Complete JEE Physics with 500+ solved problems, 50+ Mock tests, and exclusive tricks. Covers Mechanics, Thermodynamics, Electromagnetism & Modern Physics.',
      tags: ['JEE Main', 'JEE Advanced', 'Physics', 'Mechanics', 'Thermodynamics', 'Electromagnetism'],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-14',
      certificate: true,
      preview: true
    },
    {
      id: 'neet-1',
      title: 'NEET Biology Complete Course - Botany & Zoology',
      instructor: 'Dr. Sanjay Singh (AIIMS Faculty, Ex-Aakash)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjaysingh&backgroundColor=ecfdf5',
      rating: 4.9,
      totalRatings: 42150,
      students: 225000,
      duration: '130 hours',
      level: 'Advanced' as const,
      price: 7999,
      originalPrice: 18999,
      category: 'Competitive Exams',
      subcategory: 'NEET Preparation',
      description: 'Complete NEET Biology course covering entire NCERT syllabus with advanced concepts, diagrams, and medical entrance strategies.',
      tags: ['NEET', 'Biology', 'Botany', 'Zoology', 'NCERT', 'Medical Entrance', 'AIIMS'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-13',
      certificate: true,
      preview: true
    },
    {
      id: 'jee-math-1',
      title: '🔢 JEE Mathematics Complete - Algebra to Calculus Mastery',
      instructor: 'Prof. Anand Kumar (Super 30 Fame, Patna)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anandkumar&backgroundColor=fef3c7',
      rating: 4.8,
      totalRatings: 65430,
      students: 198000,
      duration: '140 hours',
      level: 'Advanced' as const,
      price: 6999,
      originalPrice: 16999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: '🔢 Complete JEE Maths covering Algebra, Trigonometry, Calculus, Coordinate Geometry with 600+ solved examples and previous year papers.',
      tags: ['JEE Main', 'JEE Advanced', 'Mathematics', 'Algebra', 'Calculus', 'Trigonometry'],
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
      bestseller: true,
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-12',
      certificate: true,
      preview: true
    },
    {
      id: 'upsc-optional-1',
      title: 'UPSC Geography Optional - Complete Course',
      instructor: 'Dr. Shubhra Ranjan (KGS India, Top Geography Faculty)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shubhra&backgroundColor=e0e7ff',
      rating: 4.7,
      totalRatings: 18750,
      students: 85000,
      duration: '180 hours',
      level: 'Advanced' as const,
      price: 12999,
      originalPrice: 24999,
      category: 'Competitive Exams',
      subcategory: 'UPSC Optional',
      description: 'Complete Geography optional covering Physical, Human & Economic Geography with maps, diagrams and answer writing practice for UPSC mains.',
      tags: ['UPSC', 'Geography Optional', 'Physical Geography', 'Human Geography', 'Mains'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-10',
      certificate: true,
      preview: true
    },
    {
      id: 'neet-chemistry-1',
      title: 'NEET Chemistry Complete - Organic, Inorganic & Physical',
      instructor: 'Dr. Pradeep Agarwal (Ex-Allen, Kota)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pradeepagarwal&backgroundColor=fdf2f8',
      rating: 4.8,
      totalRatings: 38920,
      students: 187000,
      duration: '125 hours',
      level: 'Advanced' as const,
      price: 8999,
      originalPrice: 19999,
      category: 'Competitive Exams',
      subcategory: 'NEET Preparation',
      description: 'Complete NEET Chemistry covering all three branches with reaction mechanisms, named reactions, and medical entrance specific problems.',
      tags: ['NEET', 'Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
      image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-11',
      certificate: true,
      preview: true
    },
    {
      id: 'gate-cs-1',
      title: 'GATE Computer Science Complete Preparation 2025',
      instructor: 'Harshita (IIT Graduate, GATE AIR 1)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitagate&backgroundColor=f0f9ff',
      rating: 4.9,
      totalRatings: 32150,
      students: 156000,
      duration: '160 hours',
      level: 'Advanced' as const,
      price: 9999,
      originalPrice: 22999,
      category: 'Competitive Exams',
      subcategory: 'GATE Preparation',
      description: 'Complete GATE CS preparation covering Algorithms, OS, DBMS, Networks, TOC with previous year solutions and mock tests.',
      tags: ['GATE', 'Computer Science', 'Algorithms', 'Operating Systems', 'DBMS', 'Networks'],
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-09',
      certificate: true,
      preview: true
    },
    {
      id: 'jee-chemistry-1',
      title: 'JEE Chemistry Complete - Organic, Inorganic & Physical',
      instructor: 'Dr. Kalpit Veerwal (JEE AIR 1, Ex-Unacademy)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kalpitveerwal&backgroundColor=f3e8ff',
      rating: 4.8,
      totalRatings: 71200,
      students: 234000,
      duration: '135 hours',
      level: 'Advanced' as const,
      price: 6499,
      originalPrice: 15999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: 'Complete JEE Chemistry with all concepts, reactions, and problem-solving techniques for JEE Main & Advanced preparation.',
      tags: ['JEE Main', 'JEE Advanced', 'Chemistry', 'Organic', 'Inorganic', 'Physical'],
      image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-08',
      certificate: true,
      preview: true
    },
    {
      id: 'cat-quant-1',
      title: 'CAT Quantitative Aptitude Complete - Number Systems to Statistics',
      instructor: 'Arun Sharma (CAT Guru, 20+ Years Experience)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arunsharma&backgroundColor=fff7ed',
      rating: 4.7,
      totalRatings: 28450,
      students: 142000,
      duration: '100 hours',
      level: 'Intermediate' as const,
      price: 4999,
      originalPrice: 12999,
      category: 'Competitive Exams',
      subcategory: 'CAT Preparation',
      description: 'Complete CAT Quant preparation covering Number Systems, Algebra, Geometry, Modern Math with shortcuts and time-saving techniques.',
      tags: ['CAT', 'Quantitative Aptitude', 'Number Systems', 'Algebra', 'Geometry', 'MBA'],
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-07',
      certificate: true,
      preview: true
    },
    {
      id: 'ssc-cgl-1',
      title: 'SSC CGL Complete Course - Tier 1 & Tier 2 Preparation',
      instructor: 'Neetu Singh (SSC Expert, Ex-Paramount)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neetusingh&backgroundColor=f0fdf4',
      rating: 4.6,
      totalRatings: 22350,
      students: 95000,
      duration: '120 hours',
      level: 'Intermediate' as const,
      price: 3999,
      originalPrice: 9999,
      category: 'Competitive Exams',
      subcategory: 'SSC Preparation',
      description: 'Complete SSC CGL preparation covering Reasoning, Quantitative Aptitude, English, and General Awareness for both Tier 1 & Tier 2.',
      tags: ['SSC CGL', 'Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-06',
      certificate: true,
      preview: true
    },
    {
      id: 'bank-po-1',
      title: 'Bank PO Complete Course - SBI, IBPS, RBI Preparation',
      instructor: 'Adda247 Team (Banking Specialists)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=adda247&backgroundColor=e0f2fe',
      rating: 4.5,
      totalRatings: 19280,
      students: 78000,
      duration: '110 hours',
      level: 'Intermediate' as const,
      price: 4499,
      originalPrice: 11999,
      category: 'Competitive Exams',
      subcategory: 'Banking Exams',
      description: 'Complete Banking PO preparation covering Reasoning, Quantitative Aptitude, English, General Awareness, and Computer Knowledge.',
      tags: ['Bank PO', 'SBI PO', 'IBPS PO', 'Banking', 'Reasoning', 'Quantitative Aptitude'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      language: 'Hindi + English',
      lastUpdated: '2025-08-05',
      certificate: true,
      preview: true
    },
    
    // Core Engineering Courses
    {
      id: '1',
      title: 'Complete Data Structures & Algorithms for Engineering Students',
      instructor: 'Prof. Rajesh Kumar (IIT Patna, Google CodeJam Finalist)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajeshkumar&backgroundColor=f0f9ff',
      rating: 4.9,
      totalRatings: 125420,
      students: 525000,
      duration: '80 hours',
      level: 'Intermediate' as const,
      price: 3999,
      originalPrice: 7999,
      category: 'Data Structures & Algorithms',
      subcategory: 'Competitive Programming',
      description: 'Master DSA concepts crucial for placements. Covers Arrays, Linked Lists, Trees, Graphs, DP with 200+ coding problems and solutions. Used by 100+ companies for training.',
      tags: ['DSA', 'Competitive Programming', 'Placement Prep', 'Arrays', 'Trees', 'Graphs'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-15',
      certificate: true,
      preview: true
    },
    {
      id: '2',
      title: 'Complete Java Programming for B.Tech Students',
      instructor: 'Dr. Priya Sharma (NIT Warangal, Oracle Certified Master)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyasharma&backgroundColor=fef3c7',
      rating: 4.8,
      totalRatings: 89300,
      students: 425000,
      duration: '65 hours',
      level: 'Beginner' as const,
      price: 2999,
      originalPrice: 5999,
      category: 'Programming Languages',
      subcategory: 'Java Development',
      description: 'Complete Java course covering OOP, Collections, Multithreading, JDBC. Perfect for B.Tech students and placement preparation. Includes 50+ projects.',
      tags: ['Java', 'OOP', 'Collections', 'Multithreading', 'JDBC', 'Placement'],
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-10',
      certificate: true,
      preview: true
    },
    
    // JEE Preparation Courses
    {
      id: '3',
      title: 'JEE Main & Advanced Complete Physics Course',
      instructor: 'Dr. Alok Pandey (IIT Kanpur, Ex-Allen Faculty, 18+ Years Experience)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alokpandey&backgroundColor=ecfdf5',
      rating: 4.9,
      totalRatings: 135420,
      students: 685000,
      duration: '120 hours',
      level: 'Advanced' as const,
      price: 8999,
      originalPrice: 15999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: 'Complete JEE Physics course covering Mechanics, Thermodynamics, Optics, Modern Physics with 1000+ solved problems and mock tests. Top-rated by 50+ JEE toppers.',
      tags: ['JEE Main', 'JEE Advanced', 'Physics', 'IIT JEE', 'Engineering Entrance', 'Mock Tests'],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-18',
      certificate: true,
      preview: true
    },
    {
      id: '4',
      title: 'JEE Main & Advanced Mathematics Masterclass',
      instructor: 'Prof. Amit Agarwal (IIT Patna, Ex-Resonance, Mathematics Olympiad Coach)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amitagarwal&backgroundColor=ede9fe',
      rating: 4.8,
      totalRatings: 128750,
      students: 456000,
      duration: '110 hours',
      level: 'Advanced' as const,
      price: 8999,
      originalPrice: 15999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: 'Advanced Mathematics for JEE covering Calculus, Coordinate Geometry, Algebra, Trigonometry with advanced problem-solving techniques. Used by 30+ JEE AIR 1-100 students.',
      tags: ['JEE Main', 'JEE Advanced', 'Mathematics', 'Calculus', 'Coordinate Geometry', 'Algebra'],
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
      new: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-16',
      certificate: true,
      preview: true
    },
    {
      id: '5',
      title: 'JEE Chemistry Complete Course - Organic, Inorganic & Physical',
      instructor: 'Dr. Neeraj Sharma (IIT Bombay, Ex-Aakash Faculty, PhD Chemistry)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neerajsharma&backgroundColor=fdf2f8',
      rating: 4.7,
      totalRatings: 92340,
      students: 334000,
      duration: '100 hours',
      level: 'Advanced' as const,
      price: 7999,
      originalPrice: 14999,
      category: 'Competitive Exams',
      subcategory: 'JEE Preparation',
      description: 'Complete JEE Chemistry covering all three branches with reactions, mechanisms, and numerical problems. Includes memory techniques and industry applications.',
      tags: ['JEE Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Reactions', 'JEE Main'],
      image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=300&h=200&fit=crop',
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2025-08-14',
      certificate: true,
      preview: true
    },

    // NEET Preparation Courses
    {
      id: '6',
      title: 'NEET Biology Complete Course - Botany & Zoology',
      instructor: 'Dr. Sanjay Singh (AIIMS Faculty, Ex-Aakash)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjaysingh&backgroundColor=ecfdf5',
      rating: 4.9,
      totalRatings: 42150,
      students: 225000,
      duration: '130 hours',
      level: 'Advanced' as const,
      price: 9999,
      originalPrice: 17999,
      category: 'Competitive Exams',
      subcategory: 'NEET Preparation',
      description: 'Complete NEET Biology course covering entire NCERT syllabus with advanced concepts, diagrams, and medical entrance strategies.',
      tags: ['NEET', 'Biology', 'Botany', 'Zoology', 'NCERT', 'Medical Entrance', 'AIIMS'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-17',
      certificate: true,
      preview: true
    },
    {
      id: '7',
      title: 'NEET Physics for Medical Entrance',
      instructor: 'Prof. Rakesh Yadav (IIT Patna, Ex-Allen)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 18920,
      students: 98500,
      duration: '85 hours',
      level: 'Intermediate' as const,
      price: 6999,
      originalPrice: 12999,
      category: 'Competitive Exams',
      subcategory: 'NEET Preparation',
      description: 'NEET Physics simplified for medical students covering all important topics with medical applications and problem-solving techniques.',
      tags: ['NEET Physics', 'Medical Physics', 'AIIMS', 'JIPMER', 'Medical Entrance', 'NCERT'],
      image: '/api/placeholder/300/200',
      language: 'Hindi + English',
      lastUpdated: '2024-12-12',
      certificate: true,
      preview: true
    },
    {
      id: '8',
      title: 'NEET Chemistry Complete Preparation',
      instructor: 'Dr. Pooja Mehta (AIIMS Rishikesh, Ex-Career Point)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.7,
      totalRatings: 16750,
      students: 89200,
      duration: '95 hours',
      level: 'Intermediate' as const,
      price: 7499,
      originalPrice: 13999,
      category: 'Competitive Exams',
      subcategory: 'NEET Preparation',
      description: 'NEET Chemistry covering Organic, Inorganic, and Physical Chemistry with focus on NCERT and previous year questions.',
      tags: ['NEET Chemistry', 'Organic Chemistry', 'NCERT Chemistry', 'Medical Chemistry', 'AIIMS', 'Previous Years'],
      image: '/api/placeholder/300/200',
      new: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-15',
      certificate: true,
      preview: true
    },

    // GATE Preparation Courses
    {
      id: '9',
      title: 'GATE Computer Science Complete Preparation',
      instructor: 'Prof. Deepak Garg (IIT Roorkee, Ex-GATE Ranker AIR-1)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepakgarg&backgroundColor=f0f9ff',
      rating: 4.9,
      totalRatings: 15420,
      students: 78500,
      duration: '150 hours',
      level: 'Advanced' as const,
      price: 12999,
      originalPrice: 24999,
      category: 'Competitive Exams',
      subcategory: 'GATE Preparation',
      description: 'Complete GATE CS preparation covering all subjects: DSA, OS, DBMS, COA, Networks, Compiler Design with previous 20 years solutions.',
      tags: ['GATE CS', 'Computer Science', 'Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks'],
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
      bestseller: true,
      language: 'English',
      lastUpdated: '2024-12-19',
      certificate: true,
      preview: true
    },
    {
      id: '10',
      title: 'GATE Mechanical Engineering Complete Course',
      instructor: 'Prof. Sunil Kumar (IIT Kharagpur, ME Department)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 12340,
      students: 65400,
      duration: '140 hours',
      level: 'Advanced' as const,
      price: 11999,
      originalPrice: 22999,
      category: 'Competitive Exams',
      subcategory: 'GATE Preparation',
      description: 'GATE Mechanical Engineering covering Thermodynamics, Fluid Mechanics, Heat Transfer, Manufacturing, Machine Design with solved papers.',
      tags: ['GATE ME', 'Mechanical Engineering', 'Thermodynamics', 'Fluid Mechanics', 'Heat Transfer', 'Manufacturing'],
      image: '/api/placeholder/300/200',
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-16',
      certificate: true,
      preview: true
    },
    {
      id: '11',
      title: 'GATE Electronics & Communication Complete Preparation',
      instructor: 'Dr. Ravi Prakash (IIT Madras, ECE Department)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.7,
      totalRatings: 9870,
      students: 52300,
      duration: '135 hours',
      level: 'Advanced' as const,
      price: 11499,
      originalPrice: 21999,
      category: 'Competitive Exams',
      subcategory: 'GATE Preparation',
      description: 'GATE ECE preparation covering Analog Circuits, Digital Electronics, Signals & Systems, Communications, Control Systems, EM Theory.',
      tags: ['GATE ECE', 'Electronics', 'Communication', 'Analog Circuits', 'Digital Electronics', 'Signals Systems'],
      image: '/api/placeholder/300/200',
      language: 'English',
      lastUpdated: '2024-12-13',
      certificate: true,
      preview: true
    },

    // UPSC Preparation Courses
    {
      id: '12',
      title: 'UPSC CSE Complete General Studies Foundation',
      instructor: 'Dr. Vikas Divyakirti (Drishti IAS Director)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikasdivyakirti&backgroundColor=f0fdf4',
      rating: 4.9,
      totalRatings: 45200,
      students: 280000,
      duration: '200 hours',
      level: 'Intermediate' as const,
      price: 15999,
      originalPrice: 29999,
      category: 'Competitive Exams',
      subcategory: 'UPSC Preparation',
      description: 'Complete UPSC General Studies covering History, Geography, Polity, Economics, Environment, S&T with current affairs integration.',
      tags: ['UPSC', 'Civil Services', 'General Studies', 'Current Affairs', 'History', 'Geography', 'Polity'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-20',
      certificate: true,
      preview: true
    },
    {
      id: '13',
      title: 'UPSC CSAT (Paper-2) Complete Preparation',
      instructor: 'Prof. Sanjeev Kumar (Ex-UPSC Interview Board)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 18750,
      students: 125000,
      duration: '80 hours',
      level: 'Intermediate' as const,
      price: 6999,
      originalPrice: 12999,
      category: 'Competitive Exams',
      subcategory: 'UPSC Preparation',
      description: 'UPSC CSAT preparation covering Comprehension, Logical Reasoning, Analytical Ability, Decision Making, Problem Solving with practice.',
      tags: ['UPSC CSAT', 'Logical Reasoning', 'Comprehension', 'Analytical Ability', 'Problem Solving', 'Decision Making'],
      image: '/api/placeholder/300/200',
      language: 'Hindi + English',
      lastUpdated: '2024-12-11',
      certificate: true,
      preview: true
    },

    // SSC Preparation Courses
    {
      id: '14',
      title: 'SSC CGL Complete Preparation - All Subjects',
      instructor: 'Rakesh Yadav (SSC Expert, 15+ Years Experience)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 32150,
      students: 195000,
      duration: '100 hours',
      level: 'Intermediate' as const,
      price: 4999,
      originalPrice: 9999,
      category: 'Competitive Exams',
      subcategory: 'SSC Preparation',
      description: 'Complete SSC CGL preparation covering Quantitative Aptitude, Reasoning, English, General Awareness with tier-wise strategy.',
      tags: ['SSC CGL', 'Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness', 'Government Jobs'],
      image: '/api/placeholder/300/200',
      bestseller: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-14',
      certificate: true,
      preview: true
    },
    {
      id: '15',
      title: 'SSC CHSL Complete Course',
      instructor: 'Neetu Singh (SSC Topper, AIR-3)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.7,
      totalRatings: 15630,
      students: 98500,
      duration: '75 hours',
      level: 'Beginner' as const,
      price: 3999,
      originalPrice: 7999,
      category: 'Competitive Exams',
      subcategory: 'SSC Preparation',
      description: 'SSC CHSL preparation for 10+2 candidates covering all subjects with descriptive paper preparation and typing test guidance.',
      tags: ['SSC CHSL', 'Lower Division Clerk', 'Data Entry Operator', 'Postal Assistant', 'Descriptive Paper'],
      image: '/api/placeholder/300/200',
      language: 'Hindi + English',
      lastUpdated: '2024-12-09',
      certificate: true,
      preview: true
    },

    // Banking Preparation Courses
    {
      id: '16',
      title: 'Bank PO Complete Preparation - SBI, IBPS, RBI',
      instructor: 'Adda247 Banking Team (Banking Experts)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 28940,
      students: 165000,
      duration: '120 hours',
      level: 'Intermediate' as const,
      price: 5999,
      originalPrice: 11999,
      category: 'Competitive Exams',
      subcategory: 'Banking Preparation',
      description: 'Complete Banking PO preparation covering Quantitative Aptitude, Reasoning, English, Banking Awareness, Computer Knowledge with mocks.',
      tags: ['Bank PO', 'SBI PO', 'IBPS PO', 'RBI Grade B', 'Banking Awareness', 'Quantitative Aptitude'],
      image: '/api/placeholder/300/200',
      featured: true,
      language: 'Hindi + English',
      lastUpdated: '2024-12-12',
      certificate: true,
      preview: true
    },
    {
      id: '17',
      title: 'Bank Clerk Complete Preparation Course',
      instructor: 'Oliveboard Banking Faculty',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.6,
      totalRatings: 19750,
      students: 125000,
      duration: '90 hours',
      level: 'Beginner' as const,
      price: 3999,
      originalPrice: 7999,
      category: 'Competitive Exams',
      subcategory: 'Banking Preparation',
      description: 'Bank Clerk exam preparation for SBI, IBPS Clerk covering all subjects with sectional and full-length mock tests.',
      tags: ['Bank Clerk', 'SBI Clerk', 'IBPS Clerk', 'Banking Jobs', 'Mock Tests', 'Sectional Tests'],
      image: '/api/placeholder/300/200',
      language: 'Hindi + English',
      lastUpdated: '2024-12-08',
      certificate: true,
      preview: true
    },

    // CAT & MBA Preparation
    {
      id: '18',
      title: 'CAT Complete Preparation - Quantitative Ability',
      instructor: 'Prof. Arun Sharma (IIT Patna Alumni)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.9,
      totalRatings: 22340,
      students: 135000,
      duration: '80 hours',
      level: 'Advanced' as const,
      price: 7999,
      originalPrice: 14999,
      category: 'Competitive Exams',
      subcategory: 'CAT Preparation',
      description: 'CAT Quantitative Ability complete course covering Arithmetic, Algebra, Geometry, Modern Math with advanced problem-solving techniques.',
      tags: ['CAT', 'Quantitative Ability', 'IIM', 'MBA Entrance', 'Problem Solving', 'Advanced Math'],
      image: '/api/placeholder/300/200',
      bestseller: true,
      language: 'English',
      lastUpdated: '2024-12-17',
      certificate: true,
      preview: true
    },
    {
      id: '19',
      title: 'CAT Verbal Ability & Reading Comprehension',
      instructor: 'Gejo Sreenivasan (Verbal Expert, Ex-TIME Faculty)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.8,
      totalRatings: 18920,
      students: 98500,
      duration: '70 hours',
      level: 'Intermediate' as const,
      price: 6999,
      originalPrice: 12999,
      category: 'Competitive Exams',
      subcategory: 'CAT Preparation',
      description: 'CAT VARC preparation covering Reading Comprehension, Para Jumbles, Para Completion, Critical Reasoning with practice passages.',
      tags: ['CAT VARC', 'Reading Comprehension', 'Para Jumbles', 'Critical Reasoning', 'English', 'Verbal Ability'],
      image: '/api/placeholder/300/200',
      new: true,
      language: 'English',
      lastUpdated: '2024-12-15',
      certificate: true,
      preview: true
    },

    // NDA & CDS Preparation
    {
      id: '20',
      title: 'NDA Complete Preparation - Mathematics & GAT',
      instructor: 'Major Kalyan Singh (Ex-NDA, Defence Expert)',
      instructorImage: '/api/placeholder/40/40',
      rating: 4.7,
      totalRatings: 12540,
      students: 75000,
      duration: '100 hours',
      level: 'Intermediate' as const,
      price: 5999,
      originalPrice: 11999,
      category: 'Competitive Exams',
      subcategory: 'Defence Preparation',
      description: 'Complete NDA preparation covering Mathematics and General Ability Test with SSB interview guidance and personality development.',
      tags: ['NDA', 'National Defence Academy', 'Mathematics', 'GAT', 'SSB Interview', 'Defence Services'],
      image: '/api/placeholder/300/200',
      language: 'Hindi + English',
      lastUpdated: '2024-12-10',
      certificate: true,
      preview: true
    },

    // Additional Engineering Courses
    {
      id: '21',
      title: 'MERN Stack Web Development for Engineers',
      instructor: 'Amit Patel (Ex-Google Engineer)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amitpatel&backgroundColor=fef3c7',
      rating: 4.7,
      totalRatings: 12750,
      students: 67800,
      duration: '120 hours',
      level: 'Intermediate' as const,
      price: 4999,
      originalPrice: 9999,
      category: 'Web Development',
      subcategory: 'Full Stack Development',
      description: 'Build modern web applications using MongoDB, Express.js, React.js, and Node.js. Includes 8 real projects and deployment.',
      tags: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB', 'Full Stack', 'Projects'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      language: 'English',
      lastUpdated: '2024-12-12',
      certificate: true,
      preview: true
    },
    {
      id: '22',
      title: 'Machine Learning & AI for Engineering Students',
      instructor: 'Dr. Anita Singh (IIT Bombay)',
      instructorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anitasingh&backgroundColor=fecaca',
      rating: 4.8,
      totalRatings: 15870,
      students: 58900,
      duration: '90 hours',
      level: 'Advanced' as const,
      price: 5999,
      originalPrice: 11999,
      category: 'Machine Learning & AI',
      subcategory: 'Artificial Intelligence',
      description: 'Comprehensive ML course with Python, Scikit-learn, TensorFlow. Covers supervised/unsupervised learning with engineering applications.',
      tags: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning', 'AI', 'Neural Networks'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      language: 'English',
      lastUpdated: '2024-12-08',
      certificate: true,
      preview: true
    }
  ], []);

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesLanguage = selectedLanguage === 'All' || course.language === selectedLanguage;
      
      let matchesPrice = true;
      if (priceRange !== 'All') {
        switch (priceRange) {
          case 'Free':
            matchesPrice = course.price === 0;
            break;
          case '₹0-₹2000':
            matchesPrice = course.price >= 0 && course.price <= 2000;
            break;
          case '₹2000-₹5000':
            matchesPrice = course.price > 2000 && course.price <= 5000;
            break;
          case '₹5000-₹10000':
            matchesPrice = course.price > 5000 && course.price <= 10000;
            break;
          case '₹10000+':
            matchesPrice = course.price > 10000;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesPrice;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Most Popular':
          return b.students - a.students;
        case 'Newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'Rating':
          return b.rating - a.rating;
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        default:
          return b.students - a.students;
      }
    });

    return filtered;
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedLanguage, priceRange, sortBy]);

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const handleEnroll = () => {
      setSelectedCourse(course);
      setShowEnrollmentModal(true);
    };

    const handlePreview = () => {
      console.log(`Previewing course: ${course.title}`);
      console.log(`🎬 Course Preview\n\n"${course.title}"\n\nThis course covers:\n${course.description}\n\n✨ Key Topics: ${course.tags.slice(0, 3).join(', ')}\n\n▶️ Full course available after enrollment!`);
    };

    return (
    <Card className={`hover:shadow-lg transition-all cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}>
      {/* Course Image */}
      <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'w-full'}`}>
        <div className={`bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white relative overflow-hidden ${
          viewMode === 'list' ? 'h-48' : 'h-48'
        }`} style={course.image && course.image.includes('unsplash') ? {
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7)), url('${course.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}>
          <div className="text-center">
            {!course.image || !course.image.includes('unsplash') ? (
              <>
                {course.category.includes('Machine Learning') || course.category.includes('AI') ? (
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ) : course.category.includes('Web Development') ? (
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v10H4V6z"/>
                  </svg>
                ) : course.category.includes('Programming') ? (
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                ) : course.category.includes('JEE') || course.category.includes('NEET') || course.category.includes('GATE') ? (
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"/>
                  </svg>
                ) : (
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                )}
                <p className="text-sm opacity-75">{course.category}</p>
              </>
            ) : (
              <div className="absolute bottom-4 left-4">
                <p className="text-sm font-medium opacity-90">{course.category}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {course.bestseller && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
              Bestseller
            </span>
          )}
          {course.new && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
              New
            </span>
          )}
          {course.featured && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Preview Button */}
        {course.preview && (
          <button 
            onClick={handlePreview}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
            aria-label="Preview course video"
            title="Preview course video"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Course Info */}
      <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1 ml-6' : 'mt-4'}`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400">
            {course.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            by {course.instructor}
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {course.description}
        </p>

        {/* Rating and Stats */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-semibold">{course.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              ({course.totalRatings.toLocaleString()})
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-300">
            {course.students.toLocaleString()} students
          </span>
        </div>

        {/* Course Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span>{course.duration}</span>
          <span className={`px-2 py-1 rounded text-xs ${
            course.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
            course.level === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {course.level}
          </span>
          {course.certificate && (
            <span className="flex items-center text-xs">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Certificate
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        {/* Price and Enroll */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {course.originalPrice && (
              <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                ₹{course.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
            </span>
          </div>
          <button 
            onClick={handleEnroll}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Engineering Course Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master engineering concepts with courses designed specifically for B.Tech students. 
            From programming to advanced engineering subjects, excel in your academics and placements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-full">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">🎯 Placement Ready</span>
            </div>
            <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-full">
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">👨‍🏫 IIT/NIT Faculty</span>
            </div>
            <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-full">
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">📜 University Aligned</span>
            </div>
            <div className="flex items-center bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-full">
              <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">💻 Hands-on Projects</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for DSA, Java, Web Development, Machine Learning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <svg className="absolute left-4 top-5 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters
          </button>

          {/* Filters */}
          <div className={`flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden lg:flex'} flex-1`}>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              aria-label="Filter by skill level"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : level}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter by language"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language === 'All' ? 'All Languages' : language}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              aria-label="Filter by price range"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range === 'All' ? 'All Prices' : range}
                </option>
              ))}
            </select>
          </div>

          {/* Sort and View Controls */}
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort courses by"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                title="Grid view"
                aria-label="Switch to grid view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                title="List view"
                aria-label="Switch to list view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredAndSortedCourses.length} course{filteredAndSortedCourses.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Course Grid/List */}
        <div className={`mb-8 ${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredAndSortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedCourses.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.47.881-6.083 2.291" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search terms or filters to find more courses.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSelectedLanguage('All');
                setPriceRange('All');
              }}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
          onClose={() => {
            setShowEnrollmentModal(false);
            setSelectedCourse(null);
          }}
          onComplete={() => {
            setShowEnrollmentModal(false);
            setSelectedCourse(null);
            console.log('🎉 Welcome to your new course! Check your email for access details.');
          }}
        />
      )}
    </div>
  );
};

export default CourseCatalogPage;
