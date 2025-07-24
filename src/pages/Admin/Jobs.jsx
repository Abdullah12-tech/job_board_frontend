// JobsManagement.jsx
import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import SearchBar from '../../components/Admin/SearchBar';
import JobTable from '../../components/Admin/JobTable';
import JobDetailsModal from '../../components/Admin/JobDetailsModal';

const JobsManagement = () => {
  const { jobs, fetchAllJobs, loading, error } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold">Job Moderation</h2>
          <SearchBar 
            placeholder="Search jobs..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {loading && !jobs.length ? (
          <div>Loading jobs...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <JobTable 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJobId}
          />
        )}
      </div>

      {selectedJobId && (
        <JobDetailsModal 
          jobId={selectedJobId}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </div>
  );
};

export default JobsManagement;