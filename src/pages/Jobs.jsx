import { useContext, useEffect, useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import { jobContext } from '../context/jobContext';

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { jobs, fetchAllJobs, isLoading, filterJobs } = useContext(jobContext);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    salary: '',
    type: '',
    remote: false,
  });

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const applyFilters = () => {
    filterJobs(filters.type, filters.location);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto md:flex-1">
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.search}
              onChange={handleFilterChange}
              name="search"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Jobs</h1>
            <p className="text-gray-600">{jobs?.length || 0} jobs found</p>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : (
            <div className="space-y-4">
              {jobs?.length > 0 ? (
                jobs.map(job => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600">No jobs found.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter Sidebar - Mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-lg overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={applyFilters}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-80">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={applyFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
