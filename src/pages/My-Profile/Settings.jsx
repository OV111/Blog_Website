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
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [bio, setBio] = useState("");
  // const [postsCount, setPostsCount] = useState(0);
  // const [githubLink, setGithubLink] = useState("");
  // const [linkedinLink, setLinkedinLink] = useState("");
  // const [twitterLink, setTwitterLink] = useState("");
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
        toast.error(response.message || "Failed to save changes"); // this gives me in save changes so something went wrong
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
      <div className="flex min-h-screen">
        <Toaster position="top-center" reverseOrder={true} />
        <SideBar />
        <div className="m-8">
          <h1 className="font-semibold text-2xl">Settings</h1>
          <p className="pb-10 text-lg">
            Manage your account settings and preferences
          </p>
          <div className="gap-10 grid">
            <div className="flex justify-center items-center gap-20">
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  placeholder="Full Name"
                  className="focus:placeholder:opacity-0 p-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-base"
                  onChange={(e) => handleChange("fname", e.target.value)}
                />
              </div>

              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lname}
                  placeholder="Last Name"
                  className="focus:placeholder:opacity-0 p-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-base"
                  onChange={(e) => handleChange("lname", e.target.value)}
                />
              </div>
            </div>

            <div className="gap-2 grid">
              <div className="gap-2 grid max-w-sm">
                <label className="font-medium text-gray-700 text-sm">
                  Profile Image
                </label>

                <label className="flex justify-between items-center hover:bg-purple-50 px-4 py-3 border border-gray-300 hover:border-purple-500 focus-within:border-blue-500 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition cursor-pointer">
                  <span className="text-gray-500 text-sm">
                    {profileImage ? profileImage.name : "Choose an image"}
                  </span>

                  <span className="font-medium text-purple-600 text-sm">
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

              <div className="gap-2 grid max-w-sm">
                <label className="font-medium text-gray-700 text-sm">
                  Banner Image
                </label>

                <label className="flex justify-between items-center hover:bg-purple-50 px-4 py-3 border border-gray-300 hover:border-purple-500 border-dashed rounded-lg focus-within:ring-2 transition cursor-pointer">
                  <span className="text-gray-500 text-sm">
                    {bannerImage ? bannerImage.name : "Choose an image"}
                  </span>
                  <span className="font-medium text-purple-600 text-sm">
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

            <div className="flex gap-20">
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Bio
                </label>
                <input
                  type="text"
                  value={formData.bio}
                  placeholder="Share your story and what you're passionate about..."
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 text-gray-900"
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </div>
              <div className="gap-2 grid">
                <label className="font-medium text-gray-600 text-sm">
                  Time Zone
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTC +4"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-full text-gray-900"
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="flex gap-20">
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Github
                </label>
                <input
                  type="text"
                  value={formData.githubLink}
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => handleChange("githubLink", e.target.value)}
                />
              </div>

              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Linkedin
                </label>
                <input
                  type="text"
                  value={formData.linkedinLink}
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => handleChange("linkedinLink", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-20">
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Twitter
                </label>
                <input
                  type="text"
                  value={formData.twitterLink}
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => handleChange("twitterLink", e.target.value)}
                />
              </div>
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Medium
                </label>
                <input
                  type="text"
                  value={formData.mediumLink}
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => handleChange("mediumLink", e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={SaveChanges}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 p-2 font-semibold rounded-lg text-white text-xl cursor-pointer b-2"
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
