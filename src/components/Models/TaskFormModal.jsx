<<<<<<< HEAD
import React, { useState } from 'react';
import attachIcon from '../Svg icon/attachment-2-svgrepo-com.svg';
import linkIcon from '../Svg icon/link-round-svgrepo-com.svg';
import childIssueIcon from '../Svg icon/website-connection-communication-svgrepo-com.svg';
import CommentsSection from '../Commentsection';
import { TextEditor } from '../TinyMCE_TextEditor/TextEditor';
import DOMPurify from 'dompurify'; // for HTML sanitization

const TaskForm = ({ task, onChange, onSubmit, onCancel, taskMode, availableMembers }) => {
  const [errors, setErrors] = useState({});
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);


  const title = taskMode === 'edit' ? 'Edit Task' : 'Create New Task';
  const validate = () => {
    const newErrors = {};
    // console.log('Task object:', task); 


    if (!task.taskName) newErrors.taskName = 'Task Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Function to handle due date changes
  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    // Assuming you're using setTask to update the task state
    onChange({
      target: {
        name: 'dueDate',
        value: newDueDate,
      }
    });
  };

  // Function to handle description changes
  // const handleDescriptionChange = (e) => {
  //   onChange({
  //     target: {
  //       name: 'description',
  //       value: e.target.value,
  //     }
  //   })
  // }


  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl max-h-screen p-3 md:p-4 lg:p-5 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-700 focus:outline-none dark:text-gray-400"
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

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:flex md:flex-row md:space-x-4 md:justify-center">
          <div className="flex flex-col space-y-4 w-full md:w-2/2">
            <div>
              <div className="flex mb-4 space-x-2">
                <label htmlFor="task-name" className="block text-md my-3 font-medium flex-shrink-0 text-gray-700 dark:text-gray-100 ">
                  Task title
                </label>
                <div className="flex items-center flex-col md:flex-row">
                  <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    value={task.taskName || ''}
                    onChange={onChange}
                    className={`mt-1 block px-3 py-2 border border-gray-300 text-sm text-black shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full `}
                    placeholder="Enter task name"
                  />
                  {errors.taskName && <p className="text-red-500 text-sm mt-1 ">{errors.taskName}</p>}
                </div>
              </div>


              {/* <div className="flex mb-3 space-x-3">
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
              </div> */}

              <div className="mb-4">
              <label htmlFor="task-desc" className="block text-sm font-medium text-gray-700 dark:text-white"> Description</label>

                {isDescriptionVisible && (
                  <>
                    {isEditingDescription ? (
                      <>
                        <TextEditor
                          content={task?.description || ''}
                          setContent={(content) => onChange({ target: { name: 'description', value: content } })}
                          commentbtn={false}
                          editbtn={false}
                        />
                        <div className="mt-2">
                          <button
                            onClick={() => setIsEditingDescription(false)}
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setIsEditingDescription(false)}
                            className="px-4 py-1 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="relative bg-white border border-gray-200 p-3 shadow-sm text-sm rounded-xl mt-2">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className="text-gray-700 break-all" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task?.description || 'No description available') }}></p>
                            <div className="space-x-3 mt-3">
                              <button
                                className="text-blue-600 hover:text-blue-800 mr-2"
                                onClick={() => setIsEditingDescription(true)}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {!isDescriptionVisible && (
                  <button
                    onClick={() => setIsDescriptionVisible(true)}
                    className="px-4 py-1 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Show Description
                  </button>
                )}
              </div>

              <div className="mt-2">
                <CommentsSection taskId={task?._id} />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 dark:border-blue-600 p-4 text-gray-800 dark:text-white">
            <div className="flex items-center mb-4">
              <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20 dark:text-white">
                Assignee
              </label>
              <select
                id="task-assignee"
                name="assignees"
                value={task?.assignees || ''}
                onChange={onChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value="" disabled>
                  Select an assignee
                </option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="flex items-center mb-4">
              <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white">Status</label>
              <select
                id="task-status"
                name="status"
                value={task?.status || ''}
                onChange={onChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value="ToDo">To Do</option>
                <option value="In-Progress">In Progress</option>
                <option value="On-Hold">On Hold</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={task?.priority || ''}
                onChange={onChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">

                <option value="">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-sprint" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white">
                Sprint
              </label>
              <input
                id="task-sprint"
                name="SprintId"
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={task.sprintId ? task.sprintId.sprintname : 'No Sprint Assigned'}
                readOnly
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20 dark:text-white">
                Due Date
              </label>
              <input
                type="date"
                id="task-due-date"
                name="dueDate"
                className="mt-1  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={task?.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : ''}
                onChange={handleDueDateChange}
              />
            </div>


            <div className="flex items-center mb-4">
              <label htmlFor="task-reporter" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white">
                Reporter
              </label>
              <select
                id="task-reporter"
                name="report"
                value={task?.report || ''}
                onChange={onChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value="" disabled>
                  Select a reporter
                </option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <section>
              <div className="my-2 text-left text-xs overflow-y-auto text-gray-500 dark:text-gray-400">
                <p className="mb-1 text-sm space-x-1">
                  <strong className="font-bold text-gray-700 dark:text-gray-200">Created By :</strong>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {task.userId ? task.userId.name : 'No User Assigned'}
                  </span>
                </p>
                <p className="mb-1 text-gray-500 dark:text-gray-400">
                  <strong className="text-sm text-gray-700 dark:text-gray-300">Created:</strong> {task?.createdAt ? new Date(task.createdAt).toLocaleString() : 'Not set'}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <strong className="text-sm text-gray-700 dark:text-gray-300">Updated:</strong> {task?.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'Not set'}
                </p>
              </div>
            </section>
          </div>
        </div>


        {/* <div className="my-2 text-right text-xs overflow-y-auto ...">
          <p className="mb-1 text-gray-500">
            <strong className="text-sm text-gray-700">Created:</strong> {task?.timestamp ? new Date(task.timestamp).toLocaleString() : 'Not set'}
          </p>
          <p className="text-gray-500">
            <strong className="text-sm text-gray-700">Updated:</strong> {task?.updated ? new Date(task.updated).toLocaleString() : 'Not set'}
          </p>
        </div> */}

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
            {taskMode === 'edit' ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
=======
import React, { useState } from 'react';
import attachIcon from '../Svg icon/attachment-2-svgrepo-com.svg';
import linkIcon from '../Svg icon/link-round-svgrepo-com.svg';
import childIssueIcon from '../Svg icon/website-connection-communication-svgrepo-com.svg';
import CommentsSection from '../Commentsection';
import { TextEditor } from '../TinyMCE_TextEditor/TextEditor';
import DOMPurify from 'dompurify'; // for HTML sanitization

const TaskForm = ({ task, onChange, onSubmit, onCancel, taskMode, availableMembers }) => {
  const [errors, setErrors] = useState({});
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);


  const title = taskMode === 'edit' ? 'Edit Task' : 'Create New Task';
  const validate = () => {
    const newErrors = {};
    // console.log('Task object:', task); 


    if (!task.taskName) newErrors.taskName = 'Task Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Function to handle due date changes
  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    // Assuming you're using setTask to update the task state
    onChange({
      target: {
        name: 'dueDate',
        value: newDueDate,
      }
    });
  };

  // Function to handle description changes
  // const handleDescriptionChange = (e) => {
  //   onChange({
  //     target: {
  //       name: 'description',
  //       value: e.target.value,
  //     }
  //   })
  // }


  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl max-h-screen p-6 md:p-8 lg:p-10 relative">
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
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:flex md:flex-row md:space-x-4 md:justify-center">
          <div className="flex flex-col space-y-4 w-full md:w-2/2">
            <div className=''>
              <div className="flex mb-4 space-x-2">
                <label htmlFor="task-name" className="block text-md my-3 font-medium flex-shrink-0 text-gray-700">
                  Task title
                </label>
                <div className="flex items-center flex-col md:flex-row">
                  <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    value={task.taskName || ''}
                    onChange={onChange}
                    className={`mt-1 block px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full ${errors.taskName ? 'border-red-500' : ''}`}
                    placeholder="Enter task name"
                  />
                  {errors.taskName && <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>}
                </div>
              </div>

              {/* <div className="flex mb-3 space-x-3">
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
              </div> */}

              <div className="mb-4">
                <label htmlFor="task-desc" className="block text-sm font-medium text-gray-700">Description</label>
                {isDescriptionVisible && (
                  <>
                    {isEditingDescription ? (
                      <>
                        <TextEditor
                          content={task?.description || ''}
                          setContent={(content) => onChange({ target: { name: 'description', value: content } })}
                          commentbtn={false}
                          editbtn={false}
                        />
                        <div className="mt-2">
                          <button
                            onClick={() => setIsEditingDescription(false)}
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setIsEditingDescription(false)}
                            className="px-4 py-1 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="relative bg-white border border-gray-200 p-3 shadow-sm text-sm rounded-xl mt-2">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className="text-gray-700 break-all" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task?.description || 'No description available') }}></p>
                            <div className="space-x-3 mt-3">
                              <button
                                className="text-blue-600 hover:text-blue-800 mr-2"
                                onClick={() => setIsEditingDescription(true)}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {!isDescriptionVisible && (
                  <button
                    onClick={() => setIsDescriptionVisible(true)}
                    className="px-4 py-1 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Show Description
                  </button>
                )}
              </div>

              <div className="mt-2">
                <CommentsSection taskId={task?._id} />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 p-4">
            <div className="flex items-center mb-4">
              <label htmlFor="task-assignee" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">
                Assignee
              </label>
              <select
                id="task-assignee"
                name="assignees"
                value={task?.assignees || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select an assignee
                </option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
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
                <option value="ToDo">To Do</option>
                <option value="In-Progress">In Progress</option>
                <option value="On-Hold">On Hold</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={task?.priority || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-sprint" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">
                Sprint
              </label>
              <input
                id="task-sprint"
                name="SprintId"
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={task.sprintId ? task.sprintId.sprintname : 'No Sprint Assigned'}
                readOnly
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">
                Due Date
              </label>
              <input
                type="date"
                id="task-due-date"
                name="dueDate"
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                value={task?.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : ''}
                onChange={handleDueDateChange}
              />
            </div>


            <div className="flex items-center mb-4">
              <label htmlFor="task-reporter" className="block text-sm font-medium text-gray-700 flex-shrink-0 w-32">
                Reporter
              </label>
              <select
                id="task-reporter"
                name="report"
                value={task?.report || ''}
                onChange={onChange}
                className="mt-1 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a reporter
                </option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <section>
              <div className="my-2 text-right text-xs overflow-y-auto ...">
                <p className="mb-1 text-sm space-x-1">
                  <strong className="font-bold">Created By :</strong>
                  <span className="text-sm">{task.userId ? task.userId.name : 'No User Assigneed'}</span>
                </p>
                <p className="mb-1 text-gray-500">
                  <strong className="text-sm text-gray-700">Created:</strong> {task?.timestamp ? new Date(task.timestamp).toLocaleString() : 'Not set'}
                </p>
                <p className="text-gray-500">
                  <strong className="text-sm text-gray-700">Updated:</strong> {task?.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'Not set'}
                </p>
              </div>
            </section>
          </div>
        </div>


        {/* <div className="my-2 text-right text-xs overflow-y-auto ...">
          <p className="mb-1 text-gray-500">
            <strong className="text-sm text-gray-700">Created:</strong> {task?.timestamp ? new Date(task.timestamp).toLocaleString() : 'Not set'}
          </p>
          <p className="text-gray-500">
            <strong className="text-sm text-gray-700">Updated:</strong> {task?.updated ? new Date(task.updated).toLocaleString() : 'Not set'}
          </p>
        </div> */}

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
            {taskMode === 'edit' ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
>>>>>>> 5021c6d71957294c70dc404f0a3dcea3c2280e07
