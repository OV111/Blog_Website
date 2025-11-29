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
      // console.log(response.message);
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
        {/*Can be false*/}
        <aside className="min-w-65 max-w-65  border-r border-[#252134]">
          <nav className="grid ">
            <Link
              to="/my-profile"
              className="flex justify-start items-center font-medium text-start pl-8 text-lg rounded-sm py-3 gap-2  hover:bg-gray-300 transition-colors"
            >
              <AccountCircleIcon />
              <p>Profile</p>
            </Link>
            <Link
              to="/my-profile/followers"
              className="flex justify-start items-center font-medium gap-2 text-start pl-8 text-lg rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <PeopleOutlineIcon />
              <p>Followers</p>
            </Link>
            <Link
              to="/my-profile/notifications"
              className="flex justify-start items-center font-medium gap-2 text-start pl-8 text-lg rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <NotificationsNoneIcon />
              <p>Notifications</p>
            </Link>
            <Link
              to="/my-profile/add-blog"
              className="flex justify-start items-center font-medium text-start pl-8 text-lg rounded-sm py-3 gap-2  hover:bg-gray-300 transition-colors"
            >
              <AccountCircleIcon />
              <p>Add Blog</p>
            </Link>
            <Link
              to="/my-profile/favourites"
              className="flex justify-start items-center font-medium  gap-2 text-start pl-8 text-lg rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <FaRegHeart />
              <p className="pl-1">Favourites</p>
            </Link>
            <Link
              to="/my-profile/settings"
              className="flex justify-start items-center font-medium gap-2  text-start pl-8 text-lg rounded-sm py-3  hover:bg-gray-300 transition-colors"
            >
              <SettingsIcon />
              <p>Settings</p>
            </Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
        </aside>
        <div className="pl-8 pt-8">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-lg">
            Manage your account settings and preferences
          </p>
          <div className="grid gap-10">
            <div>
              <h1 className="text-lg">Profile Section</h1>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="username"
                className="max-w-100 border-1 "
                onChange={(e) => setFname(e.target.value)}
              />
              <label htmlFor="">Surname</label>
              <input
                type="text"
                placeholder="username"
                className="max-w-100 border-1 "
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="grid">
              <label htmlFor="">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                placeholder="username"
                className="max-w-100 border-1 "
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                }}
              />
              <label htmlFor="">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                placeholder="username"
                className="max-w-100 border-1"
                onChange={(e) => {
                  setBannerImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="">
              <h1>Other Section</h1>
              <label htmlFor="">Time Zone</label>
              <input
                type="text"
                placeholder="Time Zone"
                className="max-w-100 border-1"
                onChange={() => {}}
              />
              <label htmlFor="">Bio</label>
              <input
                type="text"
                placeholder="bio"
                className="max-w-100 border-1 "
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </div>

            <div>
              <h1>Links of Connection</h1>

              <label htmlFor="">Links of Github</label>
              <input
                type="text"
                placeholder="Enter New Url"
                className="max-w-100 border-1 "
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <label htmlFor="">Links of Linkedin</label>
              <input
                type="text"
                placeholder="Enter New Url"
                className="max-w-100 border-1 "
                onChange={(e) => setLinkedinLink(e.target.value)}
              />
              <label htmlFor="">Links of Twitter</label>
              <input
                type="text"
                placeholder="Enter New Url"
                className="max-w-100 border-1 "
                onChange={(e) => setTwitterLink(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                SaveChanges();
              }}
              className="cursor-pointer b-2 bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <DeleteAccount />
    </React.Fragment>
  );
};

export default Settings;
