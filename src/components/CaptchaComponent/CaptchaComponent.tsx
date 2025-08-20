import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import { createCaptcha, verifyCaptcha, refreshCaptcha, cleanupExpiredCaptchas } from '../../utils/captcha';
import type { CaptchaData } from '../../utils/captcha';

interface CaptchaComponentProps {
  onVerify: (success: boolean) => void;
  className?: string;
  required?: boolean;
  label?: string;
}

const CaptchaComponent: React.FC<CaptchaComponentProps> = ({
  onVerify,
  className = '',
  required = true,
  label = 'Security Verification'
}) => {
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    try {
      cleanupExpiredCaptchas();
      const newCaptcha = createCaptcha();
      setCaptchaData(newCaptcha);
      setTimeLeft(Math.floor((newCaptcha.expiresAt - Date.now()) / 1000));
    } catch (error) {
      console.error('Error initializing CAPTCHA:', error);
      // Fallback initialization
      const fallbackCaptcha = {
        id: `captcha_${Date.now()}_fallback`,
        challenge: '123456',
        answer: '123456',
        createdAt: Date.now(),
        expiresAt: Date.now() + (10 * 60 * 1000),
        attempts: 0,
        isUsed: false
      };
      setCaptchaData(fallbackCaptcha);
      setTimeLeft(600); // 10 minutes
    }
  }, []);

  // Timer for expiry countdown
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && captchaData && !isVerified) {
      handleRefresh();
    }
  }, [timeLeft, captchaData, isVerified]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (!captchaData || !userInput.trim()) {
      toast.error('Please enter the CAPTCHA code');
      return;
    }

    setIsVerifying(true);
    
    const result = verifyCaptcha(captchaData.id, userInput);
    
    if (result.success) {
      setIsVerified(true);
      toast.success(result.message);
      onVerify(true);
    } else {
      toast.error(result.message);
      onVerify(false);
      
      if (result.message.includes('expired') || result.message.includes('Too many')) {
        handleRefresh();
      }
    }
    
    setIsVerifying(false);
  };

  const handleRefresh = () => {
    try {
      const newCaptcha = refreshCaptcha(captchaData?.id);
      setCaptchaData(newCaptcha);
      setUserInput('');
      setIsVerified(false);
      setTimeLeft(Math.floor((newCaptcha.expiresAt - Date.now()) / 1000));
      toast.info('CAPTCHA refreshed');
    } catch (error) {
      console.error('Error refreshing CAPTCHA:', error);
      toast.error('Failed to refresh CAPTCHA. Please reload the page.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow all characters but limit to 6
    if (value.length <= 6) {
      setUserInput(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerified) {
      handleVerify();
    }
  };

  if (!captchaData) {
    return <div className="text-center">Loading CAPTCHA...</div>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* CAPTCHA Display */}
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 mb-3">
          <div className="text-center">
            <div className="text-lg font-mono tracking-wider text-gray-800 dark:text-gray-200 mb-2 select-none">
              {captchaData.challenge}
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>6-digit numbers only</span>
              {timeLeft > 0 && (
                <>
                  <span>•</span>
                  <span>Expires in: {formatTime(timeLeft)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter 6-digit code"
            className={`flex-1 px-3 py-2 border rounded-md text-center font-mono tracking-wider text-lg ${
              isVerified
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50`}
            disabled={isVerified || isVerifying}
            maxLength={6}
          />
          
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isVerifying}
            className="px-3"
            title="Refresh CAPTCHA"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>

        {/* Verify Button */}
        {!isVerified && (
          <Button
            onClick={handleVerify}
            disabled={isVerifying || userInput.length !== 6}
            className="w-full mt-2"
            size="sm"
          >
            {isVerifying ? 'Verifying...' : 'Verify CAPTCHA'}
          </Button>
        )}

        {/* Success Indicator */}
        {isVerified && (
          <div className="flex items-center justify-center space-x-2 mt-2 text-green-600 dark:text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">CAPTCHA Verified</span>
          </div>
        )}

        {/* Help Text */}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Enter the 6-digit code exactly as shown above (case-sensitive). 
          Mix of numbers, letters, and special characters.
        </p>
      </div>
    </div>
  );
};

export default CaptchaComponent;
