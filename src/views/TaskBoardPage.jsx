import React, { useState, useEffect } from 'react';
import TaskForm from '../components/Models/TaskFormModal.jsx';
import TaskColumn from '../components/Task/TaskColumn.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { axiosPrivate } from '../CustomAxios/customAxios.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from '../components/Models/DeleteConfirmModel.jsx';
import { useSelector } from 'react-redux';

const TaskBoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMode, setTaskMode] = useState(null);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { sprintId, projectId } = useParams();
  const { user } = useSelector((store) => store.login);

  const [task, setTask] = useState({
    _id: null,
    userId: user._id,
    taskName: '',
    description: '',
    assignees: '',
    status: '',
    sprintId: sprintId,
    projectId: projectId,
    report: '',
  });

  const token = Cookies.get("User");

  const [tasks, setTasks] = useState({
    'ToDo': [],
    'In-Progress': [],
    'On-Hold': [],
    'Done': [],
  });

  const [availableMembers, setAvailableMembers] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axiosPrivate.get('/api/tasks', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const tasksData = response.data.data.allTask;
        console.log(tasksData);
        
        setTasks({
          'ToDo': tasksData.filter(task => task.status === 'ToDo'),
          'In-Progress': tasksData.filter(task => task.status === 'In-Progress'),
          'On-Hold': tasksData.filter(task => task.status === 'On-Hold'),
          'Done': tasksData.filter(task => task.status === 'Done'),
        });
      } else {
        toast.error("Failed to fetch tasks: " + response.data.message);
      }
    } catch (err) {
      toast.error('Error fetching tasks: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [task,sprintId,projectId]);

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
      setAvailableMembers(responseData);
    } catch (err) {
      toast.error('Error fetching members: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setIsOpenDeleteModel(true);
  };

  const handleSubmit = async () => {
    try {
      const taskToSubmit = { ...task };

      if (taskToSubmit._id) {
        // Update existing task
        const response = await axiosPrivate.patch(`/api/tasks/${taskToSubmit._id}`, taskToSubmit, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          updateTaskInState(response.data.data.task);
          toast.success("Task Updated");
        } else {
          toast.error("Failed to update task: " + response.data.message);
        }
      } else {
        // Create new task
        const response = await axiosPrivate.post(`/api/tasks/${projectId}/${sprintId}`, taskToSubmit, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success("Task Created");
          fetchTasks(); 
        } else {
          toast.error("Failed to create task: " + response.data.message);
        }
      }
      resetTaskForm();
    } catch (error) {
      toast.error('Error saving task: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const updateTaskInState = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[updatedTask.status] = updatedTasks[updatedTask.status].map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );
      return updatedTasks;
    });
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      try {
        const response = await axiosPrivate.delete(`/api/tasks/${taskToDelete}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchTasks(); // Refetch tasks to ensure the UI is updated
          toast.success("Task Deleted");
          setIsOpenDeleteModel(false);
          setTaskToDelete(null);
        } else {
          toast.error("Failed to delete task: " + response.data.message);
        }
      } catch (error) {
        toast.error('Error deleting task: ' + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const moveTask = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      const response = await axiosPrivate.patch(`/api/tasks/${task._id}`, updatedTask, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchTasks(); // Refetch tasks after moving the task
      } else {
        toast.error("Failed to move task: " + response.data.message);
      }
    } catch (error) {
      toast.error('Error moving task: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const resetTaskForm = () => {
    setIsModalOpen(false);
    setTaskMode(null);
    setTask({
      _id: null,
      userId: user._id,
      taskName: '',
      description: '',
      assignees: '',
      status: '',
      report: '',
      sprintId: sprintId, 
      projectId: projectId
    });
  };

  const handleCancel = () => {
    resetTaskForm();
  };

  const handleTaskClick = (task) => {
    setTask(task);
    setTaskMode('edit');
    setIsModalOpen(true);
  };

  const handleCreateTaskClick = () => {
    setTaskMode('create');
    setIsModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
        <div className="flex space-x-4 overflow-x-auto">
          {Object.keys(tasks).map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks[status]}
              handleTaskClick={handleTaskClick}
              handleDeleteTask={handleDeleteConfirm}
              moveTask={moveTask}
            />
          ))}
        </div>
        {isModalOpen && (
          <TaskForm
            task={task}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            taskMode={taskMode}
            availableMembers={availableMembers}
          />
        )}
        <DeleteConfirmationModal
          isOpen={isOpenDeleteModel}
          onClose={() => setIsOpenDeleteModel(false)}
          onConfirm={handleDeleteTask}
        />
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-xl shadow-lg hover:bg-blue-600"
          onClick={handleCreateTaskClick}
        >
          Create Task
        </button>
      </div>
    </DndProvider>
  );
};

export default TaskBoardPage;
