import { useState } from "react";
import { FaHome, FaTasks, FaFileAlt, FaBullseye, FaInbox, FaUserPlus, FaBuilding, FaRProject } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-3 text-white bg-blue-400 fixed top-6 left-2 z-20 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-400 text-white h-screen fixed top-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-20 shadow-lg z-20`}
      >
        {/* Menu Items */}
        <div className="flex-1 flex flex-col pt-16 space-y-4 scrollbar">
          {[
            { icon: FaHome, to: "/", label: "Home" },
            { icon: MdSpaceDashboard, to: "/dashboard", label: "Dashboard" },
            { icon: FaTasks, to: "/tasks", label: "Tasks" },
            { icon: FaFileAlt, to: "/docs", label: "Documents" },
            { icon: FaRProject, to: "/project", label: "Projects" },
            { icon: FaBullseye, to: "/goals", label: "Goals" },
            { icon: FaInbox, to: "/inbox", label: "Inbox" },
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
      className="flex items-center justify-center p-3 text-sm transition-colors duration-200 rounded-lg hover:bg-blue-300 focus:outline-none group relative"
    >
      <Icon className="text-grey-500 text-xl" />
      <span className="absolute left-full ml-2 hidden group-hover:block text-gray-700 bg-white border border-gray-300 rounded-lg py-1 px-2 text-xs">
        {label}
      </span>
    </Link>
  );
};

export default SideNav;
