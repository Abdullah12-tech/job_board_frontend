// src/pages/VerifyEmailSent.jsx
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const VerifyEmailSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
          <FiMail className="h-8 w-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Verification Email Sent</h2>
        
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. 
          Please check your inbox and click the link to verify your account.
        </p>
        
        <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
          <FiCheckCircle className="mr-2 text-green-500" />
          Didn't receive the email? 
          <Link to="/resend-verification" className="text-blue-500 ml-1 underline">
            Resend verification
          </Link>
        </div>
        
        <Link 
          to="/login" 
          className="text-blue-500 hover:text-blue-700 text-sm underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailSent;