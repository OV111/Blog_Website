import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
    localStorage.setItem("theme", theme ? "dark" : "light");
    console.log(localStorage);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <React.Fragment>
      <div>
        <nav className="bg-gradient-to-r from-purple-800 to-purple-950 px-5 py-4 shadow flex items-start justify-between dark:from-purple-900 dark:to-purple-950">
          <h2 className="text-2xl font-bold my-1 cursor-pointer text-white">
            <Link to="/">Devs Blog</Link>
          </h2>

          <ul className="flex items-center space-x-7 text-gray-100 my-1">
            <li className="font-medium hover:text-purple-300 dark:hover:text-purple-300 transition">
              <Link to="/">Home</Link>
            </li>
            <li className="relative font-medium hover:text-purple-300 transition">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex justify-center items-center gap-1 cursor-pointer"
              >
                Categories <IoMdArrowDropdown />
              </button>

              {showDropdown && (
                <ul className="absolute top-full mt-2 left-0 text-black bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md rounded w-40 py-2 z-10">
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link to="/categories/fullstack">Full Stack</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link to="/categories/backend">Backend</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link to="/categories/mobile">Mobile</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link to="/categories/ai&ml">AI & ML</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link to="/categories/qa">Quality Assurance</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="font-medium hover:text-purple-300 dark:hover:text-purple-300 transition">
              <Link to="about">About</Link>
            </li>
            <li className="font-medium hover:text-purple-300 dark:hover:text-purple-300 transition">
              <Link to="sign-in">Sign In</Link>
            </li>
            <li className="font-medium hover:text-purple-300 dark:hover:text-purple-300 transition">
              <Link to="#get-started">Get Started</Link>
            </li>
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
