import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal"; // Assuming you have a reusable Modal component

const TaskBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Sample data for tasks
  const tasks = {
    done: [
      { id: 1, title: "Task 1", description: "This task is done." },
      { id: 2, title: "Task 2", description: "This task is done as well." },
    ],
    inProgress: [
      { id: 3, title: "Task 3", description: "This task is in progress." },
      { id: 4, title: "Task 4", description: "This task is also in progress." },
    ],
    onHold: [
      { id: 5, title: "Task 5", description: "This task is on hold." },
      { id: 6, title: "Task 6", description: "This task is also on hold." },
    ],
  };

  const openTaskModal = () => {
    setIsOpen(false);
    setIsTaskModalOpen(true);
  };

  const openNoteModal = () => {
    setIsOpen(false);
    setIsNoteModalOpen(true);
  };

  const openProjectModal = () => {
    setIsOpen(false);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Done Column */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Done</h2>
          {tasks.done.map((task) => (
            <div key={task.id} className="bg-gray-200 p-4 rounded-md mb-4">
              <h3 className="font-medium text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          {tasks.inProgress.map((task) => (
            <div key={task.id} className="bg-gray-200 p-4 rounded-md mb-4">
              <h3 className="font-medium text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
          ))}
        </div>

        {/* On Hold Column */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">On Hold</h2>
          {tasks.onHold.map((task) => (
            <div key={task.id} className="bg-gray-200 p-4 rounded-md mb-4">
              <h3 className="font-medium text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-blue-500 text-white p-4 rounded-full shadow-lg 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 
            focus:ring-offset-2 transition-transform duration-300 ease-in-out transform ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
        >
          <FaPlus size={24} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="mt-2 bg-white rounded-lg shadow-lg py-2">
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={openTaskModal}
            >
              Create Task
            </button>
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={openNoteModal}
            >
              Create Note
            </button>
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={openProjectModal}
            >
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <Modal title="Create New Task" onClose={() => setIsTaskModalOpen(false)}>
         
         <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
                    <div class="col-span-1">
                        <label for="task-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                        <input type="text" name="task-name" id="task-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task name" required=""/>
                    </div>
                    <div class="col-span-1">
                        <label for="start-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                        <input type="date" name="start-date" id="start-date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                    </div>
                    <div class="col-span-1">
                        <label for="due-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                        <input type="date" name="due-date" id="due-date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                    </div>
                    <div class="col-span-1">
                        <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                        <select id="priority" name="priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select id="status" name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="assignees" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignees</label>
                        <input type="text" name="assignees" id="assignees" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add assignees (comma separated)"/>
                    </div>
                    <div class="col-span-2">
                        <label for="custom-fields" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Fields</label>
                        <textarea id="custom-fields" name="custom-fields" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add any custom fields or information here"></textarea>
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                    Create Task
                </button>
            </form>
        </Modal>
      )}

      {/* Note Modal */}
      {isNoteModalOpen && (
        <Modal title="Create New Note" onClose={() => setIsNoteModalOpen(false)}>
          {/* Note creation form goes here */}
        </Modal>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <Modal title="Create New Project" onClose={() => setIsProjectModalOpen(false)}>
          {/* Project creation form goes here */}
        </Modal>
      )}
    </div>
  );
};

export default TaskBoard;
