import { useState, useEffect } from "react";
import { FaBell, FaCog } from "react-icons/fa";
import { MdLightMode } from "react-icons/md"
import { AiTwotoneDelete } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authentication/loginSlice";
import { axiosPrivate } from "../CustomAxios/customAxios";
import { toggleDarkMode } from "../redux/Mode/ThemeSlice";
import { logoutAction } from "../redux/actions/loginAction";
import { showToast } from "./Toastconfig";

const TopNav = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get(`/api/notification/${user._id}`);
        setNotifications(response.data.Data);
        //console.log(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogoutBtn = async () => {
    try {
      const { payload } = await dispatch(logoutAction());
      navigate('/signin');
      showToast(payload.message);
    } catch (err) {
      console.error(`Error logging out: ${err}`);
    }
  };

  const markAsRead = async (indexToUpdate) => {
    const notification = notifications[indexToUpdate];
    try {
      await axiosPrivate.patch(`/api/notification/${notification._id}/read`, { isRead: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif, index) =>
          index === indexToUpdate
            ? { ...notif, isRead: true }
            : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const removeNotification = async (indexToRemove) => {
    const notification = notifications[indexToRemove];
    try {
      await axiosPrivate.delete(`/api/notification/${notification._id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((_, index) => index !== indexToRemove)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <nav className="bg-blue-400 dark:bg-gray-900 text-white flex items-center justify-between px-6 h-16 shadow-md fixed top-0 left-0 w-full z-20 transition-colors duration-300 ease-in-out">
      {/* Left Section: Logo */}
      <div className="flex items-center justify-center space-x-2 p-4 m-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl dark:text-white">
            MNNLR <span className="text-[#1D4ED8] font-serif dark:text-blue-500">Workspace</span>
          </span>
        </Link>
      </div>

      {/* Right Section: User Controls */}<div className="flex items-center space-x-4">

        <button
          onClick={handleToggle}
          className="px-2 py-2 rounded-full dark:bg-gray-800 text-white bg-blue-500 dark:text-white"
        >
          {darkMode ? <MdLightMode size={'20px'} /> : <MdDarkMode size={'20px'} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative hover:text-red-200 dark:hover:text-yellow-200" onClick={toggleNotifications}>
            <FaBell size={'21px'} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 dark:bg-yellow-500 text-xs text-white rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-xl z-30 overflow-hidden transition-transform duration-300 transform translate-y-2 ease-in-out">
              <div className="bg-red-400 dark:bg-yellow-500 p-3 text-white dark:text-black rounded-t-lg">
                <h4 className="text-lg font-semibold">Notifications</h4>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={notification._id}
                      className={`flex items-center justify-between p-4 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out border-b last:border-b-0 ${!notification.isRead ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                      onClick={() => markAsRead(index)}
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white p-2 font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                      </div>
                      <button
                        className="text-red-700 dark:text-red-300 p-2 ml-3 rounded-full bg-red-200 dark:bg-red-600 hover:bg-red-400 dark:hover:bg-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(index);
                        }}
                      >
                        <AiTwotoneDelete size={'19px'} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">No new notifications.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out" onClick={toggleProfile}>
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold dark:text-gray-700">
              {getInitial(user?.name)}
            </div>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-30">
              <div className="px-4 py-2">
                <p className="font-semibold dark:text-gray-200">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <hr className="dark:border-gray-700" />
              <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">Profile</Link>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">More</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" onClick={handleLogoutBtn}>Logout</button>
            </div>
          )}
        </div>

        {/* Settings */}
        {/* <button className="hidden md:flex hover:text-yellow-400 dark:hover:text-yellow-300 transition-all duration-300 ease-in-out" onClick={() => console.log("Open Settings Page")}>
          <FaCog />
        </button> */}
      </div>
    </nav>
  );
};

export default TopNav;
