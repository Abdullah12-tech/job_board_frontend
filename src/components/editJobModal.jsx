import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DashboardContext from "../context/CompanyContext"
import { useContext } from 'react';

const jobSchema = yup.object({
  title: yup.string().required('Job title is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
  type: yup.string().required('Job type is required'),
  workType: yup.string().required('Work type is required'),
});

const JobEditModal = ({ job, onClose }) => {
  const { updateJob } = useContext(DashboardContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      title: job.title,
      description: job.description || '',
      status: job.status,
      type: job.type || 'Full-time',
      workType: job.workType || 'Remote',
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateJob(job._id, data);
      onClose();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Job</h2>
          <button onClick={onClose}>
            <FiX className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Job Title</label>
            <input
              {...register('title')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Status</label>
            <select
              {...register('status')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Job Type</label>
            <select
              {...register('type')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
              <option value="Contract">Contract</option>
              <option value="Permanent">Permanent</option>
              <option value="Part-time">Part-time</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Work Type</label>
            <select
              {...register('workType')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.workType && <p className="mt-1 text-sm text-red-600">{errors.workType.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEditModal;