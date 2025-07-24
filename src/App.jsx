import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import Candidates from './pages/Candidates';
import PostJob from './pages/PostJob';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/404';
import AuthProvider from './context/AuthContext';
import JobProvider from './context/jobContext';
import ApplicationProvider from './context/applicationContext';
import ApplyJob from './pages/applyJob';
import CandidateDashboard from './pages/CandidateDashboard';
import MainLayout from './layouts/MainLayout';
import DashboardProtect from './components/DashboardProtect';
import CompanyProfile from './pages/CompanyProfile';
import VerifyAccount from './pages/VerifyAccount';
import ForgotPassword from './pages/ForgetPassword';
import { Toaster } from 'sonner';
import IsEmployer from './components/isEmployer';
import IsCandidate from './components/IsCandidate';
import CompanyDashboard from './pages/CompanyDashboard';
import { DashboardProvider } from './context/CompanyContext';
import ResetPassword from './pages/ResetPassword';
import AdminProvider from './context/AdminContext';
import IsAdmin from './components/IsAdmin';
import CanPostJob from './components/CanPostJob';
import AdminDashboard from './layouts/AdminDashboard';
import DashboardOverview from './pages/Admin/DashboardPage';
import UsersManagement from './pages/Admin/User';
import JobsManagement from './pages/Admin/Jobs';
import CompaniesManagement from './pages/Admin/Company';
import AnalyticsPage from './pages/Admin/Analytics';
import SettingsPage from './pages/Admin/Setting';
import ResendVerification from './pages/ResendVerificationMail';
import VerifyEmailSent from './pages/VerifyEmailSent';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <JobProvider>
            <DashboardProvider>
              <ApplicationProvider>
                <div className="flex flex-col min-h-screen">
                  <main className="flex-grow">
                    <Toaster position='top-right' />
                    <Routes>
                      {/* Public routes with MainLayout */}
                      <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetails />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/:id" element={<CompanyDetails />} />
                        <Route path="/candidates" element={<Candidates />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/verify-account/:token" element={<VerifyAccount />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/resend-verification" element={<ResendVerification />} />
                        <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
                        <Route element={<DashboardProtect />}>
                          <Route element={<IsCandidate />}>
                            <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
                          </Route>
                          <Route path="/apply/:id" element={<ApplyJob />} />
                          <Route element={<IsEmployer />}>
                            <Route path="/dashboard/company/profile" element={<CompanyProfile />} />
                            <Route path="/dashboard/company" element={<CompanyDashboard />} />
                          </Route>
                          <Route element={<CanPostJob />}>
                            <Route path="/post-job" element={<PostJob />} />
                          </Route>
                        </Route>
                      </Route>

                      {/* Protected dashboard routes */}

                      {/* Admin routes with AdminLayout and protection */}
                      <Route element={<DashboardProtect />}>
                        <Route element={<IsAdmin />}>
                          <Route path="/admin" element={<AdminDashboard />}>
                            <Route index element={<DashboardOverview />} />
                            <Route path="users" element={<UsersManagement />} />
                            <Route path="jobs" element={<JobsManagement />} />
                            <Route path="companies" element={<CompaniesManagement />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                          </Route>
                        </Route>
                      </Route>

                      {/* 404 route - must be last */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </ApplicationProvider>
            </DashboardProvider>
          </JobProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;