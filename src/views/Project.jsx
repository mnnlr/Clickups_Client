import React, { useEffect, useState } from 'react';
import CreateProjectModal from '../components/Models/CreateProjectModal';
import EditProjectModal from '../components/Models/EditProjectModal';
import AddMembersModal from '../components/Models/AddMemberModal';
import Cookies from 'js-cookie';
import { axiosPrivate } from '../CustomAxios/customAxios';
import { Link } from 'react-router-dom';

// Mock data for projects and members
const mockProjects = [
  {
    id: 'proj1',
    projectName: 'Project Alpha',
    description: 'This is the first project.',
    teamMembers: ['user1', 'user2'],
    owner: 'user1',
    dueDate: '2024-09-15',
    status: 'active',
  },
  {
    id: 'proj2',
    projectName: 'Project Beta',
    description: 'This is the second project.',
    teamMembers: ['user2', 'user3'],
    owner: 'user3',
    dueDate: '2024-10-01',
    status: 'completed',
  },
];

const Project = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    teamMembers: [],
    owner: '',
    dueDate: '',
    status: '',
  });
  const [projects, setProjects] = useState(mockProjects);
  const [currentProject, setCurrentProject] = useState(null);

  const token = Cookies.get("User");

  useEffect(() => {
    const fetchData = async () => {
      await getMembers();
      await getProjects();
    };
    fetchData();
  }, [token]);

  const getMembers = async () => {
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
      setAvailableMembers(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axiosPrivate.get("/api/projects", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });
      const responseData = response.data.Data.length === 0 ? mockProjects : response.data.Data.map((project) => ({
        id: project._id,
        projectName: project.projectName,
        description: project.description,
        teamMembers: project.teams.members.map(team => team._id),
        owner: project.owner._id,
        dueDate: project.dueDate,
        status: project.status,
      }));
      setProjects(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetProjectData();
  };

  const openEditModal = (project) => {
    setProjectData({
      projectName: project.projectName,
      description: project.description,
      teamMembers: project.teamMembers,
      owner: project.owner,
      dueDate: new Date(project.dueDate).toISOString().split('T')[0],
      status: project.status,
    });
    setSelectedMembers(project.teamMembers);
    setCurrentProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetProjectData();
  };

  const openAddMembersModal = (project) => {
    setCurrentProject(project);
    setSelectedMembers(project.teamMembers);
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
      teamMembers: [],
      owner: '',
      dueDate: '',
      status: '',
    });
    setSelectedMembers([]);
    setCurrentProject(null);
  };

  const handleAddMember = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

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

  const updateProject = async () => {
    const updatedProjects = projects.map((proj) =>
      proj.id === currentProject.id
        ? { ...projectData, id: currentProject.id, teamMembers: selectedMembers }
        : proj
    );

    const updateData = {
      ...currentProject,
      projectName: projectData.projectName,
      description: projectData.description,
      owner: projectData.owner,
      dueDate: projectData.dueDate,
      status: projectData.status,
    };

    try {
      const response = await axiosPrivate.patch(`/api/projects/${currentProject.id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        alert("Project updated successfully.");
        setProjects(updatedProjects);
        closeEditModal();
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong: " + err.response.data.message);
    }
  };

  const createProject = async () => {
    const newProject = {
      id: `proj${projects.length + 1}`,
      ...projectData,
      teamMembers: selectedMembers,
    };

    const MembersIds = selectedMembers.map(id => ({ teamData: id }));

    try {
      if (projectData && selectedMembers) {
        const teamResponse = await axiosPrivate.post('/api/teams', { teamName: projectData.projectName + "'s Team", memberIdentifiers: selectedMembers }, {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
        });

        const dataForBackend = {
          projectName: projectData.projectName,
          teams: teamResponse.data.teamId,
          description: projectData.description,
          dueDate: projectData.dueDate,
          owner: projectData.owner,
          status: projectData.status
        };

        const projectResponse = await axiosPrivate.post("/api/projects", dataForBackend, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });

        if (projectResponse.status === 201) {
          setProjects([...projects, newProject]);
          closeModal();
        }
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong: Try again. (Try: Project Description must be between 10 and 200 characters)");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axiosPrivate.delete(`/api/projects/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
        });
        if (response.status === 200) {
          setProjects(projects.filter((proj) => proj.id !== id));
          alert("Project deleted successfully.");
        } else {
          alert("Something went wrong: " + response.data.message);
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong: " + err.message);
      }
    }
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

  const handleAddMembersSubmit = async (e) => {
    e.preventDefault();
    if (currentProject) {
      const updatedProjects = projects.map((proj) =>
        proj.id === currentProject.id
          ? { ...proj, teamMembers: selectedMembers }
          : proj
      );

      try {
        const response = await axiosPrivate.patch(`/api/teams/`, { teamName: currentProject.projectName + "'s Team", members: selectedMembers }, {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
        });
        if (response.status === 200) {
          setProjects(updatedProjects);
          closeAddMembersModal();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
      <h3 className="text-left text-lg font-bold mb-6">Projects</h3>

      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
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

      <div className="text-right mr-10">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create New Project
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setFilterType('all')}
          className={`p-2 rounded-lg ${filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('inactive')}
          className={`p-2 rounded-lg ${filterType === 'inactive' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Inactive
        </button>
        <button
          onClick={() => setFilterType('active')}
          className={`p-2 rounded-lg ${filterType === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterType('completed')}
          className={`p-2 rounded-lg ${filterType === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Completed
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Project List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Project Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Members assigned</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Due Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">More Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filterProjects(projects).map((project) => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{project.projectName || ''}</td>
                <td className="py-3 px-6 text-left">{project.description || ''}</td>
                <td className="py-3 px-6 text-left flex flex-row flex-wrap">
                  {project.teamMembers.map((memberId) => {
                    const member = availableMembers.find((m) => m.id === memberId);
                    return (
                      <div key={memberId} className="text-sm mr-3">
                        {member ? member.name.charAt(0).toUpperCase() + member.name.slice(1) : ''}
                      </div>
                    );
                  })}
                </td>
                <td className="py-3 px-6 text-left">
                  {availableMembers.find((m) => m.id === project.owner)?.name || ''}
                </td>
                <td className="py-3 px-6 text-left">{new Date(project.dueDate).toLocaleDateString() || ''}</td>
                <td className="py-3 px-6 text-left">{project.status || ''}</td>
                <td className="py-3 px-6 text-right">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 mr-1"
                  >
                    Edit
                  </button>
                  <Link
                    to={`/dashboard/`}
                    onClick={() => handleViewDetails(project)}
                    className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 mr-1"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => openAddMembersModal(project)}
                    className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 mr-1"
                  >
                    Add Teams
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    Delete
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
          selectedMembers={selectedMembers}
          onSelectMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
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
          selectedMembers={selectedMembers}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          availableMembers={availableMembers}
          onClose={closeAddMembersModal}
          onSubmit={handleAddMembersSubmit}
        />
      )}
    </div>
  );
};

export default Project;