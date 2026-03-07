import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./components/SideBar";
import { ChevronDown, SquarePen } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { ArrowUpDown } from "lucide-react";
import { Send, CirclePlus, AudioLines } from "lucide-react";
const Chats = () => {
  const [userSelected, setUserSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [mutualFollowers, setMutualFollowers] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const clickedUser =
    `${userSelected?.firstName ?? ""} ${userSelected?.lastName ?? ""}`.trim() ||
    "Name Surname";
  const sortedFollowers =
    sortOrder === "Newest" ? mutualFollowers : [...mutualFollowers].reverse();
  const filteredFollowers = sortedFollowers.filter((user) => {
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`
      .trim()
      .toLowerCase();
    return fullName.includes(filter.trim().toLowerCase());
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // /
    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const fetchUsers = async () => {
    const request = await fetch(
      `${API_BASE_URL}/my-profile/chats/mutual-followers`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      },
    );

    const response = await request.json();
    console.log(response);
    setMutualFollowers(response.mutualFollowers);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="border-r border-gray-200 bg-white dark:border-gray-800 lg:w-70 lg:pt-4 lg:text-lg">
        <div className="flex items-center justify-between px-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Messages
            {/* Add new chat */}
          </h1>
          <SquarePen
            size={18}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          />
        </div>

        <div className="px-3 pt-5">
          <label
            htmlFor="chat-search"
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 px-4 py-2 transition focus-within:border-purple-400 dark:border-gray-700 dark:from-gray-900 dark:to-gray-950"
          >
            <SearchIcon className="text-gray-400" sx={{ fontSize: "18px" }} />
            <input
              id="chat-search"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search conversations"
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
            />
          </label>

          <div className="relative py-1 flex justify-end">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="cursor-pointer  flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition  dark:text-gray-200"
            >
              <ArrowUpDown size={16} />
              <div className="flex justify-center items-center gap-1 hover:text-gray-500">
                <span>{sortOrder}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {isSortOpen && (
              <div className="absolute top-full z-2 mt-2 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {["Newest", "Oldest"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSortOrder(option);
                      setIsSortOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      sortOrder === option
                        ? "bg-purple-50 text-purple-600 dark:bg-gray-800 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {filteredFollowers.length > 0 ? (
            filteredFollowers.map((user) => (
              <div
                key={user._id}
                onClick={() => setUserSelected(user)}
                className="flex w-full cursor-pointer items-center gap-3 border-b border-gray-100 px-3 py-3 transition-colors first:border-t hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/70"
              >
                <img
                  // src={avatarSrc}
                  alt="Profile"
                  className="lg:mx-0 mx-auto w-8 h-8 rounded-full bg-purple-100"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-400">last messages</p>
                </div>
              </div>
            ))
          ) : (
            <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
              No Conversation Found
            </p>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 bg-white">
        {userSelected ? (
          <div className="flex h-screen flex-col justify-between overflow-hidden">
            <div className="flex items-center gap-3 border-b border-gray-100 pt-4 pb-2  dark:border-gray-800 lg:px-3">
              <button
                // onClick={() => {
                //   if (avatarSrc) setOpenImage(true);
                // }}
                className="cursor-pointer"
              >
                <img
                  // src={avatarSrc}
                  alt="Profile"
                  className="lg:mx-0 mx-auto w-8 h-8 rounded-full bg-purple-100"
                />
              </button>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800 overflow-x-auto dark:text-gray-100">
                  {clickedUser}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto dark:text-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-gray-100 p-4">
              <CirclePlus className="cursor-pointer text-gray-600 transition-colors hover:text-fuchsia-600" />
              <input
                type="text"
                placeholder="Write your message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="border border-gray-200 bg-transparent placeholder:text-gray-400 text-sm w-full rounded-xl duration-300 px-4 py-2 outline-none focus:placeholder:opacity-0 "
              />
              <AudioLines className="cursor-pointer text-gray-600 transition-colors hover:text-fuchsia-600 duration-400 " />
              <Send className="cursor-pointer text-fuchsia-600 transition-colors hover:text-fuchsia-700 duration-400" />
            </div>
          </div>
        ) : (
          <div className="m-4 flex items-center gap-3 pt-6">
            <div className="grid text-center justify-center items-center mx-auto text-gray-500">
              <img src="../../src/assets/Voice chat-amico.svg" alt="" />
              <h2 className="text-xl font-semibold text-gray-800 pt-2">
                Select a chat
              </h2>
              <p className="mt-2">
                Choose a conversation from the left to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
