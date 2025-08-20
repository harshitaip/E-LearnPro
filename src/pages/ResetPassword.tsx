import React from 'react';
import { Card } from '../components/Card';

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Reset Password
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Password reset functionality coming soon.
        </p>
      </Card>
    </div>
  );
};

export default ResetPassword;
