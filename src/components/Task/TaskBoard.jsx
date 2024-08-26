import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Draggable task card component
const TaskCard = ({ task, handleTaskClick, handleDeleteTask, status, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { ...task, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-gray-200 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-300 relative ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => handleTaskClick(task)}
    >
      <h3 className="font-medium text-md text-gray-800">{task.title}</h3>
      <p className="text-md text-gray-600">{task.description}</p>

      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 focus:outline-none"
        aria-label="Delete task"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event on the card
          handleDeleteTask(task.id, status);
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

// Droppable column component
const TaskColumn = ({ status, tasks, handleTaskClick, handleDeleteTask, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item, status);
      }
    },
  });

  return (
    <div ref={drop} className="bg-white rounded-lg shadow-md p-4 flex flex-col w-80">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{status}</h2>
      <div className="flex flex-col space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            status={status}
            handleTaskClick={handleTaskClick}
            handleDeleteTask={handleDeleteTask}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
};

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
    'To Do': [
      {
        id: 1,
        title: 'Implement new feature',
        description: 'Implement the new feature as per the latest requirements.',
        status: 'To Do',
        assignee: 'John Doe',
        labels: 'Feature',
        parent: null,
        sprint: 'Sprint 5',
        reporter: 'Jane Smith',
        comment: 'Initial implementation done.',
        created: '2024-08-22T10:00:00Z',
        updated: '2024-08-22T12:00:00Z',
      },
      {
        id: 2,
        title: 'Fix login bug',
        description: 'Resolve the issue preventing users from logging in.',
        status: 'To Do',
        assignee: 'Alice Johnson',
        labels: 'Bug',
        parent: null,
        sprint: 'Sprint 5',
        reporter: 'Jane Smith',
        comment: '',
        created: '2024-08-22T08:00:00Z',
        updated: '2024-08-22T09:30:00Z',
      },
    ],
    'In Progress': [
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for task 3',
        assignee: 'Charlie',
        status: 'In Progress',
        labels: 'Bug',
        parent: '',
        sprint: 'Sprint 1',
        reporter: 'Alice',
        comment: '',
        createdtime: '2 hrs',
      },
    ],
    'On Hold': [
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for task 4',
        assignee: 'Alice',
        status: 'On Hold',
        labels: 'Improvement',
        parent: '',
        sprint: 'Sprint 2',
        reporter: 'Bob',
        comment: '',
        createdtime: '2 hrs',
      },
    ],
    'Done': [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for task 5',
        assignee: 'Bob',
        status: 'Done',
        labels: 'Feature',
        parent: '',
        sprint: 'Sprint 1',
        reporter: 'Charlie',
        comment: '',
        createdtime: '2 hrs',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      if (task.id) {
        const originalStatus = Object.keys(updatedTasks).find((status) =>
          updatedTasks[status].some((t) => t.id === task.id)
        );

        if (originalStatus && originalStatus !== task.status) {
          updatedTasks[originalStatus] = updatedTasks[originalStatus].filter(
            (t) => t.id !== task.id
          );
          updatedTasks[task.status] = [...updatedTasks[task.status], { ...task, updated: new Date().toISOString() }];
        } else {
          updatedTasks[task.status] = updatedTasks[task.status].map((t) =>
            t.id === task.id ? { ...task, updated: new Date().toISOString() } : t
          );
        }
      } else {
        const newTask = {
          ...task,
          id: Date.now(),
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        };

        updatedTasks[task.status] = [...updatedTasks[task.status], newTask];
      }

      return updatedTasks;
    });

    resetTaskForm();
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

  const handleDeleteTask = (taskId, status) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].filter((task) => task.id !== taskId),
    }));
  };

  // Move a task from one status to another
  const moveTask = (task, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Remove task from the current status
      updatedTasks[task.status] = updatedTasks[task.status].filter((t) => t.id !== task.id);

      // Add task to the new status
      updatedTasks[newStatus] = [
        ...updatedTasks[newStatus],
        { ...task, status: newStatus, updated: new Date().toISOString() },
      ];

      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative pt-16 pb-6 bg-gray-100 h-screen overflow-auto md:ml-16 lg:ml-20">
        {/* Display the tasks by their status */}
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

        {/* Modal for creating or editing tasks */}
        {isModalOpen && (
          <TaskForm
            task={task}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {/* Button to create a new task */}
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
