import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { UserPlus, MessageCircle, Heart, FileText, Bell, CheckCheck, Trash2 } from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Unread", "Follows", "Messages", "Likes"];

const TYPE_META = {
  follow: {
    icon: UserPlus,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-950/40",
    label: "followed you",
  },
  new_message: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-950/40",
    label: "sent you a message",
  },
  post_like: {
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-950/40",
    label: "liked your post",
  },
  new_post: {
    icon: FileText,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-100 dark:bg-fuchsia-950/40",
    label: "published a new post",
  },
};

const FILTER_TYPE_MAP = {
  Follows: "follow",
  Messages: "new_message",
  Likes: "post_like",
};

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Mock data — remove once backend is wired ────────────────────────────────
const MOCK_NOTIFICATIONS = [
  {
    _id: "1",
    type: "follow",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    senderName: "Alex Rivera",
    senderUsername: "alexrivera",
    senderAvatar: "",
    meta: {},
  },
  {
    _id: "2",
    type: "post_like",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    senderName: "Jordan Kim",
    senderUsername: "jordankim",
    senderAvatar: "",
    meta: { postTitle: "How I built a WebSocket server from scratch" },
  },
  {
    _id: "3",
    type: "new_message",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    senderName: "Sam Patel",
    senderUsername: "sampatel",
    senderAvatar: "",
    meta: { roomId: "room_123" },
  },
  {
    _id: "4",
    type: "new_post",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    senderName: "Maya Chen",
    senderUsername: "mayachen",
    senderAvatar: "",
    meta: { postTitle: "Understanding Rust ownership in 10 minutes" },
  },
  {
    _id: "5",
    type: "follow",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    senderName: "Chris Wu",
    senderUsername: "chriswu",
    senderAvatar: "",
    meta: {},
  },
];

// ─── Skeleton row ────────────────────────────────────────────────────────────
function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 px-4 py-4 animate-pulse">
      <div className="shrink-0 h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="flex-1 space-y-2 min-w-0">
        <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-3 w-10 rounded bg-gray-200 dark:bg-gray-700 shrink-0" />
    </div>
  );
}

// ─── Single notification row ─────────────────────────────────────────────────
function NotificationRow({ notif, onMarkRead, onDelete, onNavigate }) {
  const meta = TYPE_META[notif.type] ?? TYPE_META.follow;
  const Icon = meta.icon;

  return (
    <div
      onClick={() => onNavigate(notif)}
      className={`group flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
        !notif.read ? "bg-purple-50/40 dark:bg-fuchsia-950/10" : ""
      }`}
    >
      {/* Type icon */}
      <div
        className={`shrink-0 flex items-center justify-center h-9 w-9 rounded-full ${meta.bg}`}
      >
        <Icon size={16} className={meta.color} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-100 leading-snug">
          <span className="font-semibold">{notif.senderName}</span>{" "}
          <span className="text-gray-500 dark:text-gray-400">{meta.label}</span>
          {notif.meta?.postTitle && (
            <>
              {" — "}
              <span className="font-medium text-gray-700 dark:text-gray-200 italic truncate">
                "{notif.meta.postTitle}"
              </span>
            </>
          )}
        </p>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          {timeAgo(notif.createdAt)}
        </p>
      </div>

      {/* Right side */}
      <div className="shrink-0 flex items-center gap-2">
        {!notif.read && (
          <span className="h-2 w-2 rounded-full bg-purple-500 mt-1" />
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {!notif.read && (
            <button
              type="button"
              title="Mark as read"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead(notif._id);
              }}
              className="p-1 rounded-md text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
            >
              <CheckCheck size={14} />
            </button>
          )}
          <button
            type="button"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notif._id);
            }}
            className="p-1 rounded-md text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ activeFilter }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <Bell size={22} className="text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {activeFilter === "Unread" ? "You're all caught up" : "No notifications yet"}
      </p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        {activeFilter === "Unread"
          ? "All notifications have been read."
          : "When someone follows you, likes your post, or messages you — it'll show up here."}
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading] = useState(false); // set to true when fetching from API

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === "Unread") return !n.read;
    const mappedType = FILTER_TYPE_MAP[activeFilter];
    if (mappedType) return n.type === mappedType;
    return true;
  });

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    // TODO: PUT /my-profile/notifications/:id/read
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO: PUT /my-profile/notifications/read
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    // TODO: DELETE /my-profile/notifications/:id
  };

  const handleNavigate = (notif) => {
    handleMarkRead(notif._id);
    if (notif.type === "follow") navigate(`/users/${notif.senderUsername}`);
    else if (notif.type === "new_message") navigate(`/my-profile/chats`);
    else if (notif.type === "post_like" || notif.type === "new_post") {
      // navigate to post when post routes are available
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <SideBar />

      <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-bold text-2xl lg:text-3xl text-gray-900 dark:text-gray-100">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              <CheckCheck size={14} />
              Mark all as read
            </button>
          )}
        </div>

        <p className="pb-6 text-sm lg:text-base text-gray-500 dark:text-gray-400">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "You're all caught up"}
        </p>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 w-full rounded-xl border border-gray-200 dark:border-gray-800">

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`relative rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
              >
                {f}
                {f === "Unread" && unreadCount > 0 && (
                  <span
                    className={`ml-1.5 inline-flex items-center justify-center h-4 min-w-4 rounded-full text-[10px] font-semibold px-1 ${
                      activeFilter === "Unread"
                        ? "bg-white text-purple-600"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))
            ) : filtered.length === 0 ? (
              <EmptyState activeFilter={activeFilter} />
            ) : (
              filtered.map((notif) => (
                <NotificationRow
                  key={notif._id}
                  notif={notif}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
