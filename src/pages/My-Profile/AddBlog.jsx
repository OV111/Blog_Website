import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [category, setCategory] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = 0;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <p>Add Blog Post</p>
      <form className="grid " onSubmit={() => handleSubmit()}>
        <input type="text" placeholder="Enter Title" />
        <textarea
          placeholder="Write your blog..."
          //   value={}
          onChange={(e) => e.target.value}
          required
          rows={6}
          className="border p-2 rounded"
        />
        <select value={category}>
          <option value="">Select Category</option>
          <option value="FullStack">FullStack</option>
          <option value="Backend">Backend</option>
          <option value="Mobile">Mobile</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="DevOps">DevOps</option>
        </select>
        <input type="file" className="border p-2 rounded-md" />
        <button className="border p-2 rounded-md cursor-pointer ">
          Sumbit{" "}
        </button>

        {/* Also track time when the post added */}
      </form>
    </React.Fragment>
  );
};
export default AddBlog;
