import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learn: [
      { name: 'Browse Courses', href: '/courses' },
      { name: 'Categories', href: '/categories' },
      { name: 'Free Courses', href: '/free-courses' },
      { name: 'Certificates', href: '/certificates' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <div>
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.87 5.16-1.13 9-5.32 9-10.87V7l-10-5z"/>
                    </svg>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                    Learning Hub
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-6">
                🎓 Professional e-learning platform developed for educational institutions.
                Empowering learners with comprehensive courses and innovative technology.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                  📚 Learn
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.learn.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 opacity-60"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                  �️ Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 opacity-60"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                  ⚖️ Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 opacity-60"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:order-2">
              {footerLinks.legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                &copy; {currentYear} Learning Hub - Educational Technology Platform
                <span className="block md:inline md:ml-2">🏛️ IIT Patna Innovation</span>
                <span className="block md:inline md:ml-2 font-medium text-primary-600 dark:text-primary-400">Developed by Harshita</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
