import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiMail } from 'react-icons/fi';
import { authContext } from '../context/AuthContext';

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your account...');
  const {verifyEmail,verifyMessage} = useContext(authContext);

  useEffect(() => {
    verifyEmail(token);
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow text-center">
        {status === 'verifying' ? (
          <div className="animate-pulse">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <FiMail className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Verifying your account</h2>
            <p className="mt-2 text-sm text-gray-500">{verifyMessage}</p>
          </div>
        ) : status === 'success' ? (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Verification successful!</h2>
            <p className="mt-2 text-sm text-gray-500">{verifyMessage}</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue to login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <FiAlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Verification failed</h2>
            <p className="mt-2 text-sm text-gray-500">{verifyMessage}</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Back to login
              </button>
              <button
                onClick={() => navigate('/resend-verification')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Resend verification email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;