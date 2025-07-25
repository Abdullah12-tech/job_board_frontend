import { Link } from 'react-router-dom';
import { FiBriefcase, FiMapPin, FiLayers } from 'react-icons/fi';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={company.logo || 'https://via.placeholder.com/80'}
              alt={`${company.name} logo`}
              className="w-16 h-16 object-contain rounded-full border border-gray-200"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              <Link to={`/companies/${company.id}`} className="hover:text-blue-600">
                {company.name}
              </Link>
            </h3>
            
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
              {company.industry && (
                <span className="inline-flex items-center">
                  <FiBriefcase className="mr-1" />
                  {company.industry}
                </span>
              )}
              
              {company.location && (
                <span className="inline-flex items-center">
                  <FiMapPin className="mr-1" />
                  {company.location}
                </span>
              )}
              
              {company.jobsCount > 0 && (
                <span className="inline-flex items-center">
                  <FiLayers className="mr-1" />
                  {company.jobsCount} {company.jobsCount === 1 ? 'job' : 'jobs'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {company.description && (
          <p className="mt-4 text-gray-600 line-clamp-3">
            {company.description}
          </p>
        )}
        
        <div className="mt-6">
          <Link
            to={`/companies/${company.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            View Company
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;