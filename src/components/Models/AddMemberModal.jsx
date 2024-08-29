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
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <div className="flex flex-wrap">
            {filteredMembers.map(member => (
              <div
                key={member.id}
                onClick={() => onAddMember(member.id)}
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
              {selectedMembers.map(memberId => {
                const member = availableMembers.find(m => m.id === memberId);
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
            Save Members
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMembersModal;
