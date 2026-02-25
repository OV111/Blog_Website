import React, { useMemo, useState } from "react";
import { Send, X, ImagePlus } from "lucide-react";
import { TextField, FormLabel, Chip } from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Toaster, toast } from "react-hot-toast";
import SideBar from "./components/SideBar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReccomendedTags = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
];
let category = [
  "Full Stack Development",
  "Mobile Development",
  "Game Development",
  "ML & AI",
  "Backend Development",
  "Quality Assurance",
  "DevOps",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "Database Management",
];

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const readTime = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [content]);

  const suggestedTags = useMemo(() => {
    const text = `${title} ${description} ${content}`.toLowerCase();
    return ReccomendedTags.filter((tag) => text.includes(tag.toLowerCase()));
  }, [title, description, content]);

  const addTag = (tag) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (status) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));
      formData.append("status", status);
      if (cover) formData.append("cover", cover);

      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");
      toast.success(status === "draft" ? "Draft saved" : "Blog published 🚀");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-5xl m-8 w-full">
        {/* Header */}
        <header className="lg:flex justify-between grid items-start mb-10">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold">Write a new blog</h1>
            <p className="text-base lg:text-xl text-gray-600 mt-1">
              Share knowledge with the developer community
            </p>
          </div>

          <div className="flex gap-3 ">
            <button
              onClick={() => handleSubmit("draft")}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <SaveAsOutlinedIcon fontSize="small" /> Save draft
            </button>
            <button
              onClick={() => handleSubmit("published")}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-700"
            >
              <Send className="w-4 h-4" /> Publish
            </button>
          </div>
        </header>

        {/* Form */}
        <section className="grid space-y-6 gap-5">
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
              "& .MuiInputBase-root": { height: 40 },
              "& .MuiInputBase-input": {
                padding: "2px 12px",
                fontSize: { lg: "16px", xs: "12px" },
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
              "& .MuiInputBase-root": { height: 90 },
              "& .MuiInputBase-input": {
                padding: "4px 8px",
                fontSize: { lg: "16px", xs: "12px" },
              },
            }}
            minRows={2.5}
            fullWidth
            helperText={`${description.length}/100 characters recommended`}
          />
          <div>
            <div className="flex justify-between  text-sm text-gray-500 mb-1">
              <span className="">Content (Markdown supported)</span>
              <span>{readTime} min read</span>
            </div>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              minRows={10}
              fullWidth
              placeholder="Write your post content here…"
            />
          </div>

          {/* Tags  & Categories */}
          <div>
            <FormLabel>Tags:</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />
              ))}
            </div>
            {suggestedTags.length > 0 && (
              <div className="mt-3 text-sm text-gray-500">
                Suggested:
                {suggestedTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => addTag(t)}
                    className="ml-2 text-fuchsia-600 hover:underline"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <select className="ml-2 border border-gray-300 rounded-lg px-2 py-1 text-sm">
              <option value="">Select category</option>
              {category.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <FormLabel>Cover image</FormLabel>
            {/* this need to be sized for posts */}
            <label className="mt-2 block h-40 cursor-pointer rounded-lg border border-gray-300 border-dashed bg-white p-6 text-center transition duration-300 hover:border-purple-500">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCover(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-700">
                  <ImagePlus className="h-8 w-8" />
                  <p>Click to upload cover image</p>
                  <p className="text-xs">PNG / JPG • up to 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}
