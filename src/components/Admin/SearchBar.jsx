import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
};

export default SearchBar;