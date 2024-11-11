import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './Search';
import AddMembersModal from '../components/Models/AddMemberModal';
import Modal from '../components/Models/Modal';

const AllWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([
    { _id: 1, name: 'Nike', type: 'Team', createdAt: 'Oct 17, 2019' },
    { _id: 2, name: 'Pepsi', type: 'Personal', createdAt: 'Feb 5, 2020' },
    { _id: 3, name: 'Disney', type: 'Team', createdAt: 'Jul 12, 2018' },
    { _id: 4, name: 'Apple', type: 'Personal', createdAt: 'Dec 1, 2021' },
    { _id: 5, name: 'Tesla', type: 'Team', createdAt: 'Jan 20, 2022' },
  ]);
  
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterWorkspace, setFilterWorkspace] = useState([]);

  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setFilterWorkspace(
      workspaces.filter((space) =>
        space.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, workspaces]);

  const addWorkspace = () => {
    if (newWorkspaceName.trim() && workspaceType) {
      const newWorkspace = { 
        name: newWorkspaceName, 
        type: workspaceType, 
        createdAt: new Date().toLocaleDateString() 
      };
      setWorkspaces([...workspaces, newWorkspace]);
      setNewWorkspaceName('');
      setWorkspaceType('');
      closeModal();
    }
  };

  const switchWorkspace = (workspace) => {
    navigate(`/workspace/${workspace._id}/${workspace.type}`, {
      state: { workspaceName: workspace.name },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const AddMember = () => {
    setIsAddMembersModalOpen(true);
  };

  const closeAddMembersModal = () => {
    setIsAddMembersModalOpen(false);
  };

  return (
    <div className={`p-6 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen ml-16 overflow-auto md:ml-16 lg:ml-20`}>
      <div className="py-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Workspaces</h1>
          <div className="flex items-center gap-5">
            <SearchBox search={search} handleSearch={handleSearch} />
            <button
              className="bg-blue-500 h-10 text-white px-4 py-0 rounded"
              onClick={AddMember}
            >
              Manage Team
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div
            className="relative w-36 h-36 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg shadow cursor-pointer"
            onClick={openModal}
          >
            <div className="text-center">
              <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg shadow cursor-pointer hover:shadow-sm shadow-black">
                <div className="text-4xl text-gray-400 dark:text-gray-200 mb-2">+</div>
                <p className="text-gray-600 dark:text-gray-400">Create a workspace</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-3">
          <h1 className="text-2xl font-bold">Workspaces</h1>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {filterWorkspace.map((workspace, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 relative cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => switchWorkspace(workspace)}
            >
              <span className="absolute top-2 left-2 bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded">
                {workspace.type}
              </span>
              <div className="flex items-center mb-4">
                <img
                  alt={`${workspace.name} logo`}
                  className="rounded-full mr-4"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/WgMPA8Y3tkKQJ9Jl5DaJjDTZfgT1I1unvjelHl6Pz22lc7tTA.jpg"
                  width="40"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{workspace.name}</h2>
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">Created: {workspace.createdAt}</p>
            </div>
          ))}
        </div>

        {/* Create Workspace Modal */}
        {isModalOpen && (
          <Modal title="Create a New Workspace" onClose={closeModal}>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="workspace-name">
                  Workspace Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="workspace-name"
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name"
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setWorkspaceType('Personal')}
                  className={`p-2 rounded-lg w-full transition-colors duration-200 ${workspaceType === 'Personal'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setWorkspaceType('Team')}
                  className={`p-2 rounded-lg w-full transition-colors duration-200 ${workspaceType === 'Team'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Team
                </button>
              </div>
              <button
                type="button"
                onClick={addWorkspace}
                className="p-2 w-full bg-blue-600 text-white rounded-lg transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                disabled={!newWorkspaceName || !workspaceType}
              >
                Create Workspace
              </button>
            </form>
          </Modal>
        )}

        {/* Add Members Modal */}
        {isAddMembersModalOpen && (
          <AddMembersModal onClose={closeAddMembersModal} />
        )}
      </div>
    </div>
  );
};

export default AllWorkspaces;
