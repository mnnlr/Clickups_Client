import React, { useState, useEffect } from "react";
import Modal from "../Models/Modal";
import { AiTwotoneMail } from "react-icons/ai";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { useSelector } from "react-redux";

const AddMembersModal = ({
  availableMembers,
  selectedMembers,
  onAddMember,
  onRemoveMember,
  title,
  onClose,
  onSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { user } = useSelector((store) => store.login);

  // Filter logic for members
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = availableMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(lowerCaseQuery) ||
        member.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredItems(filtered);
  }, [searchQuery, availableMembers]);

  const isMemberSelected = (memberId) =>   //  cheaking for show available members in diff color
    selectedMembers.some(
      (selected) =>
        selected.id === memberId ||
        selected._id === memberId
    ) || user._id === memberId // Checking the login user not able to add
  

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
                {filteredItems.map((member, index) => (
                  <div
                    key={`${member.id || member._id}-${index}`}
                    className={`cursor-pointer p-2 flex flex-col rounded-md mr-2 mb-2 ${
                      isMemberSelected(member.id || member._id)
                        ? "bg-slate-400 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() =>
                      // isMemberSelected(member.id || member._id)
                      //   ? onRemoveMember(member.id || member._id)
                      //   :
                         onAddMember(member.id || member._id)
                    }
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        type="button"
                        className="text-sm font-semibold rounded-md"
                      >
                        {isMemberSelected(member.id || member._id) ? (
                          <IoPersonRemove size={15} />
                        ) : (
                          <IoPersonAdd size={15} />
                        )}
                      </button>
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
            {selectedMembers.map((selectedMember, index) => (
              <div
                key={`${selectedMember.id || selectedMember._id}-${index}`}
                className="flex items-center p-1 bg-blue-400 text-white rounded-md mr-1 mb-1 text-sm"
              >
                <span className="mr-1">
                  <div
                    title="Click For Delete Member"
                    onClick={() =>
                      onRemoveMember(selectedMember.id || selectedMember._id)
                    }
                    className="flex flex-row items-center gap-2 mb-1 cursor-pointer"
                  >
                    <button
                      type="button"
                      className="text-sm font-semibold rounded-md"
                    >
                      <IoPersonRemove size={15} />
                    </button>
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
