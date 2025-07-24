import { FiBell, FiMenu } from 'react-icons/fi';

const AdminHeader = ({ onMenuClick }) => {
  return (
    <div className="relative z-10 flex-shrink-0 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:text-primary"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary relative">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <span>A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;