import { useState, useEffect } from "react";
import Login from "./modals/Login.jsx";
import UserMenu from "./UserMenu.jsx";
import useAppStore from "../store/useAppStore.js";
import { Link, NavLink } from "react-router-dom";

const MenuButton = ({ isOpen, toggleMenu }) => (
  <button
    type="button"
    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
    onClick={toggleMenu}
  >
    <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
    {isOpen ? (
      <svg
        className="block h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg
        className="block h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    )}
  </button>
);

const NavigationLinks = () => (
  <div className="flex space-x-4">
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "text-primary"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }
      end
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      The Rundown
    </NavLink>
    <NavLink
      to="/cards"
      className={({ isActive }) =>
        isActive
          ? "text-primary"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      Cards
    </NavLink>
    <NavLink
      to="/blog"
      className={({ isActive }) =>
        isActive
          ? "text-primary"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      Blog
    </NavLink>
    <NavLink
      to="/marketplace"
      className={({ isActive }) =>
        isActive
          ? "text-primary"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      Marketplace
    </NavLink>
  </div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { fetchSettings, settings } = useAppStore((state) => ({
    fetchSettings: state.fetchSettings,
    settings: state.settings,
  }));

  useEffect(() => {
    (async () => {
      await fetchSettings();
    })();
  }, [fetchSettings]);

  useEffect(() => {
    console.log("Updated settings:", settings);
  }, [settings]);

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-between flex-1 sm:hidden">
            <MenuButton
              isOpen={isMobileMenuOpen}
              toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="/images/retzark_logo.png"
              alt="Retzark Marketplace"
            />
          </div>
          <div className="flex-1 flex justify-center items-center sm:items-stretch sm:justify-start lg:justify-center">
            <div className="hidden sm:block sm:ml-6">
              <NavigationLinks />
            </div>
          </div>
          <UserMenu setIsLoginModalOpen={setIsLoginModalOpen} />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavigationLinks />
          </div>
        </div>
      )}
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
