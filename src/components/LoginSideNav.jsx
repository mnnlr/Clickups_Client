import { useState } from "react";
import { FaHome, FaTasks, FaFileAlt, FaBullseye, FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-3 text-white bg-gray-800 fixed top-6 left-2 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-16 shadow-lg z-10`}
      >
        {/* Menu Items */}
        <div className="flex-1 flex flex-col items-center pt-16 space-y-4">
          <NavItem icon={FaHome} to="/home" />
          <NavItem icon={FaTasks} to="/tasks" />
          <NavItem icon={FaFileAlt} to="/docs" />
          <NavItem icon={FaBullseye} to="/goals" />
          <NavItem icon={FaInbox} to="/inbox" />
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

const NavItem = ({ icon: Icon, to }) => {
  return (
    <Link to={to} className="flex justify-center items-center p-3 text-sm hover:bg-gray-700 focus:outline-none">
      <Icon className="text-xl" />
    </Link>
  );
};

export default SideNav;
