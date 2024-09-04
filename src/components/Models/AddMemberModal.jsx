import React from 'react';
import Modal from '../Models/Modal';

const AddMembersModal = ({
  selectedMembers,
  onAddMember,
  onRemoveMember,
  availableMembers,
  onClose,
  onSubmit
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal title="Add Members to Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Search Members</label>
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <div key={teamName} className="w-full sm:w-1/3 md:w-1/5 lg:w-1/6 p-2">
                <div className="bg-gray-100 shadow-md rounded-lg p-4">
                  <h1 className="text-sm font-bold mb-2">{teamName}</h1>
                  <div className="flex flex-wrap">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => onAddMember(member.id)}
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
        </div>
        <div className="mb-2">
          <p className="font-medium text-gray-700 text-sm">Selected Members:</p>
          <div className="flex flex-wrap mt-1">
            {selectedMembers.map(memberId => {
              const member = availableMembers.find(m => m.id === memberId);
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
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-2 py-1 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
          >
            Save Members
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMembersModal;