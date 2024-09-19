import { useState, useEffect } from "react";
import { FaBell, FaCog } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authentication/loginSlice";
import { axiosPrivate } from "../CustomAxios/customAxios";

const generateFakeNotifications = () => [
  {
    _id: "66e919fe5e9288be066404b0",
    userId: "66e114954aeb24dc02b65205",
    taskId: "66e919fe5e9288be066404ad",
    message: 'A new task "fkrkfrkf" has been assigned to you.',
    isRead: false,
    createdAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "66e919fe5e9288be066404b1",
    userId: "66e114954aeb24dc02b65205",
    taskId: "66e919fe5e9288be066404ae",
    message: 'Your project deadline is approaching.',
    isRead: false,
    createdAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "66e919fe5e9288be066404b2",
    userId: "66e114954aeb24dc02b65205",
    taskId: "66e919fe5e9288be066404af",
    message: 'You received a message from John.',
    isRead: true,
    createdAt: new Date().toISOString(),
    __v: 0
  }
];

const TopNav = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for notifications
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get(`/api/notification/${user._id}`);
        setNotifications(response.data.Data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications(generateFakeNotifications());
      }
    };

    fetchNotifications();
  }, [user._id]);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogoutBtn = async () => {
    try {
      dispatch(logoutSuccess());
      navigate('/signin');
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
          <button className="relative hover:text-purple-400" onClick={toggleNotifications}>
            <FaBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg z-20 backdrop-blur-sm">
              <div className="p-4">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={notification._id}
                      className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer ${!notification.isRead ? "font-semibold" : "text-gray-600"}`}
                      onClick={() => markAsRead(index)}
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 text-lg"
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
              src={user?.avatar || "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} // Fallback to a default image
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-md shadow-lg z-20">
              <div className="px-4 py-2">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <hr />
              <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100">Profile</Link>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100">More</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-100" onClick={handleLogoutBtn}>Logout</button>
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
