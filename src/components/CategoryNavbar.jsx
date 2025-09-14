import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import {FaMoon,FaSun} from "react-icons/fa"
import useThemeStore from "../context/useThemeStore"
const CategoryNavbar = () => {
  const location = useLocation();
  const theme  = useThemeStore().theme
  const setTheme = useThemeStore().setTheme;

  const pathName = location.pathname;
  
  useEffect(() =>{
    document.documentElement.classList.toggle("dark",theme === "dark")
  },[theme])

  return (
    <React.Fragment>
      <nav className="bg-purple-800 px-5 py-4 shadow flex items-start justify-between">
        <h2 className="text-2xl font-bold text-white dark:text-white my-1 cursor-pointer">
          Devs Blog
        </h2>

        <ul className="flex items-center space-x-7 text-white my-1">
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition ">
            <Link to="/">Home</Link>
          </li>
          <li
            className={`font-medium hover:text-purple-600  dark:hover:text-purple-300 ${
              pathName === "/categories/fullstack" ? "text-amber-400" : " "
            }`}
          >
            <Link to="/categories/fullstack">Full Stack</Link>
          </li>
          <li
            className={`font-medium hover:text-purple-600  dark:hover:text-purple-300 transition1 ${
              pathName === "/categories/backend" ? "text-amber-400" : ""
            }`}
          >
            <Link to="/categories/backend">Backend</Link>
          </li>
          <li
            className={`font-medium hover:text-purple-600  dark:hover:text-purple-300 transition ${
              pathName === "/categories/mobile" ? "text-amber-400" : ""
            }`}
          >
            {" "}
            {/* 'text-purple-300'  */}
            <Link to="/categories/mobile">Mobile</Link>
          </li>
          <li
            className={`font-medium  hover:text-purple-600  dark:hover:text-purple-300 transition0 ${
              pathName === "/categories/ai&ml" ? "text-amber-400" : ""
            }`}
          >
            <Link to="/categories/ai&ml">AI & ML</Link>
          </li>
          <li
            className={`font-medium  hover:text-purple-600  dark:hover:text-purple-300 transition ${
              pathName === "/categories/qa" ? "text-amber-400" : ""
            }`}
          >
            <Link to="/categories/qa">Quality Assurance</Link>
          </li>
          <li className="font-medium hover:text-purple-900 dark:hover:text-purple-300 transition">
            <Link to="/categories/devops">DevOps </Link>
          </li>
          <li>
            <button
              onClick={setTheme}
              className={`relative inline-flex items-center ml-0 px-1 rounded-full w-15 h-8 transition-colors ${
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
                  theme === "light" ? "translate-x-1" : "translate-x-6"
                }`}
              />
            </button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default CategoryNavbar;
