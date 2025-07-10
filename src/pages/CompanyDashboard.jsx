import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBriefcase, FiUsers, FiDollarSign, FiBarChart2, 
  FiSettings, FiBell, FiMessageSquare, FiBookmark,
  FiCalendar, FiCheckCircle, FiClock, FiSearch,
  FiX
} from 'react-icons/fi';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applicants: 24,
      status: 'Active',
      posted: '2 days ago',
      views: 156
    },
    {
      id: 2,
      title: 'UX Designer',
      applicants: 18,
      status: 'Active',
      posted: '1 week ago',
      views: 98
    },
    {
      id: 3,
      title: 'Backend Engineer',
      applicants: 32,
      status: 'Closed',
      posted: '3 weeks ago',
      views: 210
    }
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      job: 'Senior Frontend Developer',
      status: 'New',
      applied: '2 hours ago',
      match: '85%'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      job: 'UX Designer',
      status: 'Interview',
      applied: '1 day ago',
      match: '92%'
    },
    {
      id: 3,
      name: 'David Kim',
      job: 'Backend Engineer',
      status: 'Rejected',
      applied: '3 days ago',
      match: '76%'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Company Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-primary relative">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-primary">
                <FiMessageSquare size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span>AD</span>
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
                  <FiBarChart2 className="mr-3" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'jobs' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBriefcase className="mr-3" />
                  <span>Jobs</span>
                </button>
                <button
                  onClick={() => setActiveTab('candidates')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'candidates' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiUsers className="mr-3" />
                  <span>Candidates</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'analytics' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiDollarSign className="mr-3" />
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

              <div className="mt-8">
                <Link
                  to="/post-job"
                  className="w-full flex justify-center py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-accent"
                >
                  Post New Job
                </Link>
              </div>
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
                        <p className="text-gray-500">Active Jobs</p>
                        <h3 className="text-2xl font-bold mt-1">5</h3>
                      </div>
                      <div className="p-3 rounded-full bg-blue-100 text-primary">
                        <FiBriefcase size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Total Applicants</p>
                        <h3 className="text-2xl font-bold mt-1">74</h3>
                      </div>
                      <div className="p-3 rounded-full bg-green-100 text-green-500">
                        <FiUsers size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Interviewing</p>
                        <h3 className="text-2xl font-bold mt-1">12</h3>
                      </div>
                      <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                        <FiCalendar size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[
                      { id: 1, action: 'Sarah Miller applied to UX Designer', time: '2 hours ago', status: 'new' },
                      { id: 2, action: 'You posted Backend Engineer job', time: '1 day ago', status: 'job' },
                      { id: 3, action: 'David Kim rejected for Backend role', time: '2 days ago', status: 'rejected' }
                    ].map(item => (
                      <div key={item.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className={`p-2 rounded-full mr-4 ${
                          item.status === 'new' ? 'bg-blue-100 text-primary' :
                          item.status === 'job' ? 'bg-green-100 text-green-500' :
                          'bg-red-100 text-red-500'
                        }`}>
                          {item.status === 'new' && <FiUsers size={16} />}
                          {item.status === 'job' && <FiBriefcase size={16} />}
                          {item.status === 'rejected' && <FiX size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-gray-500 text-sm">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Jobs */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Jobs</h2>
                    <Link to="/jobs" className="text-primary hover:underline">View All</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.map(job => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{job.title}</div>
                              <div className="text-sm text-gray-500">Posted {job.posted}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{job.applicants}</div>
                              <div className="text-sm text-gray-500">{job.views} views</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Link to={`/dashboard/jobs/${job.id}`} className="text-primary hover:text-accent mr-3">View</Link>
                              <button className="text-gray-600 hover:text-gray-900">Edit</button>
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-xl font-bold">Your Job Posts</h2>
                  <div className="mt-4 md:mt-0">
                    <Link 
                      to="/post-job"
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent"
                    >
                      Post New Job
                    </Link>
                  </div>
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center text-gray-600">
                              <FiUsers className="mr-1" /> {job.applicants} applicants
                            </span>
                            <span className="flex items-center text-gray-600">
                              <FiClock className="mr-1" /> Posted {job.posted}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                          <Link 
                            to={`/dashboard/jobs/${job.id}`}
                            className="px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm font-medium hover:bg-blue-100"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'candidates' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">Candidate Pipeline</h2>
                    <div className="mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search candidates..."
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex overflow-x-auto mb-6">
                    <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium whitespace-nowrap">
                      All Candidates
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      New
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      Screening
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      Interview
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      Offer
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      Hired
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 font-medium whitespace-nowrap hover:text-primary">
                      Rejected
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied For</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {applicants.map(applicant => (
                          <tr key={applicant.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-600">{applicant.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">{applicant.name}</div>
                                  <div className="text-sm text-gray-500">Applied {applicant.applied}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">{applicant.job}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                applicant.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {applicant.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: applicant.match }}
                                  ></div>
                                </div>
                                <span>{applicant.match}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary hover:text-accent mr-3">View</button>
                              <button className="text-gray-600 hover:text-gray-900">Message</button>
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

export default CompanyDashboard;