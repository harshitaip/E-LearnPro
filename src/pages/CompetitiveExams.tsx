import React, { useState } from 'react';
import Card from '../components/Card/Card';

const CompetitiveExams: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const examCategories = [
    { id: 'All', name: 'All Exams', icon: '📚' },
    { id: 'JEE', name: 'JEE Main & Advanced', icon: '⚗️' },
    { id: 'NEET', name: 'NEET', icon: '🏥' },
    { id: 'GATE', name: 'GATE', icon: '💻' },
    { id: 'UPSC', name: 'UPSC CSE', icon: '🏛️' },
    { id: 'SSC', name: 'SSC Exams', icon: '🏢' },
    { id: 'Banking', name: 'Banking', icon: '🏦' },
    { id: 'CAT', name: 'CAT & MBA', icon: '📈' },
    { id: 'Defence', name: 'Defence', icon: '🛡️' }
  ];

  const competitiveExams = [
    {
      id: '1',
      name: 'JEE Main 2025',
      description: 'Joint Entrance Examination for Engineering Colleges',
      category: 'JEE',
      difficulty: 'High',
      duration: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      eligibility: 'Class 12 with PCM',
      examDate: 'January 2025',
      applicationDeadline: 'December 2024',
      totalMarks: 300,
      numQuestions: 90,
      registrationFee: '₹1,000',
      popularCourses: 12,
      enrolledStudents: 250000,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      name: 'NEET 2025',
      description: 'National Eligibility cum Entrance Test for Medical Courses',
      category: 'NEET',
      difficulty: 'High',
      duration: '3 hours 20 minutes',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      eligibility: 'Class 12 with PCB',
      examDate: 'May 2025',
      applicationDeadline: 'March 2025',
      totalMarks: 720,
      numQuestions: 180,
      registrationFee: '₹1,700',
      popularCourses: 8,
      enrolledStudents: 180000,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      name: 'GATE 2025',
      description: 'Graduate Aptitude Test in Engineering',
      category: 'GATE',
      difficulty: 'High',
      duration: '3 hours',
      subjects: ['Core Subject', 'Engineering Mathematics', 'General Aptitude'],
      eligibility: 'BE/BTech (Final year or passed)',
      examDate: 'February 2025',
      applicationDeadline: 'October 2024',
      totalMarks: 100,
      numQuestions: 65,
      registrationFee: '₹1,850',
      popularCourses: 15,
      enrolledStudents: 95000,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      name: 'UPSC CSE 2025',
      description: 'Union Public Service Commission Civil Services Examination',
      category: 'UPSC',
      difficulty: 'Very High',
      duration: 'Multi-stage (1 year)',
      subjects: ['General Studies', 'Optional Subject', 'Essay'],
      eligibility: 'Graduate in any discipline',
      examDate: 'June 2025 (Prelims)',
      applicationDeadline: 'March 2025',
      totalMarks: 2025,
      numQuestions: 200,
      registrationFee: '₹200',
      popularCourses: 10,
      enrolledStudents: 75000,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      name: 'SSC CGL 2025',
      description: 'Staff Selection Commission Combined Graduate Level',
      category: 'SSC',
      difficulty: 'Medium',
      duration: '4 tiers',
      subjects: ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness'],
      eligibility: 'Graduate in any discipline',
      examDate: 'April 2025',
      applicationDeadline: 'February 2025',
      totalMarks: 800,
      numQuestions: 200,
      registrationFee: 'Free',
      popularCourses: 6,
      enrolledStudents: 120000,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      name: 'CAT 2025',
      description: 'Common Admission Test for IIMs',
      category: 'CAT',
      difficulty: 'High',
      duration: '3 hours',
      subjects: ['Verbal Ability', 'Data Interpretation', 'Quantitative Ability'],
      eligibility: 'Graduate (50% marks)',
      examDate: 'November 2025',
      applicationDeadline: 'September 2025',
      totalMarks: 300,
      numQuestions: 66,
      registrationFee: '₹2,300',
      popularCourses: 5,
      enrolledStudents: 85000,
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=250&fit=crop'
    }
  ];

  const filteredExams = selectedCategory === 'All' 
    ? competitiveExams 
    : competitiveExams.filter(exam => exam.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🏆 Competitive Exams Hub
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Your one-stop destination for all competitive exam preparations. From JEE to UPSC, 
            get comprehensive study materials, mock tests, and expert guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">📈 95% Success Rate</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">👨‍🏫 Expert Faculty</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">📊 10,000+ Mock Tests</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {examCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              {/* Exam Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white relative">
                  <img 
                    src={exam.image} 
                    alt={exam.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80"></div>
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold">{exam.name}</h3>
                    <p className="text-blue-100 mt-2">{exam.category}</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
                  {exam.difficulty}
                </div>
              </div>

              {/* Exam Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {exam.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {exam.description}
                  </p>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                    <p className="text-gray-600 dark:text-gray-400">{exam.duration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Total Marks:</span>
                    <p className="text-gray-600 dark:text-gray-400">{exam.totalMarks}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Exam Date:</span>
                    <p className="text-gray-600 dark:text-gray-400">{exam.examDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Fee:</span>
                    <p className="text-gray-600 dark:text-gray-400">{exam.registrationFee}</p>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">Subjects:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exam.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{exam.popularCourses}</span> courses available
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{exam.enrolledStudents.toLocaleString()}</span> students
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    📚 View Courses
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    📝 Take Mock Test
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Ready to Start Your Preparation?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of successful candidates who achieved their dreams with our comprehensive preparation programs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Browse All Courses
              </button>
              <button className="bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                Download Study Plan
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveExams;