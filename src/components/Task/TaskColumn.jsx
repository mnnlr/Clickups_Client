import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, handleTaskClick, handleDeleteTask, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item, status);
      }
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ToDo':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
      case 'In-Progress':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300';
      case 'On-Hold':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300';
      case 'Done':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-blue-100 text-gray-800 dark:bg-blue-900 dark:text-gray-400';
    }
  };

  return (
    <div
      ref={drop}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col w-96"
    >
      <h2
        className={`text-xl font-semibold mb-4 px-3 py-1 rounded-full ${getStatusColor(status)}`}
      >
        {status}
      </h2>
      <div className="flex flex-col space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            status={status}
            handleTaskClick={handleTaskClick}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
