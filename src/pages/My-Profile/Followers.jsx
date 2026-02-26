import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { sortOptions, filterOptions } from "../../../constants/FollowersPage";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Followers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [activeFilter, setActiveFilter] = useState("All");
  const [followers, setFollowers] = useState([]);
  const [stats, setStast] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const followersView = location.pathname.endsWith("/following");

  const fetchFollowers = async () => {
    try {
      const token = localStorage.getItem("JWT");
      const request = await fetch(`${API_BASE_URL}/my-profile/followers`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!request.ok) {
        console.log("error");
      }

      const response = await request.json();
      setFollowers(response.followers ?? []);
      setFollowersCount(response.followersCount ?? 0);
      setFollowingCount(response.followingCount ?? 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const token = localStorage.getItem("JWT");
      const request = await fetch(`${API_BASE_URL}/my-profile/following`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!request.ok) {
        console.log("error");
      }

      const response = await request.json();
      setFollowings(response.following ?? []);
      setFollowersCount(response.followersCount ?? 0);
      setFollowingCount(response.followingCount ?? 0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (followersView) {
      fetchFollowers();
    }
    fetchFollowing();
  }, [followersView]);

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <h1 className="mb-2 font-semibold text-xl lg:text-2xl">
          {followersView ? "Following" : "Followers"}
        </h1>

        <p className="pb-8 text-sm lg:text-lg text-gray-700 max-w-xl">
          {followersView ? "People you are following" : "People who follow you"}
        </p>

        <div className="bg-white w-full rounded-lg">
          <div className="flex justify-between items-center p-2 border-b-1 border-gray-300">
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/my-profile/followers")}
                className={`rounded-lg px-3 py-2 cursor-pointer transition duration-400 ${
                  !followersView
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-gray-700 hover:bg-purple-100"
                }`}
              >
                Followers ({followersCount})
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-profile/following")}
                className={`rounded-lg px-3 py-2 cursor-pointer transition duration-400 ${
                  followersView
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-gray-700 hover:bg-purple-100"
                }`}
              >
                Following ({followingCount})
              </button>
            </div>

            <ul className="flex items-center gap-2 text-sm">
              <li className="text-sm text-gray-600">Sort by:</li>
              {sortOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => setSortBy(option)}
                    className={`cursor-pointer rounded-md px-2 py-1 transition duration-400 ${
                      sortBy === option
                        ? "bg-purple-700 text-white"
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-2 my-2">
            <ul className="flex gap-2">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeFilter === option.content;

                return (
                  <li key={option.content}>
                    <button
                      type="button"
                      onClick={() => setActiveFilter(option.content)}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 transition duration-400 ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "bg-purple-50 text-gray-700 hover:bg-purple-100"
                      }`}
                    >
                      <Icon fontSize="small" />
                      <span>{option.content}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="px-2">
            {followersView
              ? followings.map((user) => (
                  <div
                    key={user._id ?? user.id}
                    className="flex border border-gray-300 rounded-lg gap-2"
                  >
                    <img
                      src="/user_profile/User_Profile.jpg"
                      alt="profile image"
                      className="w-10 h-10 lg:w-15 lg:h-15 rounded-full object-cover bg-gray-300"
                    />
                    <div className="grid">
                      <p className="text-gray-900 text-lg font-semibold">
                        {user.name}
                      </p>
                      <p className="text-gray-400">{user.username}</p>
                    </div>
                  </div>
                ))
              : followers.map((user) => (
                  <div
                    key={user._id ?? user.id}
                    className="flex border border-gray-300 rounded-lg gap-2"
                  >
                    <img
                      src="/user_profile/User_Profile.jpg"
                      alt="profile image"
                      className="w-10 h-10 lg:w-15 lg:h-15 rounded-full object-cover bg-gray-300"
                    />
                    <div className="grid">
                      <p className="text-gray-900 text-lg font-semibold">
                        {user.name}
                      </p>
                      <p className="text-gray-400">{user.username}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
