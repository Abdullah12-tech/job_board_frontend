// AdminDashboard.jsx
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  FiUsers, FiBriefcase, FiHome, FiSettings, FiBarChart2,
  FiCheckCircle, FiXCircle, FiAlertCircle, FiSearch,
  FiDollarSign, FiMessageSquare, FiBell, FiPieChart
} from 'react-icons/fi';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/Admin/AdminHeader';

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getActiveTab = () => {
    if (location.pathname.includes('/users')) return 'users';
    if (location.pathname.includes('/jobs')) return 'jobs';
    if (location.pathname.includes('/companies')) return 'companies';
    if (location.pathname.includes('/analytics')) return 'analytics';
    if (location.pathname.includes('/settings')) return 'settings';
    return 'overview';
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div
          className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex flex-col w-64 h-full bg-white shadow-xl transform transition-all duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }">
          <AdminSidebar activeTab={activeTab} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:z-40">
        <div className="flex flex-col w-64 h-full border-r border-gray-200 bg-white">
          <AdminSidebar activeTab={activeTab} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 w-0 flex-1">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 relative pb-8 focus:outline-none">
          <div className="mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;