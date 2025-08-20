import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import TwoFactorVerification from '../components/TwoFactorVerification';
import { generate2FACode, store2FACode, is2FARequired, send2FACodeViaEmail } from '../utils/twoFactorAuth';

const TwoFactorDemo: React.FC = () => {
  const [testEmail, setTestEmail] = useState('student@learninghub.edu');
  const [showDemo, setShowDemo] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeResults, setCodeResults] = useState<string[]>([]);

  const generateTestCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(generate2FACode());
    }
    setCodeResults(codes);
    toast.success('Generated 10 test codes!');
  };

  const testEmailRequirement = () => {
    const testEmails = [
      'student@learninghub.edu',
      'instructor@learninghub.edu',
      'admin@learninghub.edu',
      'test@gmail.com',
      'user@yahoo.com'
    ];

    const results = testEmails.map(email => ({
      email,
      required: is2FARequired(email)
    }));

    console.log('2FA Requirement Test Results:', results);
    toast.info('Check console for 2FA requirement test results');
  };

  const startDemoFlow = async () => {
    const code = generate2FACode();
    setGeneratedCode(code);
    store2FACode(testEmail, code);
    await send2FACodeViaEmail(testEmail, code);
    setShowDemo(true);
    toast.info(`Demo started! Generated code: ${code}`);
  };

  const handleDemoSuccess = () => {
    setShowDemo(false);
    toast.success('2FA Demo completed successfully!');
  };

  const handleDemoCancel = () => {
    setShowDemo(false);
    toast.info('2FA Demo cancelled');
  };

  if (showDemo) {
    return (
      <TwoFactorVerification
        email={testEmail}
        onVerificationSuccess={handleDemoSuccess}
        onCancel={handleDemoCancel}
        purpose="login"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔐 Two-Factor Authentication Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test the Learning Hub 2FA system with mixed character codes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Code Generation Demo */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎲 Code Generation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Generate 6-digit codes containing numbers, letters, and special characters
            </p>
            
            <Button onClick={generateTestCodes} className="w-full mb-4">
              Generate 10 Test Codes
            </Button>

            {codeResults.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Generated Codes:</h3>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {codeResults.map((code, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded border">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* 2FA Requirement Demo */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📧 Email Domain Check
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Test which email domains require 2FA (@learninghub.edu requires 2FA)
            </p>
            
            <Button onClick={testEmailRequirement} className="w-full mb-4">
              Test Email Requirements
            </Button>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                📋 Rules:
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• @learninghub.edu emails → 2FA Required</li>
                <li>• Other domains → 2FA Optional</li>
                <li>• Institutional security compliance</li>
              </ul>
            </div>
          </Card>

          {/* Full 2FA Flow Demo */}
          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🔄 Complete 2FA Flow
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Experience the full two-factor authentication process
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Email Address:
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter email to test"
              />
            </div>

            <Button onClick={startDemoFlow} className="w-full mb-4">
              Start 2FA Demo Flow
            </Button>

            {generatedCode && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  🔑 Generated Code:
                </h3>
                <div className="font-mono text-lg text-green-700 dark:text-green-300 bg-white dark:bg-gray-800 p-2 rounded border">
                  {generatedCode}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Use this code in the verification screen that will appear
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ 2FA Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Mixed Character Codes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                6-digit codes with numbers, letters, and special characters for enhanced security
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Time-Limited</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Codes expire after 5 minutes with visual countdown and resend option
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Attempt Limiting</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maximum 3 attempts per code with automatic lockout and code regeneration
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorDemo;
