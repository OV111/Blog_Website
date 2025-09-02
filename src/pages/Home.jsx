import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TextType from "../components/TextType";
import ShinyText from "../components/ShinyText";
import GradientText from "../components/GradientText";

import { Toaster, toast } from "react-hot-toast";

import SplashCursor from "../components/SplashCursor";

const Home = () => {
  useEffect(() => {
    if (!document.cookie.includes("cookiesAccepted=true")) {
      toast(
        <div className="grid mx-auto gap-3">
          <h1 className="text-xl font-bold text-center pt-2">
            We use Cookies 🍪
          </h1>
          <p className="text-lg  text-gray-700 font-medium">
            We use cookies to enhance your experience. By continuing to visit
            this site, you agree to our use of cookies.
          </p>
          <button className="bg-purple-600 w-full rounded-xl py-2 text-white  cursor-pointer hover:bg-fuchsia-600 transform  hover:scale-102 text-white">
            Accept Cookies
          </button>
        </div>,
        { autoClose:false,hideProgressBar: false, closeOnClick: true }
      );
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <Toaster position="right-bottom" reverseOrder={false}></Toaster>
        {/* <SplashCursor/> */}
        <section className="mt-33 mb-50 ml-20 flex flex-col gap-4 ">
          <div className="w-146 h-35">
            {/* <h1 className="text-7xl text-start font-medium text-purple-800 ml-5">
              <TextType
                text={[
                  "Welcome to Developers blog.",
                  "Level up your dev skills,",
                  "Created by Devs for Devs!",
                ]}
                typingSpeed={109}
                pauseDuration={1700}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1> */}
          </div>
          <GradientText
            colors={["#8A2BE2", "#FF1493", "#FF00FF", "#9c40ff", "#00FF00"]}
            animationSpeed={8}
            showBorder={false}
            className="text-start ml-5 text-2xl mt-3 py-1 px-1 "
          >
            A place to read, write and understand topics.
          </GradientText>
          <div>
            <button className="items-center justify-center  ml-6 mt-4 px-10 py-2 text-2xl rounded-xl text-gray-100 border-none bg-fuchsia-700 text-whitetransition cursor-pointer hover:bg-fuchsia-600 transform  hover:scale-102 hover:shadow-lg hover:text-white dark:bg-fuchsia-550">
              <Link to="get-started">Start Reading</Link>
              {/* <ShinyText
                text="Start Reading"
                disabled={false}
                speed={3}
                className="text-white font-semibold"
              /> */}
            </button>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Home;
