import { FiX } from 'react-icons/fi';

const FilterSidebar = ({ filters, onFilterChange, onApply, onClose, onReset }) => {
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Filters</h2>
                {onClose && (
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                )}
            </div>
            
            <div>
                <h3 className="font-medium mb-2">Job Type</h3>
                <div className="space-y-2">
                    {jobTypes.map(type => (
                        <label key={type} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="type"
                                value={type}
                                checked={filters.type === type}
                                onChange={onFilterChange}
                                className="rounded text-primary focus:ring-primary"
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="font-medium mb-2">Location</h3>
                <input
                    type="text"
                    name="location"
                    placeholder="City or country"
                    value={filters.location}
                    onChange={onFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
            </div>
            
            <div className="flex space-x-3">
                <button
                    onClick={onReset}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex-1"
                >
                    Reset
                </button>
                <button
                    onClick={onApply}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-accent flex-1"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;