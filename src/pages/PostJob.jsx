import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useContext, useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { jobContext } from '../context/jobContext';
import { useForm } from 'react-hook-form';

const postJobSchema = yup.object({
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),
  type: yup.string().required("type is required"),
  workType: yup.string().required("Work Type is required"),
  salary: yup.string().required("Salary is required"),
  description: yup.string().required("Description is required").max(2000, "Description must not exceed 2000 characters"),
  requirements: yup.array(),
  benefits: yup.array(),
  skills: yup.array(),
  createdAt: yup.date().default(Date.now()),
  expiredAt: yup.date()
})
const PostJob = () => {
  const {postJob, isPostingJob} = useContext(jobContext);
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    remote: false,
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
  });


  const handleArrayChange = (field, index, value) => {
    const updated = [...job[field]];
    updated[index] = value;
    setJob(prev => ({
      ...prev,
      [field]: updated
    }));
  };

  const {register,handleSubmit,formState: {errors}} = useForm({
    resolver: yupResolver(postJobSchema)
  })

  const addArrayField = (field) => {
    setJob(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    const updated = job[field].filter((_, i) => i !== index);
    setJob(prev => ({
      ...prev,
      [field]: updated
    }));
  };

  const submitForm = (data) => {
    postJob(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-600 mb-1">Job Title*</label>
                    <input
                      type="text"
                      name="title"
                      {...register("title")}
                      placeholder="e.g. Senior Frontend Developer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  {errors.title && <p className='text-red-700'>{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      {...register("location")}
                      placeholder="e.g. San Francisco, CA or Remote"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.location && <p className='text-red-700'>{errors.location.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Job Type*</label>
                    <select
                      name="type"
                      {...register("type")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  {errors.type && <p className='text-red-700'>{errors.type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Work Type*</label>
                    <select
                      name="workTyppe"
                      {...register("workType")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  {errors.workType && <p className='text-red-700'>{errors.workType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      {...register("salary")}
                      placeholder="e.g. $100,000 - $120,000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  {errors.salary && <p className='text-red-700'>{errors.salary.message}</p>}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Job Description*</h2>
                <textarea
                  name="description"
                  placeholder="Describe the responsibilities, requirements, and other details of the job"
                  {...register("description")}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
                {errors.description && <p className='text-red-700'>{errors.description.message}</p>}
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                <div className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        {...register("requirements")}
                        placeholder="e.g. 5+ years of experience with React"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('requirements', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('requirements')}
                    className="flex items-center text-primary hover:text-accent mt-2"
                  >
                    <FiPlus className="mr-1" />
                    <span>Add Requirement</span>
                  </button>
                  {errors.requirements && <p className='text-red-700'>{errors.requirements.message}</p>}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Benefits</h2>
                <div className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        {...register("benefits")}
                        placeholder="e.g. Health insurance, 401(k) matching"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('benefits', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('benefits')}
                    className="flex items-center text-primary hover:text-accent mt-2"
                  >
                    <FiPlus className="mr-1" />
                    <span>Add Benefit</span>
                  </button>
                  {errors.benefits && <p className='text-red-700'>{errors.benefits.message}</p>}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="space-y-3">
                  {job.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                        {...register("skills")}
                        placeholder="e.g. React, TypeScript, Node.js"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('skills', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('skills')}
                    className="flex items-center text-primary hover:text-accent mt-2"
                  >
                    <FiPlus className="mr-1" />
                    <span>Add Skill</span>
                  </button>
                  {errors.skills && <p className='text-red-700'>{errors.skills.message}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className={`${isPostingJob ? "" : ""}px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent`}
                >
                  {isPostingJob ? "" : "Post Job"} 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;