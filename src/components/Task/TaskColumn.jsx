// src/components/TaskColumn.js
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

  return (
    <div ref={drop} className="bg-white rounded-lg shadow-md p-4 flex flex-col w-80">
<h2 className="text-xl font-semibold mb-4 text-gray-800">{status}</h2>
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
