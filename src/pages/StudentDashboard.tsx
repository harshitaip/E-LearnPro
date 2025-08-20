import React, { useState } from 'react';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import Card from '../components/Card/Card';

const StudentDashboardPage: React.FC = () => {
  const { user, logout } = useDemoAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">This page is only accessible to students.</p>
        </div>
      </div>
    );
  }

  const enrolledCourses = [
    {
      id: 'jee-physics',
      title: 'JEE Physics - Mechanics',
      instructor: 'Harshita',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      nextLesson: 'Rotational Motion',
      thumbnail: '🔬'
    },
    {
      id: 'neet-chemistry',
      title: 'NEET Chemistry - Organic',
      instructor: 'Harshita',
      progress: 45,
      totalLessons: 60,
      completedLessons: 27,
      nextLesson: 'Hydrocarbons',
      thumbnail: '🧪'
    },
    {
      id: 'gate-cs',
      title: 'GATE Computer Science',
      instructor: 'Harshita',
      progress: 85,
      totalLessons: 80,
      completedLessons: 68,
      nextLesson: 'Graph Algorithms',
      thumbnail: '💻'
    },
    {
      id: 'web-dev-bootcamp',
      title: 'Full Stack Web Development',
      instructor: 'Harshita',
      progress: 92,
      totalLessons: 120,
      completedLessons: 110,
      nextLesson: 'React Hooks Advanced',
      thumbnail: '🌐'
    },
    {
      id: 'ml-fundamentals',
      title: 'Machine Learning Fundamentals',
      instructor: 'Harshita',
      progress: 60,
      totalLessons: 100,
      completedLessons: 60,
      nextLesson: 'Neural Networks',
      thumbnail: '🤖'
    },
    {
      id: 'android-development',
      title: 'Android App Development',
      instructor: 'Harshita',
      progress: 35,
      totalLessons: 90,
      completedLessons: 32,
      nextLesson: 'Kotlin Coroutines',
      thumbnail: '�'
    }
  ];

  const upcomingTests = [
    {
      id: '1',
      title: 'JEE Physics Mock Test - 3',
      date: '2025-08-20',
      duration: '3 hours',
      subjects: ['Mechanics', 'Thermodynamics']
    },
    {
      id: '2',
      title: 'NEET Chemistry Chapter Test',
      date: '2025-08-22',
      duration: '1.5 hours',
      subjects: ['Organic Chemistry']
    }
  ];

  const recentGrades = [
    {
      id: '1',
      testName: 'JEE Physics Mock Test - 2',
      score: 85,
      maxScore: 100,
      grade: 'A',
      date: '2025-08-15'
    },
    {
      id: '2',
      testName: 'NEET Biology Quiz',
      score: 92,
      maxScore: 100,
      grade: 'A+',
      date: '2025-08-12'
    },
    {
      id: '3',
      testName: 'GATE CS Practice Test',
      score: 78,
      maxScore: 100,
      grade: 'B+',
      date: '2025-08-10'
    }
  ];

  const studyStreaks = {
    current: 12,
    longest: 25,
    totalStudyHours: 156
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshita&backgroundColor=b6e3f4'}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200 dark:border-blue-600"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Student Dashboard - {user.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.department} • Student ID: {user.studentId}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'courses', label: 'My Courses', icon: '📚' },
              { id: 'tests', label: 'Tests & Grades', icon: '📝' },
              { id: 'progress', label: 'Progress', icon: '📈' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{enrolledCourses.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <span className="text-white text-xl">🔥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-green-600 dark:text-green-400">Study Streak</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">{studyStreaks.current} days</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <span className="text-white text-xl">⏱️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-600 dark:text-purple-400">Study Hours</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{studyStreaks.totalStudyHours}h</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-orange-600 dark:text-orange-400">Avg Score</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">85%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Current Courses Progress */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Progress</h3>
              <div className="space-y-4">
                {enrolledCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{course.thumbnail}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Next: {course.nextLesson}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Tests */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Tests</h3>
              <div className="space-y-3">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{test.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {test.date} • {test.duration} • {test.subjects.join(', ')}
                      </p>
                    </div>
                    <button 
                      onClick={() => window.open('/competitive-exams', '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Prepare
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{course.thumbnail}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">by {course.instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <p>Completed: {course.completedLessons}/{course.totalLessons} lessons</p>
                    <p>Next: {course.nextLesson}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => window.open('/courses', '_blank')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      Continue
                    </button>
                    <button 
                      onClick={() => window.open('/courses', '_blank')}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tests & Grades</h2>
            
            {/* Recent Grades */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Test Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentGrades.map((grade) => (
                      <tr key={grade.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {grade.testName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {grade.score}/{grade.maxScore}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            grade.grade.includes('A') 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : grade.grade.includes('B')
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}>
                            {grade.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {grade.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Streak:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studyStreaks.current} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Longest Streak:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studyStreaks.longest} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Study Hours:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studyStreaks.totalStudyHours} hours</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Trends</h3>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-gray-600 dark:text-gray-400">Your performance is trending upward!</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">+15% improvement this month</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h2>
            
            <Card>
              <div className="flex items-center mb-6">
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=student&backgroundColor=b6e3f4'}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Student ID: {user.studentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Academic Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Department:</span> {user.department}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Student ID:</span> {user.studentId}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Enrolled Courses:</span> {enrolledCourses.length}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Email:</span> {user.email}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Role:</span> Student</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
