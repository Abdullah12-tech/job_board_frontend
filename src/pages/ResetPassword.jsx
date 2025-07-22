import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { authContext } from '../context/AuthContext';

const schema = yup.object({
  password: yup.string().min(6, 'Password must be atleast 6 characters').required('Email is required'),
});

const ResetPassword = () => {
  const {isSigning, verifyAndChangePass} = useContext(authContext);
  const {token} = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Simulate API call
    verifyAndChangePass(data, token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Reset Password?</h2>
              <p className="mt-2 text-sm text-gray-600">
                Reset your password for accessing to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Enter Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="**********"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSigning}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isSigning ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Changing...
                    </span>
                  ) : (
                    'Change password'
                  )}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center"
              >
                <FiArrowLeft className="mr-1" />
                Back to login
              </Link>
            </div>
          </>
      </div>
    </div>
  );
};

export default ResetPassword;