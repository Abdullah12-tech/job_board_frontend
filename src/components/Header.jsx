import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiUsers, FiHome, FiBookmark, FiBell, FiMessageSquare } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(true);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">JobFuse</span>
          </Link>

          {/* Search Bar */}
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

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/jobs" className={({ isActive }) => `flex items-center space-x-1 ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
              <FiBriefcase />
              <span>Jobs</span>
            </NavLink>
            <NavLink to="/companies" className={({ isActive }) => `flex items-center space-x-1 ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
              <FiUsers />
              <span>Companies</span>
            </NavLink>
            <NavLink to="/candidates" className={({ isActive }) => `flex items-center space-x-1 ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
              <FiUsers />
              <span>Candidates</span>
            </NavLink>
          </nav>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* <button className="text-gray-600 hover:text-primary">
                <FiBookmark size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <FiBell size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <FiMessageSquare size={20} />
              </button> */}

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {user}
                  </div>
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/dashboard" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}>
                          Dashboard
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}>
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink to="/login">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-primary font-medium hover:bg-blue-50 rounded-lg"
                >
                  Log In
                </button>
              </NavLink>
              <NavLink to="/register">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;