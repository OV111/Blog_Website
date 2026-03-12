import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./components/SideBar";
import { ChevronDown, SquarePen } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import {
  ArrowUpDown,
  Send,
  CirclePlus,
  AudioLines,
  Ellipsis,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingChatSuspense from "@/components/LoadingChatSuspense";

const getUserIdFromJWT = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const decodedPayload = JSON.parse(atob(padded));
    return decodedPayload?.id ? String(decodedPayload.id) : null;
  } catch {
    return null;
  }
};

const Chats = () => {
  const [userStats, setUserStats] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
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

  // ws implementation //////////////////////////////////////////////
  const [socket, setSocket] = useState(null);
  const token = localStorage.getItem("JWT");
  const senderId = getUserIdFromJWT(token);
  const receiverId = userSelected?._id;
  const roomId =
    senderId && receiverId
      ? [String(senderId), String(receiverId)].sort().join("_")
      : null;
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setSocket(ws);
    };
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "sended_message") {
        setChatMessages((prev) => [...prev, payload.message]);
      } else if (payload.type === "message_history") {
        setChatMessages(payload.messageHistory || []);
        setIsLoadingHistory(false);
      }
    };

    ws.onerror = (err) => {
      console.log("WebSocket error:", err);
    };
    ws.onclose = () => {
      return () => ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket || !userSelected || !roomId) return;
    if (socket.readyState !== WebSocket.OPEN) return;
    setIsLoadingHistory(true);
    setChatMessages([]);

    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId,
        senderId,
        receiverId,
        message: "Creating Room",
      }),
    );
  }, [socket, userSelected, roomId, senderId, receiverId]);

  const handleSendMessage = () => {
    if (!draftMessage.trim()) return;
    socket.send(
      JSON.stringify({
        type: "send_message",
        roomId,
        senderId,
        receiverId,
        text: draftMessage,
      }),
    );
    setDraftMessage("");
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  function formatTimeAgo(dateString) {
    if (!dateString) return "recently";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "recently";
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const unit in intervals) {
      const value = Math.floor(seconds / intervals[unit]);
      if (value >= 1) {
        return rtf.format(-value, unit);
      }
    }
    return "just now";
  }

  const isOnlineByLastActive = (dateString) => {
    if (!dateString) return false;
    const lastActive = new Date(dateString);
    if (Number.isNaN(lastActive.getTime())) return false;
    const diff = Date.now() - lastActive.getTime();
    return diff >= 0 && diff < 60 * 1000;
  };

  const fetchUsers = useCallback(async () => {
    setIsLoadingChats(true);
    try {
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
      // console.log(response);
      setMutualFollowers(response.mutualFollowers);
    } catch (err) {
      console.log(err);
      setMutualFollowers([]);
    } finally {
      setIsLoadingChats(false);
    }
  }, []);

  useEffect(() => {
    if (!receiverId) return;
    const fetchReceiverStats = async () => {
      try {
        const request = await fetch(
          `${API_BASE_URL}/my-profile/chats/${receiverId}/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            },
          },
        );

        const response = await request.json();
        setUserStats(response.stats);
        console.log(response.stats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReceiverStats();
  }, [receiverId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="border-r border-gray-200 bg-white dark:border-gray-800 lg:w-70 lg:pt-4 lg:text-lg">
        <div className="flex items-center justify-between px-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Messages
          </h1>
          {/* Add new chat */}
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

        <div className="mt-1 max-h-[calc(100vh-180px)] overflow-y-auto">
          {isLoadingChats ? (
            <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
              <LoadingChatSuspense />
            </p>
          ) : filteredFollowers.length > 0 ? (
            filteredFollowers.map((user) => (
              <button
                key={user._id}
                type="button"
                onClick={() => setUserSelected(user)}
                className={`flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 text-left transition-colors first:border-t dark:border-gray-800 ${
                  userSelected?._id === user._id
                    ? "bg-fuchsia-50/70 dark:bg-gray-800/80"
                    : "hover:bg-gray-50 dark:hover:bg-gray-900/70"
                }`}
              >
                <img
                  // src={avatarSrc}
                  alt="Profile"
                  className="h-10 w-10 shrink-0 rounded-full bg-purple-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    Last message preview
                  </p>
                </div>
              </button>
            ))
          ) : mutualFollowers.length > 0 ? (
            <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
              No conversations found
            </p>
          ) : (
            <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-400">
              No users found
            </p>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 bg-white">
        {userSelected ? (
          <div className="flex h-screen flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center px-10 border-b border-gray-100 pt-4 pb-2  dark:border-gray-800 lg:px-3">
              <div className="flex items-center gap-3">
                <img
                  src={userStats?.profileImage}
                  alt="Profile"
                  className="lg:mx-0 mx-auto w-8 h-8 rounded-full bg-purple-100"
                />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-800 overflow-x-auto dark:text-gray-100">
                    {clickedUser}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto dark:text-gray-400">
                    {isOnlineByLastActive(userStats?.lastActive) ? (
                      <>
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Online
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(userStats?.lastActive)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* React Loading Skeleton for chat the library donwloaded */}

              <div>
                <Ellipsis className="text-sm font-medium text-gray-800 dark:text-gray-100 cursor-pointer" />
              </div>
            </div>

            <div className="grid flex-1 items-end overflow-y-auto p-4 bg-zinc-300/10">
              <div className="flex max-w-4xl flex-col gap-2">
                {isLoadingHistory ? (
                  <div className="space-y-3">
                    {[...Array(12)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                      >
                        <Skeleton
                          width={idx % 2 === 0 ? 170 : 210}
                          height={34}
                          borderRadius={18}
                        />
                      </div>
                    ))}
                  </div>
                ) : chatMessages.length > 0 ? (
                  chatMessages.map((msg) => {
                    const isMine = String(msg.senderId) === String(senderId);
                    return (
                      <div
                        key={msg._id}
                        className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`w-auto max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col`}
                        >
                          <p
                            className={`inline-block w-fit  max-w-full word-break  rounded-3xl px-3 py-2 text-sm ${
                              isMine
                                ? "rounded-br-sm bg-fuchsia-500 text-gray-100"
                                : "rounded-bl-sm bg-gray-100 text-gray-800"
                            }`}
                          >
                            {msg.text}
                          </p>
                          <span className="mt-1 px-2 text-[10px] text-gray-400">
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-full items-center justify-center py-16">
                    <div className="rounded-3xl bg-transparent px-6 py-8 text-center">
                      <img
                        src="../../src/assets/StartChat.svg"
                        alt="no messages"
                      />
                      <p className="text-sm font-medium text-gray-700">
                        No messages yet
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Start the conversation with your first message.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mr-4  items-center gap-2 border-t border-gray-100 p-2">
              <CirclePlus
                size={30}
                className="text-xl cursor-pointer text-gray-600 transition-colors hover:text-fuchsia-600"
              />
              <input
                type="text"
                value={draftMessage}
                placeholder="Write your message..."
                onChange={(e) => {
                  setDraftMessage(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="border border-gray-200 bg-transparent placeholder:text-gray-400 text-sm w-full rounded-3xl duration-300 px-4 py-2 outline-none focus:placeholder:opacity-0 "
              />
              <AudioLines
                size={34}
                className="cursor-pointer mr-2 text-gray-600 transition-colors hover:text-fuchsia-600 duration-400 "
              />
              <Send
                onClick={() => {
                  handleSendMessage();
                }}
                size={34}
                className="cursor-pointer text-fuchsia-600 transition-colors hover:text-fuchsia-700 duration-400"
              />
            </div>
          </div>
        ) : (
          <div className="m-4 flex items-center gap-3 pt-6">
            <div className="grid text-center justify-center items-center mx-auto text-gray-500">
              <img
                src="../../src/assets/Voice chat-amico.svg"
                alt="select a chat"
              />
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
