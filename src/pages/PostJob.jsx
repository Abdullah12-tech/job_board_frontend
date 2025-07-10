import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { jobContext } from '../context/jobContext';
import { useForm } from 'react-hook-form';

const postJobSchema = yup.object({
  title: yup.string().required('Title is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Job type is required'),
  workType: yup.string().required('Work type is required'),
  hrEmail: yup.string().email("Enter a valid email").required("Hr Email is required"),
  salary: yup.object({
    min: yup.number().required("Minimum salary is required").min(0, "salary must be greater than zero").transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    ),
    max: yup.number().required("Maximum salary is required").transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
      .moreThan(yup.ref("min"), "Maximum must be greater than minimum"),
  }),
  description: yup
    .string()
    .required('Description is required')
    .max(2000, 'Description must not exceed 2000 characters'),
  requirements: yup
    .array()
    .of(yup.string().required('Requirement is required'))
    .min(1, 'At least one requirement is required'),
  benefits: yup
    .array()
    .of(yup.string().required('Benefit is required'))
    .min(1, 'At least one benefit is required'),
  skills: yup
    .array()
    .of(yup.string().required('Skill is required'))
    .min(1, 'At least one skill is required'),
  createdAt: yup.date().default(() => new Date()),
  deadline: yup.date().nullable(),
});

const PostJob = () => {
  const { postJob, isPostingJob } = useContext(jobContext);
  const [job, setJob] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    workType: 'Hybrid',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
  });

  const handleArrayChange = (field, index, value) => {
    const updated = [...job[field]];
    updated[index] = value;
    setJob((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayField = (field) => {
    setJob((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayField = (field, index) => {
    const updated = job[field].filter((_, i) => i !== index);
    setJob((prev) => ({ ...prev, [field]: updated }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postJobSchema),
  });

  const submitForm = (data) => {
    const finalData = {
      ...data,
      requirements: job.requirements,
      benefits: job.benefits,
      skills: job.skills,
    };
    console.log(finalData);

    postJob(finalData);
  };

  const renderArrayInputs = (field, label, placeholder) => (
    <div>
      <h2 className="text-lg font-semibold mb-4">{label}</h2>
      <div className="space-y-3">
        {job[field].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => removeArrayField(field, index)}
              className="text-red-500 hover:text-red-700"
            >
              <FiX size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField(field)}
          className="flex items-center text-primary hover:text-accent mt-2"
        >
          <FiPlus className="mr-1" />
          <span>Add {label}</span>
        </button>
        {errors[field] && <p className="text-red-700">{errors[field].message}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-600 mb-1">Job Title*</label>
                    <input
                      type="text"
                      {...register('title')}
                      placeholder="e.g. Senior Frontend Developer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.title && <p className="text-red-700">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Location*</label>
                    <input
                      type="text"
                      {...register('location')}
                      placeholder="e.g. Remote or Lagos"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.location && <p className="text-red-700">{errors.location.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Job Type*</label>
                    <select
                      {...register('type')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                    {errors.type && <p className="text-red-700">{errors.type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Work Type*</label>
                    <select
                      {...register('workType')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                    {errors.workType && <p className="text-red-700">{errors.workType.message}</p>}
                  </div>
                  <div>
                    <label className="block mb-1">Min Salary*</label>
                    <input
                      type="number"
                      {...register("salary.min")}
                      placeholder="e.g. 50000"
                      className="w-full px-4 py-2 border rounded"
                    />
                    {errors.salary?.min && <p className="text-red-700">{errors.salary.min.message}</p>}
                  </div>

                  <div>
                    <label className="block mb-1">Max Salary*</label>
                    <input
                      type="number"
                      {...register("salary.max")}
                      placeholder="e.g. 100000"
                      className="w-full px-4 py-2 border rounded"
                    />
                    {errors.salary?.max && <p className="text-red-700">{errors.salary.max.message}</p>}
                  </div>
                  <div>
                    <label className="block mb-1">Hr Email*</label>
                    <input
                      type="email"
                      required
                      {...register("hrEmail")}
                      placeholder="hr.jumia@gmail.com"
                      className="w-full px-4 py-2 border rounded"
                    />
                    {errors.hrEmail && <p className="text-red-700">{errors.hrEmail.message}</p>}
                  </div>

                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Job Description*</h2>
                <textarea
                  {...register('description')}
                  placeholder="Describe responsibilities, expectations, etc."
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
                {errors.description && <p className="text-red-700">{errors.description.message}</p>}
              </div>
              {renderArrayInputs('requirements', 'Requirements', 'e.g. 3+ years experience in React')}
              {renderArrayInputs('benefits', 'Benefits', 'e.g. Health insurance, 401k')}
              {renderArrayInputs('skills', 'Skills', 'e.g. React, Node.js, TypeScript')}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent"
                >
                  {isPostingJob ? 'Posting...' : 'Post Job'}
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
