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
  const [initialLoading, setInitialLoading] = useState(true);
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
      setInitialLoading(false);
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
      setInitialLoading(false);
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
    setInitialLoading(true);
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <SideBar />

      <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <h1 className="mb-1 font-bold text-2xl lg:text-3xl text-gray-900 dark:text-gray-100">
          {followersView ? "Following" : "Followers"}
        </h1>

        <p className="pb-6 text-sm lg:text-base text-gray-500 dark:text-gray-400 max-w-xl">
          {followersView ? "People you are following" : "People who follow you"}
        </p>

        <div className="bg-white dark:bg-gray-900 w-full rounded-xl border border-gray-200 dark:border-gray-800">
          {/* Tabs + Sort Row */}
          <div className="flex flex-wrap justify-between items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/my-profile/followers")}
                className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
                  !followersView
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
              >
                Followers ({followersCount})
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-profile/following")}
                className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
                  followersView
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
              >
                Following ({followingCount})
              </button>
            </div>

            <ul className="flex items-center gap-2 text-sm">
              <li className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Sort:</li>
              {sortOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => setSortBy(option)}
                    className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
                      sortBy === option
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter chips */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <ul className="flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeFilter === option.content;

                return (
                  <li key={option.content}>
                    <button
                      type="button"
                      onClick={() => setActiveFilter(option.content)}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300"
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

          {/* Cards list */}
          <div className="px-4 py-3 space-y-3">
            {initialLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 p-4 animate-pulse"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 lg:h-14 lg:w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                      </div>
                      <div className="h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="mt-3 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex justify-between">
                      <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-36 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                ))
              : usersList.map((user) => (
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

          {/* Load more */}
          <div className="px-4 pb-4">
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
                className={`w-full rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  loadingMore
                    ? "cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                    : "cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
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
