import { useState, useEffect, useCallback } from "react";
import SideBar from "./components/SideBar";
import { sortOptions, filterOptions } from "../../../constants/FollowersPage";
import { useLocation, useNavigate } from "react-router-dom";
import FollowersCard from "./FollowersCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_LIMIT = 2; // 20 for ui is normal

const Followers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [activeFilter, setActiveFilter] = useState("All");
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [followersPage, setFollowerPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [followersHasMore, setFollowersHasMore] = useState(true);
  const [followingHasMore, setFollowingHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const followersView = location.pathname.endsWith("/following");

  const fetchFollowers = useCallback(async () => {
    try {
      const token = localStorage.getItem("JWT");
      const request = await fetch(
        `${API_BASE_URL}/my-profile/followers?page=${followersPage}&limit=${PAGE_LIMIT}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!request.ok) {
        console.error("followers request failed", request.status);
      }

      const response = await request.json();
      if (followersPage === 1) {
        setFollowers(response.followers ?? []);
      } else {
        setFollowers((prev) => [...prev, ...(response.followers ?? [])]);
      }
      setFollowersCount(response.followersCount ?? 0);
      setFollowingCount(response.followingCount ?? 0);
      setFollowersHasMore(Boolean(response.hasMore));
    } catch (err) {
      console.error("followers fetch error", err);
    } finally {
      setLoadingMore(false);
    }
  }, [followersPage]);

  const fetchFollowing = useCallback(async () => {
    try {
      const token = localStorage.getItem("JWT");
      const request = await fetch(
        `${API_BASE_URL}/my-profile/following?page=${followingPage}&limit=${PAGE_LIMIT}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!request.ok) {
        console.error("following request failed", request.status);
      }

      const response = await request.json();
      if (followingPage === 1) {
        setFollowings(response.following ?? []);
      } else {
        setFollowings((prev) => [...prev, ...(response.following ?? [])]);
      }
      setFollowersCount(response.followersCount ?? 0);
      setFollowingCount(response.followingCount ?? 0);
      setFollowingHasMore(Boolean(response.hasMore));
    } catch (err) {
      console.error("following fetch error", err);
    } finally {
      setLoadingMore(false);
    }
  }, [followingPage]);

  useEffect(() => {
    if (!followersView) {
      fetchFollowers();
    }
    fetchFollowing();
  }, [followersView, fetchFollowers, fetchFollowing]);

  useEffect(() => {
    setFollowerPage(1);
    setFollowingPage(1);
    setFollowersHasMore(true);
    setFollowingHasMore(true);
    setLoadingMore(false);
  }, [followersView]);

  // Need to implement my way 
  // const handleFollowToggle = async (user, isFollowing) => {
  //   if (!user?.username) return;

  //   try {
  //     setActionLoadingId(user._id ?? user.id ?? user.username);
  //     const request = await fetch(
  //       `${API_BASE_URL}/users/${user.username}/follow`,
  //       {
  //         method: isFollowing ? "DELETE" : "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("JWT")}`,
  //         },
  //       },
  //     );

  //     if (!request.ok) return;

  //     if (isFollowing) {
  //       setFollowings((prev) =>
  //         prev.filter(
  //           (item) =>
  //             (item._id ?? item.id ?? item.username) !==
  //             (user._id ?? user.id ?? user.username),
  //         ),
  //       );
  //       setFollowingCount((prev) => Math.max(prev - 1, 0));
  //     } else {
  //       setFollowings((prev) => {
  //         const exists = prev.some(
  //           (item) =>
  //             (item._id ?? item.id ?? item.username) ===
  //             (user._id ?? user.id ?? user.username),
  //         );
  //         if (exists) return prev;
  //         return [...prev, user];
  //       });
  //       setFollowingCount((prev) => prev + 1);
  //     }
  //   } catch (err) {
  //     console.error("follow toggle error", err);
  //   } finally {
  //     setActionLoadingId(null);
  //   }
  // };

  const usersList = followersView ? followings : followers;
  const followingUsernames = new Set(
    followings.map((user) => String(user?.username ?? "")),
  );

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
            {usersList.map((user) => (
              <FollowersCard
                key={user._id ?? user.id}
                user={user}
                isFollowing={followingUsernames.has(
                  String(user?.username ?? ""),
                )}
                actionLoading={
                  actionLoadingId === (user._id ?? user.id ?? user.username)
                }
                // onToggleFollow={handleFollowToggle}
              />
            ))}
          </div>

          <div className="px-2 pb-3">
            {(followersView ? followingHasMore : followersHasMore) && (
              <button
                type="button"
                disabled={loadingMore}
                onClick={() => {
                  setLoadingMore(true);
                  if (followersView) {
                    setFollowingPage((prev) => prev + 1);
                  } else {
                    setFollowerPage((prev) => prev + 1);
                  }
                }}
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  loadingMore
                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                    : "cursor-pointer bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
