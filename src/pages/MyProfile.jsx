import React, { useEffect, useState } from "react";
import DeleteAccount from "../pages/DeleteAccount";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaRegHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEdit,
  FaLocationArrow,
} from "react-icons/fa";
import { faMedium } from "@fortawesome/free-brands-svg-icons"; // import { FaGear } from "react-icons/fa6";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LoadingSuspense from "../components/LoadingSuspense";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// implememnt getting from localstorage the jwt token  for auth

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const isActive = async (userId) => {
    if (!userId) return;
    const request = await fetch(`${API_BASE_URL}/my-profile`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: userId,
        lastActive: new Date().toLocaleString(),
      }),
    });
    const response = await request.json();
    // console.log(response);
  };

  const fetchingUserProfile = async () => {
    try {
      setLoading(false);
      const token = localStorage.getItem("JWT");
      if (!token) {
        setLoading(true);
        navigate("/get-started");
        return undefined;
      }

      const request = await fetch(`${API_BASE_URL}/my-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!request.ok) {
        if (request.status === "403") {
          console.log("Inavlid Token");
          localStorage.removeItem("JWT");
          navigate("/get-started");
        }
        return;
      }

      const response = await request.json();
      setUser(response.userWithoutPassword);
      // setStats(response.stats); // ! this is initial line (but problme solved)---setting state after isActive
      isActive(response.stats.userId);
      setStats(response.stats);
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchingUserProfile();
    // console.log("aveh")
  }, []);

  if (loading) {
    return <LoadingSuspense></LoadingSuspense>;
  }

  return (
    <React.Fragment>
      <div className="flex min-h-screen">
        {/* User Navs */}
        <aside className="border-[#252134] border-r min-w-65 max-w-65">
          <nav className="grid">
            <Link
              to="/my-profile"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg transition-colors"
            >
              <AccountCircleIcon />
              <p>Profile</p>
            </Link>
            <Link
              to="/my-profile/followers"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg transition-colors"
            >
              <PeopleOutlineIcon />
              <p> Followers</p>
            </Link>
            <Link
              to="/my-profile/notifications"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <NotificationsNoneIcon />
              <p>Notifications</p>
            </Link>
            <Link
              to="/my-profile/add-blog"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <AccountCircleIcon />
              <p>Add Blog</p>
            </Link>
            <Link
              to="/my-profile/favourites"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <FaRegHeart />
              <p className="pl-1">Favourites</p>
            </Link>
            <Link
              to="/my-profile/settings"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <SettingsIcon />
              <p className="">Settings</p>
            </Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
        </aside>
        {/* User Info */}
        <main className="flex-1">
          <img
            src="src\assets\user_profile\User_profile_Banner.jpg"
            alt="Banner image"
            className="w-full h-50 object-cover"
          />

          <div className="relative gap-20">
            <img
              src="src\assets\user_profile\User_Profile.jpg"
              alt="user Image"
              width={130}
              height={130}
              className="-top-17 left-13 absolute rounded-[50%] aspect-square"
            />

            <div className="flex items-center gap-130">
              <div className="space-y-2 px-2 pt-20 pl-15 max-w-100">
                <h1 className="font-bold text-gray-900 text-2xl">
                  {user?.firstName} {user?.lastName}
                </h1>

                <p className="text-gray-600">{user?.email}</p>
                {/* <p className="mb-1 max-w-[300px] min-h-[50px]">User hasn't added a bio yet.</p> */}
                {/* <button className="flex justify-start items-center gap-10 mt-0 p-2 border-1 rounded-xl text-gray-500 hover:text-gray-700 transition-colors">
                  <FaEdit className="w-5 h-5" />
                </button> */}

                <div className="max-w-2xl">
                  <p className="text-gray-700 leading-relaxed">
                    {stats?.bio ||
                      "User hasn't added a bio yet. Go to Settings for the edit!"}
                  </p>
                </div>
                <div>
                  {/* Think about now Date - lastActive */}
                  <p>
                    Last Active{" "}
                    {new Date(stats?.lastActive).toLocaleString() || "isactive"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end space-y-12 mt-15 mr-30">
                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="font-bold text-[1.4rem] text-gray-900">120</p>
                    <p className="text-gray-600 text-md">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[1.4rem] text-gray-900">85</p>
                    <p className="text-gray-600 text-md">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[1.4rem] text-gray-900">45</p>
                    <p className="text-gray-600 text-md">Posts</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-16 text-gray-600 text-2xl">
                  <Link
                    href="#"
                    className="hover:text-gray-900 transition-colors"
                  >
                    <FaGithub />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FaLinkedin />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <FaTwitter />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <faMedium />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* <p className="" onChange={() => {}}>
            {`${stats?.postsCount}/0` || "1/0"}
          </p> */}
          <div className="justify-center items-center space-y-10 grid mt-10 px-auto">
            {/* Posts */}
            <input type="text" className="bg-gray-400 rounded-xl w-245 h-90" />
            <input type="text" className="bg-gray-400 rounded-xl w-245 h-90" />
            <input type="text" className="bg-gray-400 rounded-xl w-245 h-90" />
            <input type="text" className="bg-gray-400 rounded-xl w-245 h-90" />
          </div>
        </main>
        {/* <p>My Profile dashboard</p>
          <h1>Adding here Delete Account from Database</h1> */}

        {/* <DeleteAccount></DeleteAccount> */}
      </div>
    </React.Fragment>
  );
};
export default MyProfile;
