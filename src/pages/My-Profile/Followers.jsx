import { useState,useEffect } from "react";
import SideBar from "./components/SideBar";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";

const sortOptions = ["Most Relevant", "Newest", "Oldest"];
const filterOptions = [
  { content: "All", icon: AppsIcon },
  { content: "Mutuals", icon: PeopleAltOutlinedIcon },
  { content: "Verified", icon: VerifiedOutlinedIcon },
  { content: "Contributors", icon: GroupWorkOutlinedIcon },
];
const Followers = () => {
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [followersView, setFollowersView] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {

      setUsers([
          {
              id:1,
      name: "John Doe",
      username: "johndoe",
      avatar: "https://example.com/avatar.jpg",
    },
    
])
},[])
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
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b-1 border-gray-300">
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => setFollowersView(false)}
                className={`rounded-lg px-3 py-2 cursor-pointer transition duration-400 ${
                  !followersView
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-gray-700"
                }`}
              >
                Followers ({followersCount})
              </button>
              <button
                type="button"
                onClick={() => setFollowersView(true)}
                className={`rounded-lg px-3 py-2 cursor-pointer transition duration-400 ${
                  followersView
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-gray-700"
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
                        : "bg-gray-100 text-purple-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Options */}
          <div className="px-2 my-2">
            <ul className="flex gap-2">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeFilter === option.content;
                return (
                  <li key={option.id} className="">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter(option.content);
                      }}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 transition duration-400 ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 text-gray-700 hover:bg-gray-200"
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
          {/* Users */}
          <div className="px-2">
            {users.map((user) => (
              <div key={user.id} className="flex border border-gray-300 rounded-lg gap-2">
                <img
                  src=""
                  alt="profile image"
                  className="w-10 h-10 lg:w-15 lg:h-15 rounded-full object-cover bg-gray-300"
                />
                <div className="grid">

                <p className="text-gray-900 text-lg font-semibold">{user.name}</p>
                <p className="text-gray-400">{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Followers;
