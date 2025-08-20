import React from 'react';
import Card from '../components/Card/Card';

const About: React.FC = () => {
  const stats = [
    { label: 'Active Learners', value: '25,000+', icon: '🎓' },
    { label: 'Expert Instructors', value: '500+', icon: '👨' },
    { label: 'Premium Courses', value: '150+', icon: '📚' },
    { label: 'Countries Served', value: '50+', icon: '🌍' }
  ];

  const features = [
    {
      title: 'Advanced Learning Platform',
      description: 'State-of-the-art educational technology with adaptive learning and personalized content delivery',
      icon: '🎯'
    },
    {
      title: 'Interactive Learning Experience',
      description: 'Engaging multimedia content, real-time assessments, and collaborative learning environments',
      icon: '⚡'
    },
    {
      title: 'Comprehensive Academic Support',
      description: 'Multi-tiered support system with dedicated mentors, peer groups, and academic counselors',
      icon: '🎓'
    },
    {
      title: 'Industry-Academia Integration',
      description: 'Bridge between academic learning and industry requirements with practical skill development',
      icon: '🏭'
    }
  ];

  const team = [
    {
      name: 'Harshita',
      role: 'Lead Developer & Technical Architect',
      bio: 'Full-stack developer specializing in educational technology and modern web applications',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshita&backgroundColor=b6e3f4'
    },
    {
      name: 'IIT Patna Faculty',
      role: 'Academic Advisory Board',
      bio: 'Distinguished faculty members providing strategic guidance on educational technology innovation',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=faculty&backgroundColor=fecaca'
    },
    {
      name: 'Technical Team',
      role: 'Development & Innovation',
      bio: 'Expert developers committed to creating cutting-edge educational technology solutions',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=community&backgroundColor=d1fae5'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Learning Pro Platform
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-4">
            🎓 A comprehensive e-learning platform demonstration showcasing modern web development 
            with React, TypeScript, and cutting-edge educational technologies.
          </p>
          <div className="bg-yellow-500/20 border border-yellow-300 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm opacity-90">
              📚 <strong>College Project Notice:</strong> This is a demonstration platform created for educational purposes 
              to showcase web development skills and e-learning concepts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-16">
          {/* Mission Section */}
          <Card>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎯 Project Mission</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              This e-learning platform demonstrates modern web development capabilities while showcasing how technology 
              can transform education. Built as a comprehensive college project, it explores the intersection of 
              educational technology, user experience design, and full-stack development using industry-standard tools and frameworks.
            </p>
          </Card>

          {/* Story Section */}
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">📖 Development Journey</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Started as a college project to explore modern web development technologies, this platform evolved 
                  into a comprehensive demonstration of full-stack development capabilities using React 19+, TypeScript, 
                  and cutting-edge development tools.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  The project incorporates industry best practices including responsive design, accessibility features, 
                  state management, authentication systems, and modern UI/UX principles to create a realistic 
                  e-learning experience.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Built with educational goals in mind, it showcases various aspects of software development including 
                  component architecture, API integration, user experience design, and project management skills.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Academic Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Demonstrating proficiency in modern web development technologies and educational technology concepts
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Features Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">✨ Technical Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">👥 Project Contributors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">💎 Development Principles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🌟</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality Code</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Following best practices, clean architecture, and modern development standards
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Learning Focus</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Demonstrating educational technology concepts and user-centered design
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Exploring cutting-edge technologies and modern web development practices
                </p>
              </div>
            </div>
          </Card>

          {/* Contact CTA */}
          <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-4">Explore the Demo Platform</h2>
            <p className="text-lg opacity-90 mb-6">
              Experience the features and functionality of this educational technology demonstration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/demo-login'}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Try Demo Login
              </button>
              <button 
                onClick={() => window.location.href = '/courses'}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Courses
              </button>
            </div>
            <div className="mt-6 text-sm opacity-75">
              <p>⚠️ Demo platform for educational purposes only</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
