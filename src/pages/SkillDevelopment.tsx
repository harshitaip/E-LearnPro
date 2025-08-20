import React, { useState } from 'react';
import Card from '../components/Card/Card';

const SkillDevelopment: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState('All');

  const skillDomains = [
    { id: 'All', name: 'All Skills', icon: '🎯' },
    { id: 'Programming', name: 'Programming', icon: '💻' },
    { id: 'DataScience', name: 'Data Science', icon: '📊' },
    { id: 'Design', name: 'Design', icon: '🎨' },
    { id: 'Business', name: 'Business', icon: '💼' },
    { id: 'Marketing', name: 'Digital Marketing', icon: '📱' },
    { id: 'Communication', name: 'Communication', icon: '🗣️' },
    { id: 'Leadership', name: 'Leadership', icon: '👑' },
    { id: 'Finance', name: 'Finance', icon: '💰' }
  ];

  const skillCourses = [
    {
      id: '1',
      title: 'Full Stack Web Development',
      domain: 'Programming',
      description: 'Master modern web development with React, Node.js, and databases',
      level: 'Intermediate',
      duration: '12 weeks',
      skillsGained: ['React.js', 'Node.js', 'MongoDB', 'JavaScript ES6+', 'RESTful APIs'],
      learningPath: ['HTML/CSS Basics', 'JavaScript Fundamentals', 'React Development', 'Backend with Node.js', 'Database Integration', 'Deployment'],
      prerequisites: 'Basic programming knowledge',
      certificationAvailable: true,
      rating: 4.8,
      enrolledStudents: 15420,
      instructorExperience: '8+ years',
      projectsIncluded: 5,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Data Science & Machine Learning',
      domain: 'DataScience',
      description: 'Learn to extract insights from data using Python, ML algorithms, and statistical analysis',
      level: 'Advanced',
      duration: '16 weeks',
      skillsGained: ['Python', 'Machine Learning', 'Data Visualization', 'Statistics', 'Deep Learning'],
      learningPath: ['Python Programming', 'Statistics & Probability', 'Data Manipulation', 'Machine Learning', 'Deep Learning', 'Real-world Projects'],
      prerequisites: 'Mathematics and basic programming',
      certificationAvailable: true,
      rating: 4.9,
      enrolledStudents: 12850,
      instructorExperience: '10+ years',
      projectsIncluded: 8,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'UI/UX Design Mastery',
      domain: 'Design',
      description: 'Create beautiful and user-friendly interfaces with modern design principles',
      level: 'Beginner to Advanced',
      duration: '10 weeks',
      skillsGained: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      learningPath: ['Design Fundamentals', 'User Research', 'Wireframing', 'Visual Design', 'Prototyping', 'Usability Testing'],
      prerequisites: 'No prior experience required',
      certificationAvailable: true,
      rating: 4.7,
      enrolledStudents: 9650,
      instructorExperience: '6+ years',
      projectsIncluded: 6,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      domain: 'Marketing',
      description: 'Build comprehensive digital marketing campaigns across all channels',
      level: 'Intermediate',
      duration: '8 weeks',
      skillsGained: ['SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'Email Marketing'],
      learningPath: ['Digital Marketing Fundamentals', 'SEO Optimization', 'Social Media Strategy', 'Content Creation', 'Paid Advertising', 'Analytics & ROI'],
      prerequisites: 'Basic marketing knowledge',
      certificationAvailable: true,
      rating: 4.6,
      enrolledStudents: 8750,
      instructorExperience: '7+ years',
      projectsIncluded: 4,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Leadership & Management Excellence',
      domain: 'Leadership',
      description: 'Develop essential leadership skills for modern workplace success',
      level: 'Intermediate',
      duration: '6 weeks',
      skillsGained: ['Team Management', 'Strategic Thinking', 'Communication', 'Conflict Resolution', 'Performance Management'],
      learningPath: ['Leadership Fundamentals', 'Team Building', 'Strategic Planning', 'Communication Skills', 'Performance Management', 'Change Management'],
      prerequisites: 'Some management experience preferred',
      certificationAvailable: true,
      rating: 4.8,
      enrolledStudents: 6420,
      instructorExperience: '12+ years',
      projectsIncluded: 3,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: 'Financial Planning & Analysis',
      domain: 'Finance',
      description: 'Master financial modeling, budgeting, and investment analysis',
      level: 'Advanced',
      duration: '14 weeks',
      skillsGained: ['Financial Modeling', 'Excel Advanced', 'Investment Analysis', 'Risk Management', 'Corporate Finance'],
      learningPath: ['Financial Fundamentals', 'Excel for Finance', 'Financial Modeling', 'Investment Analysis', 'Risk Assessment', 'Strategic Finance'],
      prerequisites: 'Basic accounting knowledge',
      certificationAvailable: true,
      rating: 4.7,
      enrolledStudents: 5230,
      instructorExperience: '15+ years',
      projectsIncluded: 7,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    }
  ];

  const filteredCourses = selectedDomain === 'All' 
    ? skillCourses 
    : skillCourses.filter(course => course.domain === selectedDomain);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
      case 'Beginner to Advanced':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🚀 Skill Development Hub
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Advance your career with in-demand skills. From programming to leadership, 
            our expert-led courses help you stay ahead in the rapidly evolving job market.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">🎯 Industry-Relevant Skills</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">📜 Professional Certificates</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">💼 Career Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Domain Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore by Domain</h2>
          <div className="flex flex-wrap gap-3">
            {skillDomains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDomain === domain.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{domain.icon}</span>
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              {/* Course Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">{course.title}</h3>
                  <p className="text-gray-200 text-sm">{course.domain}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                    <p className="text-gray-600 dark:text-gray-400">{course.duration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Projects:</span>
                    <p className="text-gray-600 dark:text-gray-400">{course.projectsIncluded} hands-on</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Rating:</span>
                    <p className="text-gray-600 dark:text-gray-400">⭐ {course.rating}/5</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Students:</span>
                    <p className="text-gray-600 dark:text-gray-400">{course.enrolledStudents.toLocaleString()}</p>
                  </div>
                </div>

                {/* Skills Gained */}
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">Skills You'll Gain:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {course.skillsGained.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skillsGained.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{course.skillsGained.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Prerequisites:</span>
                  <p className="text-gray-600 dark:text-gray-400">{course.prerequisites}</p>
                </div>

                {/* Certification Badge */}
                {course.certificationAvailable && (
                  <div className="flex items-center justify-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      📜 Professional Certificate Available
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    🚀 Enroll Now
                  </button>
                  <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    📋 View Syllabus
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Learning Path Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🎯 Personalized Learning Paths
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Not sure where to start? Our AI-powered learning paths recommend the perfect sequence of courses based on your career goals and current skill level.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Goal Assessment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Define your career objectives</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🛤️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Path</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get personalized course recommendations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your skill development</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Create My Learning Path
                </button>
                <button className="bg-white dark:bg-gray-800 border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                  Take Skills Assessment
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopment;