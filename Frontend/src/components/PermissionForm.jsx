import React, { useEffect, useState } from 'react';
import {
  getPermissionsList,
  getUserPermissions,
  updateUserPermissions,
  getAllUsers,
} from '../api';

const PermissionForm = () => {
  const [userId, setUserId] = useState('');
  const [allPermissions, setAllPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAllPermissions = async () => {
      const { data } = await getPermissionsList();
      setAllPermissions(data);
    };
    fetchAllPermissions();

    const fetchUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) fetchUserPermissions();
  }, [userId]);

  const fetchUserPermissions = async () => {
    setLoading(true);
    try {
      const { data } = await getUserPermissions(userId);
      setUserPermissions(data);
      setStatus('Fetched user permissions');
    } catch (err) {
      setStatus('Failed to fetch user permissions');
    }
    setLoading(false);
  };

  const handleToggle = (perm) => {
    setUserPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserPermissions(userId, userPermissions);
      setStatus('Permissions updated successfully!');
    } catch (err) {
      setStatus('Failed to update permissions');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Assign User Permissions</h2>

      {/* User Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Select User</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">-- Choose a user --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Permissions Grid */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Select Permissions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={userPermissions.includes(perm)}
                onChange={() => handleToggle(perm)}
              />
              <span>{perm}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition duration-200"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Permissions'}
      </button>

      {/* Status Message */}
      {status && (
        <p className="mt-4 text-sm text-center text-gray-600">{status}</p>
      )}
    </div>
  );
};

export default PermissionForm;
