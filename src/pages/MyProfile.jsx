import React from "react";
import DeleteAccount from "../pages/DeleteAccount";
import {Link} from "react-router-dom"
const MyProfile = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen flex bg-zinc-100">
        {/* User Navs */}
        <aside className="w-74 bg-purple-500">
          <nav className="grid">
            <Link to="/my-profile">Profile</Link>
            <Link to="/my-profile/followers">Followers</Link>
            <Link to="/my-profile/notifications">Notifications</Link>
            <Link to={"/my-profile/favourites"}>Favourites</Link>
            <Link to="/my-profile/settings">Settings</Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
          
        </aside>
        {/* User Info */}
        <main className="w-full">
            <img src="src\assets\user_profile\User_profile_Banner.jpg" alt="Banner image" width={600} height={120} />

          <div>
          <img src="src\assets\user_profile\User_Profile.jpg" alt="user Image" width={80} height={80} />
            <h1>User name</h1>
            <p></p>
          </div>

          <div>
            {/* Posts */}
            <input type="text" />
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
