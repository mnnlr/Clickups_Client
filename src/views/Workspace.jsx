import React, { useState } from 'react';

const AllWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([
    { name: 'Nike', type: 'Team', createdAt: 'Oct 17, 2019' },
    { name: 'Pepsi', type: 'Personal', createdAt: 'Feb 5, 2020' },
    { name: 'Disney', type: 'Team', createdAt: 'Jul 12, 2018' },
    { name: 'Apple', type: 'Personal', createdAt: 'Dec 1, 2021' },
    { name: 'Tesla', type: 'Team', createdAt: 'Jan 20, 2022' },
  ]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open/Close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add a new workspace
  const addWorkspace = () => {
    if (newWorkspaceName.trim() && workspaceType) {
      const newWorkspace = { name: newWorkspaceName, type: workspaceType, createdAt: new Date().toLocaleDateString() };
      setWorkspaces([...workspaces, newWorkspace]);
      setNewWorkspaceName('');
      setWorkspaceType('');
      closeModal();
    }
  };

  // Switch active workspace
  const switchWorkspace = (workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <div className="py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Workspaces</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}>
          Manage Team
        </button>
      </div>
        <div className="grid grid-cols-3 gap-6">
          {/* "Create a workspace" card */}
          <div
            className="bg-white border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center p-6 cursor-pointer"
            onClick={openModal}
          >
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">+</div>
              <p className="text-gray-600">Create a workspace</p>
              <p className="text-gray-400 text-sm">e.g. Nike, Pepsi, Disney</p>
            </div>
          </div>

          {/* Loop through workspaces and display each one as a card */}
          {workspaces.map((workspace, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 relative cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => switchWorkspace(workspace)}
            >
              {/* Workspace Status */}
              <span className="absolute top-2 left-2 bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded">
                {workspace.type}
              </span>

              {/* Workspace Header */}
              <div className="flex items-center mb-4">
                <img
                  alt={`${workspace.name} logo`}
                  className="rounded-full mr-4"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/WgMPA8Y3tkKQJ9Jl5DaJjDTZfgT1I1unvjelHl6Pz22lc7tTA.jpg"
                  width="40"
                />
                <h2 className="text-lg font-semibold">{workspace.name}</h2>
              </div>

              {/* Workspace Created Date */}
              <p className="text-gray-400 text-sm mb-4">Created: {workspace.createdAt}</p>

              {/* Workspace User */}
              <div className="flex items-center">
                <img
                  alt="user avatar"
                  className="rounded-full mr-2"
                  height="20"
                  src="https://storage.googleapis.com/a1aa/image/yyALZ0emoHzVd6YDEiKf8MCf6dLsyO6982Cz78pDze5Byt3OB.jpg"
                  width="20"
                />
              </div>

              {/* Workspace Settings and Delete Icons */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <i className="fas fa-cog text-gray-400"></i>
                <i className="fas fa-trash text-gray-400"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Creating New Workspace */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create a New Workspace</h2>
                <button className="text-gray-500" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workspace-name">
                    Workspace Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className={`p-2 rounded-lg w-full transition-colors duration-200 ${
                      workspaceType === 'Personal'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkspaceType('Team')}
                    className={`p-2 rounded-lg w-full transition-colors duration-200 ${
                      workspaceType === 'Team'
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWorkspaces;
