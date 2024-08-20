import React, { useState } from 'react';

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState(['Workspace 1', 'Workspace 2']);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const addWorkspace = () => {
    if (newWorkspaceName.trim()) {
      setWorkspaces([...workspaces, newWorkspaceName]);
      setNewWorkspaceName('');
    }
  };

  const switchWorkspace = (workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <div className="p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Workspace</h1>

      {/* List of Workspaces */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Workspaces</h2>
        <ul>
          {workspaces.map((workspace, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow-md mb-4 cursor-pointer ${
                activeWorkspace === workspace ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => switchWorkspace(workspace)}
            >
              {workspace}
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
          className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4"
        />
        <button
          onClick={addWorkspace}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          Create Workspace
        </button>
      </div>
    </div>
  );
};

export default Workspace;
