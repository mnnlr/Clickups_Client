import React, { useState } from 'react';
import Modal from "../components/Task/Modal"
import axios from 'axios';
import Cookies from 'js-cookie';

const Project = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ToggleAddMemberForm, setToggleAddMemberForm] = useState(false);
  const [MemberFormData, setMemberFormData] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAddMembersToggle = () => setToggleAddMemberForm(!ToggleAddMemberForm);

  const projects = [
    { name: 'project 1', key: 'DM', type: 'Team-managed business', lead: 'user 1', url: 'http://localhost:5173/task' },
    { name: 'project 2', key: 'GTMS', type: 'Team-managed business', lead: 'user 2', url: 'https://example.com/2' },
    { name: 'project 3', key: 'KAN', type: 'Team-managed software', lead: 'user 3', url: 'https://example.com/3' },
  ];

  const filteredProjects = projects.filter(project =>
    (filterType === 'all' || project.type.toLowerCase() === filterType) &&
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  //----------------Handle Members Form Change-----------------
  const handleMemberFormChange = (e) => {
    const { name, value } = e.target;
    setMemberFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  //----------------Handle Members Form Submit-----------------
  const handleAddMember = async (e) => {
    e.preventDefault();

    const token = Cookies.get('User');

    console.log(MemberFormData);
    try {
      await axios.post('http://localhost:5000/api/teams', { teamName: MemberFormData.teamName, memberEmail: MemberFormData.member }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        withCredentials: true
      }).then((response) => {
        console.log(response);
        setToggleAddMemberForm(!ToggleAddMemberForm);
      })
    } catch (err) {
      console.log(err);
      alert("Something went wrong: " + err.response.data.message);
    }
  }

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
      <div className='text-right mr-10'>
        <button onClick={openModal} className='bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
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
          onClick={() => setFilterType('team-managed business')}
          className={`p-2 rounded-lg ${filterType === 'team-managed business' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Team-managed business
        </button>
        <button
          onClick={() => setFilterType('team-managed software')}
          className={`p-2 rounded-lg ${filterType === 'team-managed software' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Team-managed software
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Project List</h2>
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">More actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project, index) => (
                <tr tr key={index} >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.key}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.lead}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500"><a href={project.url} target="_blank" rel="noopener noreferrer">View Project</a></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="mr-2 text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 hover:border-blue-600 rounded px-3 py-1 transition-all duration-200">
                      Edit
                    </button>
                    <button onClick={handleAddMembersToggle} className="mr-2 text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 hover:border-blue-600 rounded px-3 py-1 transition-all duration-200">
                      Add Members
                    </button>
                    <button className="text-white bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 rounded px-3 py-1 transition-all duration-200">
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Render the modal */}
      {
        isModalOpen && (
          <Modal title="Create new Project" onClose={closeModal}>
            <form>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Project Name</label>
                <input type="text" name="projectName" class="w-full border border-gray-300 rounded-md p-2" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Description</label>
                <textarea name="description" class="w-full border border-gray-300 rounded-md p-2" required></textarea>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Team Members</label>
                <select multiple name="teamMembers" class="w-full border border-gray-300 rounded-md p-2">
                  <option value="active">user1</option>
                  <option value="inactive">user2e</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Owner</label>
                <select name="owner" class="w-full border border-gray-300 rounded-md p-2" required>
                  <option value="active">user1</option>
                  <option value="inactive">user2</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Due Date</label>
                <input type="date" name="dueDate" class="w-full border border-gray-300 rounded-md p-2" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">Status</label>
                <select name="status" class="w-full border border-gray-300 rounded-md p-2" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">Create</button>
              </div>
            </form>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Close
            </button>
          </Modal>
        )
      }

      {/* hendel the members form */}
      {
        ToggleAddMemberForm && (
          <Modal title="Create new Project" onClose={handleAddMembersToggle}>
            <form className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Team Name</label>
                <input
                  type="text"
                  name="teamName"
                  placeholder='Enter Team Name'
                  onChange={handleMemberFormChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Team Member Email</label>
                <input
                  type="email"
                  placeholder='jone@gmail.com'
                  onChange={handleMemberFormChange}
                  name="member"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  onClick={handleAddMember}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleAddMembersToggle}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </form>
          </Modal>
        )
      }
    </div >
  );
};

export default Project;
