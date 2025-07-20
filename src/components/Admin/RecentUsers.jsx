import { useContext } from 'react';
import { FaUsers } from 'react-icons/fa';
import { AdminContext } from '../../context/AdminContext';

const RecentUsers = () => {
  const { users, loading } = useContext(AdminContext);
  const recentUsers = users.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaUsers className="mr-2" />
        Recent Users
      </h2>
      
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : recentUsers.length === 0 ? (
        <p className="text-gray-500">No recent users</p>
      ) : (
        <ul className="space-y-3">
          {recentUsers.map(user => (
            <li key={user._id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentUsers;