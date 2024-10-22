import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const userDataFromServer = useSelector((state) => state.login.user);
  console.log(userDataFromServer);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({ ...userDataFromServer });
  }, [userDataFromServer]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showImageOptions, setShowImageOptions] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageOptionsToggle = () => {
    setShowImageOptions(!showImageOptions);
  };

  return (
    // <div className="relative p-6 bg-gray-50 min-h-screen flex justify-center items-center pt-16">
    //   <div className="w-full max-w-4xl flex">
    //     {/* Left Section: Profile Picture */}
    //     <div className="w-1/3 flex flex-col items-center relative">
    //       {formData?.profileImage ? <img
    //         src={formData.profileImage}
    //         alt="Profile"
    //         className="w-32 h-32 rounded-full mb-4 shadow-md cursor-pointer"
    //         onClick={handleImageOptionsToggle}
    //       /> : <FaRegUserCircle size={100} />}
    //       {isEditing && showImageOptions && (
    //         <div className="absolute top-36 left-12 bg-white shadow-lg rounded-md p-4 z-20">
    //           <button
    //             onClick={() => {
    //               setShowImageOptions(false);
    //               window.open(formData.profileImage, "_blank");
    //             }}
    //             className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
    //           >
    //             View Image
    //           </button>
    //           <button
    //             onClick={() => {
    //               setShowImageOptions(false);
    //               document.getElementById("profileImage").click();
    //             }}
    //             className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
    //           >
    //             Edit Image
    //           </button>
    //         </div>
    //       )}
    //       {isEditing && (
    //         <input
    //           id="profileImage"
    //           type="file"
    //           accept="image/*"
    //           className="hidden"
    //           onChange={handleImageChange}
    //         />
    //       )}
    //     </div>

    //     {/* Right Section: Profile Details */}
    //     <div className="w-2/3 pl-8">
    //       <h1 className="text-3xl font-semibold mb-2 text-gray-800">{user.name}</h1>
    //       <p className="text-gray-500 mb-6">{user.email}</p>

    //       {/* {!isEditing ? (
    //         <div>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Bio:</strong> {user.bio}
    //           </p>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Location:</strong> {user.location}
    //           </p>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Company:</strong> {user.company}
    //           </p>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Date of Birth:</strong> {user.dob}
    //           </p>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Date of Joining:</strong> {user.joinedDate}
    //           </p>
    //           <p className="text-gray-800 mb-4">
    //             <strong>Shift:</strong> {user.shift}
    //           </p>
    //         </div>
    //       ) : (
    //         <div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Name</label>
    //             <input
    //               type="text"
    //               name="name"
    //               value={formData.name}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Email</label>
    //             <input
    //               type="email"
    //               name="email"
    //               value={formData.email}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Bio</label>
    //             <textarea
    //               name="bio"
    //               value={formData.bio}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             ></textarea>
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Location</label>
    //             <input
    //               type="text"
    //               name="location"
    //               value={formData.location}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Company</label>
    //             <input
    //               type="text"
    //               name="company"
    //               value={formData.company}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Date of Birth</label>
    //             <input
    //               type="date"
    //               name="dob"
    //               value={formData.dob}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Date of Joining</label>
    //             <input
    //               type="date"
    //               name="joinedDate"
    //               value={formData.joinedDate}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700 font-medium">Shift</label>
    //             <select
    //               name="shift"
    //               value={formData.shift}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
    //             >
    //               <option value="Morning">Morning</option>
    //               <option value="Afternoon">Afternoon</option>
    //             </select>
    //           </div>
    //         </div>
    //       )} */}

    //       {/* {!isEditing ? (
    //         <button
    //           onClick={handleEdit}
    //           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
    //         >
    //           Edit Profile
    //         </button>
    //       ) : (
    //         <div className="flex space-x-4">
    //           <button
    //             onClick={handleSave}
    //             className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
    //           >
    //             Save
    //           </button>
    //           <button
    //             onClick={handleCancel}
    //             className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       )} */}
    //     </div>
    //   </div>
    // </div>
    <div className="relative p-6 bg-gray-50 min-h-screen flex justify-center items-center pt-16">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg p-6">
        {/* Left Section: Profile Picture */}
        <div className="w-1/3 flex flex-col items-center relative">
          {formData?.profileImage ? <img
            src={formData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 shadow-md cursor-pointer"
            onClick={handleImageOptionsToggle}
          /> : <FaRegUserCircle size={100} />}
          {isEditing && showImageOptions && (
            <div className="absolute top-36 left-12 bg-white shadow-lg rounded-md p-4 z-20">
              <button
                onClick={() => {
                  setShowImageOptions(false);
                  window.open(formData.profileImage, "_blank");
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
              >
                View Image
              </button>
              <button
                onClick={() => {
                  setShowImageOptions(false);
                  document.getElementById("profileImage").click();
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
              >
                Edit Image
              </button>
            </div>
          )}
          {isEditing && (
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          )}
        </div>

        {/* Right Section: Profile Details */}
        <div className="w-2/3 pl-8">
          <h1 className="text-3xl font-semibold mb-2 text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mb-6">{user.email}</p>
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;
