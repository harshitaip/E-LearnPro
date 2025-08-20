import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const InstructorCourses: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'published' | 'draft' | 'analytics'>('published');

  const publishedCourses = [
    {
      id: '1',
      title: 'Full Stack Web Development',
      students: 234,
      rating: 4.8,
      revenue: '$12,340',
      status: 'Active',
      lastUpdated: '2024-02-15',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'React & TypeScript Mastery',
      students: 189,
      rating: 4.9,
      revenue: '$8,950',
      status: 'Active',
      lastUpdated: '2024-02-10',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f59324e8b76b?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      students: 156,
      rating: 4.7,
      revenue: '$6,780',
      status: 'Active',
      lastUpdated: '2024-01-28',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop'
    }
  ];

  const draftCourses = [
    {
      id: '4',
      title: 'Advanced Python Programming',
      progress: 75,
      estimatedCompletion: '2024-03-15',
      modules: 12,
      completedModules: 9
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      progress: 45,
      estimatedCompletion: '2024-04-01',
      modules: 15,
      completedModules: 7
    }
  ];

  const tabs = [
    { id: 'published', name: 'Published Courses', icon: '📚', count: publishedCourses.length },
    { id: 'draft', name: 'Draft Courses', icon: '📝', count: draftCourses.length },
    { id: 'analytics', name: 'Course Analytics', icon: '📊', count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Courses
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Manage your courses, track performance, and create new content
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button
                onClick={() => navigate('/instructor/courses/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                ➕ Create New Course
              </Button>
              <Button
                onClick={() => navigate('/admin/analytics')}
                variant="outline"
              >
                📊 View Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {publishedCourses.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Published Courses</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {publishedCourses.reduce((sum, course) => sum + course.students, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Students</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {(publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length).toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $27K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Revenue</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Published Courses */}
        {activeTab === 'published' && (
          <div className="space-y-4">
            {publishedCourses.map((course) => (
              <Card key={course.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>👨‍🎓 {course.students} students</span>
                        <span>⭐ {course.rating}</span>
                        <span>💰 {course.revenue}</span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                          {course.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {course.lastUpdated}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      👁️ View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/admin/analytics')}
                    >
                      📊 Stats
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Draft Courses */}
        {activeTab === 'draft' && (
          <div className="space-y-4">
            {draftCourses.map((course) => (
              <Card key={course.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <div className="mt-2">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <span>📚 {course.completedModules}/{course.modules} modules</span>
                        <span>📅 Est. completion: {course.estimatedCompletion}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`bg-blue-600 h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}
                    >
                      ✏️ Continue Editing
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      👁️ Preview
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {draftCourses.length === 0 && (
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Draft Courses
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Start creating your next amazing course
                </p>
                <Button onClick={() => navigate('/instructor/courses/new')}>
                  ➕ Create New Course
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Course Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Detailed analytics for individual courses
            </p>
            <Button onClick={() => navigate('/admin/analytics')}>
              📈 View Full Analytics
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;
