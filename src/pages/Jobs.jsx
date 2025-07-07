import { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiBriefcase, FiClock } from 'react-icons/fi';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [jobs, setJobs] = useState([
    // Sample job data - replace with API call
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      remote: true,
      posted: '2 days ago',
      logo: 'https://via.placeholder.com/50',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      remote: true,
      posted: '2 days ago',
      logo: 'https://via.placeholder.com/50',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 3,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      remote: true,
      posted: '2 days ago',
      logo: 'https://via.placeholder.com/50',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    // Add more jobs
  ]);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    salary: '',
    type: '',
    remote: false,
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  // document.addEventListener("click", ()=>{
  //   if (isFilterOpen) {
  //     setIsFilterOpen(false);
  //   }
  // })
  const applyFilters = () => {
    // Apply filters to jobs - in a real app, this would be an API call
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Bar */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto md:flex-1">
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Jobs</h1>
              <p className="text-gray-600">{jobs.length} jobs found</p>
            </div>

            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600">No jobs match your filters. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination would go here */}
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
    </div>
  );
};

export default Jobs;