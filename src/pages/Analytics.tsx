import React, { useState } from 'react';
import Card from '../components/Card/Card';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const timeRanges = [
    { id: 'week', label: 'Last Week' },
    { id: 'month', label: 'Last Month' },
    { id: 'quarter', label: 'Last Quarter' },
    { id: 'year', label: 'Last Year' }
  ];

  const metricCategories = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'courses', name: 'Course Performance', icon: '📚' },
    { id: 'students', name: 'Student Analytics', icon: '👨‍🎓' },
    { id: 'engagement', name: 'Engagement', icon: '💬' },
    { id: 'revenue', name: 'Revenue', icon: '💰' },
    { id: 'completion', name: 'Completion Rates', icon: '✅' }
  ];

  // Mock data - in real app this would come from API
  const overviewStats = {
    totalStudents: 45720,
    activeCourses: 156,
    completionRate: 87.5,
    averageRating: 4.6,
    totalRevenue: 2847500,
    newEnrollments: 1250,
    studyHours: 125400,
    certificatesIssued: 8940
  };

  const coursePerformance = [
    { name: 'Full Stack Development', enrollments: 2340, completion: 92, rating: 4.8, revenue: 468000 },
    { name: 'Data Science & ML', enrollments: 1890, completion: 89, rating: 4.9, revenue: 378000 },
    { name: 'UI/UX Design', enrollments: 1650, completion: 94, rating: 4.7, revenue: 330000 },
    { name: 'Digital Marketing', enrollments: 1420, completion: 86, rating: 4.6, revenue: 284000 },
    { name: 'Python Programming', enrollments: 2100, completion: 91, rating: 4.8, revenue: 420000 }
  ];

  const studentEngagement = {
    dailyActiveUsers: 12450,
    avgSessionDuration: '45 minutes',
    forumPosts: 3200,
    questionsAsked: 890,
    assignmentsSubmitted: 5670,
    peakLearningTime: '7-9 PM'
  };

  const getStatColor = (value: number, threshold: number) => {
    return value >= threshold ? 'text-green-600' : value >= threshold * 0.8 ? 'text-yellow-600' : 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📊 Learning Hub Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Comprehensive insights into platform performance and student engagement
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <label htmlFor="timeRange" className="sr-only">Select time range</label>
              <select 
                id="timeRange"
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                📥 Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {metricCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedMetric(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedMetric === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Overview Stats Grid */}
        {selectedMetric === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-3xl mb-2">👨‍🎓</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.totalStudents.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total Students</div>
                <div className="text-green-600 text-sm mt-2">↗️ +12% from last month</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.activeCourses}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Active Courses</div>
                <div className="text-blue-600 text-sm mt-2">↗️ +8 new this month</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.completionRate}%
                </div>
                <div className="text-gray-600 dark:text-gray-300">Completion Rate</div>
                <div className="text-green-600 text-sm mt-2">↗️ +2.3% improvement</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.averageRating}/5
                </div>
                <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
                <div className="text-green-600 text-sm mt-2">↗️ +0.1 from last month</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(overviewStats.totalRevenue)}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total Revenue</div>
                <div className="text-green-600 text-sm mt-2">↗️ +18% growth</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">🆕</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.newEnrollments.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">New Enrollments</div>
                <div className="text-blue-600 text-sm mt-2">This month</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.studyHours.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Study Hours</div>
                <div className="text-green-600 text-sm mt-2">↗️ +25% engagement</div>
              </Card>

              <Card className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewStats.certificatesIssued.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Certificates Issued</div>
                <div className="text-purple-600 text-sm mt-2">↗️ +15% completion</div>
              </Card>
            </div>
          </>
        )}

        {/* Course Performance */}
        {selectedMetric === 'courses' && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📚 Top Performing Courses
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Course Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Enrollments</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Completion %</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Rating</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{course.name}</td>
                      <td className="py-4 px-4 text-right text-gray-600 dark:text-gray-300">{course.enrollments.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-medium ${getStatColor(course.completion, 85)}`}>
                        {course.completion}%
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600 dark:text-gray-300">⭐ {course.rating}</td>
                      <td className="py-4 px-4 text-right font-medium text-green-600">{formatCurrency(course.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Student Engagement */}
        {selectedMetric === 'engagement' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Daily Active Users</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {studentEngagement.dailyActiveUsers.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300">Average per day</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Session Duration</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {studentEngagement.avgSessionDuration}
              </div>
              <p className="text-gray-600 dark:text-gray-300">Average per session</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Forum Activity</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {studentEngagement.forumPosts.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300">Posts this month</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Questions Asked</h3>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {studentEngagement.questionsAsked.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300">This month</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Assignments</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {studentEngagement.assignmentsSubmitted.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300">Submitted this month</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">🕰️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Peak Learning</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {studentEngagement.peakLearningTime}
              </div>
              <p className="text-gray-600 dark:text-gray-300">Most active hours</p>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📈 Analytics Insights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Make data-driven decisions with our comprehensive analytics dashboard. 
                Track student progress, course effectiveness, and business metrics in real-time.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Live updates on all metrics</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered recommendations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Tracking</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor platform growth</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button 
                  onClick={() => setSelectedMetric('courses')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  📊 Course Analytics
                </button>
                <button 
                  onClick={() => setSelectedMetric('students')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  📋 Student Reports
                </button>
                <button 
                  onClick={() => setSelectedMetric('engagement')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  🤖 Engagement Insights
                </button>
                <button 
                  onClick={() => window.open('/certificates', '_blank')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  🏆 Certificates Dashboard
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;