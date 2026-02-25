/* The above code is a React component for a Navbar in a web application. Here is a summary of what the
code is doing: */
import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
import useThemeStore from "../context/useThemeStore";
import toast from "react-hot-toast";
import SearchBar from "./search/SearchBar";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import SearchResults from "./search/SearchResults";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const { auth, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showSearch = pathname !== "/";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      const request = await fetch(`${API_BASE_URL}/log-out`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include", // sending cookie
      });
      let response = await request.json();
      if (request.ok) {
        localStorage.removeItem("JWT");
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
      toast.error("Log Out Failed", { position: "top-center" });
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const closeDropdownMobile = () => {
    setShowDropdownMobile(false);
    setIsOpen(false);
  };

  const handleSearchSubmit = (query) => {
    const trimmedQuery = query.trim();
    navigate(
      trimmedQuery ? `/?search=${encodeURIComponent(trimmedQuery)}` : "/",
    );
    setIsOpen(false);
  };

  const handleSearchSelect = (item) => {
    if (item.type === "user") {
      navigate(`/users/${item.username}`);
    } else if (item.type === "post") {
      navigate(`/?search=${encodeURIComponent(item.title)}`);
    } else if (item.type === "category") {
      navigate(`/categories/${item.slug}`);
    }
    setSearchValue("");
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <nav className="relative space-x-1 flex items-center justify-between px-3 gap-10 py-1 shadow z-1 w-full sm:w-full lg:w-full bg-linear-to-r from-purple-700 to-purple-900  dark:from-purple-700 dark:to-purple-800 lg:gap-10 lg:py-4">
          <h2 className="text-base font-bold my-1 lg:my-0.5 cursor-pointer sm:text-xl text-purple-600 md:text-xl lg:text-xl lg:w-auto lg:ml-3">
            <NavLink to="/">DevsFlow</NavLink>
          </h2>

          {showSearch && (
            <div
              ref={desktopSearchRef}
              className="relative hidden flex-1 justify-end text-gray-100 md:flex"
            >
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearchSubmit}
                placeholder="Search"
              />
              <SearchResults
                query={searchValue}
                onSelect={handleSearchSelect}
                boundaryRef={desktopSearchRef}
              />
            </div>
          )}

          <ul className="flex items-center gap-2 text-gray-100 my-2 lg:my-0.5">
            <li className="font-medium text-sm md:text-sm lg:text-base px-1 py-1 hover:text-purple-300 dark:hover:text-purple-300 transition">
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className="relative text-sm md:text-sm lg:text-base font-medium px-1 py-1 hover:text-purple-300 transition"
              ref={dropdownRef}
            >
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hidden sm:flex justify-center items-center cursor-pointer"
              >
                Categories <IoMdArrowDropdown />
              </button>

              {showDropdown && (
                <ul className="absolute top-full mt-2 left-0 text-black bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md rounded w-40 py-2 z-2">
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/fullstack" onClick={closeDropdown}>
                      Full Stack
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/backend" onClick={closeDropdown}>
                      Backend
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/mobile" onClick={closeDropdown}>
                      Mobile
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/ai&ml" onClick={closeDropdown}>
                      AI & ML
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/qa" onClick={closeDropdown}>
                      Quality Assurance
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink to="/categories/devops" onClick={closeDropdown}>
                      DevOps
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <NavLink
                      to="/categories/gamedev"
                      onClick={closeDropdownMobile}
                    >
                      Game Dev
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {auth ? (
              <React.Fragment>
                <li className="font-medium text-sm md:text-sm lg:text-base px-1 py-1 hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="my-profile">My Profile</NavLink>
                </li>
                <li className="hidden sm:block font-medium text-sm md:text-sm lg:text-base px-1 py-1 hover:text-purple-300 dark:hover:text-purple-300 transition cursor-pointer">
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
                <li className="hidden md:block font-medium text-sm md:text-sm lg:text-base px-1 py-1 hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="about">About</NavLink>
                </li>
                <li className="font-medium text-sm md:text-sm lg:text-base px-1 py-1 hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="get-started">Get Started</NavLink>
                </li>
              </React.Fragment>
            )}

            <button
              onClick={setTheme}
              className={" relative inline-flex items-center cursor-pointer"}
            >
              {theme === "dark" ? (
                <LightModeOutlinedIcon className="text-3xl" />
              ) : (
                <NightsStayOutlinedIcon className="text-3xl" />
              )}
            </button>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="md:hidden mb-1 "
            >
              {isOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
            </button>

            {isOpen && (
              <ul className="absolute top-16 left-0 w-full bg-purple-700 flex flex-col gap-4 p-6 md:hidden z-3">
                {showSearch && (
                  <li>
                    <div ref={mobileSearchRef} className="relative">
                      <SearchBar
                        value={searchValue}
                        onChange={setSearchValue}
                        onSubmit={handleSearchSubmit}
                        placeholder="Search posts..."
                        className="max-w-full"
                      />
                      <SearchResults
                        query={searchValue}
                        onSelect={handleSearchSelect}
                        boundaryRef={mobileSearchRef}
                      />
                    </div>
                  </li>
                )}
                <li className="relative text-base  font-medium hover:text-purple-300 transition mr-3 lg:text-lg ">
                  <button
                    onClick={() => setShowDropdownMobile(!showDropdownMobile)}
                    className="flex justify-center items-center cursor-pointer"
                  >
                    Categories <IoMdArrowDropdown />
                  </button>

                  {showDropdownMobile && (
                    <ul className="absolute top-full mt-2 left-0 text-black bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md rounded w-40 py-2 z-2">
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/fullstack"
                          onClick={closeDropdownMobile}
                        >
                          Full Stack
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/backend"
                          onClick={closeDropdownMobile}
                        >
                          Backend
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/mobile"
                          onClick={closeDropdownMobile}
                        >
                          Mobile
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/ai&ml"
                          onClick={closeDropdownMobile}
                        >
                          AI & ML
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/qa"
                          onClick={closeDropdownMobile}
                        >
                          Quality Assurance
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/devops"
                          onClick={closeDropdownMobile}
                        >
                          DevOps
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <NavLink
                          to="/categories/gamedev"
                          onClick={closeDropdownMobile}
                        >
                          Game Dev
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="about" onClick={() => setIsOpen(false)}>
                    About
                  </NavLink>
                </li>
                <li className="font-medium text-base  hover:text-purple-300 dark:hover:text-purple-300 transition">
                  <NavLink to="privacy" onClick={() => setIsOpen(false)}>
                    Privacy
                  </NavLink>
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
