import React, { useState } from 'react';

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'student' | 'instructor' | 'admin';
}

const DemoTour: React.FC<DemoTourProps> = ({ isOpen, onClose, userRole }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = {
    student: [
      {
        title: "🎓 Welcome to Your Student Dashboard!",
        content: "Explore your personalized learning journey with enrolled courses, progress tracking, and achievements. Everything you need for academic success is here!",
        highlight: "dashboard-overview"
      },
      {
        title: "📚 Premium Course Catalog",
        content: "Browse 50+ premium courses across JEE, NEET, GATE, and skill development. All courses include HD videos, quizzes, and certificates.",
        highlight: "course-catalog"
      },
      {
        title: "📊 Smart Progress Tracking",
        content: "Monitor your learning progress in real-time with detailed analytics, completion rates, quiz scores, and time spent learning.",
        highlight: "progress-section"
      },
      {
        title: "🎯 Interactive Learning Tools",
        content: "Engage with video lectures, interactive quizzes, assignments, and discussion forums. Learn from peers and instructors!",
        highlight: "learning-tools"
      }
    ],
    instructor: [
      {
        title: "👩‍🏫 Instructor Command Center",
        content: "Welcome to your comprehensive teaching dashboard! Manage courses, track student performance, and grow your teaching business.",
        highlight: "instructor-dashboard"
      },
      {
        title: "🛠️ Advanced Course Creation",
        content: "Create engaging courses with our powerful tools: video uploads, lesson planning, quiz builder, and assignment manager.",
        highlight: "course-creation"
      },
      {
        title: "📈 Student Success Analytics",
        content: "Track student engagement, completion rates, quiz performance, and provide personalized feedback to help them succeed.",
        highlight: "student-analytics"
      },
      {
        title: "💰 Revenue & Growth Insights",
        content: "Monitor course enrollment, revenue generation, student ratings, and discover opportunities to optimize your teaching strategy.",
        highlight: "revenue-section"
      }
    ],
    admin: [
      {
        title: "👑 Platform Control Center",
        content: "Welcome to the admin dashboard! Comprehensive platform management with user oversight, course moderation, and system insights.",
        highlight: "admin-panel"
      },
      {
        title: "👥 User Management System",
        content: "Manage students, instructors, and administrators with advanced tools for verification, permissions, and account oversight.",
        highlight: "user-management"
      },
      {
        title: "📊 Advanced Platform Analytics",
        content: "Access detailed insights on platform usage, revenue trends, course performance, user engagement, and growth metrics.",
        highlight: "platform-analytics"
      },
      {
        title: "⚙️ System Configuration Hub",
        content: "Configure platform settings, payment processing, content policies, security measures, and feature toggles.",
        highlight: "system-config"
      }
    ]
  };

  const steps = tourSteps[userRole];
  const isLastStep = currentStep === steps.length - 1;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeTour = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  const getProgressColor = (index: number) => {
    if (index === currentStep) return 'bg-blue-500';
    if (index < currentStep) return 'bg-blue-300';
    return 'bg-gray-200 dark:bg-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🚀 Demo Platform Tour
            </h3>
            <button
              onClick={closeTour}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={`step-${index}`}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${getProgressColor(index)}`}
                />
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {steps[currentStep].title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {steps[currentStep].content}
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={closeTour}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Skip Tour
              </button>
              
              {isLastStep ? (
                <button
                  onClick={closeTour}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  🎉 Get Started
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTour;
