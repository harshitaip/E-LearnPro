import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';

const FreeCourses: React.FC = () => {
  const freeCourses = [
    {
      id: 'intro-programming',
      title: 'Introduction to Programming with Python',
      description: 'Learn the fundamentals of programming using Python. Perfect for absolute beginners.',
      instructor: 'Dr. Rajesh Kumar',
      duration: '4 weeks',
      lessons: 24,
      students: 15420,
      rating: 4.8,
      level: 'Beginner',
      category: 'Programming',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=python&backgroundColor=3b82f6',
      skills: ['Python Basics', 'Variables', 'Functions', 'Loops', 'Data Types']
    },
    {
      id: 'basic-maths',
      title: 'Mathematics for JEE/NEET - Basic Concepts',
      description: 'Master fundamental mathematical concepts essential for competitive exams.',
      instructor: 'Prof. Priya Sharma',
      duration: '6 weeks',
      lessons: 36,
      students: 22150,
      rating: 4.9,
      level: 'Intermediate',
      category: 'Competitive Exams',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=mathematics&backgroundColor=10b981',
      skills: ['Algebra', 'Trigonometry', 'Calculus', 'Geometry', 'Statistics']
    },
    {
      id: 'digital-marketing-basics',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
      instructor: 'Amit Verma',
      duration: '3 weeks',
      lessons: 18,
      students: 8760,
      rating: 4.7,
      level: 'Beginner',
      category: 'Marketing',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=marketing&backgroundColor=8b5cf6',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'Strategy']
    },
    {
      id: 'english-speaking',
      title: 'English Speaking for Professionals',
      description: 'Improve your English speaking skills for professional and academic success.',
      instructor: 'Sarah Williams',
      duration: '5 weeks',
      lessons: 30,
      students: 12890,
      rating: 4.6,
      level: 'Beginner',
      category: 'Language',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=english&backgroundColor=f59e0b',
      skills: ['Speaking', 'Pronunciation', 'Vocabulary', 'Grammar', 'Confidence']
    },
    {
      id: 'data-analysis-excel',
      title: 'Data Analysis with Microsoft Excel',
      description: 'Learn to analyze data effectively using Excel formulas, charts, and pivot tables.',
      instructor: 'Neha Gupta',
      duration: '4 weeks',
      lessons: 28,
      students: 9540,
      rating: 4.8,
      level: 'Intermediate',
      category: 'Data Analytics',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=excel&backgroundColor=ef4444',
      skills: ['Excel Formulas', 'Pivot Tables', 'Charts', 'Data Cleaning', 'Reports']
    },
    {
      id: 'web-development-intro',
      title: 'Introduction to Web Development',
      description: 'Start your web development journey with HTML, CSS, and basic JavaScript.',
      instructor: 'Rahul Singh',
      duration: '6 weeks',
      lessons: 42,
      students: 18730,
      rating: 4.9,
      level: 'Beginner',
      category: 'Web Development',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=webdev&backgroundColor=06b6d4',
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git']
    },
    {
      id: 'upsc-current-affairs',
      title: 'UPSC Current Affairs - Monthly Updates',
      description: 'Stay updated with current affairs essential for UPSC Civil Services examination.',
      instructor: 'Dr. Kavita Reddy',
      duration: 'Ongoing',
      lessons: 52,
      students: 25680,
      rating: 4.7,
      level: 'All Levels',
      category: 'Current Affairs',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=upsc&backgroundColor=84cc16',
      skills: ['Current Affairs', 'Analysis', 'General Studies', 'Updates', 'Preparation']
    },
    {
      id: 'graphic-design-basics',
      title: 'Graphic Design Basics with Canva',
      description: 'Create stunning graphics and designs using Canva for social media and marketing.',
      instructor: 'Pooja Patel',
      duration: '3 weeks',
      lessons: 21,
      students: 7320,
      rating: 4.5,
      level: 'Beginner',
      category: 'Design',
      image: 'https://api.dicebear.com/7.x/shapes/svg?seed=design&backgroundColor=ec4899',
      skills: ['Canva', 'Color Theory', 'Typography', 'Layout', 'Branding']
    }
  ];

  const benefits = [
    {
      icon: '🆓',
      title: 'Completely Free',
      description: 'Access high-quality education without any cost or hidden fees'
    },
    {
      icon: '📜',
      title: 'Certificates',
      description: 'Earn completion certificates to showcase your new skills'
    },
    {
      icon: '⏰',
      title: 'Self-Paced',
      description: 'Learn at your own pace with lifetime access to course materials'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and experienced educators'
    },
    {
      icon: '🤝',
      title: 'Community Support',
      description: 'Connect with fellow learners and get help from our community'
    },
    {
      icon: '📱',
      title: 'Mobile Learning',
      description: 'Access courses on any device - desktop, tablet, or mobile'
    }
  ];

  const stats = [
    { label: 'Free Courses', value: '25+', icon: '📚' },
    { label: 'Free Students', value: '120K+', icon: '👨‍🎓' },
    { label: 'Certificates Issued', value: '45K+', icon: '🏆' },
    { label: 'Success Stories', value: '8.5K+', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🆓 Free Courses
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Start your learning journey with our completely free courses. 
            No hidden costs, no credit card required - just pure learning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Learning Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View All Categories
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">✨ Why Choose Our Free Courses?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Courses Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 Popular Free Courses</h2>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>All Categories</option>
                <option>Programming</option>
                <option>Competitive Exams</option>
                <option>Marketing</option>
                <option>Language</option>
              </select>
              <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FREE
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-2 py-1 rounded text-xs">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>👨‍🏫 {course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>⏰ {course.duration}</span>
                    <span>📹 {course.lessons} lessons</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                        {course.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      👥 {course.students.toLocaleString()} students
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{course.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link to={`/course/${course.id}`}>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-medium">
                      Start Free Course
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">🌟 Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=student1&backgroundColor=b6e3f4"
                alt="Student"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rohit Sharma</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Software Developer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                "The free Python course helped me land my first developer job. The quality is amazing!"
              </p>
            </Card>
            
            <Card className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=student2&backgroundColor=fecaca"
                alt="Student"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Priya Patel</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Medical Student</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                "The NEET mathematics course gave me the foundation I needed. Highly recommended!"
              </p>
            </Card>
            
            <Card className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=student3&backgroundColor=e2e8f0"
                alt="Student"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Amit Kumar</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Digital Marketer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                "Started with free digital marketing course, now running my own agency!"
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning for Free?</h2>
          <p className="text-lg opacity-90 mb-6">
            Join over 120,000 students who have already started their learning journey with our free courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse All Free Courses
            </button>
            <Link to="/signup">
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Create Free Account
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FreeCourses;
