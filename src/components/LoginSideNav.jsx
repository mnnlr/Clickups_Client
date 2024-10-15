import { useState } from "react";
import { FaHome, FaTasks, FaFileAlt, FaUserPlus, FaBuilding } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const projectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 576 512">
    <path fill="currentColor" d="M0 80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v16h192V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-16H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-96c0-1.7.1-3.4.3-5L144 224H48c-26.5 0-48-21.5-48-48z" />
  </svg>
);

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-3 text-white bg-blue-400 dark:bg-gray-800 fixed top-6 left-2 z-20 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-400 dark:bg-gray-900 text-white dark:text-gray-300 h-screen fixed top-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-20 shadow-lg z-20`}
      >
        {/* Menu Items */}
        <div className="flex-1 flex flex-col pt-16 space-y-4">
          {[
            { icon: FaHome, to: "/home", label: "Home" },
            { icon: MdSpaceDashboard, to: "/dashboard", label: "Dashboard" },
            // { icon: FaTasks, to: "/tasks", label: "Tasks" },
            { icon: FaFileAlt, to: "/docs", label: "Documents" },
            { icon: projectIcon, to: "/project", label: "Projects" },
            { icon: FaUserPlus, to: "/invite", label: "Invite" },
            { icon: FaBuilding, to: "/workspace", label: "Workspace" }
          ].map((item, index) => (
            <NavItem key={index} icon={item.icon} to={item.to} label={item.label} />
          ))}
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

const NavItem = ({ icon: Icon, to, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center p-3 text-sm transition-colors duration-200 rounded-lg hover:bg-blue-300 dark:hover:bg-gray-700 focus:outline-none group relative"
    >
      <Icon className="text-grey-500 text-xl" />
      <span className="absolute left-full ml-2 hidden group-hover:block text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-1 px-2 text-xs">
        {label}
      </span>
    </Link>
  );
};

export default SideNav;
