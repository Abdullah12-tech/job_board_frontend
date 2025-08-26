import { useContext, useEffect, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiBriefcase,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { authContext } from "../context/AuthContext";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, fetchCurrentUser, logout } =
    useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) fetchCurrentUser(token);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">JobFuse</span>
        </Link>

        {/* Search Bar (desktop only) */}
        <div className="hidden md:flex mx-4 flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for jobs, companies, or candidates"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="absolute right-2 top-2 text-gray-500 hover:text-primary">
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`
            }
          >
            <FiBriefcase />
            <span>Jobs</span>
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`
            }
          >
            <FiUsers />
            <span>Companies</span>
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`
            }
          >
            <FiUsers />
            <span>Candidates</span>
          </NavLink>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && currentUser ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Menu.Item>
                    <Link
                      to={
                        currentUser?.role === "admin"
                          ? "/admin"
                          : currentUser?.role === "employer"
                          ? "/dashboard/company"
                          : "/dashboard/candidate"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <NavLink to="/login">
                <button className="px-4 py-2 text-primary font-medium hover:bg-blue-50 rounded-lg">
                  Log In
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-accent transition-colors">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            <NavLink
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary"
            >
              Jobs
            </NavLink>
            <NavLink
              to="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary"
            >
              Companies
            </NavLink>
            <NavLink
              to="/candidates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary"
            >
              Candidates
            </NavLink>

            <div className="border-t pt-4">
              {isAuthenticated && currentUser ? (
                <>
                  <Link
                    to={
                      currentUser?.role === "admin"
                        ? "/admin"
                        : currentUser?.role === "employer"
                        ? "/dashboard/company"
                        : "/dashboard/candidate"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-primary mb-3"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 hover:text-primary"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-primary mb-3"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-accent transition-colors text-center"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
