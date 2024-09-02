import React from 'react';
import Modal from '../Models/Modal';

const EditProjectModal = ({
  projectData,
  onInputChange,
  onSubmit,
  availableMembers,
  onClose
}) => {
  return (
    <Modal title="Edit Project" onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Owner</label>
          <select
            name="owner"
            value={projectData.owner}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Owner</option>
            {availableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={projectData.dueDate}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProjectModal;