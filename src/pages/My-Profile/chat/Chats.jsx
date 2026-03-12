import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/SideBar";
import { ChevronDown, SquarePen } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { ArrowUpDown } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingChatSuspense from "@/components/LoadingChatSuspense";
import ChatInterface from "./ChatInterface";

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

const MIN_USER_STATS_SKELETON_MS = 350;

const Chats = () => {
  const [userStats, setUserStats] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingUserStats, setIsLoadingUserStats] = useState(false);
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
      setMutualFollowers(response.mutualFollowers);
    } catch (err) {
      console.log(err);
      setMutualFollowers([]);
    } finally {
      setIsLoadingChats(false);
    }
  }, []);

  useEffect(() => {
    if (!receiverId) {
      setUserStats(null);
      setIsLoadingUserStats(false);
      return;
    }

    const fetchReceiverStats = async () => {
      const startedAt = Date.now();
      setIsLoadingUserStats(true);
      setUserStats(null);
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
      } catch (error) {
        console.log(error);
      } finally {
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_USER_STATS_SKELETON_MS) {
          await new Promise((resolve) =>
            setTimeout(resolve, MIN_USER_STATS_SKELETON_MS - elapsed),
          );
        }
        setIsLoadingUserStats(false);
      }
    };
    fetchReceiverStats();
  }, [receiverId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:w-70 lg:pt-4 lg:text-lg">
        <div className="flex items-center justify-between px-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Messages
          </h1>
          {/* Add new chat */}
          <SquarePen
            size={18}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
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

          <div className="relative flex justify-end py-1">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <ArrowUpDown size={16} />
              <div className="flex items-center justify-center gap-1 hover:text-gray-500 dark:hover:text-gray-300">
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

        <div className="mt-1 max-h-[calc(100vh-180px)] overflow-y-auto bg-white dark:bg-gray-950">
          {isLoadingChats ? (
            <p className="flex justify-center items-center px-3 py-6 text-sm text-gray-500 dark:text-gray-100">
              <LoadingChatSuspense />
            </p>
          ) : filteredFollowers.length > 0 ? (
            filteredFollowers.map((user) => (
              <button
                key={user._id}
                type="button"
                onClick={() => setUserSelected(user)}
                className={`flex w-full items-center gap-3 border-b text-purple-600 border-gray-100 px-3 py-3 text-left transition-colors first:border-t dark:border-gray-800
                  ${
                    userSelected?._id === user._id
                      ? "lg:bg-purple-50 dark:bg-fuchsia-950/30 "
                      : "hover:bg-gray-50 dark:hover:bg-gray-900/70"
                  }
                  `}
              >
                <img
                  src={userStats?.profileImage}
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

      <ChatInterface
        userSelected={userSelected}
        userStats={userStats}
        isLoadingUserStats={isLoadingUserStats}
        clickedUser={clickedUser}
        isLoadingHistory={isLoadingHistory}
        chatMessages={chatMessages}
        senderId={senderId}
        draftMessage={draftMessage}
        setDraftMessage={setDraftMessage}
        handleKeyDown={handleKeyDown}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chats;
