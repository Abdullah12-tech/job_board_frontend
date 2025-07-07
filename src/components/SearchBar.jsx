import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
};

export default SearchBar;