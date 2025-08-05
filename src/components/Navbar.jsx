import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(false);

  return (
    <React.Fragment>
      <nav className="bg-blue-500 dark:bg-purple-800 px-5 py-4 shadow flex items-start justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white my-1 cursor-pointer">
          Devs Blog
        </h2>

        <ul className="flex items-center space-x-7 text-gray-800 dark:text-gray-100 my-1">
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition ">
            <Link to="/">Home</Link>
          </li>
          {/* use Link instead of a  */}
          <li className="relative font-medium hover:text-purple-900 dark:hover:text-purple-300 transition">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex justify-center items-center gap-1 cursor-pointer"
            >
              Categories <IoMdArrowDropdown />
            </button>

            {showDropdown && (
              <ul className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 shadow-md rounded w-40 py-2 z-10">
                <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="categories/fullstack">Full Stack</Link>
                </li>
                <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href="#backend">Backend</a>
                </li>
                <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href="#qa">Mobile</a>
                </li>
                <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href="#qa">AI & ML</a>
                </li>
                <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href="#qa">Quality Assurance</a>
                </li>

                {/*
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <a href="#ml">Machine Learning</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <a href="#mobile">Mobile</a>
              </li> */}
              </ul>
            )}
          </li>

          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition">
            <a href="#about">About</a>
          </li>
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition">
            <a href="#sign-in">Sign In</a>
          </li>
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition">
            <a href="#get-started">Get Started</a>
          </li>
          <li>
            <button
              onClick={() => setTheme(!theme)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
            >
              {theme ? "Dark" : "Light"}
            </button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
