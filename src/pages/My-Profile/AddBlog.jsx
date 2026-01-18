import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import {
  Code2,
  ImagePlus,
  X,
  Plus,
  Eye,
  Save,
  Send,
  FileCode,
  Terminal,
  Database,
  Globe,
  Smartphone,
  Server,
  Layout,
  Zap,
} from "lucide-react";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import { Toaster, toast } from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();

  const calculateReadTime = () => {};
  const postCurrentTime = () => {};
const handleFileChange = () => {}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, category, file }),
      });
      const response = await request.json();
      console.log(response.message, response.code);
      toast.success("Post Successfully Created");
    } catch (err) {
      console.log(err);
    }
  };

  const categories = [{ value: "frontend", label: "Frontend", icon: Layout }];
  const difficultyLevel = [];

  // ! Initial function
  return (
    <React.Fragment>
      <div className="flex min-h-screen">
        <Toaster position="top-center" reverseOrder={true}></Toaster>
        <aside className="border-gray-300 border-r min-w-65 max-w-65">
          <nav className="grid">
            <Link
              to="/my-profile"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg transition-colors"
            >
              <AccountCircleIcon />
              <p>Profile</p>
            </Link>
            <Link
              to="/my-profile/followers"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg transition-colors"
            >
              <PeopleOutlineIcon />
              <p> Followers</p>
            </Link>
            <Link
              to="/my-profile/notifications"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <NotificationsNoneIcon />
              <p>Notifications</p>
            </Link>
            <Link
              to="/my-profile/add-blog"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <AddIcon />
              <p>Add Blog</p>
            </Link>
            <Link
              to="/my-profile/favourites"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <FaRegHeart />
              <p className="pl-1">Favourites</p>
            </Link>
            <Link
              to="/my-profile/settings"
              className="flex justify-start items-center gap-2 hover:bg-gray-200 py-3 pl-8 rounded-sm font-medium text-lg text-start transition-colors"
            >
              <SettingsIcon />
              <p className="">Settings</p>
            </Link>
            {/* <Link to="/my-profile/likes">Likes</Link> */}
          </nav>
        </aside>

        <div className="m-8 w-full">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="font-semibold text-2xl">Add Blog Post</h1>
              <p className="pb-10 text-lg">
                Share your knowledge with the developer community
              </p>
            </div>

            <div className="flex gap-4 mb-14">
              <button className="flex justify-center items-center gap-2 border-none p-2 bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer font-semibold text-white rounded-lg">
                <Save className="w-5 h-5" />
                Save Draft
              </button>
              <button className="flex justify-center items-center gap-2 border-none p-2 bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer font-semibold text-white rounded-lg">
                <Send className="w-5 h-5" />
                Publish
              </button>
            </div>
          </div>
          <form className="grid space-y-6" onSubmit={handleSubmit}>
            <div className="gap-2 grid">
              <FormLabel
                htmlFor="title"
                className="font-medium text-gray-700 text-sm"
              >
                Title
                <span className="ml-1 text-destructive text-red-500">*</span>
              </FormLabel>
              <input
                type="text"
                value={title}
                placeholder="Enter a compelling title for your post..."
                className="focus:placeholder:opacity-0 p-2 border border-gray-300 rounded-lg outline-none w-100 max-w-100 text-base"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="">
              <FormLabel
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Short Description
                <span className="ml-1 text-destructive text-red-500">*</span>
              </FormLabel>
              <TextField
                id="description"
                placeholder="Write a brief summary that will appear in blog listings..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={2}
                fullWidth
                variant="outlined"
                className=""
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/100 characters recommended
              </p>
            </div>

            <div className="">
              <FormLabel
                htmlFor="content"
                className="text-sm font-medium text-foreground"
              >
                Content
                <span className="ml-1 text-destructive text-red-500">*</span>
              </FormLabel>
              <TextField
                id="text"
                placeholder="Write your blog post content here.Markdown is supported..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                minRows={3}
                fullWidth
                variant="outlined"
                className=""
              />
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories.map(() => {})}
            </select>
             <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-foreground">Cover Image</FormLabel>
            <div
              className="relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-border bg-card/50 transition-colors hover:border-primary/50 hover:bg-card"
            >
              
                <div className="relative">
                  <img
                    // src={previewUrl || "/placeholder.svg"}
                    alt="Cover preview"
                    className="h-48 w-full object-cover"
                  />
                  <button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              
                <div className="flex flex-col items-center justify-center py-12">
                  <ImagePlus className="mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    Click to upload cover image
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG up to 5MB (1200x630 recommended)
                  </p>
                </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

            {/* Also track time when the post added */}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddBlog;
