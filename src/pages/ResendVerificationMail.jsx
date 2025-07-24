// src/pages/ResendVerification.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'sonner';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${baseUrl}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
        navigate('/verify-email-sent');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-500 mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Resend Verification Email</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 p-2 border rounded"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-70"
          >
            {isLoading ? 'Sending...' : 'Resend Verification'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive the verification email? Enter your email above and we'll send it again.
        </p>
      </div>
    </div>
  );
};

export default ResendVerification;