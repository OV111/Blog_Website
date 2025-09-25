import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddBlog = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [category, setCategory] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title,text,category,file}),
      });
      const response = await request.json();
      console.log(response.message,response.code);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <p>Add Blog Post</p>
      <form className="grid " onSubmit={handleSubmit}>
        <input type="text" value={title} placeholder="Enter Title" onChange={(e) => {setTitle(e.target.value)}}/>
        <textarea
          placeholder="Write your blog..."
            value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={6}
          className="border p-2 rounded"
        />
        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="">Select Category</option>
          <option value="FullStack">FullStack</option>
          <option value="Backend">Backend</option>
          <option value="Mobile">Mobile</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="DevOps">DevOps</option>
        </select>
        <input type="file" value={file} onChange={(e) => {setFile(e.target.value)}} className="border p-2 rounded-md" />
        <button className="border p-2 rounded-md cursor-pointer ">
          Sumbit{" "}
        </button>

        {/* Also track time when the post added */}
      </form>
    </React.Fragment>
  );
};
export default AddBlog;
