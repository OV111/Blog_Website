import React, { useEffect, useMemo, useState } from "react";
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
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import { Toaster, toast } from "react-hot-toast";
import SideBar from "./components/SideBar";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [file, setFile] = useState();

  const calculateReadTime = useMemo(() => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }, [text]);
  const minutesToRead = calculateReadTime;
  const postCurrentTime = () => {};

  useEffect(() => {
    // will get from utils the suggested tags based on the content of the post
    const commonTags = [
      "JavaScript",
      "React",
      "Node.js",
      "CSS",
      "HTML",
      "Python",
      "Django",
      "Flask",
      "Java",
      "Spring Boot",
    ];
    const combinedText = `${title} ${description} ${text}`.toLowerCase();
    const words = combinedText.split(/\s+/);
    const matchedTags = commonTags.filter((tag) =>
      words.includes(tag.toLowerCase()),
    );
    setSuggestedTags(matchedTags);
  }, [title, description, text]);

  const handleFileChange = () => {};
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
        <SideBar />
        <Toaster position="top-center" reverseOrder={true}></Toaster>

        <div className="flex-1 m-8 w-full">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="font-semibold text-2xl">Add Blog Post</h1>
              <p className="pb-10 text-lg">
                Share your knowledge with the developer community
              </p>
            </div>

            <div className="flex gap-4 mb-14">
              <button className="flex justify-center items-center gap-2 border-none p-2 bg-fuchsia-600 hover:bg-fuchsia-700 transform duration-300 cursor-pointer font-semibold text-white rounded-lg">
                {/* <Save className="w-5 h-5" /> */}
                <SaveAsOutlinedIcon />
                Save Draft
              </button>
              <button className="flex justify-center items-center gap-2 border-none p-2 bg-fuchsia-600 hover:bg-fuchsia-700  transform duration-300  cursor-pointer font-semibold text-white rounded-lg">
                <Send className="w-5 h-5" />
                Publish
              </button>
            </div>
          </div>
          <form className="grid space-y-6 gap-6" onSubmit={handleSubmit}>
            {/* <div className="gap-2 grid">
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
            </div> */}

            <TextField
              label="Title"
              required
              value={title}
              className="border border-gray-300 rounded-lg outline-none w-100 lg:max-w-100 text-base"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title for your post..."
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                },

                "& .MuiInputBase-input": {
                  padding: "2px 12px",
                },
              }}
            />

            <TextField
              label="Short Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief summary that will appear in blog listings..."
              multiline
              sx={{
                "& .MuiInputBase-root": {
                  height: 90,
                },
                "& .MuiInputBase-input": {
                  padding: "4px 8px",
                },
              }}
              minRows={2.5}
              fullWidth
              helperText={`${description.length}/100 characters recommended`}
            />

            {/* <div className="flex justify-between items-center mb-1">
              <FormLabel
                htmlFor="content"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Content
                <span style={{ marginLeft: "0.25rem", color: "#f87171" }}>
                  *
                </span>
              </FormLabel>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                {minutesToRead} min read
              </span>
            </div> */}
            <div>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                {minutesToRead} min read
              </span>
              <TextField
                id="content"
                label="Content"
                placeholder="Write your blog post content here. Markdown is supported..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                minRows={2.5}
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiInputBase-root": {
                    height: 90,
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px 8px",
                  },
                }}
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
              <FormLabel className="text-sm font-medium text-foreground">
                Cover Image
              </FormLabel>
              <div className="relative cursor-pointer overflow-hidden rounded-lg  border border-dashed border-gray-300  bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
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

            <button className="w-full lg:w-full transition duration-300 sm:w-fit bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 font-semibold rounded-lg text-white text-lg cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddBlog;
