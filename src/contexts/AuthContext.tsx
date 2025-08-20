import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { authAPI } from '../api/auth';
import { LOCAL_STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { storage, isTokenExpired } from '../utils/helpers';
import { toast } from 'react-toastify';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
  isStudent: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
}

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; accessToken: string; refreshToken: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User };

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return initialState;

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    dispatch({ type: 'AUTH_START' });

    try {
      const accessToken = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      const refreshToken = storage.get<string>(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

      if (accessToken && !isTokenExpired(accessToken)) {
        // Token is valid, get user profile
        const user = await authAPI.getProfile();
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, accessToken, refreshToken: refreshToken || '' },
        });
      } else if (refreshToken && !isTokenExpired(refreshToken)) {
        // Try to refresh token
        try {
          const response = await authAPI.refreshToken({ refreshToken });
          storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
          
          if (response.refreshToken) {
            storage.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
          }

          const user = await authAPI.getProfile();
          
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken || refreshToken,
            },
          });
        } catch (error) {
          // Refresh failed, clear storage
          storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
          storage.remove(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
          dispatch({ type: 'AUTH_FAILURE', payload: 'Session expired' });
        }
      } else {
        // No valid tokens
        dispatch({ type: 'AUTH_FAILURE', payload: 'No valid session found' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await authAPI.login({ email, password });
      
      // Store tokens
      storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
      storage.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      });

      toast.success(`Welcome back, ${response.user.firstName}!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }): Promise<void> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await authAPI.signup(data);
      
      // Store tokens
      storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
      storage.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      });

      toast.success(`Welcome to E Learning Platform, ${response.user.firstName}!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear storage regardless of API call success
      storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      dispatch({ type: 'AUTH_LOGOUT' });
      toast.info('You have been logged out');
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await authAPI.updateProfile(data);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      toast.success('Profile updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const checkAuth = async (): Promise<void> => {
    if (state.isAuthenticated && state.user) return;
    await initializeAuth();
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!state.user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(state.user.role);
    }
    
    return state.user.role === role;
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
    checkAuth,
    hasRole,
    isStudent: hasRole(USER_ROLES.STUDENT),
    isInstructor: hasRole(USER_ROLES.INSTRUCTOR),
    isAdmin: hasRole(USER_ROLES.ADMIN),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
