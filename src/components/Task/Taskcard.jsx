import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, handleTaskClick, handleDeleteTask, status }) => {
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
      className={`bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 relative ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => handleTaskClick(task)}
    >
      <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">
        <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {task.kanId}
        </span>
      </h3>

      <h3 className={`font-medium text-md ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
        {task.taskName}
      </h3>
      <p className={`text-md ${task.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-400'} mt-2 overflow-hidden text-ellipsis whitespace-nowrap`}>
        {/* {task.description} */}
      </p>

      <button
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
        aria-label="Delete task"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask(task._id, status);
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default TaskCard;
