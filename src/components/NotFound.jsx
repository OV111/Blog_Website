import React from "react";
import FuzzyText from "./FuzzyText";

const NotFound = () => {
  return (
    <div className="grid items-center justify-center mt-26 text-center gap-10">
      <div className="translate-x-38">
        <FuzzyText
          fontSize="clamp(6rem,14vw,14rem)"
          baseIntensity={0.3}
          hoverIntensity={0.5}
          enableHover={true}
        >
          404
        </FuzzyText>
      </div>
      <FuzzyText baseIntensity={0.3} hoverIntensity={0.5} enableHover={true}>
        Not found!
      </FuzzyText>
    </div>
  );
};
export default NotFound;