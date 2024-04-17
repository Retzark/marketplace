import { useState } from "react";
import useUserStore from "../store/userStore";

// eslint-disable-next-line react/prop-types
const UserMenu = ({ setIsLoginModalOpen }) => {
  const user = useUserStore((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
  // Construct the avatar URL using the username
  const avatarUrl = user
    ? `https://images.hive.blog/u/${user.username}/avatar`
    : "";

  const toggleMenu = () => setShowMenu(!showMenu);

  if (!user) {
    // User not logged in, show Login button instead
    return (
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark" // Assuming you have a darker variation for hover state
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
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
