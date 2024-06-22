import { useState, useEffect } from "react";
import Login from "@/components/modals/Login";
import UserMenu from "@/components/UserMenu";
import useAppStore from "@/store/useAppStore";
import { NavLink, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const useIsActive = (path: string) => {
  const location = useLocation();
  return location.pathname === path;
};

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, toggleMenu }) => (
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

const NavigationLinks = ({ isMobile }: { isMobile: boolean }) => (
  <Box
    display="flex"
    justifyContent="space-evenly"
    gap="4"
    flexDirection={{
      base: "column",
      sm: "column",
      md: "row",
      lg: "row",
      xl: "row",
      "2xl": "row",
    }}
  >
    <NavLink
      to="/"
      end
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      <Box
        as="span"
        className="uppercase"
        fontFamily="Poppins"
        fontWeight={useIsActive("/") ? 600 : 400}
        color={useIsActive("/") ? "#15C1A2" : "white"}
      >
        The Rundown
      </Box>
    </NavLink>
    <NavLink
      to="/cards"
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      <Box
        as="span"
        className="uppercase"
        fontFamily="Poppins"
        fontWeight={useIsActive("/cards") ? 600 : 400}
        color={useIsActive("/cards") ? "#15C1A2" : "white"}
      >
        Collection
      </Box>
    </NavLink>
    <NavLink
      to="/blog"
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      <Box
        as="span"
        className="uppercase"
        fontFamily="Poppins"
        fontWeight={useIsActive("/blog") ? 600 : 400}
        color={useIsActive("/blog") ? "#15C1A2" : "white"}
      >
        Blog
      </Box>
    </NavLink>
    <NavLink
      to="/marketplace"
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      <Box
        as="span"
        className="uppercase"
        fontFamily="Poppins"
        fontWeight={useIsActive("/marketplace") ? 600 : 400}
        color={useIsActive("/marketplace") ? "#15C1A2" : "white"}
      >
        Marketplace
      </Box>
    </NavLink>
  </Box>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="bg-[#0B0B0B] w-[100%] h-[65px] fixed z-10">
      <Box maxWidth="117rem" className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
              <NavigationLinks isMobile={false} />
            </div>
          </div>
          <UserMenu />
        </div>
      </Box>
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavigationLinks isMobile={true} />
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
