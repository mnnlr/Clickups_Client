import React from "react";

const TaskCard = ({ task, index, onEdit, onDelete, provided }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-gray-200 p-4 rounded-md mb-4"
    >
      <h3 className="font-medium text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
      <p className="text-sm text-gray-500">Priority: {task.priority}</p>
      <p className="text-sm text-gray-500">KAN ID: {task.kanId}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white py-1 px-3 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
