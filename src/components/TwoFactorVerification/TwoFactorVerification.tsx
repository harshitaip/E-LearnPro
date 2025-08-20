import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import Card from '../Card/Card';
import { verify2FACode, generate2FACode, store2FACode, send2FACodeViaEmail } from '../../utils/twoFactorAuth';

interface TwoFactorVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
  purpose: 'login' | 'signup';
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  email,
  onVerificationSuccess,
  onCancel,
  purpose
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Initialize 2FA code on component mount
  useEffect(() => {
    const initializeCode = async () => {
      const newCode = generate2FACode();
      store2FACode(email, newCode);
      await send2FACodeViaEmail(email, newCode);
      
      if (purpose === 'login') {
        toast.info('Please check your email for the verification code');
      } else {
        toast.info('Verification code sent to complete your registration');
      }
    };
    
    initializeCode();
  }, [email, purpose]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      toast.error('Please enter a 6-digit verification code');
      return;
    }

    setIsLoading(true);
    const result = verify2FACode(email, code);
    
    if (result.success) {
      toast.success(result.message);
      onVerificationSuccess();
    } else {
      toast.error(result.message);
      if (result.message.includes('expired') || result.message.includes('Too many')) {
        setCanResend(true);
      }
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const newCode = generate2FACode();
      store2FACode(email, newCode);
      await send2FACodeViaEmail(email, newCode);
      
      toast.success('New verification code sent to your email');
      setTimeLeft(300);
      setCanResend(false);
      setCode('');
    } catch (error) {
      toast.error('Failed to send verification code');
    }
    setIsLoading(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z0-9!@#$%&*]/g, '').slice(0, 6);
    setCode(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerifyCode();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {email}
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                id="verificationCode"
                type="text"
                value={code}
                onChange={handleCodeChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={6}
                autoComplete="one-time-code"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Enter the 6-digit code containing numbers, letters, and special characters
              </p>
            </div>

            {timeLeft > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Code expires in: <span className="font-mono font-medium text-red-600 dark:text-red-400">{formatTime(timeLeft)}</span>
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleVerifyCode}
                disabled={isLoading || code.length !== 6}
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>

              {(canResend || timeLeft === 0) && (
                <Button
                  onClick={handleResendCode}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? 'Sending...' : 'Resend Code'}
                </Button>
              )}

              <Button
                onClick={onCancel}
                variant="ghost"
                className="w-full"
              >
                Cancel
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm">
                  <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">
                    Security Notice
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    This verification code contains a mix of numbers, letters, and special characters for enhanced security. 
                    It will expire in 5 minutes and can only be used once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorVerification;
