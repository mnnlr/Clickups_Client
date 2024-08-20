import React, { useState } from 'react';
import { FaUserPlus, FaEnvelope, FaUserCircle, FaTrashAlt } from 'react-icons/fa';

const InviteMember = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [members, setMembers] = useState([
    { id: 1, email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, email: 'jane.smith@example.com', role: 'Member' },
  ]);
  const [error, setError] = useState('');

  const handleInvite = () => {
    setError(''); // Clear previous errors

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required.');
      return;
    } else if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    } else if (members.some((member) => member.email === email)) {
      setError('This email is already a member.');
      return;
    }

    // If validation passes, add the new member
    const newMember = { id: members.length + 1, email, role };
    setMembers([...members, newMember]);
    setEmail(''); // Clear the input field after successful addition
    setRole('Member'); // Reset role to default
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Invite Members</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium mb-4">Invite New Member</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="focus:outline-none"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleInvite}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            <FaUserPlus className="mr-2" /> Invite
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-4">Current Members</h2>
        {members.map((member) => (
          <div key={member.id} className="flex justify-between items-center p-4 border-b last:border-b-0">
            <div className="flex items-center">
              <FaUserCircle className="text-gray-500 text-2xl mr-4" />
              <div>
                <p className="text-lg font-medium">{member.email}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveMember(member.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteMember;
