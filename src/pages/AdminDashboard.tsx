import React, { useState } from 'react';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import Card from '../components/Card/Card';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useDemoAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  const systemStats = {
    totalUsers: 2341,
    totalStudents: 1892,
    totalInstructors: 87,
    totalCourses: 156,
    totalRevenue: 8965000,
    activeUsers: 1456,
    coursesThisMonth: 23,
    newUsersThisMonth: 234
  };

  const recentUsers = [
    { id: '1', name: 'Harshita', email: 'raj@learninghub.edu', role: 'student', joinDate: '2025-08-15', status: 'active' },
    { id: '2', name: 'Harshita', email: 'priya@learninghub.edu', role: 'instructor', joinDate: '2025-08-14', status: 'active' },
    { id: '3', name: 'Harshita', email: 'arjun@learninghub.edu', role: 'student', joinDate: '2025-08-13', status: 'pending' },
    { id: '4', name: 'Harshita', email: 'amit@learninghub.edu', role: 'instructor', joinDate: '2025-08-12', status: 'active' }
  ];

  const recentCourses = [
    { id: '1', title: 'Advanced Machine Learning', instructor: 'Dr. Sarah Wilson', students: 45, status: 'published', date: '2025-08-16' },
    { id: '2', title: 'Web Development Bootcamp', instructor: 'Prof. John Doe', students: 78, status: 'pending', date: '2025-08-15' },
    { id: '3', title: 'Data Structures & Algorithms', instructor: 'Dr. Rakesh Verma', students: 123, status: 'published', date: '2025-08-14' }
  ];

  const platformMetrics = [
    { label: 'Course Completion Rate', value: '78%', trend: '+5%', color: 'green' },
    { label: 'Student Satisfaction', value: '4.6/5', trend: '+0.2', color: 'blue' },
    { label: 'Instructor Rating', value: '4.8/5', trend: '+0.1', color: 'purple' },
    { label: 'Platform Uptime', value: '99.9%', trend: '0%', color: 'gray' }
  ];

  const systemAlerts = [
    { id: '1', type: 'warning', message: 'Server maintenance scheduled for tomorrow at 2:00 AM', time: '2 hours ago' },
    { id: '2', type: 'info', message: 'New course approval pending: "Advanced React Patterns"', time: '4 hours ago' },
    { id: '3', type: 'success', message: 'Payment gateway integration completed successfully', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=ddd6fe'}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200 dark:border-indigo-600 shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard - {user.name}
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
              { id: 'users', label: 'User Management', icon: '👥' },
              { id: 'courses', label: 'Course Management', icon: '📚' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'settings', label: 'System Settings', icon: '⚙️' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
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
            {/* System Alerts */}
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">System Alerts</h3>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white text-sm">{alert.message}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Total Users</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{systemStats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-green-600 dark:text-green-400">Total Courses</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">{systemStats.totalCourses}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-600 dark:text-purple-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{(systemStats.totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-orange-600 dark:text-orange-400">Active Users</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{systemStats.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformMetrics.map((metric, index) => (
                <Card key={index}>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    <p className={`text-sm mt-1 ${
                      metric.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      metric.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      metric.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {metric.trend}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {recentUsers.map((userItem) => (
                    <div key={userItem.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{userItem.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{userItem.email} • {userItem.role}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        userItem.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                      }`}>
                        {userItem.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Courses</h3>
                <div className="space-y-3">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor} • {course.students} students</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === 'published' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New User
              </button>
            </div>
            
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{systemStats.totalStudents}</p>
                  <p className="text-gray-600 dark:text-gray-400">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{systemStats.totalInstructors}</p>
                  <p className="text-gray-600 dark:text-gray-400">Instructors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{systemStats.newUsersThisMonth}</p>
                  <p className="text-gray-600 dark:text-gray-400">New This Month</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent User Registrations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentUsers.map((userItem) => (
                      <tr key={userItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {userItem.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {userItem.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {userItem.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            userItem.status === 'active' 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                          }`}>
                            {userItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h2>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Review Pending Courses
              </button>
            </div>
            
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{systemStats.totalCourses}</p>
                  <p className="text-gray-600 dark:text-gray-400">Total Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{systemStats.coursesThisMonth}</p>
                  <p className="text-gray-600 dark:text-gray-400">New This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">2</p>
                  <p className="text-gray-600 dark:text-gray-400">Pending Approval</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Courses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Instructor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {course.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {course.instructor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {course.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            course.status === 'published' 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3">
                            {course.status === 'pending' ? 'Approve' : 'Edit'}
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Administrator Profile</h2>
            
            <Card>
              <div className="flex items-center mb-6">
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=ddd6fe'}
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
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Administrative Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Department:</span> {user.department}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Employee ID:</span> {user.employeeId}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Access Level:</span> System Administrator</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Total Users Managed:</span> {systemStats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">System Overview</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600 dark:text-gray-400">Platform Revenue:</span> ₹{(systemStats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Active Courses:</span> {systemStats.totalCourses}</p>
                    <p><span className="text-gray-600 dark:text-gray-400">Role:</span> Administrator</p>
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

export default AdminDashboard;
