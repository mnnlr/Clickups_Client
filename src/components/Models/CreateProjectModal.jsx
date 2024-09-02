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
            {availableMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
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
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Select Members</label>
          <input
            type="text"
            placeholder="Search members..."
            onChange={onSearch}
            value={searchQuery}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
          />

          <div className="flex flex-wrap">
            {Object.entries(
              filteredMembers.reduce((groups, member) => {
                const { teamName } = member;
                if (!groups[teamName]) {
                  groups[teamName] = [];
                }
                groups[teamName].push(member);
                return groups;
              }, {})
            ).map(([teamName, members]) => (
              <div key={teamName} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="bg-gray-100 shadow-md rounded-lg p-4">
                  <h1 className="text-lg font-semibold mb-2">{teamName}</h1>
                  <div className="flex flex-wrap">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => onSelectMember(member.id)}
                        className={`cursor-pointer p-2 bg-gray-200 rounded-md mr-2 mb-2 ${selectedMembers.includes(member.id) ? 'bg-blue-500 text-white' : ''}`}
                      >
                        {member.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1">
            <p className="font-medium text-gray-700 text-sm">Selected Members:</p>
            <div className="flex flex-wrap mt-1">
              {selectedMembers.map((memberId) => {
                const member = availableMembers.find((m) => m.id === memberId);
                return (
                  <div
                    key={memberId}
                    className="flex items-center p-1 bg-blue-500 text-white rounded-md mr-1 mb-1 text-sm"
                  >
                    <span>{member?.name}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveMember(memberId)}
                      className="ml-1 text-sm bg-gray-300 font-semibold px-2 py-1 rounded-md text-center text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
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
    </Modal>
  );
};

export default CreateProjectModal;
