import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiMail, FiLoader } from 'react-icons/fi';
import { toast } from 'sonner';
import { authContext } from '../context/AuthContext';

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail, verifyMessage } = useContext(authContext);
  const [status, setStatus] = useState('idle'); // 'idle' | 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      handleVerification();
    }
  }, [token]);

  const handleVerification = async () => {
    try {
      setStatus('verifying');
      setMessage('Verifying your account...');
      
      await verifyEmail(token);
      
      // Status will be updated by verifyEmail function in context
      if (status !== 'success') {
        setStatus('success');
        setMessage(verifyMessage || 'Your account has been successfully verified!');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setStatus('error');
      setMessage(
        verifyMessage || 
        err.message || 
        'Verification failed. Please try again later.'
      );
      
      if (err.message === "Failed to fetch") {
        toast.error("Please check your internet connection");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {/* Verifying State */}
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
              <FiLoader className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Verifying Your Account</h2>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Verification Successful!</h2>
            <p className="text-sm text-gray-500">
              {verifyMessage || 'Your account has been successfully verified!'}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Continue to Login
            </button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50">
              <FiAlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Verification Failed</h2>
            <p className="text-sm text-gray-500">
              {verifyMessage || 'The verification link may be invalid or expired.'}
            </p>
            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
              <button
                onClick={() => navigate('/resend-verification')}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Resend Verification Email
              </button>
            </div>
          </div>
        )}

        {/* Initial State */}
        {status === 'idle' && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
              <FiMail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Account Verification</h2>
            <p className="text-sm text-gray-500">Preparing to verify your account...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;