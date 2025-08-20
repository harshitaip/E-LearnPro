import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full">
      <div className="p-4">
        <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
          Dashboard
        </h3>
        <nav className="mt-4 space-y-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
          >
            Overview
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
          >
            My Courses
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
          >
            Progress
          </a>
        </nav>
      </div>
    </div>
  );
};
