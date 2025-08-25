import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FiBriefcase, FiBookmark, FiUser,
  FiSettings, FiBell, FiMessageSquare,
  FiPlus, FiTrash2, FiEdit, FiX, FiSave
} from 'react-icons/fi';
import { authContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { applicationContext } from '../context/applicationContext';
import { useLocation } from 'react-router-dom';

// Validation Schema
const candidateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  headline: yup.string().max(100, 'Headline must be 100 characters or less'),
  skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
  experiences: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Job title is required'),
      company: yup.string().required('Company name is required'),
      startDate: yup.date().required('Start date is required'),
      endDate: yup.date()
        .when('currentlyWorking', {
          is: false,
          then: yup.date().required('End date is required')
            .min(yup.ref('startDate'), 'End date must be after start date')
        }),
      currentlyWorking: yup.boolean(),
      description: yup.string()
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      institution: yup.string().required('Institution is required'),
      degree: yup.string().required('Degree is required'),
      fieldOfStudy: yup.string().required('Field of study is required'),
      startDate: yup.date().required('Start date is required'),
      endDate: yup.date()
        .when('currentlyStudying', {
          is: false,
          then: yup.date().required('End date is required')
            .min(yup.ref('startDate'), 'End date must be after start date')
        }),
      currentlyStudying: yup.boolean()
    })
  )
});

const CandidateDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const {
    fetchCandidateProfile,
    updateCandidateProfile,
    user,
    setUser
  } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const { fetchUserApplications, applications } = useContext(applicationContext);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [hasFetchedApplications, setHasFetchedApplications] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(candidateSchema),
    defaultValues: {
      name: '',
      email: '',
      headline: '',
      skills: [],
      experiences: [],
      education: []
    }
  });

  const skills = watch('skills') || [];
  const experiences = watch('experiences') || [];
  const education = watch('education') || [];

  // Load profile data on initial mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchCandidateProfile();
        if (profile) {
          reset({
            name: profile.name || '',
            email: profile.email || '',
            headline: profile.headline || '',
            skills: profile.skills || [],
            experiences: profile.experiences || [],
            education: profile.education || []
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to load profile:', error);
        toast.error('Failed to load profile');
        setLoading(false);
      }
    };
    loadProfile();
  }, [fetchCandidateProfile, reset]);

  // Handle tab changes and navigation
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab') || 'profile';
    setActiveTab(tab);

    if (tab === 'applications' && !hasFetchedApplications) {
      fetchApplications();
    }
  }, [location.search, hasFetchedApplications]);

  const fetchApplications = async () => {
    setIsLoadingApplications(true);
    try {
      await fetchUserApplications();
      setHasFetchedApplications(true);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      if (activeTab === 'applications') {
        setHasFetchedApplications(false);
      }
    }
    else if (tab === 'applications') {
      fetchApplications();
    }
  };

  const onSubmit = async (data) => {
    try {
      const apiData = {
        ...data,
        experiences: (data.experiences || []).map(exp => ({
          title: exp.title,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.currentlyWorking ? null : exp.endDate,
          currentlyWorking: exp.currentlyWorking || false,
          description: exp.description || ''
        })),
        education: (data.education || []).map(edu => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: edu.startDate,
          endDate: edu.currentlyStudying ? null : edu.endDate,
          currentlyStudying: edu.currentlyStudying || false,
          description: edu.description || ''
        }))
      };

      const updatedProfile = await updateCandidateProfile(apiData);

      if (updatedProfile) {
        reset({
          ...updatedProfile,
          experiences: updatedProfile.experiences || [],
          education: updatedProfile.education || []
        });
        setEditingExperience(null);
        setEditingEducation(null);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newSkill = e.target.value.trim();
      if (!skills.includes(newSkill)) {
        setValue('skills', [...skills, newSkill], { shouldDirty: true });
      }
      e.target.value = '';
    }
  };

  const handleRemoveSkill = (index) => {
    setValue('skills', skills.filter((_, i) => i !== index), { shouldDirty: true });
  };

  const handleAddExperience = () => {
    setEditingExperience({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    });
  };

  const handleSaveExperience = (exp) => {
    if (exp.currentlyWorking) {
      exp.endDate = null;
    }

    const updatedExperiences = editingExperience.index !== undefined
      ? experiences.map((e, i) => i === editingExperience.index ? exp : e)
      : [...experiences, exp];

    setValue('experiences', updatedExperiences, { shouldDirty: true });
    setEditingExperience(null);
  };

  const handleRemoveExperience = (index) => {
    setValue('experiences', experiences.filter((_, i) => i !== index), { shouldDirty: true });
  };

  const handleAddEducation = () => {
    setEditingEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false
    });
  };

  const handleSaveEducation = (edu) => {
    if (edu.currentlyStudying) {
      edu.endDate = null;
    }

    const updatedEducation = editingEducation.index !== undefined
      ? education.map((e, i) => i === editingEducation.index ? edu : e)
      : [...education, edu];

    setValue('education', updatedEducation, { shouldDirty: true });
    setEditingEducation(null);
  };

  const handleRemoveEducation = (index) => {
    setValue('education', education.filter((_, i) => i !== index), { shouldDirty: true });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-3">
                  {user?.name?.charAt(0)}
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.headline}</p>
              </div>

              <nav className="space-y-2">
                {['profile', 'applications', 'saved', 'notifications', 'messages', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === tab ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {tab === 'profile' && <FiUser className="mr-3" />}
                    {tab === 'applications' && <FiBriefcase className="mr-3" />}
                    {tab === 'saved' && <FiBookmark className="mr-3" />}
                    {tab === 'notifications' && <FiBell className="mr-3" />}
                    {tab === 'messages' && <FiMessageSquare className="mr-3" />}
                    {tab === 'settings' && <FiSettings className="mr-3" />}
                    <span className="capitalize">{tab}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6">Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Basic Info Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Full Name*</label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>

                      <label className="block text-gray-600 text-sm mt-4 mb-1">Email*</label>
                      <input disabled
                        {...register('email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">About</label>
                      <textarea
                        {...register('headline')}
                        placeholder="e.g. Frontend Developer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      ></textarea>
                      <p className="text-red-500 text-sm mt-1">{errors.headline?.message}</p>

                      <label className="block text-gray-600 text-sm mt-4 mb-1">Skills*</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(index)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              <FiX size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add skill and press Enter"
                        onKeyDown={handleAddSkill}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-red-500 text-sm mt-1">{errors.skills?.message}</p>
                    </div>
                  </div>

                  {/* Experience Section */}
                  {/* <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Experience</h2>
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="flex items-center text-primary hover:text-accent"
                      >
                        <FiPlus className="mr-1" /> Add Experience
                      </button>
                    </div>

                    {editingExperience && (
                      <ExperienceForm
                        experience={editingExperience}
                        onSave={handleSaveExperience}
                        onCancel={() => setEditingExperience(null)}
                      />
                    )}

                    {experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((exp, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4 py-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{exp.title}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(exp.startDate).toLocaleDateString()} -{' '}
                                  {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                                </p>
                                {exp.description && (
                                  <p className="mt-2 text-gray-700">{exp.description}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingExperience({ ...exp, index })}
                                  className="text-gray-500 hover:text-primary"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveExperience(index)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      !editingExperience && (
                        <p className="text-gray-500 italic">No experience added yet.</p>
                      )
                    )}
                  </div> */}

                  {/* Education Section */}
                  {/* <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Education</h2>
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="flex items-center text-primary hover:text-accent"
                      >
                        <FiPlus className="mr-1" /> Add Education
                      </button>
                    </div>

                    {editingEducation && (
                      <EducationForm
                        education={editingEducation}
                        onSave={handleSaveEducation}
                        onCancel={() => setEditingEducation(null)}
                      />
                    )}

                    {education.length > 0 ? (
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4 py-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">
                                  {edu.fieldOfStudy}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(edu.startDate).toLocaleDateString()} -{' '}
                                  {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingEducation({ ...edu, index })}
                                  className="text-gray-500 hover:text-primary"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveEducation(index)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      !editingEducation && (
                        <p className="text-gray-500 italic">No education added yet.</p>
                      )
                    )}
                  </div> */}

                  {/* Save Button */}
                  {isDirty && (
                    <div className="mt-8 text-right">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent flex items-center justify-center"
                      >
                        <FiSave className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6">My Applications</h1>

                {isLoadingApplications ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : applications.length === 0 ? (
                  <p className="text-gray-500 italic">No applications yet.</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app, i) => (
                      <div key={app._id || i} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold">{app.jobID?.title}</h2>
                        <p className="text-sm text-gray-500">{app.jobID?.company}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Status: <span className={`font-medium ${app.status === 'rejected' ? 'text-red-500' :
                            app.status === 'accepted' ? 'text-green-500' :
                              'text-yellow-500'
                            }`}>
                            {app.status || 'Pending'}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'applications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-gray-600">
                  {activeTab === 'saved' && 'No saved jobs yet.'}
                  {activeTab === 'notifications' && 'No notifications yet.'}
                  {activeTab === 'messages' && 'No messages yet.'}
                  {activeTab === 'settings' && 'Settings panel coming soon.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// const ExperienceForm = ({ experience, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: experience.title || '',
//     company: experience.company || '',
//     location: experience.location || '',
//     startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
//     endDate: experience.endDate && !experience.currentlyWorking ? new Date(experience.endDate).toISOString().split('T')[0] : '',
//     currentlyWorking: experience.currentlyWorking || false,
//     description: experience.description || ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = 'Job title is required';
//     if (!formData.company.trim()) newErrors.company = 'Company name is required';
//     if (!formData.startDate) newErrors.startDate = 'Start date is required';
    
//     if (!formData.currentlyWorking) {
//       if (!formData.endDate) {
//         newErrors.endDate = 'End date is required';
//       } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
//         newErrors.endDate = 'End date must be after start date';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       onSave({
//         ...formData,
//         startDate: new Date(formData.startDate),
//         endDate: formData.currentlyWorking ? null : new Date(formData.endDate),
//         currentlyWorking: formData.currentlyWorking
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//       <h3 className="font-bold mb-3">
//         {experience.index !== undefined ? 'Edit Experience' : 'Add New Experience'}
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Job Title*</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
//               placeholder="e.g. Software Engineer"
//             />
//             {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Company*</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.company ? 'border-red-500' : ''}`}
//               placeholder="e.g. Google"
//             />
//             {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
//           </div>
//         </div>

//         <div className="mt-3">
//           <label className="block text-gray-600 text-sm mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             placeholder="e.g. San Francisco, CA"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Start Date*</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.startDate ? 'border-red-500' : ''}`}
//               max={formData.endDate || new Date().toISOString().split('T')[0]}
//             />
//             {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">
//               End Date
//               {!formData.currentlyWorking && '*'}
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate || ''}
//               onChange={handleChange}
//               disabled={formData.currentlyWorking}
//               className={`w-full px-3 py-2 border rounded ${formData.currentlyWorking ? 'bg-gray-100' : ''} ${errors.endDate ? 'border-red-500' : ''}`}
//               min={formData.startDate || undefined}
//               max={new Date().toISOString().split('T')[0]}
//             />
//             {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
//             <div className="mt-2 flex items-center">
//               <input
//                 type="checkbox"
//                 name="currentlyWorking"
//                 checked={formData.currentlyWorking}
//                 onChange={handleChange}
//                 id="currentlyWorking"
//                 className="mr-2"
//               />
//               <label htmlFor="currentlyWorking" className="text-sm text-gray-600">
//                 I currently work here
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="mt-3">
//           <label className="block text-gray-600 text-sm mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 border rounded"
//             placeholder="Describe your responsibilities and achievements"
//           />
//         </div>

//         <div className="mt-4 flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
//           >
//             Save Experience
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const EducationForm = ({ education, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     institution: education.institution || '',
//     degree: education.degree || '',
//     fieldOfStudy: education.fieldOfStudy || '',
//     startDate: education.startDate ? new Date(education.startDate).toISOString().split('T')[0] : '',
//     endDate: education.endDate && !education.currentlyStudying ? new Date(education.endDate).toISOString().split('T')[0] : '',
//     currentlyStudying: education.currentlyStudying || false,
//     description: education.description || ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
//     if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
//     if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
//     if (!formData.startDate) newErrors.startDate = 'Start date is required';
    
//     if (!formData.currentlyStudying) {
//       if (!formData.endDate) {
//         newErrors.endDate = 'End date is required';
//       } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
//         newErrors.endDate = 'End date must be after start date';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       onSave({
//         ...formData,
//         startDate: new Date(formData.startDate),
//         endDate: formData.currentlyStudying ? null : new Date(formData.endDate),
//         currentlyStudying: formData.currentlyStudying
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//       <h3 className="font-bold mb-3">
//         {education.index !== undefined ? 'Edit Education' : 'Add New Education'}
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Institution*</label>
//             <input
//               type="text"
//               name="institution"
//               value={formData.institution}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.institution ? 'border-red-500' : ''}`}
//               placeholder="e.g. Harvard University"
//             />
//             {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Degree*</label>
//             <input
//               type="text"
//               name="degree"
//               value={formData.degree}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.degree ? 'border-red-500' : ''}`}
//               placeholder="e.g. Bachelor of Science"
//             />
//             {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
//           </div>
//         </div>

//         <div className="mt-3">
//           <label className="block text-gray-600 text-sm mb-1">Field of Study*</label>
//           <input
//             type="text"
//             name="fieldOfStudy"
//             value={formData.fieldOfStudy}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${errors.fieldOfStudy ? 'border-red-500' : ''}`}
//             placeholder="e.g. Computer Science"
//           />
//           {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Start Date*</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.startDate ? 'border-red-500' : ''}`}
//               max={formData.endDate || new Date().toISOString().split('T')[0]}
//             />
//             {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">
//               End Date
//               {!formData.currentlyStudying && '*'}
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate || ''}
//               onChange={handleChange}
//               disabled={formData.currentlyStudying}
//               className={`w-full px-3 py-2 border rounded ${formData.currentlyStudying ? 'bg-gray-100' : ''} ${errors.endDate ? 'border-red-500' : ''}`}
//               min={formData.startDate || undefined}
//               max={new Date().toISOString().split('T')[0]}
//             />
//             {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
//             <div className="mt-2 flex items-center">
//               <input
//                 type="checkbox"
//                 name="currentlyStudying"
//                 checked={formData.currentlyStudying}
//                 onChange={handleChange}
//                 id="currentlyStudying"
//                 className="mr-2"
//               />
//               <label htmlFor="currentlyStudying" className="text-sm text-gray-600">
//                 I currently study here
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="mt-3">
//           <label className="block text-gray-600 text-sm mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 border rounded"
//             placeholder="Notable achievements or coursework"
//           />
//         </div>

//         <div className="mt-4 flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
//           >
//             Save Education
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default CandidateDashboard;