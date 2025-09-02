import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { auth, login, logout } = useAuthStore();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const handleLogOut = async () => {
    try {
      const request = await fetch(`${API_BASE_URL}/log-out`, {
        method: "DELETE",
        credentials: "include", // sending cookie 
      });
      let response = await request.json();
      if (response.ok) {
        logout();
        navigate("/get-started");
      } else {
        // Toast error
        console.error("Log Out failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div>
        <nav className="bg-gradient-to-r from-purple-800 to-purple-900 px-5 py-4 shadow flex items-start justify-between dark:from-purple-700 dark:to-purple-800">
          <h2 className="text-2xl font-bold my-1 cursor-pointer text-white">
            <NavLink to="/">Devs Blog</NavLink>
          </h2>

          <ul className="flex items-center space-x-4 text-gray-100 my-1">
            <li className="font-medium text-lg hover:text-purple-300 dark:hover:text-purple-300 transition">
              <NavLink
                to="/"
                // className={({ isActive }) =>
                //   `font-medium text-lg transition ${
                //     isActive ? "text-purple-600" : "hover:text-gray-100"
                //   }`
                // }
              >
                Home
              </NavLink>
            </li>
            <li className="relative text-lg font-medium hover:text-purple-300 transition mr-3">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex justify-center items-center cursor-pointer"
              >
                Categories <IoMdArrowDropdown />
              </button>

              {showDropdown && (
                <ul className="absolute top-full mt-2 left-0 text-black bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md rounded w-40 py-2 z-10">
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/fullstack">Full Stack</NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/backend">Backend</NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/mobile">Mobile</NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/ai&ml">AI & ML</NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/qa">Quality Assurance</NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="font-medium text-lg  hover:text-purple-300 dark:hover:text-purple-300 transition">
              <NavLink to="about">About</NavLink>
            </li>

            {auth ? (
              <React.Fragment>
                <li className="font-medium text-lg  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="my-profile">My Profile</NavLink>
                </li>
                <li
                  className="font-medium text-lg  hover:text-purple-300 dark:hover:text-purple-300 transition cursor-pointer"
                  onClick={handleLogOut}
                >
                  Log Out
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="font-medium text-lg  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="get-started">Get Started</NavLink>
                </li>
              </React.Fragment>
            )}
            <button
              onClick={() => toggleTheme()}
              className={`relative inline-flex items-center ml-0 px-1 rounded-full w-15 h-8 transition-colors ${
                theme ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <span className="text-white items-center text-m ml-1">
                <FaMoon></FaMoon>
              </span>
              <span className="text-yellow-400 items-center text-m ml-3">
                <FaSun></FaSun>
              </span>
              <span
                className={`absolute w-6 h-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  theme ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};
export default Navbar;
