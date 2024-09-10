import { useState } from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { LogoutBtn } from "../utils/LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authentication/loginSlice";

export const TopNav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  // access the user data in this:-
  const user = useSelector((state)=>state.login)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('user from dashboard', user);

  // Sample notifications data with read/unread status
  const [notifications, setNotifications] = useState([
    { message: "You have a new task assigned.", status: "unread" },
    { message: "Your project deadline is approaching.", status: "unread" },
    { message: "You received a message from John.", status: "read" }
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

      const handleLogoutBtn = () => {
        try {
            dispatch(logoutSuccess())
            navigate('/signin')
        } catch (err) {
            console.log(`ERROR on logout button function: ${err}`)
        }
    }
  const markAsRead = (indexToUpdate) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, index) =>
        index === indexToUpdate
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  const removeNotification = (indexToRemove) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, index) => index !== indexToRemove)
    );
  };

  const unreadCount = notifications.filter(notification => notification.status === "unread").length;

  return (
    <nav className="bg-blue-400 text-white flex items-center justify-between px-4 h-16 shadow-md fixed top-0 left-0 w-full z-20">
      {/* Left Section: Logo */}
      <div className="flex items-center justify-center space-x-2 p-4 m-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">
            MNNLR <span className="text-[#1D4ED8]">Workspace</span>
          </span>
        </Link>
      </div>

      {/* Right Section: User Controls */}
      <div className="flex items-center space-x-4">
        {/* Add Task Button */}
        <button
          className="bg-blue-700 text-white px-3 py-1 rounded-full flex items-center space-x-2"
          onClick={() => console.log("Open Add Task Modal")}
        >
          <IoMdAdd className="text-lg" />
          <span className="hidden md:inline">Add Task</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="hover:text-purple-400" onClick={toggleNotifications}>
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-20">
              <div className="p-4">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-blue-100 cursor-pointer ${notification.status === "unread" ? "font-bold" : ""}`}
                      onClick={() => markAsRead(index)}
                    >
                      <span>{notification.message}</span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(index);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No new notifications.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-gray-300 hover:bg-gray-400" onClick={toggleProfile}>
            <img
              src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with user's image URL
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-md shadow-lg z-20">
              <div className="px-4 py-2">
                <p className="font-semibold">{user?.user?.name}</p>
                <p className="text-sm text-gray-500">{user?.user?.email}</p>
              </div>
              <hr />
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-blue-100"
              >
                Profile
              </Link>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100">More</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100" onClick={handleLogoutBtn}>Logout</button>
              {/* <LogoutBtn btnStyle="w-full text-left px-4 py-2 hover:bg-gray-100" /> */}
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="hidden md:flex hover:text-rose-400" onClick={() => console.log("Open Settings Page")}>
          <FaCog />
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
