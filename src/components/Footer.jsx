import React from "react";
import {} from "react-icons";
import { FaGithub, FaTwitter, FaMailBulk } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="text-gray-700 pt-32 px-5 ">
        <div className="flex justify-start items-start gap-40 mb-2">
          <div className="grid gap-1">

            <Link to="/" className="flex items-center gap-2 mb-4 ">
              <img src="" alt="Logo" />
              <h1 className="text-2xl font-bold ">Devs Blog</h1>
            </Link>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-5 mt-0  mb-12 text-2xl">
              <Link to="">
                <FaGithub></FaGithub>
              </Link>
              <Link to="">
                <FaTwitter></FaTwitter>
              </Link>
              <Link to="">
                <FaMailBulk></FaMailBulk>
              </Link>
            </div>
          </div>
        

          <div className="grid gap-1">
            <h3 className="text-xl font-semibold mb-2 w-30">Quick Links</h3>
            <Link to="/" className="text-lg hover:text-purple-500 transition">Home</Link>
            <Link to="/About" className="text-lg  hover:text-purple-500 transition">About</Link>
            <Link to="/Contact" className="text-lg  hover:text-purple-500 transition">Contact</Link>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-semibold mb-2 w-30">Categories</h3>
            <Link to="" className="text-lg hover:text-purple-500 transition">Mobile</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">Full Stack</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">AI & ML</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">Backend</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">Quality Assurance</Link>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-semibold mb-2 w-30">Legal</h3>
            <Link to="" className="text-lg hover:text-purple-500 transition">Privacy Policy</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">Terms of Service</Link>
            <Link to="" className="text-lg hover:text-purple-500 transition">Cookie Policy</Link>
          </div>
        </div>
        <hr />
        <div>© {new Date().getFullYear()} Devs Blog. All rights reserved</div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
