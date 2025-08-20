import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';

const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 45 },
    { id: 'account', name: 'Account & Login', icon: '👤', count: 12 },
    { id: 'courses', name: 'Courses & Learning', icon: '🎓', count: 15 },
    { id: 'certificates', name: 'Certificates', icon: '🏆', count: 8 },
    { id: 'payments', name: 'Payments & Billing', icon: '💳', count: 6 },
    { id: 'technical', name: 'Technical Issues', icon: '🔧', count: 4 }
  ];

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of our homepage. Fill in your details including name, email, and password. You\'ll receive a verification email to activate your account.',
      popular: true
    },
    {
      id: 2,
      category: 'account',
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
      popular: true
    },
    {
      id: 3,
      category: 'courses',
      question: 'How do I enroll in a course?',
      answer: 'Browse our course catalog, click on the course you\'re interested in, and click the "Enroll Now" button. For paid courses, you\'ll need to complete the payment process. Free courses can be accessed immediately after enrollment.',
      popular: true
    },
    {
      id: 4,
      category: 'courses',
      question: 'Can I access courses offline?',
      answer: 'Yes! Download our mobile app and you can download course content for offline viewing. This feature is available for enrolled courses and requires initial internet connection for download.',
      popular: false
    },
    {
      id: 5,
      category: 'certificates',
      question: 'How do I get a certificate?',
      answer: 'Complete all course modules, assignments, and pass the final assessment with a minimum score of 70%. Your certificate will be automatically generated and available in your profile dashboard.',
      popular: true
    },
    {
      id: 6,
      category: 'certificates',
      question: 'Are certificates recognized by employers?',
      answer: 'Yes, our certificates are recognized by 200+ industry partners and employers. They include verification QR codes and can be shared on LinkedIn and other professional platforms.',
      popular: false
    },
    {
      id: 7,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.',
      popular: false
    },
    {
      id: 8,
      category: 'payments',
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid courses. If you\'re not satisfied, contact our support team within 30 days of purchase for a full refund.',
      popular: true
    },
    {
      id: 9,
      category: 'technical',
      question: 'The video is not loading. What should I do?',
      answer: 'First, check your internet connection. Try refreshing the page or clearing your browser cache. If the issue persists, try using a different browser or contact our technical support team.',
      popular: false
    },
    {
      id: 10,
      category: 'courses',
      question: 'How long do I have access to a course?',
      answer: 'Once enrolled, you have lifetime access to course content. This includes all future updates and additional materials added to the course.',
      popular: true
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get personalized help from our support team',
      icon: '💬',
      action: 'chat'
    },
    {
      title: 'Report a Problem',
      description: 'Report technical issues or bugs',
      icon: '🐛',
      action: 'report'
    },
    {
      title: 'Request Feature',
      description: 'Suggest new features or improvements',
      icon: '💡',
      action: 'feature'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other learners',
      icon: '👥',
      action: 'forum'
    }
  ];

  const supportStats = [
    { label: 'Articles', value: '150+', icon: '📝' },
    { label: 'Response Time', value: '<2hrs', icon: '⚡' },
    { label: 'Satisfaction', value: '98%', icon: '😊' },
    { label: 'Languages', value: '5+', icon: '🌍' }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqData.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🎯 Help Center
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Find answers to your questions and get the help you need
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-gray-900 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button 
                onClick={() => {
                  if (searchQuery) {
                    // Filter FAQs based on search query
                    const filtered = faqData.filter((faq: any) => 
                      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    console.log(`Found ${filtered.length} results for: ${searchQuery}`);
                  }
                }}
                className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Support Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {supportStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">🚀 Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card key={action.title} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{action.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">⭐ Popular Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularFaqs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                <div className="mt-3 flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <span className="mr-1">👍</span> Helpful
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">📁 Browse by Category</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="mb-16">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      {faq.question}
                      {faq.popular && (
                        <span className="ml-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                          Popular
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <button 
                        onClick={() => console.log('Feedback: Helpful')}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        👍 Helpful
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          console.log('Link copied to clipboard!');
                        }}
                        className="text-gray-500 dark:text-gray-400 hover:underline"
                      >
                        📋 Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search terms or browse by category.</p>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg opacity-90 mb-6">
            Our support team is here to help you 24/7. Get personalized assistance for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              💬 Live Chat
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:support@learninghub.edu'}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              📧 Email Support
            </button>
          </div>
          <div className="mt-4 text-sm opacity-75">
            ⚡ Average response time: 2 hours • 98% satisfaction rate
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
