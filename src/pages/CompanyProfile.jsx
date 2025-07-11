import { useState } from 'react';
import { FiGlobe, FiLinkedin, FiMapPin, FiPhone, FiMail, FiUsers, FiEdit2, FiSave } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
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

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
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
    <div className="max-w-4xl mx-auto p-6">
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
    </div>
  );
};

export default CompanyProfile;