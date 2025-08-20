import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import TwoFactorVerification from '../components/TwoFactorVerification';
import CaptchaComponent from '../components/CaptchaComponent';
import { is2FARequired } from '../utils/twoFactorAuth';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup.string().oneOf(['student', 'instructor']).required('Please select a role'),
  termsAccepted: yup.boolean().required('You must accept the terms and conditions').isTrue('You must accept the terms and conditions'),
});

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'instructor';
  termsAccepted: true;
}

interface UserRegistrationLog {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  registrationDate: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
  failureReason?: string;
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

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<SignupFormData | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>({
    resolver: yupResolver(schema)
  });

  const password = watch('password');

  // Function to complete registration after 2FA verification
  const completeRegistration = async (data: SignupFormData) => {
    try {
      // Check if user already exists
      const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(user => user.email === data.email);
      
      if (userExists) {
        logRegistration(data, 'failed', 'Email already registered');
        toast.error('An account with this email already exists');
        return;
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password, // In real app, this would be hashed
        role: data.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isEmailVerified: true, // Verified through 2FA
        profile: {
          bio: '',
          phone: '',
          location: '',
        },
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en',
        },
      };

      // Save user to storage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Log successful registration
      logRegistration(data, 'success');

      // Update registration statistics
      const stats = JSON.parse(localStorage.getItem('registrationStats') || '{}');
      const today = new Date().toISOString().split('T')[0];
      
      if (!stats[today]) {
        stats[today] = { total: 0, students: 0, instructors: 0 };
      }
      
      stats[today].total += 1;
      stats[today][data.role === 'student' ? 'students' : 'instructors'] += 1;
      localStorage.setItem('registrationStats', JSON.stringify(stats));

      // Call auth signup
      await signup(data);
      
      toast.success('Account created and verified successfully! Welcome to Learning Hub.');
      
      // Navigate to dashboard based on role
      if (data.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/instructor/dashboard');
      }
    } catch (error: unknown) {
      console.error('Registration completion failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logRegistration(data, 'failed', errorMessage);
      toast.error(errorMessage || 'Failed to complete account creation. Please try again.');
    }
  };

  // Handle 2FA verification success
  const handle2FASuccess = async () => {
    if (pendingUserData) {
      await completeRegistration(pendingUserData);
    }
    setShowTwoFactor(false);
    setPendingUserData(null);
  };

  // Handle 2FA cancellation
  const handle2FACancel = () => {
    setShowTwoFactor(false);
    setPendingUserData(null);
    toast.info('Registration cancelled');
  };

  // Handle CAPTCHA verification
  const handleCaptchaVerify = (success: boolean) => {
    setIsCaptchaVerified(success);
    if (success) {
      toast.success('CAPTCHA verified successfully');
    }
  };

  // Function to log user registration attempts
  const logRegistration = (userData: SignupFormData, status: 'success' | 'failed', failureReason?: string) => {
    const registrationLog: UserRegistrationLog = {
      id: crypto.randomUUID(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      registrationDate: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Mock IP - in real app would get from request
      userAgent: navigator.userAgent,
      status,
      failureReason
    };

    // Save to localStorage (in real app would send to analytics service)
    const existingLogs: UserRegistrationLog[] = JSON.parse(localStorage.getItem('registrationLogs') || '[]');
    existingLogs.push(registrationLog);
    localStorage.setItem('registrationLogs', JSON.stringify(existingLogs));

    console.log('Registration logged:', registrationLog);
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    
    try {
      // Check CAPTCHA verification first
      if (!isCaptchaVerified) {
        toast.error('Please complete the CAPTCHA verification');
        setIsSubmitting(false);
        return;
      }

      // Check if 2FA is required for this email
      if (is2FARequired(data.email)) {
        setPendingUserData(data);
        setShowTwoFactor(true);
        setIsSubmitting(false);
        return;
      }

      // Proceed with normal registration flow
      await completeRegistration(data);
      
    } catch (error: unknown) {
      console.error('Signup failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logRegistration(data, 'failed', errorMessage);
      toast.error(errorMessage || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^a-zA-Z0-9]/.test(password),
    ];
    
    strength = checks.filter(Boolean).length;
    
    const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'red', 'orange', 'yellow', 'blue', 'green'];
    
    return {
      strength,
      label: labels[strength],
      color: colors[strength],
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Show 2FA verification screen if needed
  if (showTwoFactor && pendingUserData) {
    return (
      <TwoFactorVerification
        email={pendingUserData.email}
        onVerificationSuccess={handle2FASuccess}
        onCancel={handle2FACancel}
        purpose="signup"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join thousands of learners and educators
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  {...register('firstName')}
                  className="form-input"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  {...register('lastName')}
                  className="form-input"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                placeholder="your.email@learninghub.edu"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="form-label">
                I want to
              </label>
              <select
                id="role"
                {...register('role')}
                className="form-input"
              >
                <option value="">Select your role</option>
                <option value="student">Learn (Student)</option>
                <option value="instructor">Teach (Instructor)</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.role.message}
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
                autoComplete="new-password"
                {...register('password')}
                className="form-input"
                placeholder="Create a strong password"
              />
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Password strength:</span>
                    <span className={`text-${passwordStrength.color}-600 dark:text-${passwordStrength.color}-400 font-medium`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-${passwordStrength.color}-500 h-2 rounded-full transition-all duration-300 password-strength-bar`}
                      data-width={`${(passwordStrength.strength / 5) * 100}%`}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register('confirmPassword')}
                className="form-input"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                type="checkbox"
                {...register('termsAccepted')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.termsAccepted.message}
              </p>
            )}

            {/* CAPTCHA Component */}
            <CaptchaComponent
              onVerify={handleCaptchaVerify}
              label="Security Verification"
              required={true}
            />

            <div>
              <Button
                type="submit"
                disabled={isSubmitting || !isCaptchaVerified}
                className="w-full"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
