import React, { use, useEffect, useState } from "react";
import DeleteAccount from "../DeleteAccount";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import { Toaster, toast } from "react-hot-toast";
// import LoadingSuspense from "../components/LoadingSuspense";
import SideBar from "./components/SideBar";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Settings = () => {
  const [savedClicked, setSavedClicked] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    bio: "",
    postsCount: 0,
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("JWT");

        const request = await fetch(`${API_BASE_URL}/my-profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await request.json();
        const userData = {
          fname: response.userWithoutPassword.firstName || "",
          lname: response.userWithoutPassword.lastName || "",
          bio: response.stats.bio || "",
          postsCount: response.stats.postsCount || 0,
          githubLink: response.stats.githubLink || "",
          linkedinLink: response.stats.linkedinLink || "",
          twitterLink: response.stats.twitterLink || "",
          mediumLink: response.stats.mediumLink || "",
        };
        setFormData(userData);
        setOriginalData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const SaveChanges = async () => {
    try {
      const token = localStorage.getItem("JWT");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== originalData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (profileImage) formDataToSend.append("profileImage", profileImage);

      if (bannerImage) formDataToSend.append("bannerImage", bannerImage);

      const request = await fetch(`${API_BASE_URL}/my-profile/settings`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      const response = await request.json();
      if (request.ok && response.stats && response.user) {
        const updatedData = {
          fname: response.user.firstName || "",
          lname: response.user.lastName || "",
          bio: response.stats.bio || "",
          postsCount: response.stats.postsCount || 0,
          githubLink: response.stats.githubLink || "",
          linkedinLink: response.stats.linkedinLink || "",
          twitterLink: response.stats.twitterLink || "",
        };
        setFormData(updatedData);
        setOriginalData(updatedData);
        setSavedClicked(true);
        toast.success(response.message || "Changes saved successfully");
        console.log("aveh");

        setProfileImage(null);
        setBannerImage(null);
      } else {
        toast.error(response.message || "Failed to save changes");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <React.Fragment>
      <div className="flex min-h-screen bg-gray-50">
        <Toaster position="top-center" reverseOrder />

        <SideBar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <h1 className="mb-2 font-semibold text-xl lg:text-2xl">Settings</h1>

          <p className="pb-8 text-sm lg:text-lg text-gray-700 max-w-xl">
            Manage your account settings and preferences
          </p>

          <div className="grid gap-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  placeholder="Full Name"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-full"
                  onChange={(e) => handleChange("fname", e.target.value)}
                />
              </div>

              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lname}
                  placeholder="Last Name"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-full"
                  onChange={(e) => handleChange("lname", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 max-w-sm">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <label className="flex justify-between items-center px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer transition duration-300 hover:border-purple-500">
                  <span className="text-sm text-gray-500">
                    {profileImage ? profileImage.name : "Choose an image"}
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setProfileImage(e.target.files?.[0])}
                  />
                </label>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Banner Image
                </label>
                <label className="flex justify-between items-center px-4 py-3 border border-dashed transition duration-300 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                  <span className="text-sm text-gray-500">
                    {bannerImage ? bannerImage.name : "Choose an image"}
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setBannerImage(e.target.files?.[0])}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <input
                  type="text"
                  value={formData.bio}
                  placeholder="Tell others a bit about yourself and what you're passionate about..."
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </div>

              <div className="grid gap-2 w-full lg:max-w-[300px]">
                <label className="text-sm font-medium text-gray-700">
                  Time Zone
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTC +4"
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">
                  Github
                </label>
                <input
                  type="text"
                  value={formData.githubLink}
                  placeholder="Enter URL"
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) => handleChange("githubLink", e.target.value)}
                />
              </div>

              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">
                  Linkedin
                </label>
                <input
                  type="text"
                  value={formData.linkedinLink}
                  placeholder="Enter URL"
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) => handleChange("linkedinLink", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <div className="grid gap-2 w-full lg:max-w-[400px]">
                <label className="text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <input
                  type="text"
                  value={formData.twitterLink}
                  placeholder="Enter URL"
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) => handleChange("twitterLink", e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={SaveChanges}
              className="w-full transition duration-300 lg:w-full sm:w-fit bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 font-semibold rounded-lg text-white text-lg cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Settings;
