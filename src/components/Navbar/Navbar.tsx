import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { ROUTES, USER_ROLES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const getDashboardRoute = () => {
    if (!user) return ROUTES.HOME;
    switch (user.role) {
      case USER_ROLES.STUDENT:
        return ROUTES.STUDENT_DASHBOARD;
      case USER_ROLES.INSTRUCTOR:
        return ROUTES.INSTRUCTOR_DASHBOARD;
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN_DASHBOARD;
      default:
        return ROUTES.HOME;
    }
  };
  return (
    <nav className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-200 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to={ROUTES.HOME}
              className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center space-x-2"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9v3h2v7h5v-6h4v6h5v-7h2V9L12 3zM8 15v2H6v-2h2zm6 0v2h-2v-2h2z"/>
              </svg>
              <span>Learning Hub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to={ROUTES.HOME}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to={ROUTES.COURSES}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/competitive-exams"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Competitive Exams
              </Link>
              <Link
                to="/skill-development"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Skill Development
              </Link>
              {isAuthenticated && user?.role === USER_ROLES.ADMIN && (
                <Link
                  to="/admin/analytics"
                  className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Analytics
                </Link>
              )}
              <Link
                to="/demo-login"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Platform Login
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to={getDashboardRoute()}
                    className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Learning
                  </Link>
                  {user?.role === USER_ROLES.INSTRUCTOR && (
                    <Link
                      to="/instructor/courses"
                      className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Teach
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                {user && (
                  <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                    Welcome, {user.firstName || user.email}
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/demo-login">
                  <Button variant="outline" size="sm">
                    Platform Login
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 dark:border-secondary-700 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to={ROUTES.HOME}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={ROUTES.COURSES}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/competitive-exams"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Competitive Exams
              </Link>
              <Link
                to="/skill-development"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Skill Development
              </Link>
              {isAuthenticated && user?.role === USER_ROLES.ADMIN && (
                <Link
                  to="/admin/analytics"
                  className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </Link>
              )}
              <Link
                to="/demo-login"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Platform Login
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to={getDashboardRoute()}
                    className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Learning
                  </Link>
                  {user?.role === USER_ROLES.INSTRUCTOR && (
                    <Link
                      to="/instructor/courses"
                      className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Teach
                    </Link>
                  )}
                </>
              )}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {user && (
                      <span className="block text-secondary-700 dark:text-secondary-300 px-3 py-2 text-sm">
                        Welcome, {user.firstName || user.email}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to={ROUTES.LOGIN}
                      className="block text-center bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/demo-login"
                      className="block text-center bg-transparent border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Platform Login
                    </Link>
                    <Link
                      to={ROUTES.SIGNUP}
                      className="block text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
