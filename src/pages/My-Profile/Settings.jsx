import React, { useEffect, useState } from "react";
import DeleteAccount from "../DeleteAccount";
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
    setSavedClicked(true);

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
          githubLink,
          linkedinLink,
          twitterLink,
        }),
      });
      const response = await request.json();
      console.log(response);
      console.log(response.message);
      if (!request.ok) {
        setFname(oldProfile.fname);
        setLname(oldProfile.lname);
      } else {
        setFname(response.user.firstName);
        setLname(response.user.lastName);
        setBio(response.stats.bio);
        setGithubLink(response.stats.githubLink);
        setLinkedinLink(response.stats.linkedinLink);
        setTwitterLink(response.stats.twitterLink);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <div>
        <h1>General</h1>
        <div className="grid gap-2">
          <label htmlFor="">FName</label>
          <input
            type="text"
            placeholder="username"
            className="max-w-100 border-1 "
            onChange={(e) => setFname(e.target.value)}
          />
          <label htmlFor="">LName</label>
          <input
            type="text"
            placeholder="username"
            className="max-w-100 border-1 "
            onChange={(e) => setLname(e.target.value)}
          />

          <label htmlFor="">Profile Image</label>
          <input
            type="image"
            placeholder="username"
            className="max-w-100 border-1 "
            onChange={() => {}}
          />
          <label htmlFor="">Banner Image</label>
          <input
            type="image"
            placeholder="username"
            className="max-w-100 border-1 "
            onChange={() => {}}
          />
          <label htmlFor="">Bio</label>
          <input
            type="text"
            placeholder="bio"
            className="max-w-100 border-1 "
            onChange={(e) => setBio(e.target.value)}
          />

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

          <button
            onClick={() => {
              SaveChanges();
            }}
            className="cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      <DeleteAccount />
    </React.Fragment>
  );
};

export default Settings;
