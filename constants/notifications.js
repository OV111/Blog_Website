import { UserPlus, MessageCircle, Heart, FileText } from "lucide-react";

export const FILTERS = ["All", "Unread", "Follows", "Messages", "Likes"];

export const TYPE_META = {
  follow: {
    icon: UserPlus,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-950/40",
    label: "followed you",
  },
  new_message: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-950/40",
    label: "sent you a message",
  },
  post_like: {
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-950/40",
    label: "liked your post",
  },
  new_post: {
    icon: FileText,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-100 dark:bg-fuchsia-950/40",
    label: "published a new post",
  },
};

export const FILTER_TYPE_MAP = {
  Follows: "follow",
  Messages: "new_message",
  Likes: "post_like",
};
