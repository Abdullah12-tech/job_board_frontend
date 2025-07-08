import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiBriefcase } from 'react-icons/fi';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { authContext } from '../../context/AuthContext';

// ✅ Define your validation schema
const signUpFormSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  name: yup.string().required("Name is required").min(7, "Name must be at least 7 characters").max(25, "Name must be less than 25 characters"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  role: yup.string().required("Please select an account type"),
  terms: yup.boolean().oneOf([true], "You must accept the terms"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });
  const {signup, isSigning} = useContext(authContext);

  const submitForm = async (data) => {
    console.log("Form Data: ", data);
    signup(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Create your account</h2>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-2.5 text-gray-400" />
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 p-2 border rounded"
              />
            </div>
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-2.5 text-gray-400" />
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 p-2 border rounded"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-2.5 text-gray-400" />
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="•••••••"
                className="w-full pl-10 p-2 border rounded"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Account Type */}
          <div>
            <label className="block mb-2 text-sm font-medium">I am a...</label>
            <div className="flex gap-4">
              <label id='role' className="flex-1 border rounded p-2 flex flex-col items-center justify-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="candidate"
                  {...register("role")}
                  className="hidden peer"
                  name='role'
                />
                <FiUser />
                <span>Job Seeker</span>
              </label>

              <label id='role' className="flex-1 border rounded p-2 flex flex-col items-center justify-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="employer"
                  {...register("role")}
                  className="hidden peer"
                  name='role'
                />
                <FiBriefcase />
                <span>Employer</span>
              </label>
            </div>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the <a href="#" className="text-blue-500 underline">Terms</a> and <a href="#" className="text-blue-500 underline">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isSigning ? (
              <span className='animate-pulse flex items-center gap-2 justify-center'>
                <span className='w-2 h-2 bg-white rounded-full'></span>
                <span className='w-2 h-2 bg-white rounded-full'></span>
                <span className='w-2 h-2 bg-white rounded-full'></span>
              </span>
            ): "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
