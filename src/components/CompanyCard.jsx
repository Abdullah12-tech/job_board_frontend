import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <img src={company.logo} alt={company.name} className="w-20 h-20 object-contain mb-3" />
          <h3 className="font-bold text-lg">{company.name}</h3>
          <p className="text-gray-600">{company.industry}</p>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{company.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{company.location}</span>
          <Link to={`/companies/${company.id}`} className="text-primary font-medium hover:underline">
            View {company.jobs} jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;