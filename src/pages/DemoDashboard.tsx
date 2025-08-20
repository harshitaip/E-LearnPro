import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const DemoDashboard: React.FC = () => {
  const { user, logout } = useDemoAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user) {
    navigate('/demo-login');
    return null;
  }

  const getRoleDashboardRoute = () => {
    switch (user.role) {
      case 'student':
        return '/demo/student-dashboard';
      case 'instructor':
        return '/demo/instructor-dashboard';
      case 'admin':
        return '/demo/admin-dashboard';
      default:
        return '/demo-login';
    }
  };

  const getRoleStats = () => {
    switch (user.role) {
      case 'student':
        return [
          { label: 'Enrolled Courses', value: '18', color: 'text-blue-600', icon: '📚', change: '+3', trend: 'up' },
          { label: 'Completed', value: '12', color: 'text-green-600', icon: '✅', change: '+2', trend: 'up' },
          { label: 'In Progress', value: '6', color: 'text-orange-600', icon: '📖', change: '+1', trend: 'up' },
          { label: 'Average Grade', value: '92%', color: 'text-purple-600', icon: '⭐', change: '+2%', trend: 'up' },
          { label: 'Study Hours', value: '124', color: 'text-indigo-600', icon: '⏰', change: '+12', trend: 'up' },
          { label: 'Certificates', value: '8', color: 'text-pink-600', icon: '🏆', change: '+1', trend: 'up' },
        ];
      case 'instructor':
        return [
          { label: 'Active Courses', value: '8', color: 'text-blue-600', icon: '📚', change: '+2', trend: 'up' },
          { label: 'Total Students', value: '456', color: 'text-green-600', icon: '👨‍🎓', change: '+28', trend: 'up' },
          { label: 'Avg Rating', value: '4.8', color: 'text-purple-600', icon: '⭐', change: '+0.2', trend: 'up' },
          { label: 'Completion Rate', value: '89%', color: 'text-orange-600', icon: '📊', change: '+5%', trend: 'up' },
          { label: 'Monthly Revenue', value: '$8.2K', color: 'text-indigo-600', icon: '💰', change: '+12%', trend: 'up' },
          { label: 'Active Discussions', value: '23', color: 'text-pink-600', icon: '💬', change: '+7', trend: 'up' },
        ];
      case 'admin':
        return [
          { label: 'Total Users', value: '2,847', color: 'text-blue-600', icon: '👥', change: '+156', trend: 'up' },
          { label: 'Active Courses', value: '156', color: 'text-green-600', icon: '📚', change: '+12', trend: 'up' },
          { label: 'Monthly Revenue', value: '$47.2K', color: 'text-purple-600', icon: '💰', change: '+18%', trend: 'up' },
          { label: 'Platform Growth', value: '+24%', color: 'text-orange-600', icon: '📈', change: '+9%', trend: 'up' },
          { label: 'System Uptime', value: '99.9%', color: 'text-indigo-600', icon: '🚀', change: '0%', trend: 'stable' },
          { label: 'Support Tickets', value: '14', color: 'text-pink-600', icon: '🎫', change: '-3', trend: 'down' },
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'student':
        return [
          { label: 'Continue Learning', action: () => navigate('/courses'), color: 'bg-blue-600 hover:bg-blue-700', icon: '📚' },
          { label: 'Take Quiz', action: () => navigate('/quiz/demo-quiz'), color: 'bg-green-600 hover:bg-green-700', icon: '📝' },
          { label: 'View Progress', action: () => navigate('/demo/student-dashboard'), color: 'bg-purple-600 hover:bg-purple-700', icon: '📊' },
          { label: 'Join Discussion', action: () => navigate('/courses'), color: 'bg-orange-600 hover:bg-orange-700', icon: '💬' },
          { label: 'Download Certificate', action: () => navigate('/certificates'), color: 'bg-indigo-600 hover:bg-indigo-700', icon: '🏆' },
          { label: 'Study Schedule', action: () => navigate('/demo/student-dashboard'), color: 'bg-pink-600 hover:bg-pink-700', icon: '📅' },
        ];
      case 'instructor':
        return [
          { label: 'Manage Courses', action: () => navigate('/demo/instructor-dashboard'), color: 'bg-blue-600 hover:bg-blue-700', icon: '📚' },
          { label: 'View Students', action: () => navigate('/demo/instructor-dashboard'), color: 'bg-green-600 hover:bg-green-700', icon: '👨‍🎓' },
          { label: 'Create Content', action: () => navigate('/create-course'), color: 'bg-purple-600 hover:bg-purple-700', icon: '✏️' },
          { label: 'Analytics', action: () => navigate('/admin/analytics'), color: 'bg-orange-600 hover:bg-orange-700', icon: '📊' },
          { label: 'Grade Assignments', action: () => navigate('/demo/instructor-dashboard'), color: 'bg-indigo-600 hover:bg-indigo-700', icon: '📝' },
          { label: 'Live Session', action: () => navigate('/demo/instructor-dashboard'), color: 'bg-pink-600 hover:bg-pink-700', icon: '📹' },
        ];
      case 'admin':
        return [
          { label: 'User Management', action: () => navigate('/demo/admin-dashboard'), color: 'bg-blue-600 hover:bg-blue-700', icon: '👥' },
          { label: 'System Analytics', action: () => navigate('/admin/analytics'), color: 'bg-green-600 hover:bg-green-700', icon: '📊' },
          { label: 'Course Approval', action: () => navigate('/demo/admin-dashboard'), color: 'bg-purple-600 hover:bg-purple-700', icon: '✅' },
          { label: 'Financial Reports', action: () => navigate('/admin/analytics'), color: 'bg-orange-600 hover:bg-orange-700', icon: '💰' },
          { label: 'System Settings', action: () => navigate('/demo/admin-dashboard'), color: 'bg-indigo-600 hover:bg-indigo-700', icon: '⚙️' },
          { label: 'Support Center', action: () => navigate('/help-center'), color: 'bg-pink-600 hover:bg-pink-700', icon: '🎫' },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (user.role) {
      case 'student':
        return [
          { activity: 'Completed "React Fundamentals" quiz', time: '2 hours ago', icon: '✅' },
          { activity: 'Started "Advanced JavaScript" course', time: '5 hours ago', icon: '📚' },
          { activity: 'Earned "Web Development" certificate', time: '1 day ago', icon: '🏆' },
          { activity: 'Joined study group discussion', time: '2 days ago', icon: '💬' },
          { activity: 'Submitted final project', time: '3 days ago', icon: '📝' },
        ];
      case 'instructor':
        return [
          { activity: 'Published new course "AI Basics"', time: '1 hour ago', icon: '📚' },
          { activity: 'Graded 15 assignments', time: '3 hours ago', icon: '📝' },
          { activity: 'Hosted live Q&A session', time: '6 hours ago', icon: '📹' },
          { activity: 'Updated course materials', time: '1 day ago', icon: '✏️' },
          { activity: 'Responded to student queries', time: '2 days ago', icon: '💬' },
        ];
      case 'admin':
        return [
          { activity: 'Approved 5 new courses', time: '30 min ago', icon: '✅' },
          { activity: 'Generated monthly reports', time: '2 hours ago', icon: '📊' },
          { activity: 'Updated system settings', time: '4 hours ago', icon: '⚙️' },
          { activity: 'Resolved 8 support tickets', time: '1 day ago', icon: '🎫' },
          { activity: 'Added new instructor accounts', time: '2 days ago', icon: '👥' },
        ];
      default:
        return [];
    }
  };

  const getUpcomingEvents = () => {
    switch (user.role) {
      case 'student':
        return [
          { event: 'JavaScript Quiz Due', time: 'Tomorrow 2:00 PM', type: 'assignment' },
          { event: 'Study Group Meeting', time: 'Wed 6:00 PM', type: 'meeting' },
          { event: 'React Workshop', time: 'Fri 10:00 AM', type: 'workshop' },
          { event: 'Project Submission', time: 'Mon 11:59 PM', type: 'deadline' },
        ];
      case 'instructor':
        return [
          { event: 'Live Coding Session', time: 'Today 3:00 PM', type: 'session' },
          { event: 'Assignment Grading Due', time: 'Tomorrow 5:00 PM', type: 'deadline' },
          { event: 'Faculty Meeting', time: 'Thu 2:00 PM', type: 'meeting' },
          { event: 'Course Content Review', time: 'Fri 9:00 AM', type: 'review' },
        ];
      case 'admin':
        return [
          { event: 'Monthly Revenue Review', time: 'Today 4:00 PM', type: 'meeting' },
          { event: 'System Maintenance', time: 'Sat 2:00 AM', type: 'maintenance' },
          { event: 'Board Presentation', time: 'Next Tue 10:00 AM', type: 'presentation' },
          { event: 'Q3 Planning Session', time: 'Next Wed 9:00 AM', type: 'planning' },
        ];
      default:
        return [];
    }
  };

  const roleStats = getRoleStats();
  const quickActions = getQuickActions();
  const recentActivity = getRecentActivity();
  const upcomingEvents = getUpcomingEvents();

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.role}&backgroundColor=ddd6fe`}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-3xl font-bold">
                  {getGreeting()}, {user.name}! 👋
                </h1>
                <p className="text-blue-100 font-medium">
                  {user.department} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  {user.employeeId && ` • ID: ${user.employeeId}`}
                  {user.studentId && ` • ID: ${user.studentId}`}
                </p>
                <p className="text-blue-200 text-sm">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => navigate(getRoleDashboardRoute())}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                🚀 Launch {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                🚪 Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'activity', label: 'Recent Activity', icon: '📋' },
              { id: 'schedule', label: 'Schedule', icon: '📅' },
              { id: 'features', label: 'Platform Features', icon: '✨' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {roleStats.map((stat) => (
                <Card key={`stat-${stat.label}`} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                        <div className="text-2xl">{stat.icon}</div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <div className={`text-right ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      <div className="text-xs font-medium">
                        {stat.trend === 'up' ? '↗️' : stat.trend === 'down' ? '↘️' : '➡️'} {stat.change}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="mr-2">⚡</span>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={`action-${action.label}`}
                      onClick={action.action}
                      className={`justify-start ${action.color} text-white h-12`}
                    >
                      <span className="mr-2">{action.icon}</span>
                      {action.label}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="mr-2">📈</span>
                  Performance Overview
                </h3>
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Interactive charts and analytics coming soon
                    </p>
                    <Button
                      onClick={() => navigate('/admin/analytics')}
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📋</span>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.activity}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📅</span>
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'assignment' ? 'bg-red-500' :
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'workshop' ? 'bg-green-500' :
                      event.type === 'deadline' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {event.event}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'assignment' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    event.type === 'workshop' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    event.type === 'deadline' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <>
            {/* Platform Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="mr-2">✨</span>
                  Platform Features
                </h3>
                <div className="space-y-4">
                  {[
                    { feature: 'Full Role Experience', description: 'Experience the platform from your role\'s perspective', icon: '🎭' },
                    { feature: 'Interactive Content', description: 'Engage with courses, quizzes, and learning materials', icon: '🎮' },
                    { feature: 'Real-time Analytics', description: 'View progress tracking and performance metrics', icon: '📊' },
                    { feature: 'Multi-role Access', description: 'Switch between different user roles seamlessly', icon: '🔄' },
                    { feature: 'Professional Tools', description: 'Access all features with comprehensive data', icon: '🎬' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.feature}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Role Navigation */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="mr-2">🎯</span>
                  Explore Different Roles
                </h3>
                <div className="space-y-4">
                  <Button
                    onClick={() => navigate('/demo/student-dashboard')}
                    className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-start space-x-4"
                  >
                    <div className="text-2xl">🎓</div>
                    <div className="text-left">
                      <div className="font-semibold">Student Experience</div>
                      <div className="text-blue-100 text-sm">Course enrollment, progress tracking, certificates</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/demo/instructor-dashboard')}
                    className="w-full h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-start space-x-4"
                  >
                    <div className="text-2xl">👩‍🏫</div>
                    <div className="text-left">
                      <div className="font-semibold">Instructor Tools</div>
                      <div className="text-green-100 text-sm">Course creation, student management, analytics</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/demo/admin-dashboard')}
                    className="w-full h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex items-center justify-start space-x-4"
                  >
                    <div className="text-2xl">📊</div>
                    <div className="text-left">
                      <div className="font-semibold">Admin Panel</div>
                      <div className="text-purple-100 text-sm">User management, system analytics, platform control</div>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Platform Overview */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-2">🏢</span>
                Learning Hub - IIT Patna Platform Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Students</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Access to premium courses, progress tracking, certificates, and peer collaboration
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl mb-2">👩‍🏫</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Instructors</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Course creation tools, student analytics, content management, and revenue tracking
                  </p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Administrators</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Platform management, user oversight, system analytics, and business intelligence
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DemoDashboard;
