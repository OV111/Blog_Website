import React from "react";
import { Link, useLocation } from "react-router-dom";
import X_logo from "../assets/X_logo.png";
import { FaGithub, FaTwitter, FaMailBulk, FaEnvelope } from "react-icons/fa";
import { Send } from "lucide-react";
import { useState } from "react";
const Footer = () => {
  const {pathname} = useLocation()
  const [hoverTwitter, setHoverTwitter] = useState(false);

  // const pathname = location.pathname
  return (
    <React.Fragment>
      <footer className="min-h-[1070px] bg-gradient-to-r from-purple-800 to-purple-950  text-white pt-10 dark:from-purple-700 dark:to-purple-800 lg:min-h-[100px]">
        <div className="grid lg:flex justify-start items-start gap-4 lg:gap-30 mb-0 pl-8 lg:pl-30 dark:bg-from-violet-700 dark:bg-to-violet-950">
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="" alt="Logo" />
              <h1 className="text-3xl font-extrabold  tracking-wide">
                Devs Blog
              </h1>
            </Link>
            <p className="text-purple-400 max-w-sm mb-6">
              A blog dedicated to modern web development, AI trends, and quality
              assurance — insights, tutorials, and real-world guides for
              developers and tech enthusiasts.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-5 mt-0  mb-12 text-3xl">
              <Link to="" className="text-black hover:text-white  ">
                <FaGithub></FaGithub>
              </Link>
              <Link
                to=""
                className="text-blue-600 hover:"
                onMouseEnter={() => setHoverTwitter(true)}
                onMouseLeave={() => setHoverTwitter(false)}
              >
                {hoverTwitter ? (
                  <img src={X_logo}></img>
                ) : (
                  <FaTwitter></FaTwitter>
                )}
                {/* change x logo when hovered  */}
              </Link>
              <Link to="" className="text-white">
                <FaEnvelope></FaEnvelope>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex lg:flex gap-20 lg:gap-25">
            <div className="grid gap-1">
              <h3 className="text-xl font-bold mb-2  text-purple-400">
                Quick Links
              </h3>
              <Link to="/" className={`text-lg hover:text-purple-500 transition ${pathname === "/" ? "text-purple-400" : ""}`}>
                Home
              </Link>
              <Link
                to="/about"
                className={`text-lg  hover:text-purple-500 transition ${pathname === "/about" ? "text-purple-500": ""}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-lg  hover:text-purple-500 transition ${pathname === "/contact" ?"text-purple-500" : ""}`}
              >
                Contact
              </Link>
              <Link to="/privacy" className={`text-lg  hover:text-purple-500 transition ${pathname === "/privacy" ?"text-purple-500" : ""}`}>
                Privacy Policy
              </Link>
            </div>

            {/* Categories Part */}
            <div className="grid gap-1 space-y-0">
              <h3 className="text-xl font-bold mb-2  text-purple-400">
                Categories
              </h3>
              <Link to="/categories/fullstack" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/fullstack" ?"text-purple-500" : ""}`}>
                Full Stack
              </Link>
              <Link to="/categories/backend" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/backend" ?"text-purple-500" : ""}`}>
                Backend
              </Link>
              <Link to="/categories/mobile" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/mobile" ?"text-purple-500" : ""}`}>
                Mobile
              </Link>
              <Link to="/categories/ai&ml" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/ai&ml" ?"text-purple-500" : ""}`}>
                AI & ML
              </Link>
              <Link to="/categories/qa" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/qa" ?"text-purple-500" : ""}`}>
                Quality Assurance
              </Link>
              <Link to="/categories/devops" className={`text-lg  hover:text-purple-500 transition ${pathname === "/categories/devops" ?"text-purple-500" : ""}`}>
                DevOps
              </Link>
            </div>
          </div>
          {/* Email Part */}
          <div className="grid gap-1 mt-5 lg:mt-0">
            <h3 className="text-2xl font-bold mb-2 w-50 text-purple-400">
              Stay Updated!
            </h3>
            <p className="text-purple-200 mb-4 w-60">
              {" "}
              Subscribe to our newsletter for the latest articles and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter Your Email."
                className="flex-grow rounded-md pl-2 outline bg-purple-700 border-purple-600 text-white placeholder-purple-300 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-2  rounded-md shadow-sm transition-colors duration-200"
              >
                <Send className="w-5 h-5"></Send>
              </button>
            </form>
          </div>

          {/* <div className="grid gap-1">
              <h3 className="text-xl font-bold mb-2 w-30 text-purple-400">Legal</h3>
              <Link to="" className="text-lg hover:text-purple-500 transition">
                Privacy Policy
              </Link>
              <Link to="" className="text-lg hover:text-purple-500 transition">
                Terms of Service
              </Link>
              <Link to="" className="text-lg hover:text-purple-500 transition">
                Cookie Policy
              </Link>
            </div> */}
        </div>
        {/* <hr className="border-purple-800 my-6" /> */}
        
        <div className="text-center  py-8 text-m text-purple-300 ">
          © {new Date().getFullYear()} Devs Blog. All rights reserved
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
