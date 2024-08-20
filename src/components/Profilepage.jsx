import React, { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Rohit Pal",
    email: "rohit.pal@example.com",
    bio: "Software Developer with a passion for creating intuitive user interfaces.",
    location: "New York, USA",
    company: "Tech Solutions",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...user });
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen overflow-auto lg:ml-15 flex justify-center items-start pt-16">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with user's image URL
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 shadow-md"
          />
          <h1 className="text-3xl font-semibold mb-2 text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <hr className="my-6" />

        {!isEditing ? (
          <div>
            <p className="text-gray-800 mb-4">
              <strong>Bio:</strong> {user.bio}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Location:</strong> {user.location}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Company:</strong> {user.company}
            </p>
            <button
              onClick={handleEdit}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
