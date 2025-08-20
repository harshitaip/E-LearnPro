import React, { useState } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import CaptchaComponent from '../components/CaptchaComponent';
import { generateCaptcha, createCaptcha, cleanupExpiredCaptchas } from '../utils/captcha';

const CaptchaDemo: React.FC = () => {
  const [demoResults, setDemoResults] = useState<string[]>([]);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const generateDemoCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      const { answer } = generateCaptcha();
      codes.push(answer);
    }
    setDemoResults(codes);
  };

  const handleCaptchaVerify = (success: boolean) => {
    setIsCaptchaVerified(success);
  };

  const handleCleanup = () => {
    cleanupExpiredCaptchas();
    console.log('Expired CAPTCHAs cleaned up');
  };

  const testCaptchaCreation = () => {
    const captcha = createCaptcha();
    console.log('Created CAPTCHA:', captcha);
    alert(`CAPTCHA Created!\nChallenge: ${captcha.challenge}\nAnswer: ${captcha.answer}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            � 6-Digit Number CAPTCHA Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Advanced security verification with 6 random numbers only
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Live CAPTCHA Demo */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🔄 Live CAPTCHA Verification
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Complete the CAPTCHA verification below to test the system
            </p>
            
            <CaptchaComponent
              onVerify={handleCaptchaVerify}
              label="Test CAPTCHA Verification"
              required={true}
            />

            {isCaptchaVerified && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">CAPTCHA Successfully Verified!</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  The system has confirmed your verification. You can now proceed.
                </p>
              </div>
            )}
          </Card>

          {/* Code Generation Demo */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎲 6-Digit Number Examples
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              See examples of 6-digit number codes (0-9 only)
            </p>
            
            <Button onClick={generateDemoCodes} className="w-full mb-4">
              Generate 10 Sample Number Codes
            </Button>

            {demoResults.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Generated Codes:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {demoResults.map((code, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-3 rounded border font-mono text-center text-lg">
                      {code}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Each code contains 6 random numbers (0-9 only)
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Testing Tools */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Testing & Management Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={testCaptchaCreation} variant="outline" className="w-full">
              Test CAPTCHA Creation
            </Button>
            <Button onClick={handleCleanup} variant="outline" className="w-full">
              Clean Expired CAPTCHAs
            </Button>
            <Button 
              onClick={() => {
                sessionStorage.clear();
                setIsCaptchaVerified(false);
                setDemoResults([]);
              }} 
              variant="outline" 
              className="w-full"
            >
              Reset Demo
            </Button>
          </div>
        </Card>

        {/* Features Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">�</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Numbers Only</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              6 random digits (0-9) for easy typing and verification
            </p>
          </Card>
          
          <Card className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Time Limited</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              10-minute expiration with countdown timer and refresh option
            </p>
          </Card>
          
          <Card className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Attempt Control</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Maximum 3 attempts per CAPTCHA with auto-refresh on failure
            </p>
          </Card>
          
          <Card className="text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Visual Styling</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Bold Unicode numbers with visual spacing for readability
            </p>
          </Card>
        </div>

        {/* Implementation Guide */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📖 Implementation & Security Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🔐 Security Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>6-digit numeric codes only (0-9) for easy typing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Session-based storage with automatic cleanup</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Attempt limiting with progressive security</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Time-based expiration with visual countdown</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Exact number match verification for enhanced security</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🚀 Integration Points
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Login page with mandatory verification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Signup page with account creation protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Form submission prevention until verified</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Automatic refresh and retry capabilities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Accessible design with clear user feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CaptchaDemo;
