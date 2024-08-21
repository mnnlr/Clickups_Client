import React from 'react';
import image from '../components/images/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsX29mZmljZV8zMV8zZF9yZW5kZXJfY2hhcmFjdGVyX29mX21hbl9wbGF5aW5nX2dhbWVfb25fZ18yM2UyMTIwNS03Y2QxLTQwOGUtYmEyNy1jOTAxZGYyM2I1NjFfMS5wbm.png'

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-end p-6 z-20">
        <div className="flex space-x-4">
          <button className="text-lg font-semibold bg-black-300 text-black px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300 border-double border-2 border-blue-700">
            Log In
          </button>
          <button className="text-lg font-semibold bg-black-300 text-black px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300 border-double border-2 border-blue-700">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full"></div>

      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-80">
        <img
          src={image}
          alt="Working Animation"
          className="h-102 w-auto"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Welcome to <span className="text-blue-500 ">ClickUp</span>
        </h1>
        <p className="text-lg md:text-2xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          Bring all your work into one place, from tasks to documents and everything in between.
        </p>
        <button className="text-lg font-semibold bg-black-300 text-black px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300">
          Get Started
        </button>
      </header>
    </div>
  );
};

export default LandingPage;
