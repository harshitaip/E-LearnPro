import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  enrolledCourses?: string[];
  createdCourses?: string[];
}

interface DemoAuthContextType {
  user: DemoUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

// Demo accounts for testing
export const DEMO_ACCOUNTS: DemoUser[] = [
  // Student Accounts
  {
    id: '1',
    email: 'student@learninghub.edu',
    name: 'Harshita',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshita&backgroundColor=b6e3f4',
    enrolledCourses: [
      'jee-physics', 'neet-chemistry', 'gate-cs', 'web-dev-bootcamp', 
      'ml-fundamentals', 'android-development', 'python-mastery', 'react-advanced',
      'data-structures', 'system-design', 'cloud-computing', 'cybersecurity',
      'digital-marketing', 'ui-ux-design', 'blockchain-fundamentals', 'ios-development',
      'java-programming', 'database-management'
    ],
    department: 'Computer Science Engineering',
    studentId: 'CSE2023001'
  },
  {
    id: '2',
    email: 'student2@learninghub.edu',
    name: 'Harshita',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshita2&backgroundColor=fecaca',
    enrolledCourses: [
      'neet-biology', 'neet-physics', 'neet-chemistry', 'organic-chemistry', 
      'medical-entrance', 'biochemistry', 'anatomy-physiology'
    ],
    department: 'Biotechnology',
    studentId: 'BT2023002'
  },
  
  // Instructor Accounts
  {
    id: '4',
    email: 'instructor@learninghub.edu',
    name: 'Harshita',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitainst&backgroundColor=e2e8f0',
    createdCourses: [
      'jee-physics', 'gate-physics', 'engineering-mechanics', 'quantum-physics', 
      'thermodynamics', 'advanced-mathematics', 'web-dev-bootcamp', 'ml-fundamentals',
      'android-development', 'react-advanced', 'python-mastery', 'data-structures',
      'system-design', 'cloud-computing', 'cybersecurity'
    ],
    department: 'Physics Department',
    employeeId: 'PHY001'
  },
  {
    id: '5',
    email: 'instructor2@learninghub.edu',
    name: 'Harshita',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitainst2&backgroundColor=fef3c7',
    createdCourses: [
      'neet-chemistry', 'organic-chemistry', 'inorganic-chemistry', 
      'physical-chemistry', 'biochemistry', 'medical-entrance'
    ],
    department: 'Chemistry Department',
    employeeId: 'CHE002'
  },

  // Admin Accounts
  {
    id: '7',
    email: 'admin@learninghub.edu',
    name: 'Harshita',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaadmin&backgroundColor=ddd6fe',
    department: 'Administration',
    employeeId: 'ADM001'
  },
  {
    id: '8',
    email: 'admin2@learninghub.edu',
    name: 'Harshita',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harshitaadmin2&backgroundColor=fee2e2',
    department: 'Academic Administration',
    employeeId: 'ADM002'
  }
];

export const DemoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('demoUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('DemoAuth login called with:', email);
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in demo accounts
    const foundUser = DEMO_ACCOUNTS.find(account => account.email === email);
    console.log('Found user:', foundUser);
    
    // Check password based on role or accept demo123 for all
    const validPasswords = ['demo123', 'student123', 'instructor123', 'admin123'];
    
    if (foundUser && validPasswords.includes(password)) {
      console.log('Login successful, setting user:', foundUser);
      setUser(foundUser);
      localStorage.setItem('demoUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    console.log('Login failed');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};

// Demo account information for display
export const DEMO_CREDENTIALS = {
  student: {
    email: 'student@learninghub.edu',
    password: 'demo123',
    name: 'Harshita',
    description: 'Computer Science Student'
  },
  instructor: {
    email: 'instructor@learninghub.edu',
    password: 'demo123',
    name: 'Harshita',
    description: 'Physics Department Faculty'
  },
  admin: {
    email: 'admin@learninghub.edu',
    password: 'demo123',
    name: 'Harshita',
    description: 'System Administrator'
  }
};
