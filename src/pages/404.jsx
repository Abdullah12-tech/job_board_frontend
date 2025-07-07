import { Link } from 'react-router-dom';
import { FiSearch, FiHome, FiFrown } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <FiFrown className="text-red-500 text-3xl" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Search bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for jobs or companies..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors"
          >
            <FiHome className="mr-2" />
            Return Home
          </Link>
          
          <Link
            to="/jobs"
            className="flex items-center justify-center px-6 py-3 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
      
      {/* Optional: Trending jobs section */}
      <div className="mt-12 max-w-2xl w-full">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Trending Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 1, title: 'Frontend Developer', company: 'TechCorp' },
            { id: 2, title: 'UX Designer', company: 'DesignHub' },
            { id: 3, title: 'Data Scientist', company: 'AnalyticsCo' },
            { id: 4, title: 'Product Manager', company: 'StartUpX' }
          ].map(job => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-primary text-sm">{job.company}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;