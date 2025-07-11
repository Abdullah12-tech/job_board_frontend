import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { jobContext } from '../context/jobContext';
import { applicationContext } from '../context/applicationContext';

// Validation schema
const schema = yup.object().shape({
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
  coverLetterText: yup
    .string()
    .required('Cover letter is required')
    .max(2000, 'Cover letter is too long'),
});

const ApplyJob = () => {
  const { id } = useParams();
  const { singleJob, fetchSingleJob, isLoading } = useContext(jobContext);
  const { applyJob } = useContext(applicationContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const watchResume = watch('resume');

  useEffect(() => {
    fetchSingleJob(id);
  }, [id]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('resume', data.resume[0]);
    formData.append('coverLetterText', data.coverLetterText);
    await applyJob(formData,id);
    setIsSubmitting(false);
  };

  const removeFile = () => setValue('resume', null);

  // Show loader while job data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Apply for {singleJob?.title || 'Job'}</h1>
            <p className="text-primary">{singleJob?.postedBy?.companyName || 'Company'} • {singleJob?.location || 'Location'}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Resume Upload */}
            {/* Resume Upload */}
<div>
  <label className="text-sm font-medium">Resume *</label>
  {!watchResume?.[0] ? (
    <label className="block border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer">
      <FiUpload className="text-2xl mx-auto text-gray-500" />
      <p className="text-sm text-gray-500 mt-2">Upload PDF, DOC (max 5MB)</p>
      <input
        id="resumeInput"
        type="file"
        {...register('resume')}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
    </label>
  ) : (
    <div className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
      <div>
        <p className="text-sm font-medium">{watchResume[0]?.name}</p>
        <p className="text-xs text-gray-500">{(watchResume[0]?.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <button
        onClick={() => {
          setValue('resume', null);
          document.getElementById('resumeInput').value = null;
        }}
        type="button"
        className="text-red-600"
      >
        Remove
      </button>
    </div>
  )}
  {errors.resume && (
    <p className="text-red-600 text-sm">{errors.resume.message}</p>
  )}
</div>

            {/* Cover Letter Text */}
            <div>
              <label className="text-sm font-medium">Cover Letter *</label>
              <textarea
                {...register('coverLetterText')}
                className="w-full mt-2 border rounded-lg p-2"
                rows={6}
                placeholder="Write your cover letter here..."
              ></textarea>
              {errors.coverLetterText && <p className="text-red-600 text-sm">{errors.coverLetterText.message}</p>}
            </div>

            <div className="text-right pt-4">
              <button
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
