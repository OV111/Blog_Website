import React, { useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(false);

  return (
    <React.Fragment>
      <nav className="bg-white dark:bg-purple-800 px-5 py-4 shadow flex items-start justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white my-1 cursor-pointer">
          Devs Blog
        </h2>

        <ul className="flex items-center space-x-7 text-gray-800 dark:text-gray-100 my-1">
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition ">
            <a href="#home">Home</a>
          </li>

          <li className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} 
            className="">
              Categories
            </button>

            {showDropdown && (
              <ul className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 shadow-md rounded w-40 py-2 z-10">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a href="#devs">Devs</a>
                </li>
                {/* <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <a href="#backend">Backend</a>
                </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <a href="#qa">QA</a>
              </li>
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
