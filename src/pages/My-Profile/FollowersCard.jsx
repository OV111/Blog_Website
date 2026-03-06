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
    <div className="mb-3 rounded-lg border border-gray-300 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/user_profile/User_Profile.jpg"
            alt="profile image"
            className="h-10 w-10 rounded-full bg-gray-300 object-cover lg:h-14 lg:w-14"
          />
          <div>
            <p className="text-base font-semibold text-gray-900 lg:text-lg">
              {displayName}
            </p>
            <p className="text-sm text-gray-500">@{user?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onToggleFollow(user, isFollowing)}
            className={`rounded-lg px-3 py-1 text-sm font-semibold transition ${
              isFollowing
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } ${actionLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
          >
            {actionLoading ? "..." : isFollowing ? "Following" : "Follow"}
          </button>

          {user?.stats?.githubLink && (
            <a
              href={user.stats.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 transition hover:text-black"
            >
              <FaGithub />
            </a>
          )}
          {user?.stats?.linkedinLink && (
            <a href={user.stats.linkedinLink} target="_blank" className="">
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-700">{user?.stats?.bio || "-"}</p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-4">
          <p>{user?.stats?.location || "Location not set"}</p>
          <p>Last Active: {lastActiveText}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>{user?.stats?.followersCount ?? 0} Followers</p>
          <p>{user?.stats?.followingsCount ?? 0} Following</p>
          <p>{user?.stats?.postsCount ?? 0} Posts</p>
        </div>
      </div>
    </div>
  );
};

export default FollowersCard;
