import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { axiosPrivate } from '../../CustomAxios/customAxios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SprintModal from './SprintModal'; 
import DeleteConfirmationModal from '../Models/DeleteConfirmModel';

function Sprint() {
  const [sprints, setSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [sprintname, setSprintname] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sprintToDelete, setSprintToDelete] = useState(null); 
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get('User');

  useEffect(() => {
    fetchSprints();
  }, [projectId, token]);

  const fetchSprints = async () => {
    try {
      const res = await axiosPrivate.get(`/api/sprints/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
      });
      const sprintData = Array.isArray(res.data.Data) ? res.data.Data : [];
      setSprints(sprintData);
    } catch (err) {
      console.error('Error fetching sprints:', err.response ? err.response.data : err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sprintData = { sprintname, projectId, startDate, endDate };
      let res;
      if (selectedSprint) {
        res = await axiosPrivate.patch(`/api/sprints/${selectedSprint._id}`, sprintData, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        toast.success('Sprint Updated');
      } else {
        res = await axiosPrivate.post(`/api/sprints/${projectId}`, sprintData, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        toast.success('Sprint Created');
      }

      resetForm();
      fetchSprints();
      setIsModalOpen(false); // Close modal after submission
    } catch (err) {
      console.error('Error submitting sprint:', err.response ? err.response.data : err.message);
      toast.error('Failed to submit sprint');
    }
  };

  const handleDeleteSprint = (sprint) => {
    setSprintToDelete(sprint);
    setDeleteModalOpen(true); // Open delete confirmation modal
  };

  const confirmDeleteSprint = async () => {
    if (sprintToDelete) {
      try {
       const res= await axiosPrivate.delete(`/api/sprints/${sprintToDelete._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        console.log(res);
        
        toast.success('Sprint deleted successfully');
        fetchSprints();
        setDeleteModalOpen(false); // Close modal after deletion
        setSprintToDelete(null);
      } catch (err) {
        console.error('Error deleting sprint:', err.response ? err.response.data : err.message);
        toast.error('Failed to delete sprint');
      }
    }
  };

  const handleEditSprint = (sprint) => {
    setSelectedSprint(sprint);
    setSprintname(sprint.sprintname || '');
    setStartDate(sprint.startDate || '');
    setEndDate(sprint.endDate || '');
    setIsModalOpen(true); // Open modal when editing
  };

  const handleCreateSprint = () => {
    resetForm();
    setIsModalOpen(true); // Open modal for creating new sprint
  };

  const resetForm = () => {
    setSelectedSprint(null);
    setSprintname('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Sprint Management</h1>
      
      <button
        onClick={handleCreateSprint}
        className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 mb-6"
      >
        Create Sprint
      </button>

      <div className="mt-10 space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sprints</h2>
        {sprints.length > 0 ? (
          sprints.map((sprint) => (
            <div key={sprint._id} className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center space-x-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{sprint.sprintname}</h3>
                <p className="text-gray-600">{sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : 'Not set'} - {sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : 'Not set'}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditSprint(sprint)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSprint(sprint)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/${projectId}/sprints/${sprint._id}/tasks`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                >
                  Go to Tasks
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No sprints available</p>
        )}
      </div>

      {/* Sprint Modal for create/update */}
      <SprintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sprintname={sprintname}
        setSprintname={setSprintname}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
        selectedSprint={selectedSprint}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteSprint}
      />
    </div>
  );
}

export default Sprint;
