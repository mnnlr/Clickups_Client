import React, { useEffect, useState } from 'react';
import CreateProjectModal from '../components/Models/CreateProjectModal';
import EditProjectModal from '../components/Models/EditProjectModal';
import AddMembersModal from '../components/Models/AddMemberModal';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/Models/DeleteConfirmModel';
import { showToast } from '../components/Toastconfig';
import useGetMembers from '../project-utils-and-hooks/useGetMembers';
import useGetProjects from '../project-utils-and-hooks/useGetProjects';
import useGetTeams from '../project-utils-and-hooks/useGetTeams';
import useUpdateProject from '../project-utils-and-hooks/useUpdateProject';
import useCreateProject from '../project-utils-and-hooks/useCreateProject';
import useHandleDelete from '../project-utils-and-hooks/useHandleDelete';
import handleAddMembersSubmit from '../project-utils-and-hooks/handleAddMembersSubmit';
import { useSelector } from 'react-redux';

const Project = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModel, setdeleteModel] = useState(false)
  const [projectTodelete, setprojectTodelete] = useState(null)
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    teams: [],
    owner: '',
    dueDate: '',
    status: '',
  });


  const navigate = useNavigate()
  const [currentProject, setCurrentProject] = useState(null);
  const user = useSelector((state) => state.login.user);
  // console.log("user: ", user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetProjectData();
  };

  const openEditModal = (project) => {
    setProjectData({
      projectName: project.projectName,
      description: project.description,
      teams: project.teams,
      owner: project.owner,
      dueDate: new Date(project.dueDate).toISOString().split('T')[0],
      status: project.status,
    });
    setSelectedTeams(project.teams.teamIDs || []);
    setSelectedMembers(project.teams.memberIDs || []);
    setCurrentProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetProjectData();
  };

  const openAddMembersModal = (project) => {
    setCurrentProject({
      id: project.id,
      projectName: project.projectName,
      description: project.description,
      status: project.status,
      owner: project.owner,
      teams: project.teams || []
    });
    console.log(project.teams);
    setSelectedTeams(project.teams.teamIDs || []);
    setSelectedMembers(project.teams.memberIDs || []);
    setIsAddMembersModalOpen(true);
  };

  const closeAddMembersModal = () => {
    setIsAddMembersModalOpen(false);
    resetProjectData();
  };

  const resetProjectData = () => {
    setProjectData({
      projectName: '',
      description: '',
      teams: [],
      owner: '',
      dueDate: '',
      status: '',
    });
    setSelectedTeams([]);
    setSelectedMembers([]);
    setCurrentProject(null);
  };

  const handleAddTeam = (teamId) => {
    // console.log("selectedTeams: " + JSON.stringify(selectedTeams));
    if (Array.isArray(selectedTeams) && !selectedTeams.some(team => team.id === teamId)) {
      const teamToAdd = availableTeams.find(team => team.id === teamId);
      setSelectedTeams([...selectedTeams, teamToAdd]);
    }
    // console.log("selectedTeams: " + selectedTeams)
  };
  // console.log("selected members and teams: " + selectedMembers, selectedTeams)


  const handleAddMember = (memberId) => {
    // console.log("selectedMembers: " + JSON.stringify(selectedMembers));
    if (!selectedMembers?.some(member => member.id === memberId)) {
      console.log("selectedMembers: " + selectedMembers);
      const memberToAdd = availableMembers.find(member => member.id === memberId);
      // console.log("memberToAdd" + JSON.stringify(memberToAdd));
      setSelectedMembers([...selectedMembers, memberToAdd]);
    }
  }

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams(selectedTeams.filter((team) => team.id !== teamId));
  };

  const handleRemoveMember = (memberId) => {
    // console.log("memberId: " + memberId);
    setSelectedMembers(selectedMembers.filter((member) => member.id !== memberId));
  }

  const handleSearchMember = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    currentProject ? updateProject() : createProject();
  };

  const handleDeleteToProject = (project) => {
    setprojectTodelete(project.id);
    setdeleteModel(true);
  };

  const filterProjects = (projects) => {
    let filteredProjects = projects;
    if (filterType !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.status === filterType);
    }
    if (searchQuery) {
      filteredProjects = filteredProjects.filter(project =>
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filteredProjects;
  };

  // Projects Utils
  const { projects, setProjects, getProjects } = useGetProjects();
  const { availableMembers } = useGetMembers();
  const { availableTeams } = useGetTeams();
  const { updateProject } = useUpdateProject({ projects, setProjects, closeEditModal, showToast, projectData, currentProject, selectedTeams });
  const { createProject } = useCreateProject({ projects, projectData, selectedTeams, setProjects, closeModal });
  const { handleDelete } = useHandleDelete({ projectTodelete, setProjects, setdeleteModel, setprojectTodelete });

  // console.log("projects: ", projects);

  return (
    <div className="relative p-6 bg-gray-100 dark:bg-gray-900 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </div>
      </div>

      <div className="text-right mb-8">
        <button
          onClick={openModal}
          className="bg-blue-500 font-semibold text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 duration-300 ease-in-out focus:ring-blue-300 dark:focus:ring-blue-600"
        >
          Create New Project
        </button>
      </div>

      <div className="flex space-x-3 mb-8">
        {['all', 'inactive', 'active', 'completed'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`p-2 rounded-lg ${filterType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3">
        <h2 className="text-xl font-bold font-serif mb-4 text-gray-900 dark:text-gray-100">Project List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 font-bold text-gray-600 dark:text-gray-300 uppercase text-md leading-normal">
              <th className="py-3 px-6 text-left">Project Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Teams assigned</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Due Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
            {filterProjects(projects).map((project) => (
              <tr key={project.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="py-3 px-6 text-left">{project.projectName}</td>
                <td className="py-3 px-6 text-left">{project.description}</td>
                <td className="py-3 px-6 text-left flex flex-row flex-wrap">
                  {project.teams?.teamIDs?.map((team, index) => (
                    <div key={`${team.id || index}`} className="text-sm mr-3">
                      {team.name},
                    </div>
                  ))}
                  {project.teams?.memberIDs?.map((member, index) => (
                    <div key={`${member.id || index}`} className="text-sm mr-3">
                      {member.name},
                    </div>
                  ))}

                  {/* {console.log("memberIDs: ", project.teams.memberIDs)} */}
                </td>
                <td className="py-3 px-6 text-left">
                  {availableMembers.find((m) => m.id === project.owner)?.name}
                </td>
                <td className="py-3 px-6 text-left">{new Date(project.dueDate).toLocaleDateString() || ''}</td>
                <td className="py-3 px-6 text-left">{project.status}</td>
                <td className="py-2 px-3 text-center space-x-3 flex flex-row items-end justify-end">
                  {(user.role === "Admin" || project.owner === user._id) && (
                    <>
                      <button
                        onClick={() => handleDeleteToProject(project)}
                        className="bg-red-500 font-mono font-bold text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-600 mr-5 duration-300 ease-in-out whitespace-nowrap"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openEditModal(project)}
                        className="bg-blue-500 text-white text-center px-3 py-1 duration-300 ease-in-out mr-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 whitespace-nowrap"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openAddMembersModal(project)}
                        className="bg-green-500 text-white px-3 py-1 duration-300 ease-in-out rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 mr-2 whitespace-nowrap"
                      >
                        Add Members
                      </button>

                      <button
                        onClick={() => navigate(`/dashboard/${project.id}`)}
                        className="bg-indigo-500 text-white flex flex-row px-3 py-1 mr-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150 ease-in-out whitespace-nowrap"
                      >
                        View
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                          <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => navigate(`/projects/${project.id}/sprints`)}
                    className="bg-blue-500 text-white px-3 py-1 inline-flex rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out whitespace-nowrap"
                  >
                    Go to Task
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                      <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CreateProjectModal
          projectData={projectData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          searchQuery={searchQuery}
          onSearch={handleSearchMember}
          selectedTeams={selectedTeams}
          onSelectTeam={handleAddTeam}
          onRemoveTeam={handleRemoveTeam}
          availableTeams={availableTeams}
          availableMembers={availableMembers}
          onClose={closeModal}
        />
      )}

      {isEditModalOpen && (
        <EditProjectModal
          projectData={projectData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          availableMembers={availableMembers}
          onClose={closeEditModal}
        />
      )}

      {isAddMembersModalOpen && (
        <AddMembersModal
          selectedTeams={selectedTeams}
          onAddTeam={handleAddTeam}
          onRemoveTeam={handleRemoveTeam}
          availableTeams={availableTeams}

          onClose={closeAddMembersModal}
          onSubmit={(e) => handleAddMembersSubmit(e, currentProject, projects, selectedTeams, selectedMembers, setProjects, closeAddMembersModal, getProjects)}

          availableMembers={availableMembers}
          selectedMembers={selectedMembers}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
        />
      )}
      <DeleteConfirmationModal
        isOpen={deleteModel}
        onClose={() => setdeleteModel(false)}
        onConfirm={handleDelete}
      />
    </div>

  );
};

export default Project;