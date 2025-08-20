import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';

const Categories: React.FC = () => {
  const mainCategories = [
    {
      id: 'competitive-exams',
      title: 'Competitive Exams',
      description: 'Comprehensive preparation for Indian competitive examinations',
      icon: '🎯',
      courseCount: 45,
      color: 'from-blue-500 to-blue-600',
      subcategories: ['JEE Main & Advanced', 'NEET', 'UPSC CSE', 'GATE', 'Bank PO', 'SSC CGL']
    },
    {
      id: 'programming',
      title: 'Programming & Development',
      description: 'Learn modern programming languages and development frameworks',
      icon: '💻',
      courseCount: 38,
      color: 'from-green-500 to-green-600',
      subcategories: ['Python', 'JavaScript', 'React', 'Node.js', 'Java', 'Data Structures']
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      description: 'Master data analysis, machine learning, and AI technologies',
      icon: '📊',
      courseCount: 22,
      color: 'from-purple-500 to-purple-600',
      subcategories: ['Python for Data Science', 'Machine Learning', 'Statistics', 'Excel', 'SQL', 'Power BI']
    },
    {
      id: 'business',
      title: 'Business & Management',
      description: 'Develop essential business skills and leadership capabilities',
      icon: '💼',
      courseCount: 28,
      color: 'from-orange-500 to-orange-600',
      subcategories: ['Digital Marketing', 'Finance', 'Leadership', 'Project Management', 'Entrepreneurship', 'Strategy']
    },
    {
      id: 'design',
      title: 'Design & Creative',
      description: 'Explore visual design, UX/UI, and creative technologies',
      icon: '🎨',
      courseCount: 19,
      color: 'from-pink-500 to-pink-600',
      subcategories: ['UI/UX Design', 'Graphic Design', 'Adobe Suite', 'Figma', 'Web Design', 'Animation']
    },
    {
      id: 'languages',
      title: 'Languages & Communication',
      description: 'Improve communication skills and learn new languages',
      icon: '🗣️',
      courseCount: 15,
      color: 'from-teal-500 to-teal-600',
      subcategories: ['English Speaking', 'Business English', 'Hindi', 'German', 'Spanish', 'Public Speaking']
    }
  ];

  const examCategories = [
    {
      name: 'Engineering Entrance',
      exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'],
      icon: '⚙️',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Medical Entrance',
      exams: ['NEET', 'AIIMS', 'JIPMER', 'NEET PG', 'INI CET'],
      icon: '🏥',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Civil Services',
      exams: ['UPSC CSE', 'State PSC', 'CAPF', 'CDS', 'NDA'],
      icon: '🏛️',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Banking & Finance',
      exams: ['SBI PO', 'IBPS PO', 'RBI Grade B', 'LIC AAO', 'SEBI Grade A'],
      icon: '🏦',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Railway Exams',
      exams: ['RRB NTPC', 'RRB JE', 'RRB Group D', 'RRB ALP', 'RPF'],
      icon: '🚂',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      name: 'Teaching Exams',
      exams: ['CTET', 'DSSSB', 'KVS PGT', 'NVS TGT', 'UGC NET'],
      icon: '👨‍🏫',
      color: 'bg-red-100 text-red-800'
    }
  ];

  const skillCategories = [
    {
      name: 'Digital Marketing',
      skills: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing'],
      demand: 'High',
      avgSalary: '₹3-8 LPA'
    },
    {
      name: 'Web Development',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      demand: 'Very High',
      avgSalary: '₹4-12 LPA'
    },
    {
      name: 'Data Analytics',
      skills: ['Excel', 'SQL', 'Python', 'Tableau', 'Statistics'],
      demand: 'High',
      avgSalary: '₹5-15 LPA'
    },
    {
      name: 'Graphic Design',
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'UI Design'],
      demand: 'Medium',
      avgSalary: '₹2-6 LPA'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            📚 Course Categories
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover courses across diverse categories - from competitive exam preparation 
            to modern tech skills and professional development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">🎯 Popular Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainCategories.map((category) => (
              <Link key={category.id} to={`/courses?category=${category.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{category.courseCount}</div>
                        <div className="text-sm opacity-90">Courses</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Competitive Exams Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">🏆 Competitive Exam Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examCategories.map((exam, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{exam.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exam.name}</h3>
                </div>
                <div className="space-y-2">
                  {exam.exams.map((examName, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{examName}</span>
                      <span className={`px-2 py-1 rounded text-xs ${exam.color}`}>
                        Available
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to={`/courses?exam=${exam.name.toLowerCase().replace(' ', '-')}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                      View Courses
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Skill-Based Learning */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">💼 In-Demand Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-green-600 dark:text-green-400">Demand: {skill.demand}</span>
                    <span className="text-blue-600 dark:text-blue-400">{skill.avgSalary}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {skill.skills.map((skillName, idx) => (
                    <div key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs text-center">
                      {skillName}
                    </div>
                  ))}
                </div>
                <Link to={`/courses?skill=${skill.name.toLowerCase().replace(' ', '-')}`}>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">📊 Our Learning Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">167+</div>
              <div className="text-gray-600 dark:text-gray-400">Total Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">25+</div>
              <div className="text-gray-600 dark:text-gray-400">Exam Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">99%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg opacity-90 mb-6">
            Choose from over 167 courses across multiple categories and start building your future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse All Courses
              </button>
            </Link>
            <Link to="/free-courses">
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Try Free Courses
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
