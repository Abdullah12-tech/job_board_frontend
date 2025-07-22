import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBriefcase, FiUsers, FiClock, FiSearch,
  FiMapPin, FiMail, FiPhone, FiEdit2, FiSave,
  FiUser, FiGlobe, FiLinkedin, FiX
} from 'react-icons/fi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DashboardContext from '../context/CompanyContext';
import { authContext } from '../context/AuthContext';
import JobEditModal from '../components/editJobModal';

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
  const { jobs, profile, updateProfile, isLoading } = useContext(DashboardContext);
  const { isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const companySizeOptions = [
    { value: '', label: 'Select company size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.warning('Please log in to access the dashboard');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Initialize form and logo preview
  useEffect(() => {
    if (profile) {
      reset(profile);
      if (profile.companyLogoUrl) {
        setLogoPreview(profile.companyLogoUrl);
      }
    }
  }, [profile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: profile || {
      companyName: '',
      website: '',
      linkedin: '',
      description: '',
      industry: '',
      companySize: '',
      location: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      // Append the logo file if it's a new one
      if (logoFile) {
        formData.append('companyLogo', logoFile);
      }

      await updateProfile(formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      setLogoFile(null); // Reset file after successful upload
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    reset(profile);
    setIsEditing(false);
    setLogoFile(null);
    setLogoPreview(profile?.companyLogoUrl || '');
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB
        toast.error('Image size should be less than 2MB');
        return;
      }

      setLogoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            {activeTab === 'profile' && profile && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-8 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {logoPreview ? (
                          <div className="relative">
                            <img
                              src={logoPreview}
                              alt="Company logo"
                              className="w-16 h-16 rounded-full object-cover border-4 border-white"
                            />
                            {isEditing && (
                              <button
                                onClick={removeLogo}
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow hover:bg-red-600"
                              >
                                <FiX className="h-3 w-3 text-white" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                            {profile.companyName?.charAt(0) || 'C'}
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
                          <h1 className="text-2xl font-bold">{profile.companyName}</h1>
                        )}
                        <p className="text-blue-100">
                          {isEditing ? (
                            <input
                              {...register('industry')}
                              className="text-sm bg-white/20 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            profile.industry
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
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 flex items-center"
                        >
                          {isSubmitting ? (
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

                {/* Profile details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Info */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Company Information</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        {isEditing ? (
                          <>
                            <input
                              {...register('website')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              placeholder="https://example.com"
                            />
                            {errors.website && (
                              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center text-gray-800">
                            <FiGlobe className="mr-2" />
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                              {profile.website}
                            </a>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        {isEditing ? (
                          <>
                            <input
                              {...register('linkedin')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              placeholder="https://linkedin.com/company/example"
                            />
                            {errors.linkedin && (
                              <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center text-gray-800">
                            <FiLinkedin className="mr-2" />
                            {profile.linkedin ? (
                              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                {profile.linkedin}
                              </a>
                            ) : (
                              <span>Not provided</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        {isEditing ? (
                          <>
                            <textarea
                              {...register('description')}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.description && (
                              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-800">{profile.description}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                        {isEditing ? (
                          <select
                            {...register('companySize')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            {companySizeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-800">
                            {companySizeOptions.find(opt => opt.value === profile.companySize)?.label || 'Not specified'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Contact Information</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        {isEditing ? (
                          <>
                            <input
                              {...register('location')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.location && (
                              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center text-gray-800">
                            <FiMapPin className="mr-2" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {isEditing ? (
                          <>
                            <input
                              {...register('email')}
                              type="email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center text-gray-800">
                            <FiMail className="mr-2" />
                            <span>{profile.email}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        {isEditing ? (
                          <>
                            <input
                              {...register('phone')}
                              type="tel"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center text-gray-800">
                            <FiPhone className="mr-2" />
                            <span>{profile.phone || 'Not provided'}</span>
                          </div>
                        )}
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
                    <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                            <span className="flex items-center text-gray-600">
                              <FiMapPin className="mr-1" /> {job.workType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{job.description.substring(0, 100)}...</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {job.status}
                          </span>
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="px-3 py-1 bg-blue-50 text-primary rounded-lg text-sm font-medium hover:bg-blue-100"
                          >
                            Edit
                          </button>
                          <Link
                            to={`/jobs/${job._id}`}
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

            {selectedJob && (
              <JobEditModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;