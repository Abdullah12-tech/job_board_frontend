import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUpload, FiFileText, FiUser, FiMail, FiLinkedin, FiX } from 'react-icons/fi';
import { jobContext } from '../context/jobContext';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().nullable(),
  linkedIn: yup.string().url('Must be a valid URL').nullable(),
  resume: yup
    .mixed()
    .required('Resume is required')
    .test('fileSize', 'File too large', value => value && value[0]?.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file type', value =>
      value &&
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        value[0]?.type
      )
    ),
  coverLetter: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File too large', value =>
      !value || (value[0] && value[0].size <= 5 * 1024 * 1024)
    )
    .test('fileType', 'Unsupported file type', value =>
      !value ||
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        value[0]?.type
      )
    ),
  coverLetterText: yup.string().nullable(),
});

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleJob, isLoading, fetchSingleJob } = useContext(jobContext);

  useEffect(() => {
    fetchSingleJob(id);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchResume = watch('resume');
  const watchCoverLetter = watch('coverLetter');

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phone', data.phone || '');
    formData.append('linkedIn', data.linkedIn || '');
    formData.append('resume', data.resume[0]);
    if (data.coverLetter) formData.append('coverLetter', data.coverLetter[0]);
    if (data.coverLetterText) formData.append('coverLetterText', data.coverLetterText);

    // TODO: Replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/application-success');
    }, 1500);
  };

  const removeFile = (field) => {
    setValue(field, null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Apply for {singleJob.title}</h1>
            <p className="text-primary">
              {singleJob.company} • {singleJob.location}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      {...register('fullName')}
                      type="text"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.fullName ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <div className="relative">
                    <FiLinkedin className="absolute left-3 top-3 text-gray-400" />
                    <input
                      {...register('linkedIn')}
                      type="url"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  {errors.linkedIn && <p className="text-red-600 text-sm">{errors.linkedIn.message}</p>}
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Resume *</h2>
              {!watchResume ? (
                <label htmlFor="resume" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center block">
                  <div className="flex flex-col items-center space-y-2">
                    <FiUpload className="text-gray-400 text-3xl" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max. 5MB)</p>
                  </div>
                  <input type="file" id="resume" {...register('resume')} accept=".pdf,.doc,.docx" className="hidden" />
                </label>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center">
                    <FiFileText className="text-gray-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium">{watchResume[0].name}</p>
                      <p className="text-sm text-gray-500">
                        {(watchResume[0].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFile('resume')} className="text-gray-400 hover:text-gray-600">
                    <FiX size={20} />
                  </button>
                </div>
              )}
              {errors.resume && <p className="text-red-600 text-sm">{errors.resume.message}</p>}
            </div>

            {/* Cover Letter */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>

              {/* Upload */}
              <div className="mb-4">
                {!watchCoverLetter ? (
                  <label htmlFor="coverLetter" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center block">
                    <div className="flex flex-col items-center space-y-2">
                      <FiUpload className="text-gray-400 text-3xl" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max. 5MB)</p>
                    </div>
                    <input type="file" id="coverLetter" {...register('coverLetter')} accept=".pdf,.doc,.docx" className="hidden" />
                  </label>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center">
                      <FiFileText className="text-gray-400 mr-3" size={20} />
                      <div>
                        <p className="font-medium">{watchCoverLetter[0].name}</p>
                        <p className="text-sm text-gray-500">
                          {(watchCoverLetter[0].size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile('coverLetter')} className="text-gray-400 hover:text-gray-600">
                      <FiX size={20} />
                    </button>
                  </div>
                )}
                {errors.coverLetter && <p className="text-red-600 text-sm">{errors.coverLetter.message}</p>}
              </div>

              {/* Write */}
              <div>
                <label htmlFor="coverLetterText" className="block text-sm font-medium text-gray-700 mb-2">
                  Or write your cover letter
                </label>
                <textarea
                  id="coverLetterText"
                  {...register('coverLetterText')}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Explain why you're a good fit for this position..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
