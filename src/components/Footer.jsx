import React from "react";
import {} from "react-icons";
import { FaGithub, FaTwitter,FaMailBulk } from "react-icons/fa";
const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div>
          <img src="" alt="Logo" />
          <h1>Devs Blog</h1>
          {/* Social Links */}
          <div>
            <a href=""><FaGithub></FaGithub></a>
            <a href=""><FaTwitter></FaTwitter></a>
            <a href=""><FaMailBulk></FaMailBulk></a>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/About">About</a>
            <a href="/Contact">Contact</a>
          </div>

          <div>
            <h3>Legal</h3>
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="">Cookie Policy</a>
          </div>

        </div>
    <hr />
        <div>
            © {new Date().getFullYear()} Devs Blog. All rights reserved
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
