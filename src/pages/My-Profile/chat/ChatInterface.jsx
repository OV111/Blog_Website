import React, { useEffect, useRef } from "react";
import { AudioLines, CirclePlus, Ellipsis, Send } from "lucide-react";
import Skeleton from "react-loading-skeleton";
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

const ChatInterface = ({
  userSelected,
  userStats,
  isLoadingUserStats,
  clickedUser,
  isLoadingHistory,
  chatMessages,
  senderId,
  draftMessage,
  setDraftMessage,
  handleKeyDown,
  handleSendMessage,
}) => {
  const messagesContainerRef = useRef(null);
  const isDarkMode = localStorage.getItem("theme") === "dark";
  const skeletonBaseColor = isDarkMode ? "#1f2937" : "#ebebeb";
  const skeletonHighlightColor = isDarkMode ? "#374151" : "#f5f5f5";

  useEffect(() => {
    if (isLoadingHistory) return;
    if (!messagesContainerRef.current) return;

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [chatMessages, userSelected, isLoadingHistory]);

  return (
    <div className="min-w-0 flex-1 bg-white dark:bg-gray-950">
      {userSelected ? (
        <div className="flex h-screen flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-10 pt-4 pb-2 dark:border-gray-800 dark:bg-gray-900 lg:px-3">
            <div className="flex items-center gap-3">
              {isLoadingUserStats ? (
                <Skeleton
                  circle
                  width={32}
                  height={32}
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              ) : (
                <img
                  src={userStats?.profileImage}
                  alt="Profile"
                  className="lg:mx-0 mx-auto h-8 w-8 rounded-full bg-purple-100"
                />
              )}
              <div className="hidden lg:block">
                {isLoadingUserStats ? (
                  <div className="space-y-1">
                    <Skeleton
                      width={130}
                      height={12}
                      borderRadius={6}
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                    <Skeleton
                      width={90}
                      height={10}
                      borderRadius={6}
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                  </div>
                ) : (
                  <>
                    <p className="overflow-x-auto text-sm font-medium text-gray-800 dark:text-gray-100">
                      {clickedUser}
                    </p>

                    <div className="flex items-center gap-2 overflow-x-auto text-xs text-gray-500 dark:text-gray-400">
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
                  </>
                )}
              </div>
            </div>

            <div>
              <Ellipsis className="cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-100" />
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="grid flex-1 items-end overflow-y-auto  bg-gray-50 p-4 dark:bg-gray-950"
          >
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
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
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
                        className={`flex flex-col w-auto max-w-[75%]  ${isMine ? "items-end" : "items-start"}`}
                      >
                        <p
                          className={`inline-block w-fit max-w-full break-words rounded-3xl px-3 py-2 text-sm ${
                            isMine
                              ? "rounded-br-sm bg-fuchsia-600 text-white dark:bg-fuchsia-500"
                              : "rounded-bl-sm border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        >
                          {msg.text}
                        </p>
                        <span
                          className={`mt-1 px-2 text-[10px] ${
                            isMine
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
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
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      No messages yet
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      Start the conversation with your first message.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
            <CirclePlus
              size={34}
              className="cursor-pointer text-xl mx-2 text-gray-600 transition-colors hover:text-fuchsia-600 dark:text-gray-400 dark:hover:text-fuchsia-400"
            />
            <input
              type="text"
              value={draftMessage}
              placeholder="Write your message..."
              onChange={(e) => setDraftMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-3xl border border-gray-200 bg-transparent px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none duration-300 focus:border-fuchsia-400 focus:placeholder:opacity-0 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <AudioLines
              size={34}
              className="mx-2 cursor-pointer text-gray-600 transition-colors duration-400 hover:text-fuchsia-600 dark:text-gray-400 dark:hover:text-fuchsia-400"
            />
            <Send
              onClick={handleSendMessage}
              size={34}
              className="mr-2 cursor-pointer text-fuchsia-600 transition-colors duration-400 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"
            />
          </div>
        </div>
      ) : (
        <div className="m-4 flex items-center gap-3 pt-6">
          <div className="mx-auto grid items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <img
              src="../../src/assets/Voice chat-amico.svg"
              alt="select a chat"
            />
            <h2 className="pt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Select a chat
            </h2>
            <p className="mt-2">
              Choose a conversation from the left to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
