import React, { useState } from "react";
import Modal from "./Modal"; // Assuming you have a reusable Modal component

const TaskBoard = () => {
  const initialTasks = [
    { id: 1, title: "Task 1", description: "This is Task 1", assignee: "Alice", status: "To Do", priority: "High" },
    { id: 2, title: "Task 2", description: "This is Task 2", assignee: "Bob", status: "In Progress", priority: "Medium" },
    { id: 3, title: "Task 3", description: "This is Task 3", assignee: "Charlie", status: "On Hold", priority: "Low" },
    { id: 4, title: "Task 4", description: "This is Task 4", assignee: "David", status: "Done", priority: "High" },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Low",
    status: "To Do",
  });
  const [currentTask, setCurrentTask] = useState(null);

  // Function to categorize tasks by status
  const categorizedTasks = tasks.reduce(
    (acc, task) => {
      acc[task.status.toLowerCase().replace(" ", "")].push(task);
      return acc;
    },
    { todo: [], inprogress: [], onhold: [], done: [] }
  );

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setIsTaskModalOpen(false);
    setNewTask({ title: "", description: "", assignee: "", priority: "Low", status: "To Do" });
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTasks(tasks.map(task =>
      task.id === currentTask.id ? { ...currentTask, ...newTask } : task
    ));
    setIsEditModalOpen(false);
    setNewTask({ title: "", description: "", assignee: "", priority: "Low", status: "To Do" });
  };

  // Open edit modal with task details
  const openEditModal = (task) => {
    setCurrentTask(task);
    setNewTask({ ...task });
    setIsEditModalOpen(true);
  };

  return (
    <div className="relative pt-16 pb-6 bg-gray-100 h-screen overflow-auto md:ml-16 lg:ml-20">
      {/* Task Board */}
      <div className="flex-1 p-6 bg-gray-100 flex overflow-x-auto">
        <div className="flex flex-grow gap-4 overflow-x-auto">
          {Object.entries(categorizedTasks).map(([status, tasks]) => (
            <div
              key={status}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col w-80 min-w-[250px]"
            >
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {status.replace(/([A-Z])/g, " $1")}
              </h2>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="bg-gray-200 p-4 rounded-md mb-4">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                    <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                    <button
                      onClick={() => openEditModal(task)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow mt-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 transition"
                    >
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No tasks</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create To-Do Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
        >
          Create To-Do
        </button>
      </div>

      {/* Task Creation Modal */}
      {isTaskModalOpen && (
        <Modal title="Create New Task" onClose={() => setIsTaskModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={newTask.assignee}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Task Edit Modal */}
      {isEditModalOpen && currentTask && (
        <Modal title="Edit Task" onClose={() => setIsEditModalOpen(false)}>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={newTask.assignee}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TaskBoard;
