import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import useUserStore from "../store/userStore";

const UserMenu = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate(); // Get the navigate function
  const [showMenu, setShowMenu] = useState(false);
  const avatarUrl = user
    ? `https://images.hive.blog/u/${user.username}/avatar`
    : "";

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear user from local storage
    setUser(null); // Update user state to null
    navigate("/"); // Redirect to home or another appropriate page after logout
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin} // Attach handleLogin to onClick event
        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600"
      >
        <img src={avatarUrl} alt="User avatar" />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(event) => {
              event.preventDefault(); // Prevent default anchor action
              handleLogout();
            }}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
