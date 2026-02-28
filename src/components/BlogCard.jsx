import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import useAuthStore from "../context/useAuthStore";

const FictionalUsers = [
  { name: "John Doe", userName: "@johndoe" },
  { name: "Alice Keyes", userName: "@alice_keys" },
  { name: "Bob Carter", userName: "@bob_carter" },
  { name: "Ada Byte", userName: "@adabyte" },
  { name: "Grace Hopper", userName: "@gracehopper" },
  { name: "Maya Stack", userName: "@maya_stack" },
];
const BlogCard = ({ card }) => {
  const { auth } = useAuthStore();
  const fallbackSeed = String(card.id ?? card.title ?? "");
  const fallbackIndex =
    [...fallbackSeed].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    FictionalUsers.length;
  const fallbackUser = FictionalUsers[fallbackIndex];
  const authorName = auth
    ? `${card.firstName ?? ""} ${card.lastName ?? ""}`.trim() || "Unknown User"
    : fallbackUser.name;
  const userName = auth ? card.userName || "@userName" : fallbackUser.userName;
  const tags = Array.isArray(card.tags)
    ? card.tags
    : typeof card.tags === "string"
      ? card.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

  return (
    <Card className="w-full max-w-[400px] overflow-hidden rounded-2xl border-none bg-violet-50/40">
      <div className="relative h-56 border-b border-violet-200 bg-violet-200/60">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover"
        />
        <button className={`absolute right-4 top-4 cursor-pointer rounded-full bg-white/95 p-2 font-medium ${auth ? "cursor-pointer" : "cursor-not-allowed"} text-slate-700 shadow-sm transition-colors duration-200 hover:bg-violet-600 hover:text-white`}>
          <FaRegBookmark />
        </button>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="flex max-w-[20rem] flex-wrap gap-1.5 overflow-hidden">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="flex min-w-0 items-center justify-center rounded-full bg-violet-950/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-wide text-violet-50 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`post/${card.id}`}
            state={{ post: card }}
            className="shrink-0 rounded-full bg-violet-500/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-violet-400"
          >
            Read More
          </Link>
        </div>
      </div>
      <CardHeader className="space-y-3 px-6 pb-0 pt-4">
        <div className="flex items-center justify-between text-xs font-medium uppercase text-slate-500">
          <span>
            {new Date(card.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <CardDescription className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {card.readTime} read
          </CardDescription>
        </div>
        <CardTitle className="pb-3 overflow-hidden text-xl leading-tight text-slate-900">
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-2 pt-0">
        <p className="h-[72px] overflow-hidden text-sm leading-6 text-slate-600">
          {card.description}
        </p>
      </CardContent>

      <CardFooter className="items-center justify-between border-t border-violet-100 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-300 ring-2 ring-slate-100" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 overflow-x-hidden">
              {authorName}
            </span>
            <span className="text-xs font-semibold text-gray-400 overflow-x-hidden">
              {userName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            className={`rounded-full p-2 ${auth ? "cursor-pointer" : "cursor-not-allowed"} transition hover:bg-rose-50 hover:text-rose-500`}
          >
            <FaRegHeart />
          </button>
          <button
            type="button"
            className={`rounded-full p-2 ${auth ? "cursor-pointer" : "cursor-not-allowed"} transition hover:bg-rose-50 hover:text-blue-500`}
          >
            <FaRegComment />
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full p-2  transition hover:bg-emerald-50 hover:text-emerald-500"
          >
            <FiShare />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
