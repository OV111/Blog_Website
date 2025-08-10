import React from "react";
import TextType from "../components/TextType";
import ShinyText from "../components/ShinyText";
import GradientText from "../components/GradientText";

const Home = () => {
  return (
    <React.Fragment>
      <div>
        <section className="mt-33 mb-50 ml-20 flex flex-col gap-4 ">
          <div className="w-146 h-35">
            {/* <h1 className="text-7xl text-start font-medium text-purple-800 ml-5">
              <TextType
                text={[
                  "Welcome to Developers blog.",
                  "Level up your dev skills,",
                  "Created by Devs for Devs!",
                ]}
                typingSpeed={105}
                pauseDuration={1500}
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
            {/* need to change style */}
            <button className="items-center justify-center  ml-6 mt-4 px-10 py-2 text-2xl rounded-xl text-gray-100 border-none bg-fuchsia-700 text-whitetransition cursor-pointer hover:bg-fuchsia-600 transform hover:scale-102 hover:shadow-lg hover:text-white dark:bg-fuchsia-550">
              <ShinyText
                text="Start Reading"
                disabled={false}
                speed={3}
                className="text-white font-semibold"
              />
            </button>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Home;