import React, { useState } from 'react';
import attachIcon from '../Svg icon/attachment-2-svgrepo-com.svg';
import linkIcon from '../Svg icon/link-round-svgrepo-com.svg';
import childIssueIcon from '../Svg icon/website-connection-communication-svgrepo-com.svg';

const TaskForm = ({ task, onChange, onSubmit, onCancel }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!task?.taskName) newErrors.taskName = 'Task Name is required';
    if (!task?.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 md:p-8 lg:p-10 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-700 focus:outline-none"
          aria-label="Close modal"
          onClick={onCancel}
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

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex mb-4 space-x-2">
              <label htmlFor="task-name" className="block text-md my-3 font-medium flex-shrink-0 text-gray-700">
                Task title
              </label>
              <div className="flex items-center flex-col md:flex-row">
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={task.taskName}
                  onChange={onChange}
                  className={`mt-1 block px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full ${errors.taskName ? 'border-red-500' : ''}`}
                  placeholder="Enter task name"
                />
                {errors.taskName && <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>}
              </div>
            </div>

            <div className="flex mb-3 space-x-3">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Attach">
                <img src={attachIcon} alt="Attach" className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Add Child Issue">
                <img src={childIssueIcon} alt="Child Issue" className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Link Issue">
                <img src={linkIcon} alt="Link Issue" className="w-4 h-4" />
              </button>
              {task && (
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Create">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="task-desc" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="task-desc"
                name="description"
                value={task?.description || ''}
                onChange={onChange}
                rows="6"
                className={`mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter task description"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          <div className="border border-gray-300 p-4">
            <div className="flex items-center mb-4">
              <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Assignee</label>
              <input
                type="text"
                id="task-assignee"
                name="assignee"
                value={task?.assignee || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter assignee name"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Status</label>
              <select
                id="task-status"
                name="status"
                value={task?.status || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-labels" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Labels</label>
              <select
                id="task-labels"
                name="labels"
                value={task?.labels || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>None</option>
                <option>Urgent</option>
                <option>Feature</option>
                <option>Bug</option>
                <option>Improvement</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-parent" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Parent Task</label>
              <input
                type="text"
                id="task-parent"
                name="parent"
                value={task?.parent || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter parent task"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-sprint" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Sprint</label>
              <small className="mt-1 flex-grow px-3 py-2 sm:text-sm">{task?.sprint || ''}</small>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-reporter" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Reporter</label>
              <input
                type="text"
                id="task-reporter"
                name="reporter"
                value={task?.reporter || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter reporter name"
              />
            </div>
          </div>
        </div>

        <div className="my-3 text-right">
          <p><strong>Created:</strong> {task?.created ? new Date(task.created).toLocaleDateString() : 'Not set'}</p>
          <p><strong>Updated:</strong> {task?.updated ? new Date(task.updated).toLocaleDateString() : 'Not set'}</p>
        </div>
        <div className="mt-6">
          <label htmlFor="task-comment" className="block text-sm font-medium text-gray-700">Comments</label>
          <textarea
            id="task-comment"
            name="comment"
            value={task?.comment || ''}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none md:resize-y lg:resize-none"
            placeholder="Add comments..."
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            {task ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
