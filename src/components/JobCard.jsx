import { Link } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiBriefcase, FiClock } from 'react-icons/fi';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start mb-4">
        <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain mr-4" />
        <div>
          <h3 className="font-bold text-lg">{job.title}</h3>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">{job.type}</span>
        {job.remote && (
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Remote</span>
        )}
        {job.salaryRange && (
          <span className="bg-green-100 text-success px-3 py-1 rounded-full text-sm">{job.salaryRange.min} - {job.salaryRange.max}</span>
        )}
      </div>
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">Posted {job.posted}</span>
        <Link to={`/jobs/${job._id}`} className="text-primary font-medium hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;