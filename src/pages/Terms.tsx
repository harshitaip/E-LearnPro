import React from 'react';
import { Card } from '../components/Card';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Platform Agreement</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  By accessing Learning Hub, you agree to these Terms of Service and our commitment to providing 
                  professional educational experiences through advanced technology platforms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Educational Services</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Learning Hub provides comprehensive educational technology services including course delivery, 
                  progress tracking, and interactive learning experiences designed for professional development.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Users are expected to maintain professional conduct, respect intellectual property, 
                  and utilize platform resources for legitimate educational purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Content & Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  All course materials, assessments, and platform content are protected by intellectual property rights. 
                  Users receive limited access for personal educational use only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  For questions regarding these terms, contact our support team through the platform's 
                  official communication channels or visit our contact page.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
