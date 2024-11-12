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
import { showToast } from '../components/Toastconfig.jsx';

const TaskBoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMode, setTaskMode] = useState(null);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { sprintId, projectId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filterTasks = () => {
    if (!searchQuery) return tasks;

    const query = searchQuery.toLowerCase();
    let filteredTasks = { 'ToDo': [], 'In-Progress': [], 'On-Hold': [], 'Done': [] };

    Object.keys(tasks).forEach((status) => {
      filteredTasks[status] = tasks[status].filter((task) => {
        const taskNameMatch = task.taskName && task.taskName.toLowerCase().includes(query);
        const idMatch = task._id && task._id.toLowerCase().includes(query);
        const kanIdMatch = task.kanId && task.kanId.toLowerCase().includes(query);
        const statusMatch = task.status && task.status.toLowerCase().includes(query);

        const assigneesMatch = Array.isArray(task.assignees)
          ? task.assignees.some(assignee =>
            (assignee.name && assignee.name.toLowerCase().includes(query)) ||
            (assignee.email && assignee.email.toLowerCase().includes(query)))
          : (task.assignees.name && task.assignees.name.toLowerCase().includes(query)) ||
          (task.assignees.email && task.assignees.email.toLowerCase().includes(query));

        // Return true if any of the matches are true
        return taskNameMatch || idMatch || assigneesMatch || kanIdMatch || statusMatch;
      });
    });

    return filteredTasks;
  };
  ;

  const filteredTasks = filterTasks();

  // useEffect(() => {
  //   console.log("Filtered Tasks:", filteredTasks);
  // }, [filteredTasks]);

  const fetchTasks = async () => {
    try {
      let url;
      if (sprintId) {
        url = `/api/sprints/${sprintId}/task`;
      } else if (projectId) {
        url = `/api/project/individualTask/${projectId}/Tasks`;
      }
      const response = await axiosPrivate.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const tasksData = response.data.data;
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
      console.log(err.response ? err.response.data.message : err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [task, sprintId, projectId]);

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

  const handleSelectUserChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: { _id: value } }));
  };

  const handleDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setIsOpenDeleteModel(true);
  };

  const handleSubmit = async () => {
    try {
      const taskToSubmit = { ...task };

      // Check if updating or creating a task
      if (taskToSubmit._id) {
        let url;
        if (sprintId) {
          url = `/api/tasks/${taskToSubmit._id}`;
        } else if (projectId) {
          url = `/api/project/individualTask/${taskToSubmit._id}`;
        }
        const response = await axiosPrivate.patch(url, taskToSubmit, {
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
        let url;

        // Ensure projectId and sprintId are both provided
        if (projectId && sprintId) {
          url = `/api/tasks/${projectId}/${sprintId}`;
        } else if (projectId) {
          url = `/api/project/individualTask/${projectId}/create`;
        } else {
          const missingField = !projectId ? "Project ID" : "Sprint ID";
          throw new Error(`${missingField} is required to create a task in a project or sprint.`);
        }

        const response = await axiosPrivate.post(url, taskToSubmit, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          showToast("Task Created", "success");
          fetchTasks(); // Fetch tasks after creation
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
        let url;
        if (sprintId) {
          url = `/api/tasks/${taskToDelete}`;
        } else if (projectId) {
          url = `/api/project/individualTask/${taskToDelete}`;
        }
        const response = await axiosPrivate.delete(url, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchTasks();
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
      let url;
      if (sprintId) {
        url = `/api/tasks/${task._id}`;
      } else if (projectId) {
        url = `/api/project/individualTask/${task._id}`;
      }
      const response = await axiosPrivate.patch(url, updatedTask, {
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
      <div className="relative p-6 bg-gray-100 dark:bg-gray-900 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="w-[370px] p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            placeholder="Search by Task Name, Assignee ,KanId"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {Object.keys(filteredTasks).map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={filteredTasks[status]} // Use filteredTasks here
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
            onSelectUserChange={handleSelectUserChange}
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
          className="fixed bottom-8 right-8 bg-blue-500 dark:bg-blue-700 text-white p-4 rounded-xl shadow-lg hover:bg-blue-600 font-semibold duration-300 ease-in-out dark:hover:bg-blue-800"
          onClick={handleCreateTaskClick}
        >
          Create Task
        </button>
      </div>
    </DndProvider>
  );
};

export default TaskBoardPage;
