import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LoadingSuspense from "../components/LoadingSuspense";
import SideBar from "./My-Profile/components/SideBar";
import XIcon from "@mui/icons-material/X";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [isSideBarOpened, setIsSideBarOpened] = useState(
    window.innerWidth >= 1024,
  );

  const isActive = async (userId) => {
    if (!userId) return;

    try {
      const request = await fetch(`${API_BASE_URL}/my-profile`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: userId,
          lastActive: new Date().toLocaleString(),
        }),
      });
      const response = await request.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchingUserProfile = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("JWT");
      if (!token) {
        navigate("/get-started");
        return;
      }

      const request = await fetch(`${API_BASE_URL}/my-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!request.ok) {
        if (request.status === 403) {
          console.log("Invalid Token");
          localStorage.removeItem("JWT");
          navigate("/get-started");
        }
        return;
      }

      const response = await request.json();

      setUser(response.userWithoutPassword ?? null);
      setStats(response.stats ?? {});

      if (response?.stats?.userId) {
        isActive(response.stats.userId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingUserProfile();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1024
        ? setIsSideBarOpened(false)
        : setIsSideBarOpened(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <LoadingSuspense></LoadingSuspense>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <SideBar
        isOpen={isSideBarOpened}
        onClose={() => setIsSideBarOpened(false)}
      />

      <main className="flex-1">
        <div className="relative">
          <img
            src={
              stats?.bannerImage || "src/assets/user_profile/User_Banner.png"
            }
            alt="Banner"
            className="w-full h-40 sm:h-56 object-cover"
          />

          <div className="absolute -bottom-10 sm:-bottom-13 lg:-bottom-14 left-14 sm:left-16 lg:left-10 -translate-x-1/2  lg:translate-x-0">
            <img
              src={
                stats?.profileImage ||
                "src/assets/user_profile/User_Profile.jpg"
              }
              alt="User"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full  object-cover"
            />
          </div>
        </div>

        <div className="pt-16 lg:pt-20 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>

              <p className="text-gray-700">
                {stats?.bio ||
                  "Tell others a bit about yourself - add a bio in settings."}
              </p>

              <p className="text-sm text-gray-500">
                Last active:{" "}
                {stats?.lastActive
                  ? new Date(stats.lastActive).toLocaleString()
                  : "Active now"}
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              <div className="flex gap-8">
                {[
                  { label: "Followers", value: stats?.followersCount ?? 0 },
                  { label: "Following", value: stats?.followingsCount ?? 0 },
                  { label: "Posts", value: stats?.postsCount ?? 0 },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-base lg:text-xl font-bold">
                      {item.value}
                    </p>
                    <p className="text-gray-600 text-base lg:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-2xl text-gray-600">
                <Link to="#" className="hover:text-black">
                  <FaGithub />
                </Link>
                <Link to="#" className="hover:text-blue-600">
                  <FaLinkedin />
                </Link>
                <Link to="#" className="hover:text-gray-900">
                  <XIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-300 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
