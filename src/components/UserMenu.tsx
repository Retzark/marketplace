import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const UserMenu = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const avatarUrl = user
    ? `https://images.hive.blog/u/${user.username}/avatar`
    : "";

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null);
    setShowMenu(false); // Close menu
    navigate("/"); // Redirect to home or another appropriate page after logout
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleProfile = () => {
    setShowMenu(false); // Close menu
    navigate("/profile"); // Navigate to the profile page
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
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
              event.preventDefault();
              handleProfile();
            }}
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(event) => {
              event.preventDefault();
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
