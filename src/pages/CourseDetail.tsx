import React from 'react';

const CourseDetailPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
        Course Details
      </h1>
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-8">
        <p>Detailed course information, enrollment, and video player will be implemented here</p>
      </div>
    </div>
  );
};

export default CourseDetailPage;
