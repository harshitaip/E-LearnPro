import { api } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Auth API service functions
export const authAPI = {
  // Login user
  login: (data: LoginRequest): Promise<AuthResponse> =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, data),

  // Register new user
  signup: (data: SignupRequest): Promise<AuthResponse> =>
    api.post(API_ENDPOINTS.AUTH.SIGNUP, data),

  // Refresh access token
  refreshToken: (data: RefreshTokenRequest): Promise<{ accessToken: string; refreshToken?: string }> =>
    api.post(API_ENDPOINTS.AUTH.REFRESH, data),

  // Logout user
  logout: (): Promise<{ message: string }> =>
    api.post(API_ENDPOINTS.AUTH.LOGOUT),

  // Get current user profile
  getProfile: (): Promise<AuthResponse['user']> =>
    api.get(API_ENDPOINTS.AUTH.PROFILE),

  // Update user profile
  updateProfile: (data: Partial<AuthResponse['user']>): Promise<AuthResponse['user']> =>
    api.put(API_ENDPOINTS.AUTH.PROFILE, data),

  // Change password
  changePassword: (data: ChangePasswordRequest): Promise<{ message: string }> =>
    api.post('/auth/change-password', data),

  // Forgot password
  forgotPassword: (data: ForgotPasswordRequest): Promise<{ message: string }> =>
    api.post('/auth/forgot-password', data),

  // Reset password
  resetPassword: (data: ResetPasswordRequest): Promise<{ message: string }> =>
    api.post('/auth/reset-password', data),

  // Verify email
  verifyEmail: (token: string): Promise<{ message: string }> =>
    api.post(`/auth/verify-email/${token}`),

  // Resend verification email
  resendVerification: (): Promise<{ message: string }> =>
    api.post('/auth/resend-verification'),

  // Delete account
  deleteAccount: (password: string): Promise<{ message: string }> =>
    api.delete('/auth/account', { data: { password } }),

  // Upload profile avatar
  uploadAvatar: (file: File, onProgress?: (progress: number) => void): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.upload('/auth/avatar', formData, onProgress);
  },
};
