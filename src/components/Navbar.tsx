import { useState } from "react";
import Login from "@/components/modals/Login";
import UserMenu from "@/components/UserMenu";
import { NavLink, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import useUserStore from "@/store/userStore";

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

interface NavigationLinksProps {
  isMobile: boolean;
  isUserLoggedIn: boolean;
  username?: string | null;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  isMobile,
  isUserLoggedIn,
  username,
}) => (
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
        fontWeight="400"
        color={useIsActive("/") ? "#15C1A2" : "white"}
      >
        The Rundown
      </Box>
    </NavLink>
    {isUserLoggedIn && username && (
      <NavLink
        to={`/cards/${username}`}
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
      >
        <Box
          as="span"
          className="uppercase"
          fontFamily="Poppins"
          fontWeight="400"
          color={useIsActive(`/cards/${username}`) ? "#15C1A2" : "white"}
        >
          Collection
        </Box>
      </NavLink>
    )}

    <NavLink
      to="/marketplace"
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      <Box
        as="span"
        className="uppercase"
        fontFamily="Poppins"
        fontWeight="400"
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
  const user = useUserStore((state) => state.user);

  return (
    <Box className="bg-[#0B0B0B] w-[100%] h-[65px] fixed z-10">
      <Box maxWidth="117rem" className="mx-auto px-2 sm:px-6 lg:px-8" mt="2">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box className="sm:hidden" mr="4">
            <MenuButton
              isOpen={isMobileMenuOpen}
              toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </Box>
          <Box
            className="flex-shrink-0 flex items-center"
            w={{
              base: "50px",
              sm: "50px",
              md: "50px",
              lg: "95px",
              xl: "95px",
              "2xl": "95px",
            }}
          >
            <img
              className="h-8 w-auto"
              src="/images/retzark_logo.png"
              alt="Retzark Marketplace"
            />
          </Box>
          <Box className="flex-1 flex justify-center items-center sm:items-stretch sm:justify-start lg:justify-center">
            <Box className="hidden sm:block ">
              <NavigationLinks
                isMobile={false}
                isUserLoggedIn={!!user}
                username={user?.username}
              />
            </Box>
          </Box>
          <UserMenu />
        </Box>
      </Box>
      {isMobileMenuOpen && (
        <Box bgColor="#0b0b0b" className="sm:hidden" id="mobile-menu">
          <Box className="px-4 pt-4 pb-4 space-y-1">
            <NavigationLinks
              isMobile={true}
              isUserLoggedIn={!!user}
              username={user?.username}
            />
          </Box>
        </Box>
      )}
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </Box>
  );
};

export default Navbar;
