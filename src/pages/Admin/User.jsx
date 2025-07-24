// UsersManagement.jsx
import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import SearchBar from '../../components/Admin/SearchBar';
import UserTable from '../../components/Admin/UserTable';
import UserDetailsModal from '../../components/Admin/UserModal';

const UsersManagement = () => {
  const { users, fetchAllUsers, loading, error } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold">User Management</h2>
          <SearchBar 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {loading && !users.length ? (
          <div>Loading users...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <UserTable 
            users={filteredUsers} 
            onSelectUser={setSelectedUserId}
          />
        )}
      </div>

      {selectedUserId && (
        <UserDetailsModal 
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};

export default UsersManagement;