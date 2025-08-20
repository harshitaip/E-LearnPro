import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDemoAuth } from '../contexts/DemoAuthContext';
import { USER_ROLES, ROUTES } from '../utils/constants';
import { PageLoader } from '../components/Loader';
import Layout from '../components/Layout/Layout';

// Lazy load pages for code splitting
const HomePage = React.lazy(() => import('../pages/Home'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const DemoLoginPage = React.lazy(() => import('../pages/DemoLogin'));
const DemoDashboardPage = React.lazy(() => import('../pages/DemoDashboard'));
const SignupPage = React.lazy(() => import('../pages/Signup'));
const ForgotPasswordPage = React.lazy(() => import('../pages/ForgotPassword'));
const ResetPasswordPage = React.lazy(() => import('../pages/ResetPassword'));
const TermsPage = React.lazy(() => import('../pages/Terms'));
const PrivacyPage = React.lazy(() => import('../pages/Privacy'));
const CoursesPage = React.lazy(() => import('../pages/CourseCatalog'));
const CourseDetailPage = React.lazy(() => import('../pages/CourseDetail'));
const QuizPage = React.lazy(() => import('../pages/QuizPage'));
const QuizResultsPage = React.lazy(() => import('../pages/QuizResults'));
const StudentDashboardPage = React.lazy(() => import('../pages/StudentDashboard'));
const InstructorDashboardPage = React.lazy(() => import('../pages/InstructorDashboard'));
const AdminDashboardPage = React.lazy(() => import('../pages/AdminDashboard'));
const CreateCoursePage = React.lazy(() => import('../pages/CreateCourse'));
const ProfilePage = React.lazy(() => import('../pages/Profile'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound'));

// Navigation pages
const CompetitiveExamsPage = React.lazy(() => import('../pages/CompetitiveExams'));
const SkillDevelopmentPage = React.lazy(() => import('../pages/SkillDevelopment'));
const AnalyticsPage = React.lazy(() => import('../pages/Analytics'));
const InstructorCoursesPage = React.lazy(() => import('../pages/InstructorCourses'));

// Footer pages
const AboutPage = React.lazy(() => import('../pages/About'));
const ContactPage = React.lazy(() => import('../pages/Contact'));
const BrowseCoursesPage = React.lazy(() => import('../pages/Courses'));
const CategoriesPage = React.lazy(() => import('../pages/Categories'));
const FreeCoursesPage = React.lazy(() => import('../pages/FreeCourses'));
const CertificatesPage = React.lazy(() => import('../pages/Certificates'));
const HelpCenterPage = React.lazy(() => import('../pages/HelpCenter'));

// Demo and testing pages
const TwoFactorDemoPage = React.lazy(() => import('../pages/TwoFactorDemo'));
const CaptchaDemoPage = React.lazy(() => import('../pages/CaptchaDemo'));

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  requireAuth = true,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    if (!user || !requiredRoles.includes(user.role)) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  return <>{children}</>;
};

// Demo Protected Route Component
interface DemoProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const DemoProtectedRoute: React.FC<DemoProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { user } = useDemoAuth();

  if (!user) {
    return <Navigate to="/demo-login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(user.role)) {
      return <Navigate to="/demo-login" replace />;
    }
  }

  return <>{children}</>;
};

// Guest Route Component (redirect if authenticated)
interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated && user) {
    switch (user.role) {
      case USER_ROLES.STUDENT:
        return <Navigate to="/student/dashboard" replace />;
      case USER_ROLES.INSTRUCTOR:
        return <Navigate to="/instructor/dashboard" replace />;
      case USER_ROLES.ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Layout><HomePage /></Layout>} />
          
          {/* Auth Routes (Guest Only) */}
          <Route path={ROUTES.LOGIN} element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path={ROUTES.SIGNUP} element={<GuestRoute><SignupPage /></GuestRoute>} />
          <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
          <Route path="/reset-password" element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />

          {/* Demo Routes */}
          <Route path="/demo-login" element={<DemoLoginPage />} />
          <Route path="/demo/dashboard" element={
            <DemoProtectedRoute>
              <DemoDashboardPage />
            </DemoProtectedRoute>
          } />

          {/* Demo Role-Specific Routes */}
          <Route path="/demo/student-dashboard" element={
            <DemoProtectedRoute requiredRoles={['student']}>
              <Layout><StudentDashboardPage /></Layout>
            </DemoProtectedRoute>
          } />
          <Route path="/demo/instructor-dashboard" element={
            <DemoProtectedRoute requiredRoles={['instructor']}>
              <Layout><InstructorDashboardPage /></Layout>
            </DemoProtectedRoute>
          } />
          <Route path="/demo/admin-dashboard" element={
            <DemoProtectedRoute requiredRoles={['admin']}>
              <Layout><AdminDashboardPage /></Layout>
            </DemoProtectedRoute>
          } />

          {/* Demo and Testing Routes */}
          <Route path="/demo/2fa" element={<TwoFactorDemoPage />} />
          <Route path="/demo/captcha" element={<CaptchaDemoPage />} />

          {/* Course Routes */}
          <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
          <Route path="/course/:id" element={<Layout><CourseDetailPage /></Layout>} />
          <Route path="/quiz/:id" element={
            <ProtectedRoute>
              <Layout><QuizPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/quiz/:id/results" element={
            <ProtectedRoute>
              <Layout><QuizResultsPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.STUDENT]}>
              <Layout><StudentDashboardPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.STUDENT]}>
              <Layout><ProfilePage /></Layout>
            </ProtectedRoute>
          } />

          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.INSTRUCTOR]}>
              <Layout><InstructorDashboardPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/instructor/courses" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.INSTRUCTOR]}>
              <Layout><InstructorCoursesPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/instructor/create-course" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.INSTRUCTOR]}>
              <Layout><CreateCoursePage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/instructor/profile" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.INSTRUCTOR]}>
              <Layout><ProfilePage /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
              <Layout><AdminDashboardPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
              <Layout><AnalyticsPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Navigation Pages */}
          <Route path="/competitive-exams" element={<Layout><CompetitiveExamsPage /></Layout>} />
          <Route path="/skill-development" element={<Layout><SkillDevelopmentPage /></Layout>} />

          {/* Footer Pages */}
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/browse-courses" element={<Layout><BrowseCoursesPage /></Layout>} />
          <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
          <Route path="/free-courses" element={<Layout><FreeCoursesPage /></Layout>} />
          <Route path="/certificates" element={<Layout><CertificatesPage /></Layout>} />
          <Route path="/help" element={<Layout><HelpCenterPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
