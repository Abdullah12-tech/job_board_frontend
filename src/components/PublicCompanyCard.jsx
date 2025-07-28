import { Link } from "react-router-dom";
import { FiBriefcase, FiMapPin, FiUsers } from "react-icons/fi";

const CompanyCard = ({ company }) => {
  return (
    <Link 
      to={`/companies/${company._id}`}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <img 
          src={company.logo || '/default-company.png'} 
          alt={company.name} 
          className="w-16 h-16 object-contain border border-gray-200 rounded"
        />
        <div>
          <h3 className="text-lg font-semibold mb-1">{company.name}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-2">
            {company.industry && (
              <span className="flex items-center">
                <FiBriefcase className="mr-1" /> {company.industry}
              </span>
            )}
            {company.location && (
              <span className="flex items-center">
                <FiMapPin className="mr-1" /> {company.location}
              </span>
            )}
            {company.companySize && (
              <span className="flex items-center">
                <FiUsers className="mr-1" /> {company.companySize}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {company.description}
          </p>
          <div className="mt-3">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {company.jobsCount} {company.jobsCount === 1 ? 'job' : 'jobs'} available
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;