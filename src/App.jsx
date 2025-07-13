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
import JobProtect from './components/ProtectJobs';
import AuthProvider from './context/AuthContext';
import JobProvider from './context/jobContext';
import ApplicationProvider from './context/applicationContext';
import ApplyJob from './pages/applyJob';
import CandidateDashboard from './pages/CandidateDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MainLayout from './layouts/MainLayout';
import DashboardProtect from './components/DashboardProtect';
import CompanyProfile from './pages/CompanyProfile';
import VerifyAccount from './pages/VerifyAccount';
import ForgotPassword from './pages/ForgetPassword';
import { Toaster } from 'sonner';
import IsEmployer from './components/isEmployer';
import IsCandidate from './components/IsCandidate';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <ApplicationProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <Toaster position='top right' />
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/companies/:id" element={<CompanyDetails />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route element={<DashboardProtect />}>
                      <Route element={<IsCandidate />}>
                        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
                      </Route>
                        <Route path="/apply/:id" element={<ApplyJob />} />
                      <Route element={<IsEmployer />}>
                        <Route path="/dashboard/company/profile" element={<CompanyProfile />} />
                        <Route path="/dashboard/company" element={<CompanyDashboard />} />
                        <Route path="/post-job" element={<PostJob />} />
                      </Route>
                    </Route>
                    <Route path="/verify-account/:token" element={<VerifyAccount />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<JobProtect />}>
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                  <Route>
                    <Route path='/dashboard/admin' element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </main>
            </div>
          </ApplicationProvider>
        </JobProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;