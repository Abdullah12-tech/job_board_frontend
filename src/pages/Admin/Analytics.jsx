import { useEffect } from 'react';
import { FiUsers, FiBriefcase, FiPieChart, FiDollarSign } from 'react-icons/fi';
import StatCard from '../../components/Admin/StatsCard';
import { useAdmin } from '../../context/AdminContext';

const AnalyticsPage = () => {
  const { stats, fetchDashboardStats, loading } = useAdmin();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (loading && !stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers} 
          change="12" 
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-100"
          iconColor="text-primary"
        />
        <StatCard 
          title="Active Companies" 
          value={stats?.totalCompanies} 
          change="5" 
          icon={<FiBriefcase size={20} />}
          iconBg="bg-green-100"
          iconColor="text-green-500"
        />
        <StatCard 
          title="Active Jobs" 
          value={stats?.activeJobs} 
          change="-3" 
          icon={<FiPieChart size={20} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-500"
        />
        <StatCard 
          title="Revenue" 
          value={`$${(stats?.revenue || 0).toLocaleString()}`} 
          change="8" 
          icon={<FiDollarSign size={20} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-500"
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4">User Growth</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">User growth chart will be displayed here</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4">Job Postings</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Job postings chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;