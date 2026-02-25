import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
export const sidebarArr = [
  {
    section: "General",
    items: [
      {
        to: "/my-profile",
        icon: <PersonOutlineIcon fontSize="small" sx={{ color: "#374151" }} />,
        label: "Profile",
        end: true,
      },
      {
        to: "/my-profile/followers",
        icon: <PeopleOutlineIcon fontSize="small" sx={{ color: "#374151" }} />,
        label: "Followers",
      },
      {
        to: "/my-profile/notifications",
        icon: (
          <NotificationsNoneIcon fontSize="small" sx={{ color: "#374151" }} />
        ),
        label: "Notifications",
      },
    ],
  },
  {
    section: "Content",
    items: [
      {
        to: "/my-profile/add-blog",
        icon: <EditOutlinedIcon fontSize="small" sx={{ color: "#374151" }} />,
        label: "Add Blog",
      },
      {
        to: "/my-profile/chats",
        icon: <ChatOutlinedIcon fontSize="small" sx={{ color: "#374151" }} />,
        label: "Chats",
      },
      {
        to: "/my-profile/favourites",
        icon: (
          <BookmarkBorderOutlinedIcon
            fontSize="small"
            sx={{ color: "#374151" }}
          />
        ),
        label: "Favourites",
      },
    ],
  },
  {
    section: "Security",
    items: [
      {
        to: "/my-profile/settings",
        icon: (
          <SettingsOutlinedIcon fontSize="small" sx={{ color: "#374151" }} />
        ),
        label: "Settings",
      },
    ],
  },
];
