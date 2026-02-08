import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const sidebarArr = [
  {
    to: "/my-profile",
    icon: <PersonOutlineIcon sx={{ color: "#374151" }} />,
    label: "Profile",
  },
  {
    to: "/my-profile/followers",
    icon: <PeopleOutlineIcon sx={{ color: "#374151" }} />,
    label: "Followers",
  },
  {
    to: "/my-profile/notifications",
    icon: <NotificationsNoneIcon sx={{ color: "#374151" }} />,
    label: "Notifications",
  },
  {
    to: "/my-profile/add-blog",
    icon: <EditOutlinedIcon sx={{ color: "#374151" }} />,
    label: "Add Blog",
  },
  {
    to: "/my-profile/favourites",
    icon: <BookmarkBorderOutlinedIcon sx={{ color: "#374151" }} />,
    label: "Favourites",
    // extraClass: "pl-1",
  },
  {
    to: "/my-profile/settings",
    icon: <SettingsOutlinedIcon sx={{ color: "#374151" }} />,
    label: "Settings",
  },
];

export default function SideBar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="" onClick={onClose} />}
      {/* Needs fixes of the style */}

      <aside className="h-full-screen  lg:h-full-screen bg-white border-r border-gray-300 transition-all duration-400 w-12 lg:w-64 lg:static ">
        <nav className="grid">
          {sidebarArr.map((item) => (
            <div className="flex justify-start font-normal items-center gap-2 hover:bg-gray-200 rounded-sm transition-colors lg:pl-4">
              <Link
                key={item.to}
                to={item.to}
                className="flex justify-center lg:justify-start w-full items-center gap-2  py-3 mx-auto"
              >
                {item.icon}
                <p
                  className={`hidden text-gray-700 lg:block ${item.extraClass || ""}`}
                >
                  {item.label}
                </p>
              </Link>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
