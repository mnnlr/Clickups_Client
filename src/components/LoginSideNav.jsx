import { useState } from "react";
import {
  FaHome,
  FaTasks,
  FaFileAlt,
  FaBullseye,
  FaInbox,
  FaUserPlus,
  FaBuilding,FaRProject
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-3 text-white bg-blue-400 fixed top-6 left-2 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-400 text-white h-screen fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-16 shadow-lg z-10`}
      >
        {/* Toggle Button in Sidebar */}
        <button
          id="button-hover-toggle"
          className="absolute top-5 end-2 rounded-full p-1.5"
        >
          <span className="sr-only">Menu Toggle Button</span>
          <i className="mgc_round_line text-xl"></i>
        </button>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col items-center pt-16 space-y-4 scrollbar">
          <NavItem icon={FaHome} to="/home" />
          <NavItem icon={FaTasks} to="/tasks" />
          <NavItem icon={FaFileAlt} to="/docs" />
          <NavItem icon={FaRProject} to="/project" />
          <NavItem icon={FaBullseye} to="/goals" />
          <NavItem icon={FaInbox} to="/inbox" />
          <NavItem icon={FaUserPlus} to="/invite" /> {/* New Invite Menu Item */}
          <NavItem icon={FaBuilding} to="/workspace" /> {/* New Workspace Menu Item */}
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
    <Link
      to={to}
      className="flex justify-center items-center p-3 text-sm hover:bg-blue-500 focus:outline-none"
    >
      <Icon className="text-xl" />
    </Link>
  );
};

export default SideNav;
