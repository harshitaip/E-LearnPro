import React, { useState } from 'react';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

const DemoLogin: React.FC = () => {
  const { login } = useDemoAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const userAccounts = [
    {
      role: 'student' as const,
      name: 'Harshita',
      email: 'student@learninghub.edu',
      password: 'student123',
      avatar: '👨‍🎓',
      description: 'Computer Science Engineering Student',
      features: [
        '✅ Access to 25+ premium courses',
        '📊 Real-time progress tracking',
        '🏆 Certificate generation system',
        '🎯 Interactive quizzes & assignments',
        '💬 Discussion forums & peer chat',
        '📱 Mobile-friendly learning app',
        '🔔 Smart notifications & reminders'
      ],
      stats: {
        'Enrolled Courses': '18',
        'Completed': '12',
        'Certificates': '8',
        'Study Hours': '156hrs'
      },
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-300',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      role: 'instructor' as const,
      name: 'Harshita',
      email: 'instructor@learninghub.edu',
      password: 'instructor123',
      avatar: '👩‍🏫',
      description: 'Senior Software Engineer & Educator',
      features: [
        '🎥 Create & manage unlimited courses',
        '📹 HD video lecture uploads',
        '📈 Advanced student analytics',
        '📝 Assignment creation & auto-grading',
        '🎤 Live session hosting & recording',
        '💰 Revenue tracking & payouts',
        '⭐ Student feedback & ratings'
      ],
      stats: {
        'Courses Created': '15',
        'Total Students': '3.2K',
        'Avg Rating': '4.8★',
        'Monthly Revenue': '$4.5K'
      },
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-700 dark:text-green-300',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      role: 'admin' as const,
      name: 'Harshita',
      email: 'admin@learninghub.edu',
      password: 'admin123',
      avatar: '👑',
      description: 'Platform Administrator & Analytics Manager',
      features: [
        '👥 Complete user management system',
        '📋 Course approval & content review',
        '📊 Advanced platform analytics',
        '⚙️ System configuration & settings',
        '💳 Payment processing & revenue reports',
        '🔒 Security monitoring & user safety',
        '🎯 Marketing campaigns & promotions'
      ],
      stats: {
        'Total Users': '18.5K',
        'Active Courses': '387',
        'Monthly Revenue': '$58.3K',
        'System Uptime': '99.9%'
      },
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-300',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const handlePlatformLogin = async (account: typeof userAccounts[0]) => {
    setIsLoading(true);
    try {
      const success = await login(account.email, account.password);
      if (success) {
        // Navigate to demo dashboard
        navigate('/demo/dashboard');
      }
    } catch (error) {
      console.error('Platform login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎓 Learning Hub Platform Access
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-4xl mx-auto">
            Experience our complete e-learning platform with professional accounts featuring premium courses, advanced analytics, and full platform functionality
          </p>
          
          {/* Key Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <div className="font-semibold text-sm">No Registration Required</div>
                <div className="text-xs opacity-90">Instant Access!</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold text-sm">Pre-loaded with Data</div>
                <div className="text-xs opacity-90">Realistic Progress & Stats</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-sm">Full Functionality</div>
                <div className="text-xs opacity-90">Complete Platform Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Accounts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {userAccounts.map((account) => (
            <Card key={account.role} className={`${account.bgColor} ${account.borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{account.avatar}</div>
                <h3 className={`text-xl font-bold ${account.textColor} mb-2`}>
                  {account.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {account.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border">
                  {account.role.charAt(0).toUpperCase() + account.role.slice(1)} Access
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
                  🚀 Key Features Available:
                </h4>
                <ul className="space-y-2">
                  {account.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-xs mr-2 mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Statistics */}
              <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
                  📊 Account Statistics:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(account.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
                      <div className={`text-lg font-bold ${account.textColor}`}>{value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div className="mb-6 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-xs">
                  Login Credentials:
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div><strong>Email:</strong> {account.email}</div>
                  <div><strong>Password:</strong> {account.password}</div>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={() => handlePlatformLogin(account)}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${account.buttonColor} shadow-lg hover:shadow-xl`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  `🚀 Login as ${account.role.charAt(0).toUpperCase() + account.role.slice(1)}`
                )}
              </button>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About Learning Platform */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              What You Can Explore
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">📚</span>
                Complete course catalog with 25+ premium courses
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-0.5">📊</span>
                Interactive learning dashboard with progress tracking
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-0.5">🎯</span>
                Competitive exam preparation modules
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">⚡</span>
                Professional skill development tracks
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-0.5">📈</span>
                Advanced analytics and performance insights
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2 mt-0.5">📱</span>
                Responsive design optimized for all devices
              </li>
            </ul>
          </div>

          {/* Technical Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Technical Highlights
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">⚛️</span>
                Built with React 19+ & TypeScript for type safety
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2 mt-0.5">🎨</span>
                Modern Tailwind CSS styling framework
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-0.5">🧩</span>
                Component-based modular architecture
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2 mt-0.5">🌙</span>
                Dark/Light mode with system preference sync
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-0.5">📱</span>
                Mobile-first responsive design approach
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">🏗️</span>
                Professional enterprise-grade code structure
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Demo Tour */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🚀 Quick Demo Tour Available
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Not sure where to start? Take our guided tour to explore key features and see the platform in action!
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/courses')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                Browse Courses
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Explore our course catalog
              </div>
            </button>
            
            <button
              onClick={() => navigate('/competitive-exams')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                Exam Prep Hub
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Competitive exam preparation
              </div>
            </button>
            
            <button
              onClick={() => navigate('/certificates')}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                Certificates
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Generate & verify certificates
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🧭 Explore Learning Hub Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/courses')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Course Catalog</div>
            </button>
            
            <button
              onClick={() => navigate('/competitive-exams')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Competitive Exams</div>
            </button>
            
            <button
              onClick={() => navigate('/skill-development')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Skill Development</div>
            </button>
            
            <button
              onClick={() => navigate('/certificates')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Certificates</div>
            </button>
            
            <button
              onClick={() => navigate('/admin/analytics')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Analytics</div>
            </button>
            
            <button
              onClick={() => navigate('/about')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">About Us</div>
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">📞</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Contact</div>
            </button>
            
            <button
              onClick={() => navigate('/help')}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">❓</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Help Center</div>
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-6 py-3"
            >
              ← Back to Home
            </Button>
            <Button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              🔐 Regular Login
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outline"
              className="px-6 py-3 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              📝 Create Account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            🎓 Learning Hub - IIT Patna • Empowering Education Through Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
