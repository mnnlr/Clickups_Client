import React from 'react';
import Modal from '../Models/Modal';
import { AiTwotoneMail } from "react-icons/ai";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";

const AddMembersModal = ({
  availableMembers,
  selectedMembers,
  onAddMember,
  onRemoveMember,
  title,

  availableTeams,
  selectedTeams,
  onAddTeam,
  onRemoveTeam,

  onClose,
  onSubmit
}) => {

  const [searchQuery, setSearchQuery] = React.useState('');


  const filteredMembers = searchQuery
    ? availableMembers.filter(member =>
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];
  

  const selectedMembersArray = Array.isArray(selectedMembers) ? selectedMembers : [];
  console.log("selectedMembersArray",selectedMembersArray)
  console.log()
  const combinedMembers = [
    ...filteredMembers,
    ...selectedMembersArray.filter(selectedMember => !filteredMembers.some(member => member._id === selectedMember._id))
  ];

  return (
 
    <Modal title={title} onClose={onClose}>
  <form className="space-y-2 flex flex-col h-full" onSubmit={onSubmit}>
    <div className="mb-2 flex-1 overflow-y-auto">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search teams & members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm dark:bg-gray-800 dark:text-gray-300"
      />

      {/* Conditional rendering for search results */}
      {searchQuery && (
        <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <p className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
            Search Results:
          </p>
          <div className="flex flex-wrap">
            {combinedMembers.map((member, index) => (
              <div
                key={`${member.id?member.id:member._id}-${index}`}
                className={`cursor-pointer p-2 bg-gray-200 flex flex-col dark:bg-gray-700 rounded-md mr-2 mb-2 ${
                  selectedMembers.includes(member.id)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                <div
                  className="flex items-center gap-2 mb-1"
                  onClick={() => onAddMember(member.id || member._id)}   >
                  <button
                    type="button"
                    className="text-sm font-semibold rounded-md"
                  >
                    <IoPersonAdd size={15} />
                  </button>{" "}
                  {member.name}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <AiTwotoneMail /> {member.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="mb-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
      <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">
        Selected Teams & Members:
      </p>
      <div className="flex flex-wrap mt-1">
        {selectedMembersArray.map((selectedMember, index) => (
          <div
            key={`${selectedMember.id?selectedMember._id:selectedMember.id}-${index}`}
            className="flex items-center p-1 bg-blue-400 text-white rounded-md mr-1 mb-1 text-sm"
          >
            <span className="mr-1">
              <div
                title="Click For Delete Member"
                onClick={() => {
                  if (selectedMember?.id) {

                    onRemoveMember(selectedMember.id);
                  } else {
                    onRemoveMember(selectedMember._id);
                  }
                }}
                // onClick={() => {
                //   onRemoveMember(selectedMember.id || selectedMember._id)}}
                // onClick={() => onRemoveMember(selectedMember.id || selectedMember._id)}
                className="flex flex-row items-center gap-2 mb-1 cursor-pointer"
              >
                <button
                  type="button"
                  className="text-sm font-semibold rounded-md"
                >
                  <IoPersonRemove size={15} />
                </button>{" "}
                {selectedMember.name}
              </div>
              <div className="flex flex-row items-center gap-2">
                <AiTwotoneMail /> {selectedMember.email}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-end space-x-2 sticky bottom-0 bg-white dark:bg-gray-800 p-2">
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 dark:bg-gray-600 text-white px-2 py-1 rounded-md text-sm"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
      >
        Save Teams
      </button>
    </div>
  </form>
</Modal>

  );
};

export default AddMembersModal;


