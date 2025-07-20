import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBriefcase, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AdminSidebar = () => {
  const { clearError } = useContext(AdminContext);

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavLink 
          to="/admin/dashboard" 
          onClick={clearError}
          className={({ isActive }) => 
            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/admin/users" 
          onClick={clearError}
          className={({ isActive }) => 
            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaUsers className="mr-3" />
          Users
        </NavLink>
        
        <NavLink 
          to="/admin/jobs" 
          onClick={clearError}
          className={({ isActive }) => 
            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaBriefcase className="mr-3" />
          Jobs
        </NavLink>
        
        <NavLink 
          to="/admin/settings" 
          onClick={clearError}
          className={({ isActive }) => 
            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <FaCog className="mr-3" />
          Settings
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700">
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;