import React, { useState, useEffect } from 'react';
import TaskForm from '../components/Models/TaskFormModal.jsx';
import TaskColumn from '../components/Task/TaskColumn.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import{axiosPrivate} from '../CustomAxios/customAxios.js';
import Cookies from 'js-cookie';

const TaskBoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMode, setTaskMode] = useState(null);
  const [task, setTask] = useState({
    _id: null,
    taskName: '',
    description: '',
    assignees: '',
    status: '',
    SprintId:'',
    report: '',
  });
  const token = Cookies.get("User");
  const [tasks, setTasks] = useState({
    'ToDo': [],
    'In-Progress': [],
    'On-Hold': [],
    'Done': [],
  });

  

  useEffect(() => {
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
          alert("Failed to fetch tasks: " + response.data.message);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (task._id) {
        const response = await axiosPrivate.patch(`/api/tasks/${task._id}`, task, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          updateTaskInState(response.data.data.task);
         // console.log('Updated task:', task);
        } else {
          alert("Failed to update task: " + response.data.message);
        }
      } else {
        const response = await axiosPrivate.post('/api/tasks', task, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          const newTask = response.data.data.task;
          setTasks((prevTasks) => ({
            ...prevTasks,
            [newTask.status]: [...(prevTasks[newTask.status] || []), newTask],
          }));
          console.log('Created task:', newTask);
        } else {
          alert("Failed to create task: " + response.data.message);
        }
      }
      resetTaskForm();
    } catch (error) {
      console.error('Error saving task:', error);
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

  const handleDeleteTask = async (taskId, status) => {
    try {
      const response = await axiosPrivate.delete(`/api/tasks/${taskId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [status]: prevTasks[status].filter((task) => task._id !== taskId),
        }));
        console.log('Deleted task ID:', taskId);
      } else {
        alert("Failed to delete task: " + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
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
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks[task.status] = updatedTasks[task.status].filter((t) => t._id !== task._id);
          updatedTasks[newStatus] = [...(updatedTasks[newStatus] || []), updatedTask];
          return updatedTasks;
        });
      } else {
        alert("Failed to move task: " + response.data.message);
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const resetTaskForm = () => {
    setIsModalOpen(false);
    setTaskMode(null);
    setTask({
      _id: null,
      taskName: '',
      description: '',
      assignees: '',
      status: '',
      report: '',
      SprintId:''
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
              handleDeleteTask={handleDeleteTask}
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
          />
        )}
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform rotate-45"
          onClick={handleCreateTaskClick}
        >
          +
        </button>
      </div>
    </DndProvider>
  );
};

export default TaskBoardPage;
