import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
import useThemeStore from "../context/useThemeStore";
import SearchBar from "./search/SearchBar";
import { ChevronDown, LogOut, Sun, Moon } from "lucide-react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchResults from "./search/SearchResults";
import { CATEGORY_OPTIONS } from "../../constants/Categories";
import { AVATAR_MENU_ITEMS, MOBILE_EXTRA_LINKS } from "../../constants/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const { auth, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [navUser, setNavUser] = useState(null);
  const showSearch = pathname !== "/";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!auth) {
      setNavUser(null);
      return;
    }
    const fetchNavUser = async () => {
      try {
        const token = localStorage.getItem("JWT");
        const response = await fetch(`${API_BASE_URL}/my-profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) return;
        const data = await response.json();
        setNavUser({
          firstName: data.userWithoutPassword?.firstName || "",
          lastName: data.userWithoutPassword?.lastName || "",
          username: data.userWithoutPassword?.username || "",
          profileImage: data.stats?.profileImage || null,
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNavUser();
  }, [auth]);

  // Single click-outside handler for both dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = () => setShowDropdown(false);

  const closeDropdownMobile = () => {
    setShowDropdownMobile(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("JWT");
    navigate("/get-started");
    setAvatarMenuOpen(false);
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
    if (item.type === "user") navigate(`/users/${item.username}`);
    else if (item.type === "post")
      navigate(`/?search=${encodeURIComponent(item.title)}`);
    else if (item.type === "category") navigate(`/categories/${item.slug}`);
    setSearchValue("");
    setIsOpen(false);
  };

  const AvatarImage = ({ inDropdown = false }) => (
    <div
      className={`w-8 h-8 rounded-full shrink-0 border ${
        inDropdown
          ? "border-gray-200 dark:border-gray-600"
          : "border-white/50"
      }`}
    >
      {navUser?.profileImage ? (
        <img
          src={navUser.profileImage}
          alt="avatar"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div
          className={`w-full h-full flex rounded-full items-center justify-center text-sm font-semibold ${
            inDropdown
              ? "bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white"
              : "bg-white/20 text-white"
          }`}
        >
          {navUser?.firstName?.[0]?.toUpperCase() || "?"}
          {navUser?.lastName?.[0]?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );

  const CategoryList = ({ onClose }) => (
    <ul className="absolute top-full mt-2 left-0 text-black bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md rounded w-40 py-2 z-10">
      {CATEGORY_OPTIONS.map(({ title, slug }) => (
        <li
          key={slug}
          className="px-4 py-2 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <NavLink to={`/categories/${slug}`} onClick={onClose}>
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <React.Fragment>
      <div>
        <nav className="relative space-x-1 flex items-center justify-between px-3 gap-10 py-1 shadow z-20 w-full bg-linear-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-800 lg:gap-10 lg:py-2">
          <h2 className="text-base font-bold my-1 lg:my-0.5 cursor-pointer sm:text-xl text-gray-100 md:text-xl lg:text-xl lg:w-auto lg:ml-3">
            <NavLink to="/">DevsWebs</NavLink>
          </h2>

          {showSearch && (
            <div
              ref={desktopSearchRef}
              className="relative hidden flex-1 justify-end text-purple-600 md:flex"
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

          <ul className="flex items-center gap-1 text-gray-100 my-2 lg:my-0.5">
            {/* Home */}
            <li className="font-medium text-sm lg:text-base px-1 py-1 hover:text-purple-300 transition">
              <NavLink to="/">Home</NavLink>
            </li>

            {/* Categories — desktop */}
            <li
              className="relative text-sm lg:text-base font-medium px-1 py-1 hover:text-purple-300 transition"
              ref={dropdownRef}
            >
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hidden sm:flex lg:gap-1 justify-center items-center cursor-pointer"
              >
                Categories
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showDropdown && <CategoryList onClose={closeDropdown} />}
            </li>

            {auth ? (
              <React.Fragment>
                <li className="hidden md:block font-medium text-sm lg:text-base px-1 hover:text-purple-300 transition">
                  <NavLink to="roadmaps">Roadmaps</NavLink>
                </li>
                <li className="hidden md:block font-medium text-sm lg:text-base px-1 hover:text-purple-300 transition">
                  <NavLink to="roadmaps">Coding Libs</NavLink>
                </li>

                {/* Avatar dropdown — desktop */}
                <li className="relative hidden md:block" ref={avatarRef}>
                  <button
                    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                    className="cursor-pointer"
                  >
                    <AvatarImage />
                  </button>

                  {avatarMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-10">
                      {/* User info header */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <AvatarImage inDropdown />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {navUser?.firstName}
                          </p>
                          {navUser?.username && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              @{navUser.username}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Menu items */}
                      {AVATAR_MENU_ITEMS.map(({ label, to, icon: Icon }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={() => setAvatarMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Icon size={15} />
                          {label}
                        </NavLink>
                      ))}

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                      {/* Theme toggle */}
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
                          {theme === "dark" ? (
                            <Moon size={15} />
                          ) : (
                            <Sun size={15} />
                          )}
                          {theme === "dark" ? "Dark mode" : "Light mode"}
                        </span>
                        <button
                          onClick={setTheme}
                          className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition"
                        >
                          {theme === "dark" ? (
                            <LightModeOutlinedIcon fontSize="small" />
                          ) : (
                            <NightsStayOutlinedIcon fontSize="small" />
                          )}
                        </button>
                      </div>

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition cursor-pointer"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="hidden md:block font-medium text-sm lg:text-base px-1 py-1 hover:text-purple-300 transition">
                  <NavLink to="about">About</NavLink>
                </li>
                <li className="font-medium text-sm lg:text-base px-1 py-1 hover:text-purple-300 transition">
                  <NavLink to="get-started">Get Started</NavLink>
                </li>
                {/* Theme toggle — guests only in navbar */}
                <li>
                  <button
                    onClick={setTheme}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <LightModeOutlinedIcon className="text-3xl" />
                    ) : (
                      <NightsStayOutlinedIcon className="text-3xl" />
                    )}
                  </button>
                </li>
              </React.Fragment>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden mb-1"
            >
              {isOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
            </button>

            {/* Mobile menu */}
            {isOpen && (
              <ul className="flex flex-col gap-2 p-4 border-t-[0.1px] border-gray-100 absolute top-full left-0 w-full bg-linear-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-800 md:hidden z-3">
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

                {/* Categories — mobile */}
                <li className="relative text-base font-medium hover:text-purple-300 transition">
                  <button
                    onClick={() => setShowDropdownMobile(!showDropdownMobile)}
                    className="flex items-center cursor-pointer"
                  >
                    Categories <IoMdArrowDropdown />
                  </button>
                  {showDropdownMobile && (
                    <CategoryList onClose={closeDropdownMobile} />
                  )}
                </li>

                {auth && (
                  <React.Fragment>
                    <li className="font-medium text-base hover:text-purple-300 transition">
                      <NavLink to="roadmaps" onClick={() => setIsOpen(false)}>
                        Roadmaps
                      </NavLink>
                    </li>
                    <li className="font-medium text-base hover:text-purple-300 transition">
                      <NavLink to="roadmaps" onClick={() => setIsOpen(false)}>
                        Coding Libs
                      </NavLink>
                    </li>

                    {/* Extra links */}
                    {MOBILE_EXTRA_LINKS.map(({ label, to }) => (
                      <li
                        key={to}
                        className="font-medium text-base hover:text-purple-300 transition"
                      >
                        <NavLink to={to} onClick={() => setIsOpen(false)}>
                          {label}
                        </NavLink>
                      </li>
                    ))}
                    {/* Avatar row */}
                    <li className="flex items-center gap-3 pt-2 mt-1 border-t border-white/20">
                      <AvatarImage />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {navUser?.firstName}
                        </p>
                        {navUser?.username && (
                          <p className="text-xs text-purple-200 truncate">
                            @{navUser.username}
                          </p>
                        )}
                      </div>
                    </li>

                    {/* Profile links */}
                    {AVATAR_MENU_ITEMS.map(({ label, to, icon: Icon }) => (
                      <li
                        key={to}
                        className="font-medium text-base hover:text-purple-300 transition"
                      >
                        <NavLink
                          to={to}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2"
                        >
                          <Icon size={15} />
                          {label}
                        </NavLink>
                      </li>
                    ))}

                    {/* Theme toggle — mobile */}
                    <li className="flex items-center justify-between border-t border-white/20 pt-2 mt-1">
                      <span className="flex items-center gap-2 text-base font-medium">
                        {theme === "dark" ? (
                          <Moon size={15} />
                        ) : (
                          <Sun size={15} />
                        )}
                        {theme === "dark" ? "Dark mode" : "Light mode"}
                      </span>
                      <button onClick={setTheme} className="cursor-pointer">
                        {theme === "dark" ? (
                          <LightModeOutlinedIcon fontSize="small" />
                        ) : (
                          <NightsStayOutlinedIcon fontSize="small" />
                        )}
                      </button>
                    </li>

                    {/* Logout */}
                    <li className="border-t border-white/20 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-base font-medium text-red-300 hover:text-red-200 transition cursor-pointer"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </li>
                  </React.Fragment>
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
