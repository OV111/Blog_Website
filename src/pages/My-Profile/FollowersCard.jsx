import { FaGithub, FaLinkedin } from "react-icons/fa";

const FollowersCard = ({
  user,
  isFollowing,
  onToggleFollow,
  actionLoading,
}) => {
  const displayName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || user?.username;

  const formatTimeAgo = (input) => {
    const date = new Date(input);
    if (!input || Number.isNaN(date.getTime())) return "N/A";
    const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const units = [
      ["year", 60 * 60 * 24 * 365],
      ["month", 60 * 60 * 24 * 30],
      ["week", 60 * 60 * 24 * 7],
      ["day", 60 * 60 * 24],
      ["hour", 60 * 60],
      ["minute", 60],
      ["second", 1],
    ];
    for (const [unit, secondsInUnit] of units) {
      const value = Math.round(diffSeconds / secondsInUnit);
      if (Math.abs(value) >= 1) return rtf.format(value, unit);
    }
    return "just now";
  };
  const lastActiveText = formatTimeAgo(user?.stats?.lastActive);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 p-4 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-700/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/user_profile/User_Profile.jpg"
            alt="profile image"
            className="h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-700 object-cover ring-2 ring-purple-100 dark:ring-purple-900/50 lg:h-14 lg:w-14"
          />
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100 lg:text-lg">
              {displayName}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">@{user?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onToggleFollow(user, isFollowing)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              isFollowing
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                : "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600"
            } ${actionLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          >
            {actionLoading ? "..." : isFollowing ? "Following" : "Follow"}
          </button>

          {user?.stats?.githubLink && (
            <a
              href={user.stats.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              <FaGithub size={18} />
            </a>
          )}
          {user?.stats?.linkedinLink && (
            <a
              href={user.stats.linkedinLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 dark:text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaLinkedin size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{user?.stats?.bio || "-"}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap items-center gap-3">
          <span>{user?.stats?.location || "Location not set"}</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span>Last Active: {lastActiveText}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 dark:text-gray-300">{user?.stats?.followersCount ?? 0} <span className="font-normal text-gray-400 dark:text-gray-500">Followers</span></span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{user?.stats?.followingsCount ?? 0} <span className="font-normal text-gray-400 dark:text-gray-500">Following</span></span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{user?.stats?.postsCount ?? 0} <span className="font-normal text-gray-400 dark:text-gray-500">Posts</span></span>
        </div>
      </div>
    </div>
  );
};

export default FollowersCard;
