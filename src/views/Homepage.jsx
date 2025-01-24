import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from 'js-cookie';
import { axiosPrivate } from "../CustomAxios/customAxios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user } = useSelector((state) => state.login);
  const token = cookie.get('User')
  const navigate = useNavigate()


  const [AssignedTasks, setAssignedTasks] = useState([]);
  const [CreatedTasks, setCreatedTasks] = useState([]);



  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) { 
  //     return "Good morning";
  //   } else if (hour < 18) {
  //     return "Good afternoon";
  //   } else {
  //     return "Good evening";
  //   }
  // };

  // useEffect(() => {
  //   setsprinttasksShow(sprintTask,IndividualTasks);
  //   setCreateTasksShow({...sprintCreatedTasks,...IndividualCreatedTasks})
  // }, [IndividualTasks,IndividualCreatedTasks,sprintTask,sprintCreatedTasks])

  //   useEffect(() => {
  //     fetchsprintTasks()  // for fetch assigned task
  //     fetchsprintCreatedTasks() //for fetch created task
  //   }, [])

  useEffect(() => {
    const GetAllassignedAlltasks = async () => {
      try {
        const [sprintTask, IndividualTasks] = await Promise.all([
          axiosPrivate.get(`/api/tasks/${user._id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }),

          axiosPrivate(`/api/project/individualTask/${user._id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            }
          )
        ])
        console.log(sprintTask, IndividualTasks)
        const responce1 = Array.isArray(sprintTask.data.data) ? sprintTask.data.data : [];
        const responce2 = Array.isArray(IndividualTasks.data.data) ? IndividualTasks.data.data : [];
        const CombinedData = [...responce1, ...responce2]
        setAssignedTasks(CombinedData)
      } catch (error) {
        console.log(error)
      }
    }

    const getAllcreatedTasks = async () => {
      try {
        const [SprintCreated, IndividualCreated] = await Promise.all([
          axiosPrivate.get(`/api/tasks/${user._id}/task`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axiosPrivate.get(`/api/project/individualTask/${user._id}/getcreatedIndividualtasks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        console.log(SprintCreated, IndividualCreated);

        // Validate and extract data
        const firstresponce = Array.isArray(SprintCreated.data.data) ? SprintCreated.data.data : [];
        const secondresponce = Array.isArray(IndividualCreated.data.data) ? IndividualCreated.data.data : [];

        console.log(firstresponce, secondresponce);

        // Combine the validated data
        const CombinedCreateData = [...firstresponce, ...secondresponce];

        // Update the state with combined data
        setCreatedTasks(CombinedCreateData);

        console.log('Combined Data:', CombinedCreateData);
      } catch (error) {
        console.error('Error fetching created tasks:', error);
        // Optionally handle errors or set an error state
      }
    };
    GetAllassignedAlltasks()
    getAllcreatedTasks();

  }, [])

  console.log(CreatedTasks)

  const handleNavigation = (task) => {
    task.sprintId ?
      navigate(`/${task.projectId}/sprints/${task.sprintId}/tasks`)
      :
      navigate(`/tasks/${task.projectId}/individual`)
  }
  // const fetchsprintTasks = async () => {
  //   try {
  //     const response = await axiosPrivate.get(`/api/tasks/${user._id}`, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       const SprinttasksData = response.data.data;
  //       // console.log(tasksData);
  //       setsprintTask(SprinttasksData)
  //       // setTasks(SprinttasksData);
  //       fetchIndividualTasks()

  //     } else {
  //       console.error("Failed to fetch tasks: " + response.data.message);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching tasks: ' + (err.response ? err.response.data.message : err.message));
  //   }
  // };

  // const fetchIndividualTasks = async () => {
  //   const responce = await axiosPrivate(`/api/project/individualTask/${user._id}`,
  //     {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     }
  //   )
  //   console.log(responce)
  //   if (responce.status === 200) {
  //     const IndividualTasks = responce.data.data
  //     setIndividualTasks(IndividualTasks)
  //   }
  // }

  // const fetchsprintCreatedTasks = async () => {
  //   try {
  //     const response = await axiosPrivate.get(`/api/tasks/${user._id}/task`, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       const tasksData = response.data.data;
  //       // console.log(tasksData);

  //       setsprintCreatedTasks(tasksData);
  //       fetchIndividualcreatedtasks();
  //       console.log(tasksData);
  //     } else {
  //       console.error("Failed to fetch tasks: " + response.data.message);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching tasks: ' + (err.response ? err.response.data.message : err.message));
  //   }
  // };
  // console.log(sprinttasksShow)
  // const fetchIndividualcreatedtasks = async () => {
  //   try {
  //     const response = await axiosPrivate.get(`/api/project/individualTask/${user._id}/getcreatedIndividualtasks`);
  //     console.log(response)
  //     const IndividualCreatedTasks = response.data.data
  //     // setCreateTasks(...CreateTasks, IndividualCreatedTasks)
  //     setIndividualCreatedTasks(IndividualCreatedTasks)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const getInitial = (name) => {
    if (!name) return 'No User Assigneed';
    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  };

  return (
    <div className="relative p-6 bg-gray-100 dark:bg-gray-900 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20 text-gray-900 dark:text-gray-100">

      {/* Greeting Section
      <header className=" bg-blue-500 hover:bg-blue-600 duration-300 rounded-lg hover:rounded-2xl text-white p-4 dark:bg-blue-800">
        <h1 className="text-3xl font-bold"> {getGreeting()}, <span className="font-LXGWFont">{user?.name}</span></h1>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Assigned to Me Section */}
          {AssignedTasks.length > 0 ? (
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Assigned to Me</h2>
              <div className="space-y-4">
                {AssignedTasks.map((task) => (
                  task.status!=="Done"&&
                  <div key={task._id}
                  className=" rounded-md p-1 cursor-pointer"
                    onClick={() => handleNavigation(task)}>
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-4 rounded-lg shadow-sm flex flex-col justify-start">
                      <h3 className="font-medium text-lg">{task.taskName}</h3>
                      {/* <div className="flex items-center justify-between mt-3 ">
                        <p className="text-gray-600 dark:text-gray-300">Task ID: {task.kanId}</p>


                      </div> */}
                      <div className="flex justify-between items-center mt-2">
                          <span
                        className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                        {task.kanId}
                      </span>
                       <div className=" rounded-full py-0.5 px-2 bg-blue-200 text-blue-800 flex items-center justify-center text-sm font-bold">{getInitial(task?.userId?.name)}</div>
                       </div>
                      {console.log(task)}
                    </div>
                    <div className=" flex justify-start gap-2.5 mt-1 items-center mx-2">
                      
                      <div className="flex gap-1 justify-center items-center bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                        {task.sprintId ? <span>Sprint({task.sprintId.sprintname})</span> : <span>Individual</span>}
                      </div>
                      <span className="flex gap-1 justify-center items-center bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                        {task.status}
                      </span>
                     

                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4  text-blue-600 dark:text-blue-400">Assigned to Me</h2>
              <div className="space-y-4">
                <p className="text-gray-600 font-bold font-LXGWFont dark:text-gray-300">No tasks assigneed to you.</p> </div>
            </div>
          )}



          {CreatedTasks.length > 0 ? (<section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Created Task</h2>
            <div className="space-y-4">
              {CreatedTasks.map((task) => (
               task.status!=="Done"&&

                //         <div key={task._id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                //           <h3 className="font-medium text-lg">{task.taskName}</h3>
                //           {/* <p className="text-gray-600 dark:text-gray-300 mt-2">Task ID: {task.kanId}</p> */}
                //           <span
                //   className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                //   {task.kanId}
                // </span>
                //         </div>
                <div key={task._id}
                className=" rounded-md p-1 cursor-pointer"
                  onClick={() => handleNavigation(task)}>
                  <div className="bg-gray-200 dark:bg-gray-700 px-4 py-4 rounded-lg shadow-sm flex flex-col justify-start">
                    <h3 className="font-medium text-lg">{task.taskName}</h3>
                    {/* <div className="flex items-center justify-between mt-3 ">
                      <p className="text-gray-600 dark:text-gray-300">Task ID: {task.kanId}</p>


                    </div> */}
                    <div className="flex justify-between items-center mt-2">
                        <span
                      className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                      {task.kanId}
                    </span>
                     <div className=" rounded-full py-0.5 px-2 bg-blue-200 text-blue-800 flex items-center justify-center text-sm font-bold">{getInitial(task?.userId?.name)}</div>
                     </div>
                    {console.log(task)}
                  </div>
                  <div className=" flex justify-start gap-2.5 mt-1 items-center mx-2">
                    
                    <div className="flex gap-1 justify-center items-center bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                      {task.sprintId ? <span>Sprint ({task.sprintId.sprintname})</span> : <span>Individual</span>}
                    </div>
                    <span className="flex gap-1 justify-center items-center bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm font-semibold px-2.5 py-0.5 rounded">
                      {task.status}
                    </span>
                   

                  </div>
                </div>
              ))}
            </div>
          </section>) : (<div>
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Created Task</h2>
            <div className="space-y-4 ">
              <p className="text-gray-600 font-bold font-LXGWFont dark:text-gray-300">No tasks created to you.</p> </div>
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
