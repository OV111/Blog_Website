import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./components/SideBar";
import { SquarePen } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Chats = () => {
  const [userSelected, setUserSelected] = useState(null);
  const [mutualFollowers, setMutualFollowers] = useState([]);
  const clickedUser =
    `${userSelected?.firstName ?? ""} ${userSelected?.lastName ?? ""}`.trim() ||
    "Name Surname";

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

        <div className="px-3 pb-3 pt-5">
          <label
            htmlFor="chat-search"
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 px-4 py-2 transition focus-within:border-purple-400 dark:border-gray-700 dark:from-gray-900 dark:to-gray-950"
          >
            <SearchIcon className="text-gray-400" sx={{ fontSize: "18px" }} />
            <input
              id="chat-search"
              type="text"
              placeholder="Search conversations"
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
            />
          </label>
        </div>

        <div className="pb-3">
          {mutualFollowers.map((user) => (
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
          ))}
        </div>
      </div>

      <div className="min-w-0 flex-1 bg-white">
        {userSelected ? (
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
