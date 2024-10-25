import React from 'react';
import Modal from '../Models/Modal';

const AddMembersModal = ({
  availableMembers,
  selectedMembers,
  onAddMember,
  onRemoveMember,

  availableTeams,
  selectedTeams,
  onAddTeam,
  onRemoveTeam,

  onClose,
  onSubmit
}) => {

  const [searchQuery, setSearchQuery] = React.useState('');

  // console.log("selected members and teams: " + selectedMembers, selectedTeams)

  const filteredTeams = availableTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ensure selectedTeams is an array
  const selectedTeamsArray = Array.isArray(selectedTeams) ? selectedTeams : [];
  console.log(selectedTeamsArray)

  // Combine filtered teams with selected teams to ensure all selected teams are displayed
  const combinedTeams = [
    ...filteredTeams,
    ...selectedTeamsArray.filter(selectedTeam => !filteredTeams.some(team => team.id === selectedTeam.id))
  ];

  const selectedMembersArray = Array.isArray(selectedMembers) ? selectedMembers : [];
  console.log(selectedMembersArray)

  // Combine filtered members with selected members to ensure all selected members are displayed
  const combinedMembers = [
    ...filteredMembers,
    ...selectedMembersArray.filter(selectedMember => !filteredMembers.some(member => member.id === selectedMember.id))
  ];

  return (
    <Modal title="Add Teams to Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">

          {/* Search for teams and members */}
          <input
            type="text"
            placeholder="Search teams & memebers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm dark:bg-gray-800 dark:text-gray-300"
          />

          {/* Display available teams and members */}
          <div className='mt-2'>
            <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">Available Teams & Members:</p>
            <div className="flex flex-wrap">
              {combinedTeams.map((team, index) => (
                <div
                  key={`${team.id}-${index}`}
                  onClick={() => onAddTeam(team.id)}
                  className={`cursor-pointer p-2 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 mb-2 ${selectedTeamsArray.includes(team.id) ? 'bg-blue-500 text-white' : ''}`}
                >
                  {team.name}
                </div>
              ))}

              {combinedMembers.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  onClick={() => onAddMember(member.id)}
                  className={`cursor-pointer p-2 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 mb-2 ${selectedMembers.includes(member.id) ? 'bg-blue-500 text-white' : ''}`}
                >
                  {member.name} {/* Ensure this is 'name' */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">Selected Teams & Members:</p>
          <div className="flex flex-wrap mt-1">
            {selectedTeams.map((selectedTeam, index) => (
              console.log("selectedTeams:" + selectedTeamsArray),
              <div
                key={`${selectedTeam}-${index}`}
                className="flex items-center p-1 bg-blue-500 text-white rounded-md mr-1 mb-1 text-sm"
              >
                <span>{selectedTeam.name}</span> {/* Ensure this is 'teamName' */}
                <button
                  type="button"
                  onClick={() => onRemoveTeam(selectedTeam.id)}
                  className="ml-1 text-sm bg-gray-300 dark:bg-gray-600 font-semibold px-2 py-1 rounded-md text-center text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            {selectedMembers.map((selectedMember, index) => (
              <div
                key={`${selectedMember}-${index}`}
                className="flex items-center p-1 bg-blue-500 text-white rounded-md mr-1 mb-1 text-sm"
              >
                <span>{selectedMember.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveMember(selectedMember.id)}
                  className="ml-1 text-sm bg-gray-300 dark:bg-gray-600 font-semibold px-2 py-1 rounded-md text-center text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
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
    </Modal >
  );
};

export default AddMembersModal;
