import React, { useState } from "react";
// import attachIcon from '../Svg icon/attachment-2-svgrepo-com.svg';
// import linkIcon from '../Svg icon/link-round-svgrepo-com.svg';
// import childIssueIcon from '../Svg icon/website-connection-communication-svgrepo-com.svg';
import CommentsSection from "../Commentsection";
import { TextEditor } from "../TinyMCE_TextEditor/TextEditor";
import DOMPurify from "dompurify"; // for HTML sanitization

const TaskForm = ({
  task,
  onSelectUserChange,
  onChange,
  onSubmit,
  onCancel,
  taskMode,
  availableMembers,
}) => {
  const [errors, setErrors] = useState({});
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const [loading, setLoading] = useState(false); // Track button

  const title = taskMode === "edit" ? "Edit Task" : "Create New Task";

  const validate = () => {
    const newErrors = {};
    if (!task.taskName) newErrors.taskName = "Task Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    onChange({
      target: {
        name: "dueDate",
        value: newDueDate,
      },
    });
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true); // Disable btn when submission srt
      try {
        await onSubmit();
      } catch (error) {
        console.error("Task Submission Faild:", error);
      } finally {
        setLoading(false); // re-enable btn after submission
      }
    }
  };
  // console.log(availableMembers);
  // console.log(task);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 overflow-y-auto rounded-lg shadow-lg w-full max-w-6xl max-h-[74vh] h-[73vh] p-3 md:p-4 lg:p-5 relative">
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

        <div className="grid grid-cols-1 gap-6 overflow-hidden md:flex md:flex-row md:space-x-4 md:justify-center">
          <div className="flex justify-between space-y-4 w-full md:w-2/2">
            <div className="w-full p-2">
              {/* Edit Task Title */}
              <div className="flex flex-col mb-3">
                <label className="block text-md font-medium text-gray-700 dark:text-white">
                  {" "}
                  Task Title
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={task.taskName || ""}
                  onChange={onChange}
                  className="w-full focus:outline-1 border text-md text-black rounded-xl p-3 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Task name "
                />
              </div>

              {/* Edit Task Description */}
              <div className="mb-2">
                <label
                  htmlFor="task-desc"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Description
                </label>

                <div
                  className={`w-full border  overflow-y-auto max-h-[250px] text-md text-black rounded-xl p-3 dark:text-white`}
                  onClick={() => {
                    if (!isEditingDescription) {
                      setIsEditingDescription(true);
                    }
                  }}
                >
                  {isEditingDescription ? (
                    <>
                      <TextEditor
                        content={task?.description || ""}
                        setContent={(content) =>
                          // console.log("Updating description to:", content),
                          onChange({
                            target: { name: "description", value: content },
                          })
                        }
                        commentbtn={false}
                        editbtn={false}
                      />
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => setIsEditingDescription(false)}
                          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            onChange({
                              target: {
                                name: "description",
                                value: task.description, // Reset to original description
                              },
                            });
                            setIsEditingDescription(false);
                          }}
                          className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <p
                      className="break-all"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          task?.description ||
                            "No description available. (Don't add Images here add in comments.)"
                        ),
                      }}
                    ></p>
                  )}
                </div>
              </div>

              {/* Edit Task Comment */}
              {taskMode === "edit" && (
                <div className="mt-2">
                  <CommentsSection taskId={task?._id} />
                </div>
              )}
            </div>

            <div>
              <div className="border border-gray-300 dark:border-blue-600 p-4 text-gray-800 dark:text-white">
                <div className="flex items-center mb-4">
                  <label
                    htmlFor="task-assignee"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20 dark:text-white"
                  >
                    Assignee
                  </label>
                  <select
                    id="task-assignee"
                    name="assignees"
                    value={task?.assignees?._id || ""}
                    onChange={onSelectUserChange}
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
                  <label
                    htmlFor="task-status"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    id="task-status"
                    name="status"
                    value={task?.status || ""}
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
                  <label
                    htmlFor="task-priority"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white"
                  >
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    name="priority"
                    value={task?.priority || ""}
                    onChange={onChange}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  >
                    <option value="">None</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex items-center mb-4">
                  <label
                    htmlFor="task-sprint"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white"
                  >
                    Sprint
                  </label>
                  <input
                    id="task-sprint"
                    name="SprintId"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    value={
                      task.sprintId
                        ? task.sprintId.sprintname
                        : "No Sprint Assigned"
                    }
                    readOnly
                  />
                </div>

                <div className="flex items-center mb-4">
                  <label
                    htmlFor="task-due-date"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20 dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="task-due-date"
                    name="dueDate"
                    className="mt-1  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    value={
                      task?.dueDate
                        ? new Date(task.dueDate).toISOString().substring(0, 10)
                        : ""
                    }
                    onChange={handleDueDateChange}
                  />
                </div>

                {console.log("task: ", task)}
                <div className="flex items-center mb-4">
                  <label
                    htmlFor="task-reporter"
                    className="block text-sm font-medium text-gray-700 flex-shrink-0 w-20  dark:text-white"
                  >
                    Reporter
                  </label>
                  <select
                    id="task-reporter"
                    name="report"
                    value={task?.report?._id || ""}
                    onChange={onSelectUserChange}
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

                {taskMode === "edit" && (
                  <section>
                    <div className="my-2 text-left text-xs overflow-y-auto text-gray-500 dark:text-gray-400">
                      <p className="mb-1 text-sm space-x-1">
                        <strong className="font-bold text-gray-700 dark:text-gray-200">
                          Created By :
                        </strong>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {task.userId ? task.userId.name : "No User Assigned"}
                        </span>
                      </p>
                      <p className="mb-1 text-gray-500 dark:text-gray-400">
                        <strong className="text-sm text-gray-700 dark:text-gray-300">
                          Created:
                        </strong>{" "}
                        {task?.createdAt
                          ? new Date(task.createdAt).toLocaleString()
                          : "Not set"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        <strong className="text-sm text-gray-700 dark:text-gray-300">
                          Updated:
                        </strong>{" "}
                        {task?.updatedAt
                          ? new Date(task.updatedAt).toLocaleString()
                          : "Not set"}
                      </p>
                    </div>
                  </section>
                )}
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
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg shadow-md transition-all text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {loading
                    ? taskMode === "edit"
                      ? "Updating..."
                      : "Creating..."
                    : taskMode === "edit"
                    ? "Update Task"
                    : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
