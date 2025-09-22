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
// import { FaGear } from "react-icons/fa6";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from '@mui/icons-material/Settings';
import LoadingSuspense from "../components/LoadingSuspense";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// implememnt getting from localstorage the jwt token  for auth

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats,setStats] = useState(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
        console.log(response)
        setUser(response.userWithoutPassword);
        setStats(response.stats)
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };
    fetchingUserProfile();
  }, []);

  if (loading) {
    return <LoadingSuspense></LoadingSuspense>;
  }

  return (
    <React.Fragment>
      <div className="min-h-screen  flex">
        {/* User Navs */}
        <aside className="min-w-65 max-w-65  border-r-[#4d4d4d]">
          <nav className="grid ">
            <Link
              to="/my-profile"
              className="flex justify-start items-center font-medium text-start pl-8 text-xl rounded-sm py-3 gap-2  hover:bg-gray-300 transition-colors"
            >
              < AccountCircleIcon/>
              Profile
            </Link>
            <Link
              to="/my-profile/followers"
              className="flex justify-start items-center font-medium gap-2 text-start pl-8 text-xl rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <PeopleOutlineIcon/>
              Followers
            </Link>
            <Link
              to="/my-profile/notifications"
              className="flex justify-start items-center font-medium gap-2 text-start pl-8 text-xl rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <NotificationsNoneIcon/>
              Notifications
            </Link>
            <Link
              to="/my-profile/favourites"
              className="flex justify-start items-center font-medium  gap-2 text-start pl-8 text-xl rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
            <FaRegHeart/>
              Favourites
            </Link>
            <Link
              to="/my-profile/settings"
              className="flex justify-start items-center font-medium gap-2  text-start pl-8 text-xl rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <SettingsIcon/>
              Settings
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
              className="absolute -top-17 left-13 rounded-[50%] "
            />

            <div className="flex items-center gap-130">
              <div className="pt-20 pl-15 space-y-2 px-2 max-w-100">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>

                <p className="text-gray-600">{user?.email}</p>
                {/* <p className="max-w-[300px] min-h-[50px] mb-1">User hasn't added a bio yet.</p> */}
                {/* <button className=" flex justify-start items-center mt-0 gap-10 p-2 border-1 rounded-xl text-gray-500 hover:text-gray-700 transition-colors">
                  <FaEdit className="w-5 h-5" />
                </button> */}

                <div className="max-w-2xl">
                  <p className="text-gray-700 leading-relaxed">
                    {stats?.bio ||
                      "User hasn't added a bio yet. Go to Settings for the edit!"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end space-y-12 mt-15  mr-30">
                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-[1.4rem] font-bold text-gray-900">120</p>
                    <p className="text-md text-gray-600">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[1.4rem] font-bold text-gray-900">85</p>
                    <p className="text-md text-gray-600">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[1.4rem] font-bold text-gray-900">45</p>
                    <p className="text-md text-gray-600">Posts</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-16 text-2xl text-gray-600">
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
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-center justify-center mt-10 px-auto space-y-10">
            {/* Posts */}
            <input type="text" className="rounded-xl w-245 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-245 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-245 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-245 h-90 bg-gray-400" />
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
