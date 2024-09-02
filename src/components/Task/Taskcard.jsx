// src/components/TaskCard.js
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
      className={`bg-gray-200 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-300 relative ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => handleTaskClick(task)}
    >
      <h3 className="font-medium text-md text-gray-800">{task.taskName}</h3>
      <p className="text-md text-gray-600">{task.description}</p>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 focus:outline-none"
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
