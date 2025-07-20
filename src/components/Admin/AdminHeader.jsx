import { FaBell, FaUserCircle } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <FaBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <FaUserCircle size={24} className="text-gray-500" />
            <span className="font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;