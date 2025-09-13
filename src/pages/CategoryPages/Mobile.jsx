import { useState } from "react";

const Mobile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <React.Fragment>
      <h1 className="flex justify-center items-center text-xl font-medium text-sky-800 py-6 sm:text-2xl md:text-4xl lg:text-5xl">
        Full Stack Development Posts
      </h1>
    </React.Fragment>
  );
};
export default Mobile;
