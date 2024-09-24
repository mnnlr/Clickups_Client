import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from 'js-cookie';
import { axiosPrivate } from "../CustomAxios/customAxios";
import { Navigate, useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user } = useSelector((state) => state.login);
  const token = cookie.get('User')
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [CreateTasks,  setCreateTasks] = useState([]);


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  useEffect(() => {
    fetchTasks()
    fetchCreatedTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axiosPrivate.get(`/api/tasks/${user._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const tasksData = response.data.data;
        console.log(tasksData);
        
        setTasks(tasksData);
       // console.log(tasksData);
      } else {
        console.error("Failed to fetch tasks: " + response.data.message);
      }
    } catch (err) {
      console.error('Error fetching tasks: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  const fetchCreatedTasks = async () => {
    try {
      const response = await axiosPrivate.get(`/api/tasks/${user._id}/task`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const tasksData = response.data.data;
       // console.log(tasksData);
        
        setCreateTasks(tasksData);
        console.log(tasksData);
      } else {
        console.error("Failed to fetch tasks: " + response.data.message);
      }
    } catch (err) {
      console.error('Error fetching tasks: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  return (
    <div className="relative p-6 bg-gray-100 dark:bg-gray-900 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20 text-gray-900 dark:text-gray-100">

      {/* Greeting Section */}
      <header className="bg-blue-600 text-white p-4 dark:bg-blue-800">
        <h1 className="text-3xl font-bold"> {getGreeting()}, <span>{user?.name}</span></h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Assigned to Me Section */}
          {tasks.length > 0 ? (
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Assigned to Me</h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task._id} onClick={() => navigate(`/${task.projectId}/sprints/${task._id}/tasks`)} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-lg">{task.taskName}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Task ID: {task.kanId}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Assigned to Me</h2>
              <div className="space-y-4"> 
            <p className="text-gray-600 font-bold dark:text-gray-300">No tasks assigneed to you.</p> </div> 
            </div>
          )}


          
        { CreateTasks.length>0? (<section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Created Task</h2>
            <div className="space-y-4"> 
           {CreateTasks.map((task)=>(
            <div key={task._id} onClick={() => navigate(`/${task.projectId}/sprints/${task._id}/tasks`)} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">{task.taskName}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Task ID: {task.kanId}</p>                
              </div>))}
            </div>
          </section>): ( <div> 
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Created Task</h2>
            <div className="space-y-4 "> 
            <p className="text-gray-600 font-bold dark:text-gray-300">No tasks created to you.</p> </div> 
            </div>
         )}

          {/* My Projects Section */}
       {/* <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">My Projects</h2>
            <div className="space-y-4">
              <div  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Project 1</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Description of project 1.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Project 2</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Description of project 2.</p>
              </div>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
