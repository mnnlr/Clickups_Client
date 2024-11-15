import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBox from './Search';
import AddMembersModal from '../components/Models/AddMemberModal';
import customAxios, { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from 'js-cookie';
import Modal from '../components/Models/Modal';
import { useSelector } from 'react-redux';
import { MdModeEditOutline, MdOutlineDeleteForever } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";


const mockdataWorkspace = [
  { _id: 1, workspaceName: 'Nike', type: 'Team', createdAt: 'Oct 17, 2019', workspaceCreatedBy: "Manoj" },
  { _id: 2, workspaceName: 'Pepsi', type: 'Personal', createdAt: 'Feb 5, 2020' },
  { _id: 3, workspaceName: 'Disney', type: 'Team', createdAt: 'Jul 12, 2018' },
  { _id: 4, workspaceName: 'Apple', type: 'Personal', createdAt: 'Dec 1, 2021' },
  { _id: 5, workspaceName: 'Tesla', type: 'Team', createdAt: 'Jan 20, 2022' },]


const AllWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([

  ]);
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterWorkspace, setFilterWorkspace] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const { user } = useSelector((store) => store.login);
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("User");

  const [selectedMembers, setSelectedMembers] = useState([]);

  // console.log("selected Members", selectedMembers);

  const getInitial = (name) => {
    if (!name) return 'No User Assigneed';
    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  };

  const handleAddMember = (memberId) => {
    if (!selectedMembers.some(member => member.id === memberId)) {
      const memberToAdd = availableMembers.find(member => member.id === memberId);
      if (memberToAdd) {
        setSelectedMembers([...selectedMembers, memberToAdd]);
      }
    }
  };

  const handleRemoveMember = (memberId) => {
    console.log("memberId: " + memberId);
    setSelectedMembers(selectedMembers.filter((member) => member.id !== memberId));
  }

  console.log("Selected Members", selectedMembers);


  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [workspaceToEdit, setWorkspaceToEdit] = useState(null);

  const handleEditWorkspace = (workspace) => {
    setWorkspaceToEdit(workspace);
    setNewWorkspaceName(workspace.workspaceName);
    setWorkspaceType(workspace.type);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchWorkspaces()
    fetchMembers()
  }, []);


  useEffect(() => {
    setIsDropdownOpen(null);
  }, [location]);

  useEffect(() => {
    if (Array.isArray(workspaces)) {
      setFilterWorkspace(
        workspaces.filter((space) =>
          (space.workspaceName && space.workspaceName.toLowerCase().includes(search.toLowerCase()))
        )
      );

    }
  }, [search, workspaces]);

  const fetchMembers = async () => {
    try {
      const response = await axiosPrivate.get("/api/users/get-all-users", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });
      const responseData = response.data.users.map(item => ({
        id: item._id,
        name: item.name,
        email: item.email,
      }));
      console.log(responseData);

      setAvailableMembers(responseData);
    } catch (err) {
      console.log('Error fetching members: ' + (err.response ? err.response.data.message : err.message));
    }
  };


  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      const response = await axiosPrivate.delete(`/api/workspaces/${workspaceId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.filter((workspace) => workspace._id !== workspaceId)
        );
        fetchWorkspaces();
        console.log('Workspace deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };



  const fetchWorkspaces = async () => {
    try {
      const response = await customAxios.get('/api/workspaces/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setWorkspaces(response.data.data)
        console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };


  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setNewWorkspaceName('');
    setWorkspaceType('');
    setIsModalOpen(false);
    setSelectedMembers([]);
  };




  const addWorkspace = async () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
        workspaceName: newWorkspaceName,
        workspaceCreatedBy: user._id,
        workspaceDocuments: [],
        workspaceMembers: selectedMembers.map((member) => member.id),
      };

      try {
        const response = await customAxios.post('/api/workspaces/', newWorkspace, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setWorkspaces((prevWorkspaces) => [...prevWorkspaces, response.data]);
          setNewWorkspaceName('');
          setWorkspaceType('');
          closeModal();
          fetchWorkspaces();
        } else {
          throw new Error('Failed to add workspace');
        }
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };

  const switchWorkspace = (workspace) => {
    navigate(`/workspace/${workspace._id}/${workspace.type}`, {
      state: { workspaceName: workspace.workspaceName },
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


  const handleSaveChanges = async () => {
    if (workspaceToEdit) {
      const updatedWorkspace = {
        workspaceName: newWorkspaceName,
        workspaceMembers: selectedMembers.map((member) => member._id),
      };

      try {
        const response = await customAxios.patch(`/api/workspaces/${workspaceToEdit._id}`, updatedWorkspace, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.map(workspace =>
              workspace._id === workspaceToEdit._id ? response.data : workspace
            )
          );
          closeModal();
          fetchWorkspaces();
          console.log('Workspace updated successfully');
        } else {
          throw new Error('Failed to update workspace');
        }
      } catch (error) {
        console.error('Error updating workspace:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <div className="py-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Workspaces</h1>
          <div className="flex items-center gap-5">
            <SearchBox search={search} handleSearch={handleSearch} />
          </div>
        </div>

        <div className="p-4">
          <div
            className="relative w-36 h-36 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg shadow cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={openModal}
          >
            <div className="text-center">
              <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg shadow cursor-pointer hover:shadow-sm">
                <div className="text-4xl text-gray-400 dark:text-gray-200 mb-2">+</div>
                <p className="text-gray-600 dark:text-gray-400">Create a workspace</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-3">
          <h1 className="text-2xl font-bold py-3">Workspaces</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {filterWorkspace.map((workspace, index) => (
            <div
              key={workspace._id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 relative cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-105 hover:shadow-lg"

            >
              <span className="absolute top-2 left-2 bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded">
                {workspace.type || "Team"}
              </span>
              <div className="flex items-center mb-" onClick={() => switchWorkspace(workspace)}>
                <img
                  alt={`${workspace?.workspaceName} logo`}
                  className="rounded-full mr-4"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/WgMPA8Y3tkKQJ9Jl5DaJjDTZfgT1I1unvjelHl6Pz22lc7tTA.jpg"
                  width="40"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{workspace?.workspaceName}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3"><span className='text-md font-bold '>Created By:</span> {workspace?.workspaceCreatedBy?.name}</p>
              <div className="flex items-center mb-4">
                {/* {workspace.workspaceMembers && workspace.workspaceMembers.length > 0 ? (
                  workspace.workspaceMembers.map((member, index) => (
                    <img
                      key={index}
                      alt="user avatar"
                      className="rounded-full -ml-1"
                      height="20"
                      src={member.avatar || "https://via.placeholder.com/20"}
                      width="20"
                    />
                  ))
                ) : (
                  <span className="text-gray-400 ml-2">No members</span>
                )}
                <span className="text-gray-400 ml-2">+{workspace.workspaceMembers.length}</span> */}
              </div>
              <div className="flex items-center mb-4">
                {/* <div
                  className=" rounded-full py-1 px-2 bg-blue-200 text-blue-800 flex items-center justify-center text-sm font-bold">{getInitial(workspace?.workspaceMembers?.name)}</div> */}

                <img
                  alt="user avatar"
                  className="rounded-full -ml-1"
                  height="20"
                  src="https://storage.googleapis.com/a1aa/image/PzjG2aSlcALqKB1k2qYk0llOfaWaSfwftL3QfPCYRIE99lAPB.jpg"
                  width="20"
                />
                <img
                  alt="user avatar"
                  className="rounded-full -ml-1"
                  height="20"
                  src="https://storage.googleapis.com/a1aa/image/PzjG2aSlcALqKB1k2qYk0llOfaWaSfwftL3QfPCYRIE99lAPB.jpg"
                  width="20"
                />
                <img
                  alt="user avatar"
                  className="rounded-full -ml-1"
                  height="20"
                  src="https://storage.googleapis.com/a1aa/image/PzjG2aSlcALqKB1k2qYk0llOfaWaSfwftL3QfPCYRIE99lAPB.jpg"
                  width="20"
                />
                <span className="text-gray-400 ml-2">+4 </span>
              </div>
              <div className="absolute top-2 right-2">
                <button
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen === index ? 'true' : 'false'}
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                  onClick={(e) => toggleDropdown(index, e)}
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>

                {isDropdownOpen === index && (
                  <div className="absolute right-0 mt-2 w-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all duration-300 opacity-100">
                    <ul>
                      <li>
                        <button
                          onClick={() => handleEditWorkspace(workspace)}
                          className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 items-center"
                        >
                          <MdModeEditOutline size={20} />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => AddMember(workspace)}
                          className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FaUserPlus size={20} />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDeleteWorkspace(workspace._id)}
                          className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <MdOutlineDeleteForever size={20} />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Create/Edit Workspace Modal */}
        {isModalOpen && (
          <Modal
            title={isEditMode ? "Edit Workspace" : "Create a New Workspace"}
            onClose={closeModal}
          >
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="workspace-workspaceName">
                  Workspace Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
                  id="workspace-workspaceName"
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="Enter workspace workspaceName"
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setWorkspaceType('Personal')}
                  className={`p-2 rounded-lg w-full transition-colors duration-300 ${workspaceType === 'Personal'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setWorkspaceType('Team')}
                  className={`p-2 rounded-lg w-full transition-colors duration-300 ${workspaceType === 'Team'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  Team
                </button>
              </div>
              <button
                type="button"
                onClick={isEditMode ? handleSaveChanges : addWorkspace}
                className="p-2 w-full bg-blue-600 text-white rounded-lg transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                disabled={!newWorkspaceName || !workspaceType}
              >
                {isEditMode ? "Save Changes" : "Create Workspace"}
              </button>
            </form>
          </Modal>
        )}

        {/* Add Members Modal */}
        {isAddMembersModalOpen && (
          <AddMembersModal
            title={"Add Members to Workspace"}
            availableMembers={availableMembers}
            selectedMembers={selectedMembers}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
            onClose={closeAddMembersModal}
            onSubmit={() => {

            }}
          />
        )}
      </div>
    </div>
  );
};

export default AllWorkspaces;
