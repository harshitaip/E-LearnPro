import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import TwoFactorVerification from '../components/TwoFactorVerification';
import CaptchaComponent from '../components/CaptchaComponent';
import { is2FARequired } from '../utils/twoFactorAuth';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().optional().nullable(),
}) as yup.ObjectSchema<LoginFormData>;

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginAttemptLog {
  id: string;
  email: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
  failureReason?: string;
  sessionId?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  lastLogin?: string;
  profile: {
    avatar?: string;
    bio?: string;
    phone?: string;
    location?: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  // Function to complete login after 2FA verification
  const completeLogin = async (user: User, formData: LoginFormData, sessionId: string) => {
    try {
      // Update user's last login time
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => 
        u.email === formData.email 
          ? { ...u, lastLogin: new Date().toISOString() }
          : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Handle remember me functionality
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
        localStorage.setItem('sessionExpiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()); // 30 days
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.setItem('sessionExpiry', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()); // 1 day
      }

      // Save session data
      const sessionData = {
        sessionId,
        userId: user.id,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('currentSession', JSON.stringify(sessionData));

      // Update login statistics
      const stats = JSON.parse(localStorage.getItem('loginStats') || '{}');
      const today = new Date().toISOString().split('T')[0];
      
      if (!stats[today]) {
        stats[today] = { total: 0, students: 0, instructors: 0, admins: 0 };
      }
      
      stats[today].total += 1;
      stats[today][user.role + 's'] += 1;
      localStorage.setItem('loginStats', JSON.stringify(stats));

      // Call auth login
      await login(formData.email, formData.password);
      
      toast.success(`Welcome back, ${user.firstName}!`);
      
      // Navigate based on role
      switch (user.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'instructor':
          navigate('/instructor/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error('Login completion failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  // Handle 2FA verification success
  const handle2FASuccess = async () => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === verificationEmail);
      
      if (user) {
        const sessionId = crypto.randomUUID();
        await completeLogin(user, { email: verificationEmail, password: '', rememberMe: false }, sessionId);
      }
    } catch (error) {
      console.error('2FA completion failed:', error);
      toast.error('Login failed. Please try again.');
    }
    setShowTwoFactor(false);
  };

  // Handle 2FA cancellation
  const handle2FACancel = () => {
    setShowTwoFactor(false);
    setVerificationEmail('');
    toast.info('Login cancelled');
  };

  // Handle CAPTCHA verification
  const handleCaptchaVerify = (success: boolean) => {
    setIsCaptchaVerified(success);
    if (success) {
      toast.success('CAPTCHA verified successfully');
    }
  };

  // Function to log login attempts
  const logLoginAttempt = (email: string, status: 'success' | 'failed', failureReason?: string, sessionId?: string) => {
    const loginLog: LoginAttemptLog = {
      id: crypto.randomUUID(),
      email,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Mock IP - in real app would get from request
      userAgent: navigator.userAgent,
      status,
      failureReason,
      sessionId
    };

    // Save to localStorage (in real app would send to analytics service)
    const existingLogs: LoginAttemptLog[] = JSON.parse(localStorage.getItem('loginLogs') || '[]');
    existingLogs.push(loginLog);
    localStorage.setItem('loginLogs', JSON.stringify(existingLogs));

    console.log('Login attempt logged:', loginLog);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Check CAPTCHA verification first
      if (!isCaptchaVerified) {
        toast.error('Please complete the CAPTCHA verification');
        setIsLoading(false);
        return;
      }

      // Check if user exists and validate credentials
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === data.email);

      if (!user) {
        logLoginAttempt(data.email, 'failed', 'User not found');
        toast.error('Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (user.password !== data.password) {
        logLoginAttempt(data.email, 'failed', 'Invalid password');
        toast.error('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Generate session ID and log successful login
      const sessionId = crypto.randomUUID();
      logLoginAttempt(data.email, 'success', undefined, sessionId);

      // Check if 2FA is required for this user
      if (is2FARequired(data.email)) {
        setVerificationEmail(data.email);
        setShowTwoFactor(true);
        setIsLoading(false);
        return;
      }

      // Proceed with normal login flow
      await completeLogin(user, data, sessionId);
      
    } catch (error: unknown) {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logLoginAttempt(data.email, 'failed', errorMessage);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      // Set default value for email field
      // This would typically be done with setValue from react-hook-form
    }
  }, []);

  // Show 2FA verification screen if needed
  if (showTwoFactor) {
    return (
      <TwoFactorVerification
        email={verificationEmail}
        onVerificationSuccess={handle2FASuccess}
        onCancel={handle2FACancel}
        purpose="login"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to your account to continue learning
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="form-input"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CAPTCHA Component */}
            <CaptchaComponent
              onVerify={handleCaptchaVerify}
              label="Security Verification"
              required={true}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading || !isCaptchaVerified}
                className="w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link
                  to={ROUTES.SIGNUP}
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                >
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
