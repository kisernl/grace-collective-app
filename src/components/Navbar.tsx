import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[1100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-serif font-semibold text-primary">
                Grace Collective
              </h1>
              <img
                src="/images/Leaf_Logo.png"
                alt="Logo"
                className="h-5 w-5 mx-1"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Home
              </Link> */}
              <Link
                to="/counselors"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Find a Counselor
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Join as a Counselor
              </Link>
              {user?.role === "counselor" && (
                <Link
                  to="/dashboard/counselor"
                  //className="btn-secondary inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  className="btn-secondary text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  to="/dashboard/admin"
                  // className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  className="btn-primary text-sm font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  <User size={18} className="mr-1" /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-sm font-medium bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90"
                >
                  <UserPlus size={16} className="mr-1" /> Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed sm:hidden fixed bg-white w-full top-16 pb-4 left-0 shadow-lg z-1000">
          <div className="pt-2 pb-6 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/counselors"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Find a Counselor
            </Link>
            <Link
              to="/join"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Join as a Counselor
            </Link>
            {user?.role === "counselor" && (
              <Link
                to="/dashboard/counselor"
                //className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                className="btn-secondary block"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                to="/dashboard/admin"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Admin
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 z-100">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2 z-100">
                <Link
                  to="/login"
                  //className="block text-base font-medium text-gray-500 hover:text-gray-800"
                  className="block text-base font-medium btn-secondary w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-base font-medium bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 w-full text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
