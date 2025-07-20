import { useState } from 'react';
import { FaSave, FaKey, FaEnvelope, FaBell } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    appNotifications: false,
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings save
    console.log('Settings saved:', settings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FaBell className="mr-2" />
          Notification Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              id="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
              Email Notifications
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="appNotifications"
              id="appNotifications"
              checked={settings.appNotifications}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="appNotifications" className="ml-2 block text-sm text-gray-700">
              App Notifications
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FaKey className="mr-2" />
          Change Password
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={settings.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={settings.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;