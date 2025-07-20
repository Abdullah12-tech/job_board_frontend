import { useContext } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { AdminContext } from '../../context/AdminContext';

const RecentJobs = () => {
  const { jobs, loading } = useContext(AdminContext);
  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaBriefcase className="mr-2" />
        Recent Jobs
      </h2>
      
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : recentJobs.length === 0 ? (
        <p className="text-gray-500">No recent jobs</p>
      ) : (
        <ul className="space-y-3">
          {recentJobs.map(job => (
            <li key={job._id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.postedBy?.name || 'Unknown'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentJobs;