import React from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import { DemoAuthProvider } from './contexts/DemoAuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import AppRouter from './router/AppRouter';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <DemoAuthProvider>
          <AppRouter />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="z-50"
          />
        </DemoAuthProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
};

export default App;
