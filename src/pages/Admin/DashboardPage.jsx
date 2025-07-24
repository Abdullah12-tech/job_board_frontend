// DashboardOverview.jsx
import { useEffect } from 'react';
import { FiUsers, FiBriefcase, FiPieChart } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';
import StatCard from '../../components/Admin/StatsCard';
import RecentActivityTable from '../../components/Admin/RecentActivities';

const DashboardOverview = () => {
  const { stats, fetchDashboardStats, loading } = useAdmin();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (loading && !stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <RecentActivityTable activities={stats?.recentActivities || []} />
      </div>
    </div>
  );
};

export default DashboardOverview;