<<<<<<< HEAD
import React from 'react';
import Modal from '../Models/Modal';

const AddMembersModal = ({
  selectedTeams,
  onAddTeam,
  onRemoveTeam,
  availableTeams,
  onClose,
  onSubmit
}) => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTeams = availableTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ensure selectedTeams is an array
  const selectedTeamsArray = Array.isArray(selectedTeams) ? selectedTeams : [];
  console.log(selectedTeamsArray)

  // Combine filtered teams with selected teams to ensure all selected teams are displayed
  const combinedTeams = [
    ...filteredTeams,
    ...selectedTeamsArray.filter(selectedTeam => !filteredTeams.some(team => team.id === selectedTeam.id))
  ];

  return (
    <Modal title="Add Teams to Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Search Teams</label>
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm dark:bg-gray-800 dark:text-gray-300"
          />
          <div className="flex flex-wrap">
            {combinedTeams.map((team, index) => (
              <div
                key={`${team.id}-${index}`}
                onClick={() => onAddTeam(team.id)}
                className={`cursor-pointer p-2 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 mb-2 ${selectedTeamsArray.some(selectedTeam => selectedTeam.id === team.id) ? 'bg-blue-500 text-white' : ''}`}
              >
                {team.name} {/* Ensure this is 'name' */}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">Selected Teams:</p>
          <div className="flex flex-wrap mt-1">
            {selectedTeamsArray.map((selectedTeam, index) => (
              <div
                key={`${selectedTeam.id}-${index}`}
                className="flex items-center p-1 bg-blue-500 text-white rounded-md mr-1 mb-1 text-sm"
              >
                <span>{selectedTeam.teamName || selectedTeam.name}</span> {/* Ensure this is 'teamName' */}
                <button
                  type="button"
                  onClick={() => onRemoveTeam(selectedTeam.id)}
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
    </Modal>
  );
};

export default AddMembersModal;
=======
import React from 'react';
import Modal from '../Models/Modal';

const AddMembersModal = ({
  selectedTeams,
  onAddTeam,
  onRemoveTeam,
  availableTeams,
  onClose,
  onSubmit
}) => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTeams = availableTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ensure selectedTeams is an array
  const selectedTeamsArray = Array.isArray(selectedTeams) ? selectedTeams : [];
  console.log(selectedTeamsArray)

  // Combine filtered teams with selected teams to ensure all selected teams are displayed
  const combinedTeams = [
    ...filteredTeams,
    ...selectedTeamsArray.filter(selectedTeam => !filteredTeams.some(team => team.id === selectedTeam.id))
  ];

  return (
    <Modal title="Add Teams to Project" onClose={onClose}>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Search Teams</label>
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
          />
          <div className="flex flex-wrap">
            {combinedTeams.map((team, index) => (
              <div
                key={`${team.id}-${index}`}
                onClick={() => onAddTeam(team.id)}
                className={`cursor-pointer p-2 bg-gray-200 rounded-md mr-2 mb-2 ${selectedTeamsArray.some(selectedTeam => selectedTeam.id === team.id) ? 'bg-blue-500 text-white' : ''}`}
              >
                {team.name} {/* Ensure this is 'name' */}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <p className="font-medium text-gray-700 text-sm">Selected Teams:</p>
          <div className="flex flex-wrap mt-1">
            {selectedTeamsArray.map((selectedTeam, index) => (
              <div
                key={`${selectedTeam.id}-${index}`}
                className="flex items-center p-1 bg-blue-500 text-white rounded-md mr-1 mb-1 text-sm"
              >
                <span>{selectedTeam.teamName || selectedTeam.name}</span> {/* Ensure this is 'teamName' */}
                <button
                  type="button"
                  onClick={() => onRemoveTeam(selectedTeam.id)}
                  className="ml-1 text-sm bg-gray-300 font-semibold px-2 py-1 rounded-md text-center text-red-500"
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
            className="bg-gray-500 text-white px-2 py-1 rounded-md text-sm"
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
>>>>>>> 5021c6d71957294c70dc404f0a3dcea3c2280e07
