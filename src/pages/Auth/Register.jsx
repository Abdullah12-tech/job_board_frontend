import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FiUser, FiMail, FiLock, FiBriefcase, FiGithub, FiLinkedin, FiArrowLeft } from 'react-icons/fi';
import { authContext } from '../../context/AuthContext';

const step1Schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
  role: yup.string().required('Select an account type'),
});

const candidateSchema = yup.object().shape({
  skills: yup.string().required('Skills are required'),
  linkedin: yup.string().url('Invalid URL').nullable(),
  github: yup.string().url('Invalid URL').nullable(),
});

const employerSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  companyWebsite: yup.string().url().required('Company website is required'),
  industry: yup.string().nullable(),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const { signup, isSigning } = useContext(authContext);

  const {
    register: registerStep1,
    handleSubmit: handleStep1,
    formState: { errors: errors1 },
    watch,
  } = useForm({ resolver: yupResolver(step1Schema) });

  const {
    register: registerStep2,
    handleSubmit: handleStep2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(userRole === 'candidate' ? candidateSchema : employerSchema),
  });

  const onSubmitStep1 = (data) => {
    setUserRole(data.role);
    setStep(2);
  };

  const onSubmitStep2 = async (data) => {
    const step1Data = watch();
    const formData = { ...step1Data, ...data };
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === 1 ? 'Create your account' : userRole === 'candidate' ? 'Candidate Info' : 'Company Info'}
        </h2>

        {/* Step Indicator */}
        <div className="flex mb-6">
          <div className={`flex-1 h-1 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1(onSubmitStep1)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  {...registerStep1('name')}
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
              {errors1.name && <p className="text-sm text-red-500">{errors1.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  {...registerStep1('email')}
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
              {errors1.email && <p className="text-sm text-red-500">{errors1.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  {...registerStep1('password')}
                  type="password"
                  id="password"
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
              {errors1.password && <p className="text-sm text-red-500">{errors1.password.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium">I am a...</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input type="radio" id="candidate" value="candidate" {...registerStep1('role')} className="hidden peer" />
                  <label htmlFor="candidate" className="block border rounded-lg p-4 text-center cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <FiUser className="mx-auto text-xl mb-1" />
                    Job Seeker
                  </label>
                </div>
                <div className="flex-1">
                  <input type="radio" id="employer" value="employer" {...registerStep1('role')} className="hidden peer" />
                  <label htmlFor="employer" className="block border rounded-lg p-4 text-center cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <FiBriefcase className="mx-auto text-xl mb-1" />
                    Employer
                  </label>
                </div>
              </div>
              {errors1.role && <p className="text-sm text-red-500">{errors1.role.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Continue
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleStep2(onSubmitStep2)} className="space-y-5">
            <button onClick={() => setStep(1)} type="button" className="flex items-center text-blue-500 text-sm">
              <FiArrowLeft className="mr-1" /> Back
            </button>

            {userRole === 'candidate' ? (
              <>
                <div>
                  <label htmlFor="skills" className="block mb-1 text-sm font-medium">Skills</label>
                  <input
                    {...registerStep2('skills')}
                    id="skills"
                    placeholder="React, Node.js"
                    className="w-full p-2 border rounded"
                  />
                  {errors2.skills && <p className="text-sm text-red-500">{errors2.skills.message}</p>}
                </div>

                <div>
                  <label htmlFor="linkedin" className="block mb-1 text-sm font-medium">LinkedIn</label>
                  <div className="relative">
                    <FiLinkedin className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      {...registerStep2('linkedin')}
                      id="linkedin"
                      placeholder="https://linkedin.com/in/yourname"
                      className="w-full pl-10 p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="github" className="block mb-1 text-sm font-medium">GitHub</label>
                  <div className="relative">
                    <FiGithub className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      {...registerStep2('github')}
                      id="github"
                      placeholder="https://github.com/yourname"
                      className="w-full pl-10 p-2 border rounded"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="companyName" className="block mb-1 text-sm font-medium">Company Name</label>
                  <input
                    {...registerStep2('companyName')}
                    id="companyName"
                    placeholder="Acme Corp"
                    className="w-full p-2 border rounded"
                  />
                  {errors2.companyName && <p className="text-sm text-red-500">{errors2.companyName.message}</p>}
                </div>

                <div>
                  <label htmlFor="companyWebsite" className="block mb-1 text-sm font-medium">Company Website</label>
                  <input
                    {...registerStep2('companyWebsite')}
                    id="companyWebsite"
                    placeholder="https://company.com"
                    className="w-full p-2 border rounded"
                  />
                  {errors2.companyWebsite && <p className="text-sm text-red-500">{errors2.companyWebsite.message}</p>}
                </div>

                <div>
                  <label htmlFor="industry" className="block mb-1 text-sm font-medium">Industry</label>
                  <input
                    {...registerStep2('industry')}
                    id="industry"
                    placeholder="Technology, Healthcare..."
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              disabled={isSigning}
            >
              {isSigning ? (
                <span className="animate-pulse flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span className="w-2 h-2 bg-white rounded-full" />
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
