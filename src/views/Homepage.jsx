import React from "react";
import { useDispatch ,useSelector} from "react-redux";

const Homepage = () => {
  const user = useSelector((state)=>state.login)
  const dispatch = useDispatch();
  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20 pt-20">

      {/* Greeting Section */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Good morning, <span>{user?.user?.name}</span></h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Assigned to Me Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Assigned to Me</h2>
            <div className="space-y-4">
              {/* Example Task Cards */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Task 1</h3>
                <p className="text-gray-600 mt-2">Description of task 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Task 2</h3>
                <p className="text-gray-600 mt-2">Description of task 2.</p>
              </div>
            </div>
          </section>

          {/* My Tasks Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">My Tasks</h2>
            <div className="space-y-4">
              {/* Example Task Cards */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Personal Task 1</h3>
                <p className="text-gray-600 mt-2">Description of personal task 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Personal Task 2</h3>
                <p className="text-gray-600 mt-2">Description of personal task 2.</p>
              </div>
            </div>
          </section>

          {/* My Projects Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">My Projects</h2>
            <div className="space-y-4">
              {/* Example Project Cards */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Project 1</h3>
                <p className="text-gray-600 mt-2">Description of project 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">Project 2</h3>
                <p className="text-gray-600 mt-2">Description of project 2.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
