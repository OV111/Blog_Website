import {
  User,
  Settings as SettingsIcon,
  Bell,
  Bookmark,
} from "lucide-react";

export const AVATAR_MENU_ITEMS = [
  { label: "My Profile", to: "my-profile", icon: User },
  { label: "Settings", to: "my-profile/settings", icon: SettingsIcon },
  { label: "Notifications", to: "my-profile/notifications", icon: Bell },
  { label: "Favourites", to: "my-profile/favourites", icon: Bookmark },
];

export const MOBILE_EXTRA_LINKS = [
  { label: "About", to: "about" },
  { label: "Privacy", to: "privacy" },
];
