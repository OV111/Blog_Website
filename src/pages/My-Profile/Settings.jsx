import React, { useEffect, useState } from "react";
import DeleteAccount from "../DeleteAccount";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import { Toaster, toast } from "react-hot-toast";
// import LoadingSuspense from "../components/LoadingSuspense";
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
import { faMedium } from "@fortawesome/free-brands-svg-icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Settings = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [bio, setBio] = useState("");
  const [postsCount, setPostsCount] = useState(0);
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [savedClicked, setSavedClicked] = useState(false);

  //   useEffect(() => {
  //     const fetchRequest = async () => {
  //         const request = await fetch(`${API_BASE_URL}/my-profile/settings`,{

  //         })
  //         const response = await request.json()
  //         console.log(response);
  //     };
  //     fetchRequest();
  //   }, [savedClicked]);

  const SaveChanges = async () => {
    console.log("vahe");

    const oldProfile = {
      fname,
      lname,
      bio,
      postsCount,
      githubLink,
      linkedinLink,
      twitterLink,
    };

    try {
      const token = localStorage.getItem("JWT");
      const request = await fetch(`${API_BASE_URL}/my-profile/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fname,
          lname,
          bio,
          postsCount,
          profileImage,
          bannerImage,
          githubLink,
          linkedinLink,
          twitterLink,
        }),
      });
      const response = await request.json();
      console.log(response);
      if (!request.ok) {
        setFname(oldProfile.fname);
        setLname(oldProfile.lname);
      } else {
        setFname(response.user.firstName);
        setLname(response.user.lastName);
        setBio(response.stats.bio);
        setProfileImage(response.stats.profileImage);
        setBannerImage(response.stats.bannerImage);
        setGithubLink(response.stats.githubLink);
        setLinkedinLink(response.stats.linkedinLink);
        setTwitterLink(response.stats.twitterLink);
      }
      setSavedClicked(true);
      toast.success("Changes Saved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = () => {};

  return (
    <React.Fragment>
      <div className="flex min-h-screen">
        <Toaster position="top-center" reverseOrder={true}></Toaster>{" "}
        <aside className="border-gray-300 border-r min-w-65 max-w-65">
          <nav className="grid">
            <Link
              to="/my-profile"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-gray-800 text-lg text-start transition-colors"
            >
              <AccountCircleIcon />
              <p>Profile</p>
            </Link>
            <Link
              to="/my-profile/followers"
              className="flex justify-start items-center gap-2 hover:bg-gray-300 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <PeopleOutlineIcon />
              <p>Followers</p>
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
              <p>Settings</p>
            </Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
        </aside>
        <div className="p-8">
          <h1 className="font-semibold text-2xl">Settings</h1>
          <p className="pb-10 text-lg">
            Manage your account settings and preferences
          </p>
          <div className="gap-10 grid">
            <div className="flex justify-center items-center gap-20">
              {/* <h1 className="text-lg">Profile Section</h1> */}
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="focus:placeholder:opacity-0 p-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-base"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>

              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="focus:placeholder:opacity-0 p-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-base"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <div className="gap-2 grid">
              <div className="gap-2 grid max-w-sm">
                <label className="font-medium text-gray-700 text-sm">
                  Profile Image
                </label>

                <label className="flex justify-between items-center hover:bg-purple-50 px-4 py-3 border border-gray-300 hover:border-purple-500 focus-within:border-blue-500 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition cursor-pointer">
                  <span className="text-gray-500 text-sm">Choose an image</span>

                  <span className="font-medium text-purple-600 text-sm">
                    Browse
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setProfileImage(e.target.files?.[0]);
                    }}
                  />
                </label>
              </div>

              <div className="gap-2 grid max-w-sm">
                <label className="font-medium text-gray-700 text-sm">
                  Banner Image
                </label>

                <label className="flex justify-between items-center hover:bg-purple-50 px-4 py-3 border border-gray-300 hover:border-purple-500 border-dashed rounded-lg focus-within:ring-2 transition cursor-pointer">
                  <span className="text-gray-500 text-sm">Choose an image</span>
                  <span className="font-medium text-purple-600 text-sm">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setProfileImage(e.target.files?.[0]);
                    }}
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
                  placeholder="Share your story and what you're passionate about..."
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 text-gray-900"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
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
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>

              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Linkedin
                </label>
                <input
                  type="text"
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => setLinkedinLink(e.target.value)}
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
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => setTwitterLink(e.target.value)}
                />
              </div>
              <div className="gap-2 grid">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Links of Medium
                </label>
                <input
                  type="text"
                  placeholder="Enter New Url"
                  className="focus:placeholder:opacity-0 px-3 py-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-gray-900"
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={() => {
                SaveChanges();
              }}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg text-gray-900 text-xl cursor-pointer b-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <DeleteAccount />
    </React.Fragment>
  );
};

export default Settings;
