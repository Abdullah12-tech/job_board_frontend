import { FiX } from 'react-icons/fi';

const FilterSidebar = ({ filters, onFilterChange, onApply, onClose }) => {
  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Temporary'
  ];

  const salaryRanges = [
    '$30,000 - $50,000',
    '$50,000 - $80,000',
    '$80,000 - $100,000',
    '$100,000 - $120,000',
    '$120,000+'
  ];

  return (
    <div className="h-full p-6">
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-auto block mb-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      )}
      
      <h2 className="text-xl font-bold mb-6">Filters</h2>
      
      <div className="space-y-8">
        {/* Job Type */}
        <div>
          <h3 className="font-medium mb-3">Job Type</h3>
          <div className="space-y-2">
            {jobTypes.map(type => (
              <div key={type} className="flex items-center">
                <input
                  id={`type-${type}`}
                  name="type"
                  type="radio"
                  value={type}
                  checked={filters.type === type}
                  onChange={onFilterChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Location */}
        <div>
          <h3 className="font-medium mb-3">Location</h3>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            placeholder="City, state, or remote"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Salary Range */}
        <div>
          <h3 className="font-medium mb-3">Salary Range</h3>
          <select
            name="salary"
            value={filters.salary}
            onChange={onFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Any</option>
            {salaryRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        
        {/* Remote */}
        <div>
          <div className="flex items-center">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              checked={filters.remote}
              onChange={onFilterChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remote" className="ml-2 text-gray-700">
              Remote Only
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={onApply}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;