import { useState, useEffect } from 'react';
import { FiMail, FiCheckCircle, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyEmailSent = () => {
  const [countdown, setCountdown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Base delay in seconds (increases with each resend)
  const baseDelay = 30;
  const delayIncrement = 30; // Additional seconds per resend

  // Calculate current delay
  const currentDelay = baseDelay + (resendCount * delayIncrement);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // Simulate API call (replace with your actual resend verification endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Verification email resent successfully!');
      setResendCount(prev => prev + 1);
      setCountdown(currentDelay);
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
          <FiMail className="h-8 w-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Verification Email Sent</h2>
        
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. 
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="mb-6">
          <button
            onClick={handleResend}
            disabled={countdown > 0 || isLoading}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
              countdown > 0 || isLoading
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">↻</span>
                Sending...
              </>
            ) : countdown > 0 ? (
              <>
                <FiClock className="inline" />
                Resend available in {countdown}s
              </>
            ) : (
              'Resend Verification Email'
            )}
          </button>

          {resendCount > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Resend delay increases after each attempt (currently {currentDelay}s)
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
          <FiCheckCircle className="mr-2 text-green-500" />
          Still having trouble? Contact support at{' '}
          <a href="mailto:support@example.com" className="text-blue-500 ml-1 underline">
            support@example.com
          </a>
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