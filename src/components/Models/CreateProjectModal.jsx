<<<<<<< HEAD
import React from 'react';
import Modal from '../Models/Modal';

const CreateProjectModal = ({
  projectData,
  onInputChange,
  onSubmit,
  searchQuery,
  onSearch,
  selectedTeams,
  onSelectTeam,
  onRemoveTeam,
  availableTeams,
  availableMembers,
  onClose
}) => {
  const filteredTeams = availableTeams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredTeams)

  return (
    <Modal title="Create New Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Owner</label>
          <select
            name="owner"
            value={projectData.owner}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-sm"
            required
          >
            <option value="">Select Owner</option>
            {availableMembers.length > 0 ? availableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            )) : <option value="">No members available</option>}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={projectData.dueDate}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-sm"
            required
          >
            <option value="">Select Status</option>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 dark:bg-gray-700 text-white p-2 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-md text-sm"
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
=======
import React from 'react';
import Modal from '../Models/Modal';

const CreateProjectModal = ({
  projectData,
  onInputChange,
  onSubmit,
  searchQuery,
  onSearch,
  selectedTeams,
  onSelectTeam,
  onRemoveTeam,
  availableTeams,
  availableMembers, // Add this line
  onClose
}) => {
  const filteredTeams = availableTeams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredTeams)

  return (
    <Modal title="Create New Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={onInputChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={onInputChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Owner</label>
          <select
            name="owner"
            value={projectData.owner}
            onChange={onInputChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          >
            <option value="">Select Owner</option>
            {availableMembers.length > 0 ? availableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            )) : <option value="">No members available</option>}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={projectData.dueDate}
            onChange={onInputChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={onInputChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          >
            <option value="">Select Status</option>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-1 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-1 rounded-md text-sm"
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal >
  );
};

export default CreateProjectModal;
>>>>>>> 5021c6d71957294c70dc404f0a3dcea3c2280e07
