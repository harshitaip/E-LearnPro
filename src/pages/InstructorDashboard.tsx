import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import Card from '../components/Card/Card';

const InstructorDashboardPage: React.FC = () => {
  const { user, logout } = useDemoAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'instructor') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">This page is only accessible to instructors.</p>
        </div>
      </div>
    );
  }

  const createdCourses = [
    {
      id: 'jee-physics',
      title: 'JEE Physics - Mechanics',
      students: 485,
      revenue: 145500,
      rating: 4.8,
      totalRatings: 156,
      published: true,
      lastUpdated: '2025-08-10',
      thumbnail: '🔬'
    },
    {
      id: 'gate-physics',
      title: 'GATE Physics Complete Course',
      students: 312,
      revenue: 93600,
      rating: 4.7,
      totalRatings: 98,
      published: true,
      lastUpdated: '2025-08-05',
      thumbnail: '⚛️'
    },
    {
      id: 'engineering-mechanics',
      title: 'Engineering Mechanics Fundamentals',
      students: 78,
      revenue: 23400,
      rating: 4.6,
      totalRatings: 34,
      published: false,
      lastUpdated: '2025-08-15',
      thumbnail: '⚙️'
    }
  ];

  const monthlyStats = {
    totalRevenue: 262500,
    totalStudents: 875,
    avgRating: 4.7,
    coursesPublished: 2
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor&backgroundColor=e2e8f0'}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200 dark:border-blue-600 shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Instructor Dashboard - {user.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {user.department} • Employee ID: {user.employeeId}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
              { id: 'students', label: 'Students', icon: '👥' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
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
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-green-600 dark:text-green-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹{monthlyStats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Total Students</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{monthlyStats.totalStudents}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Average Rating</p>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{monthlyStats.avgRating}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-600 dark:text-purple-400">Published Courses</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{monthlyStats.coursesPublished}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* My Courses */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {createdCourses.filter(course => course.published).slice(0, 2).map((course) => (
                  <div key={course.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{course.thumbnail}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.students} students enrolled</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Revenue</p>
                        <p className="font-semibold text-gray-900 dark:text-white">₹{course.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Rating</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{course.rating} ⭐</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
              <button 
                onClick={() => navigate('/instructor/courses/new')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Create New Course
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{course.thumbnail}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <p>👥 {course.students} students</p>
                    <p>💰 ₹{course.revenue.toLocaleString()} revenue</p>
                    <p>⭐ {course.rating} ({course.totalRatings} ratings)</p>
                    <p>📅 Updated: {course.lastUpdated}</p>
                  </div>

                  <div className={`mb-4 px-2 py-1 text-xs font-semibold rounded-full w-fit ${
                    course.published 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}>
                    {course.published ? 'Published' : 'Draft'}
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => window.open('/instructor/courses', '_blank')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      Manage Courses
                    </button>
                    <button 
                      onClick={() => window.open('/admin/analytics', '_blank')}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      View Stats
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Instructor Profile</h2>
            
            <Card>
              <div className="flex items-center mb-6">
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor&backgroundColor=e2e8f0'}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Employee ID: {user.employeeId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Professional Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Department:</span> {user.department}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Employee ID:</span> {user.employeeId}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Courses Created:</span> {createdCourses.length}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Total Students:</span> {monthlyStats.totalStudents}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Average Rating:</span> {monthlyStats.avgRating} ⭐</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Total Revenue:</span> ₹{monthlyStats.totalRevenue.toLocaleString()}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Role:</span> Instructor</p>
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

export default InstructorDashboardPage;
