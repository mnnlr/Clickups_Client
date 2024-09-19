import React, { useState } from 'react';

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([
    { name: 'Workspace 1', type: 'Team' },
    { name: 'Workspace 2', type: 'Personal' }
  ]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');

  const addWorkspace = () => {
    if (newWorkspaceName.trim() && workspaceType) {
      setWorkspaces([...workspaces, { name: newWorkspaceName, type: workspaceType }]);
      setNewWorkspaceName('');
      setWorkspaceType('');
    }
  };

  const switchWorkspace = (workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Workspace</h1>

      {/* List of Workspaces */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Workspaces</h2>
        <ul>
          {workspaces.map((workspace, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow-md mb-4 cursor-pointer transition-colors duration-200 ${
                activeWorkspace === workspace
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => switchWorkspace(workspace)}
            >
              <div className="font-medium">{workspace.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{workspace.type}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Workspace */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Workspace</h2>
        <input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          placeholder="Workspace Name"
          className="p-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <div className="flex space-x-4 mb-4">
          <button
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
          onClick={addWorkspace}
          className="p-2 w-full bg-blue-600 text-white rounded-lg transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
          disabled={!newWorkspaceName || !workspaceType}
        >
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default Workspace;
