import React, { type ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import Footer from '../Footer';
import { useAuth } from '../../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = false,
  showFooter = true 
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && isAuthenticated && (
          <div className="hidden md:block w-64 bg-white dark:bg-secondary-800 shadow-sm">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
