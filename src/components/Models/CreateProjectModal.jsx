import React from 'react';
import Modal from '../Models/Modal';

const CreateProjectModal = ({
  projectData,
  onInputChange,
  onSubmit,
  searchQuery,
  onSearch,
  selectedMembers,
  onSelectMember,
  onRemoveMember,
  availableMembers,
  onClose
}) => {
  const filteredMembers = availableMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal title="Create New Project" onClose={onClose}>
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Select Members</label>
          <input
            type="text"
            placeholder="Search members..."
            onChange={onSearch}
            value={searchQuery}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <div className="flex flex-wrap">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member.id)}
                className={`cursor-pointer p-2 bg-gray-200 rounded-lg mr-2 mb-2 ${
                  selectedMembers.includes(member.id) ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {member.name}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <p className="font-medium text-gray-700">Selected Members:</p>
            <div className="flex flex-wrap mt-2">
              {selectedMembers.map((memberId) => {
                const member = availableMembers.find((m) => m.id === memberId);
                return (
                  <div
                    key={memberId}
                    className="flex items-center p-2 bg-blue-500 text-white rounded-lg mr-2 mb-2"
                  >
                    <span>{member?.name}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveMember(memberId)}
                      className="ml-2 text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
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
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
