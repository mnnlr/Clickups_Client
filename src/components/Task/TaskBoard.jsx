import React, { useState } from 'react';
import TaskForm from './TaskForm'; // Adjust the path as necessary

const TaskBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({
    id: null,
    title: '',
    description: '',
    assignee: '',
    status: 'To Do',
    labels: '',
    parent: '',
    sprint: '',
    reporter: '',
    comment: '',
  });
  const [tasks, setTasks] = useState({
    'To Do': [
      {
        "id": 1,
        "title": "Implement new feature",
        "description": "Implement the new feature as per the latest requirements.",
        "status": "In Progress",
        "assignee": "John Doe",
        "labels": "Feature",
        "parent": null,
        "sprint": "Sprint 5",
        "reporter": "Jane Smith",
        "comment": "Initial implementation done.",
        "created": "2024-08-22T10:00:00Z",
        "updated": "2024-08-22T12:00:00Z"
      },
      {
        "id": 2,
        "title": "Fix login bug",
        "description": "Resolve the issue preventing users from logging in.",
        "status": "To Do",
        "assignee": "Alice Johnson",
        "labels": "Bug",
        "parent": null,
        "sprint": "Sprint 5",
        "reporter": "Jane Smith",
        "comment": "",
        "created": "2024-08-22T08:00:00Z",
        "updated": "2024-08-22T09:30:00Z"
      }],
    'In Progress': [
      { id: 3, title: 'Task 3', description: 'Description for task 3', assignee: 'Charlie', status: 'In Progress', labels: 'Bug', parent: '', sprint: 'Sprint 1', reporter: 'Alice', comment: '',createdtime:'2 hrs' },
    ],
    'On Hold': [
      { id: 4, title: 'Task 4', description: 'Description for task 4', assignee: 'Alice', status: 'On Hold', labels: 'Improvement', parent: '', sprint: 'Sprint 2', reporter: 'Bob', comment: '',createdtime:'2 hrs' },
    ],
    'Done': [
      { id: 5, title: 'Task 5', description: 'Description for task 5', assignee: 'Bob', status: 'Done', labels: 'Feature', parent: '', sprint: 'Sprint 1', reporter: 'Charlie', comment: '',createdtime:'2 hrs' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (task.id) {
      // Edit existing task
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        const status = task.status;
        updatedTasks[status] = updatedTasks[status].map(t =>
          t.id === task.id ? { ...task } : t
        );
        return updatedTasks;
      });
    } else {
      // Add new task
      setTasks((prevTasks) => ({
        ...prevTasks,
        [task.status]: [...prevTasks[task.status], { ...task, id: Date.now() }],
      }));
    }
    setIsModalOpen(false);
    setTask({
      id: null,
      title: '',
      description: '',
      assignee: '',
      status: 'To Do',
      labels: '',
      parent: '',
      sprint: '',
      reporter: '',
      comment: '',
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="relative pt-16 pb-6 bg-gray-100 h-screen overflow-auto md:ml-16 lg:ml-20">
      <div className="flex space-x-4 overflow-x-auto">
        {Object.keys(tasks).map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-md p-4 flex flex-col w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{status}</h2>
            <div className="flex flex-col space-y-2">
              {tasks[status].map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-200 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-300"
                  onClick={() => handleTaskClick(task)}
                >
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskForm
          task={task}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform rotate-45"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
    </div>
  );
};

export default TaskBoard;
