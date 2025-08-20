import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import { ROUTES } from '../utils/constants';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.HOME}>
            <Button size="lg">
              Go Back Home
            </Button>
          </Link>
          <Link to={ROUTES.COURSES}>
            <Button variant="outline" size="lg">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
