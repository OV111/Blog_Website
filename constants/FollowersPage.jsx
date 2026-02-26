import AppsIcon from "@mui/icons-material/Apps";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";

export const sortOptions = ["Most Relevant", "Newest", "Oldest"];
export const filterOptions = [
  { content: "All", icon: AppsIcon },
  { content: "Mutuals", icon: PeopleAltOutlinedIcon },
  { content: "Verified", icon: VerifiedOutlinedIcon },
  { content: "Contributors", icon: GroupWorkOutlinedIcon },
];