import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
import useThemeStore from "../context/useThemeStore";
import toast from "react-hot-toast";

import { FaBars, FaTimes } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleLogOut = async () => {
    console.log("aveh");
    try {
      const request = await fetch(`${API_BASE_URL}/log-out`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include", // sending cookie
      });
      let response = await request.json();
      if (request.ok) {
        localStorage.removeItem("JWT")
        toast.success(response.message, { duration: 1500 });
        logout();
        navigate("/get-started");
        // console.log(response)
      } else {
        toast.error("Log Out Failed!");
        console.error("Log Out failed!");
        // toast(response.message, {duration:1500});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div>
        <nav className="bg-gradient-to-r from-purple-800 to-purple-900 px-5 gap-10 py-2 shadow flex items-start justify-between dark:from-purple-700 dark:to-purple-800 lg:gap-0 lg:py-4">
          <h2 className="text-base font-bold ml-0 my-2 lg:my-1 w-[30px] cursor-pointer text-white sm:text-xl md:text-xl lg:text-2xl lg:w-auto lg:ml-3">
            <NavLink to="/">Devs Blog</NavLink>
          </h2>

          <ul className="flex items-center space-x-4 text-gray-100 my-3.5 lg:my-1">
            <li className="font-medium text-base mx-2 hover:text-purple-300 dark:hover:text-purple-300 transition lg:text-lg lg:mx-4">
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
            <li className="relative text-base  font-medium hover:text-purple-300 transition mr-3 lg:text-lg">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hidden sm:flex justify-center items-center cursor-pointer"
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
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/devops">DevOps</NavLink>
                  </li>
                </ul>
              )}
            </li>

            {auth ? (
              <React.Fragment>
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition lg:text-lg">
                  <NavLink to="my-profile">My Profile</NavLink>
                </li>
                <li className="hidden sm:block font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition cursor-pointer lg:text-lg">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      handleLogOut();
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="hidden md:block font-medium text-lg  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="about">About</NavLink>
                </li>
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition lg:text-lg">
                  <NavLink to="get-started">Get Started</NavLink>
                </li>
              </React.Fragment>
            )}
            <button
              onClick={setTheme}
              className={`relative inline-flex items-center ml-0  px-1 rounded-full w-15 h-8 transition-colors ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
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
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="md:hidden relative"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {isOpen && (
              <ul className="absolute top-16 left-0 w-full bg-purple-700 flex flex-col gap-4 p-6 md:hidden">
                <li className="relative text-base  font-medium hover:text-purple-300 transition mr-3 lg:text-lg">
                  <button
                    onClick={() => setShowDropdownMobile(!showDropdownMobile)}
                    className="flex justify-center items-center cursor-pointer"
                  >
                    Categories <IoMdArrowDropdown />
                  </button>

                  {showDropdownMobile && (
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
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="about">About</NavLink>
                </li>
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="privacy">Privacy</NavLink>
                </li>
                {auth && (
                  <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition cursor-pointer lg:text-lg">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                )}
              </ul>
            )}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};
export default Navbar;
