import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBriefcase, FiUsers, FiDollarSign, FiBarChart2,
  FiSettings, FiBell, FiMessageSquare, FiBookmark,
  FiCalendar, FiCheckCircle, FiClock, FiSearch,
  FiX,
  FiUser,
  FiEdit2,
  FiGlobe,
  FiLinkedin,
  FiMapPin,
  FiMail,
  FiPhone,
  FiSave
} from 'react-icons/fi';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';



const profileSchema = yup.object({
  companyName: yup.string().required('Company name is required'),
  website: yup.string().url('Enter a valid URL').required('Website is required'),
  linkedin: yup.string().url('Enter a valid URL').nullable(),
  description: yup.string().max(500, 'Description must be less than 500 characters').required('Description is required'),
  industry: yup.string().required('Industry is required'),
  companySize: yup.string().required('Company size is required'),
  location: yup.string().required('Location is required'),
  phone: yup.string().nullable(),
  email: yup.string().email('Enter a valid email').required('Email is required'),
});
const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
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



  //profile functions
  const [isEditing, setIsEditing] = useState(false);
    const [logo, setLogo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(profileSchema),
      defaultValues: {
        companyName: 'TechCorp Inc.',
        website: 'https://techcorp.example.com',
        linkedin: 'https://linkedin.com/company/techcorp',
        description: 'A leading technology company specializing in innovative software solutions for businesses worldwide.',
        industry: 'Technology',
        companySize: '51-200',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        email: 'contact@techcorp.example.com',
      },
    });
  
    const onSubmit = async (data) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Profile updated:', data);
      setIsEditing(false);
      setIsLoading(false);
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleCancelClick = () => {
      reset();
      setIsEditing(false);
    };
  
    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogo(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'jobs' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBriefcase className="mr-3" />
                  <span>Jobs</span>
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
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-8 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {logo ? (
                          <img
                            src={logo}
                            alt="Company logo"
                            className="w-16 h-16 rounded-full object-cover border-4 border-white"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                            TC
                          </div>
                        )}
                        {isEditing && (
                          <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoChange}
                              className="hidden"
                            />
                            <FiEdit2 className="h-5 w-5 text-blue-600" />
                          </label>
                        )}
                      </div>
                      <div>
                        {isEditing ? (
                          <input
                            {...register('companyName')}
                            className="text-2xl font-bold bg-white/20 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <h1 className="text-2xl font-bold">TechCorp Inc.</h1>
                        )}
                        <p className="text-blue-100">
                          {isEditing ? (
                            <input
                              {...register('industry')}
                              className="text-sm bg-white/20 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            'Technology'
                          )}
                        </p>
                      </div>
                    </div>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancelClick}
                          className="px-4 py-2 bg-white/20 rounded hover:bg-white/30"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit(onSubmit)}
                          disabled={isLoading}
                          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 flex items-center"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FiSave className="mr-1" />
                              Save
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 flex items-center"
                      >
                        <FiEdit2 className="mr-1" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Company Information</h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Description</label>
                          {isEditing ? (
                            <>
                              <textarea
                                {...register('description')}
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                              {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                              )}
                            </>
                          ) : (
                            <p className="mt-1 text-gray-700">
                              A leading technology company specializing in innovative software solutions for businesses worldwide.
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500">Website</label>
                          {isEditing ? (
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiGlobe className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('website')}
                                type="url"
                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                              {errors.website && (
                                <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                              )}
                            </div>
                          ) : (
                            <a
                              href="https://techcorp.example.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-blue-600 hover:underline flex items-center"
                            >
                              <FiGlobe className="mr-1" />
                              techcorp.example.com
                            </a>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500">LinkedIn</label>
                          {isEditing ? (
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLinkedin className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('linkedin')}
                                type="url"
                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="https://linkedin.com/company/yourcompany"
                              />
                              {errors.linkedin && (
                                <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
                              )}
                            </div>
                          ) : (
                            <a
                              href="https://linkedin.com/company/techcorp"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-blue-600 hover:underline flex items-center"
                            >
                              <FiLinkedin className="mr-1" />
                              linkedin.com/company/techcorp
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Location</label>
                          {isEditing ? (
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMapPin className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('location')}
                                type="text"
                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                              {errors.location && (
                                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                              )}
                            </div>
                          ) : (
                            <p className="mt-1 text-gray-700 flex items-center">
                              <FiMapPin className="mr-1" />
                              San Francisco, CA
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500">Company Size</label>
                          {isEditing ? (
                            <select
                              {...register('companySize')}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                              <option value="">Select company size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="501-1000">501-1000 employees</option>
                              <option value="1001+">1001+ employees</option>
                            </select>
                          ) : (
                            <p className="mt-1 text-gray-700 flex items-center">
                              <FiUsers className="mr-1" />
                              51-200 employees
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500">Contact Email</label>
                          {isEditing ? (
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('email')}
                                type="email"
                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                              {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                              )}
                            </div>
                          ) : (
                            <a
                              href="mailto:contact@techcorp.example.com"
                              className="mt-1 text-blue-600 hover:underline flex items-center"
                            >
                              <FiMail className="mr-1" />
                              contact@techcorp.example.com
                            </a>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                          {isEditing ? (
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('phone')}
                                type="tel"
                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                            </div>
                          ) : (
                            <a
                              href="tel:+15551234567"
                              className="mt-1 text-blue-600 hover:underline flex items-center"
                            >
                              <FiPhone className="mr-1" />
                              +1 (555) 123-4567
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
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
                          <span className={`px-3 py-1 text-sm rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
                              <span className={`px-2 py-1 text-xs rounded-full ${applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
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