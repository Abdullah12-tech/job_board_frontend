import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiBriefcase, FiHome, FiSettings, FiBarChart2,
  FiCheckCircle, FiXCircle, FiAlertCircle, FiSearch,
  FiDollarSign, FiMessageSquare, FiBell, FiPieChart
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with API calls
  const [pendingCompanies, setPendingCompanies] = useState([
    {
      id: 1,
      name: 'TechStart Inc',
      email: 'admin@techstart.com',
      date: '2023-05-15',
      jobs: 0
    },
    {
      id: 2,
      name: 'DesignHub LLC',
      email: 'hr@designhub.com',
      date: '2023-05-18',
      jobs: 2
    }
  ]);

  const [recentJobs, setRecentJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      status: 'active',
      date: '2 hours ago',
      flagged: false
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'CreativeMinds',
      status: 'pending',
      date: '1 day ago',
      flagged: true
    },
    {
      id: 3,
      title: 'Backend Engineer (Node.js)',
      company: 'DevSolutions',
      status: 'active',
      date: '2 days ago',
      flagged: false
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'job_seeker',
      status: 'active',
      joined: '2023-04-10'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah@designhub.com',
      role: 'employer',
      status: 'pending',
      joined: '2023-05-05'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@jobboard.com',
      role: 'admin',
      status: 'active',
      joined: '2023-01-15'
    }
  ]);

  const approveCompany = (id) => {
    setPendingCompanies(pendingCompanies.filter(company => company.id !== id));
    // API call to approve company would go here
  };

  const rejectCompany = (id) => {
    setPendingCompanies(pendingCompanies.filter(company => company.id !== id));
    // API call to reject company would go here
  };

  const toggleJobStatus = (id) => {
    setRecentJobs(recentJobs.map(job => 
      job.id === id 
        ? { ...job, status: job.status === 'active' ? 'pending' : 'active' } 
        : job
    ));
    // API call to update job status would go here
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' } 
        : user
    ));
    // API call to update user status would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-primary relative">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span>A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'overview' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiHome className="mr-3" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'companies' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBriefcase className="mr-3" />
                  <span>Companies</span>
                  {pendingCompanies.length > 0 && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                      {pendingCompanies.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'jobs' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBriefcase className="mr-3" />
                  <span>Jobs</span>
                  <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    {recentJobs.filter(j => j.flagged).length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'users' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiUsers className="mr-3" />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'analytics' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-3" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'settings' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1">1,248</h3>
                        <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-100 text-primary">
                        <FiUsers size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Active Companies</p>
                        <h3 className="text-2xl font-bold mt-1">186</h3>
                        <p className="text-sm text-green-500 mt-1">↑ 5% from last month</p>
                      </div>
                      <div className="p-3 rounded-full bg-green-100 text-green-500">
                        <FiBriefcase size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Active Jobs</p>
                        <h3 className="text-2xl font-bold mt-1">542</h3>
                        <p className="text-sm text-red-500 mt-1">↓ 3% from last month</p>
                      </div>
                      <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                        <FiPieChart size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold">Pending Companies</h2>
                      <Link to="/admin/companies" className="text-primary hover:underline">View All</Link>
                    </div>
                    
                    {pendingCompanies.length > 0 ? (
                      <div className="space-y-4">
                        {pendingCompanies.slice(0, 3).map(company => (
                          <div key={company.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                            <div>
                              <h3 className="font-medium">{company.name}</h3>
                              <p className="text-sm text-gray-500">{company.email}</p>
                              <p className="text-xs text-gray-400 mt-1">Applied on {company.date}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => approveCompany(company.id)}
                                className="p-2 text-green-500 bg-green-50 rounded-lg hover:bg-green-100"
                              >
                                <FiCheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => rejectCompany(company.id)}
                                className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"
                              >
                                <FiXCircle size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No pending company approvals</p>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold">Flagged Jobs</h2>
                      <Link to="/admin/jobs" className="text-primary hover:underline">View All</Link>
                    </div>
                    
                    {recentJobs.filter(j => j.flagged).length > 0 ? (
                      <div className="space-y-4">
                        {recentJobs.filter(j => j.flagged).slice(0, 3).map(job => (
                          <div key={job.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <p className="text-sm text-gray-500">{job.company}</p>
                              <p className="text-xs text-gray-400 mt-1">Posted {job.date}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => toggleJobStatus(job.id)}
                                className="px-3 py-1 text-sm bg-blue-50 text-primary rounded-lg hover:bg-blue-100"
                              >
                                {job.status === 'active' ? 'Deactivate' : 'Approve'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No flagged jobs</p>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: 1, action: 'Created new company profile', user: 'TechStart Inc', type: 'company', time: '2 minutes ago' },
                          { id: 2, action: 'Reported job as spam', user: 'job_seeker_42', type: 'moderation', time: '15 minutes ago' },
                          { id: 3, action: 'Applied for Senior Developer', user: 'Alex Johnson', type: 'application', time: '1 hour ago' },
                          { id: 4, action: 'Posted new job', user: 'DesignHub LLC', type: 'job', time: '3 hours ago' }
                        ].map(item => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.action}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.type === 'company' ? 'bg-blue-100 text-blue-800' :
                                item.type === 'moderation' ? 'bg-red-100 text-red-800' :
                                item.type === 'application' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {item.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">Company Management</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search companies..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingCompanies.map(company => (
                          <tr key={company.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{company.name}</div>
                              <div className="text-sm text-gray-500">Registered on {company.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {company.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                Pending Approval
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {company.jobs}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => approveCompany(company.id)}
                                className="text-green-600 hover:text-green-900 mr-3"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => rejectCompany(company.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">Job Moderation</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search jobs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flags</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentJobs.map(job => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{job.title}</div>
                              <div className="text-sm text-gray-500">Posted {job.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.company}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'active' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.flagged ? (
                                <span className="flex items-center text-red-500">
                                  <FiAlertCircle className="mr-1" /> Flagged
                                </span>
                              ) : (
                                <span className="text-gray-400">None</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => toggleJobStatus(job.id)}
                                className={`mr-3 ${
                                  job.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                                }`}
                              >
                                {job.status === 'active' ? 'Deactivate' : 'Approve'}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">User Management</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-600">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">Joined {user.joined}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => toggleUserStatus(user.id)}
                                className={`mr-3 ${
                                  user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                }`}
                              >
                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">User Management</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-600">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">Joined {user.joined}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => toggleUserStatus(user.id)}
                                className={`mr-3 ${
                                  user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                }`}
                              >
                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">User Management</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-600">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">Joined {user.joined}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => toggleUserStatus(user.id)}
                                className={`mr-3 ${
                                  user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                }`}
                              >
                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Add similar sections for analytics and settings tabs */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;