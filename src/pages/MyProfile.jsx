import React, { useEffect, useState } from "react";
import DeleteAccount from "../pages/DeleteAccount";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaEdit,FaLocationArrow } from "react-icons/fa";
import LoadingSuspense from "../components/LoadingSuspense";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// implememnt getting from localstorage the jwt token  for auth

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
        setUser(response);
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
      <div className="min-h-screen flex bg-zinc-100">
        {/* User Navs */}
        <aside className="w-70 bg-purple-500">
          <nav className="grid">
            <Link to="/my-profile">Profile</Link>
            <Link to="/my-profile/followers">Followers</Link>
            <Link to="/my-profile/notifications">Notifications</Link>
            <Link to="/my-profile/favourites">Favourites</Link>
            <Link to="/my-profile/settings">Settings</Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
        </aside>
        {/* User Info */}
        <main className="flex-1 ">
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
              <div className="pt-20 pl-15 space-y-2 max-w-200">
                <h1 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
                <p className="">User hasn't added a bio yet.</p>
                <button className="">Edit (matiti icon)</button>
              </div>

              <div className="grid">

                <div className="flex gap-10 mt-18 pr-10">
                  <div className="text-center">
                    <p className="text-xl font-bold">120</p>
                    <p className="text-gray-600">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">85</p>
                    <p className="text-gray-600">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">45</p>
                    <p className="text-gray-600">Posts</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-10 mt-10 pl-20 text-2xl">
                  <Link>
                    <FaGithub />
                  </Link>
                  <Link>
                    <FaLinkedin />
                  </Link>
                  <Link>
                    <FaTwitter />
                  </Link>
                  <Link><FaLocationArrow/></Link>
                </div>
              </div>
            </div>

          </div>

          <div className="grid mt-10 mx-23 space-y-10">
            {/* Posts */}
            <input type="text" className="rounded-xl w-240 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-240 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-240 h-90 bg-gray-400" />
            <input type="text" className="rounded-xl w-240 h-90 bg-gray-400" />
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
