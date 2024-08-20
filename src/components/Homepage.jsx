import React from "react";

const Homepage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Adjusted Main Content */}
      <div className="flex-1 p-6 pt-20 md:ml-16 lg:ml-64">
        {/* Greeting Section */}
        <section className="mb-6">
          <p className="text-gray-600 text-lg">Good morning, Rohit</p>
        </section>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Assigned to Me Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Assigned to Me</h2>
            <div className="space-y-4">
              {/* Example Task Cards */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Task 1</h3>
                <p className="text-gray-600 mt-2">Description of task 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Task 2</h3>
                <p className="text-gray-600 mt-2">Description of task 2.</p>
              </div>
            </div>
          </section>

          {/* My Tasks Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
            <div className="space-y-4">
              {/* Example Task Cards */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Personal Task 1</h3>
                <p className="text-gray-600 mt-2">Description of personal task 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Personal Task 2</h3>
                <p className="text-gray-600 mt-2">Description of personal task 2.</p>
              </div>
            </div>
          </section>

          {/* My Projects Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
            <div className="space-y-4">
              {/* Example Project Cards */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Project 1</h3>
                <p className="text-gray-600 mt-2">Description of project 1.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-lg">Project 2</h3>
                <p className="text-gray-600 mt-2">Description of project 2.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
