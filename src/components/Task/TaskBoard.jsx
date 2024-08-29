import React, { useState, useEffect } from 'react';
import TaskForm from '../Models/TaskFormModal.jsx';
import TaskColumn from './TaskColumn';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomAxios from '../../CustomAxios/customAxios';

const TaskBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMode, setTaskMode] = useState(null);
  const [task, setTask] = useState({
    id: null,
    title: '',
    description: '',
    assignee: '',
    status: 'To Do',
    labels: '',
    parent: '',
    sprint: '',
    reporter: '',
    comment: '',
  });
  const [tasks, setTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'On Hold': [],
    'Done': [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await CustomAxios.get('/tasks');
        const tasksData = response.data;
        console.log('Tasks Data:', tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (task.id) {
        await CustomAxios.patch(`/tasks/${task.id}`, task);
        console.log('Updated task:', task);
        updateTaskInState(task);
      } else {
        const response = await CustomAxios.post('/tasks', task);
        const newTask = response.data;
        console.log('Created task:', newTask);
        setTasks((prevTasks) => ({
          ...prevTasks,
          [newTask.status]: [...(prevTasks[newTask.status] || []), newTask],
        }));
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
        task.id === updatedTask.id ? updatedTask : task
      );
      return updatedTasks;
    });
  };

  const handleDeleteTask = async (taskId, status) => {
    try {
      await CustomAxios.delete(`/tasks/${taskId}`);
      console.log('Deleted task ID:', taskId);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: prevTasks[status].filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const moveTask = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await CustomAxios.patch(`/tasks/${task.id}`, updatedTask);

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[task.status] = updatedTasks[task.status].filter((t) => t.id !== task.id);
        updatedTasks[newStatus] = [...(updatedTasks[newStatus] || []), updatedTask];
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const resetTaskForm = () => {
    setIsModalOpen(false);
    setTaskMode(null);
    setTask({
      id: null,
      title: '',
      description: '',
      assignee: '',
      status: 'To Do',
      labels: '',
      parent: '',
      sprint: '',
      reporter: '',
      comment: '',
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
      <div className="relative pt-16 pb-6 bg-gray-100 h-screen overflow-auto md:ml-16 lg:ml-20">
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

export default TaskBoard;
