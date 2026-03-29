import React, { useEffect, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import router from "./router";
import LoadingSuspense from "./components/feedback/LoadingSuspense";
import useAuthStore from "./stores/useAuthStore";

const App = () => {
  const { isLoading, init } = useAuthStore();
  useEffect(() => {
    init();
  }, []);

  if (isLoading) return <LoadingSuspense />;

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSuspense />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </React.Fragment>
  );
};
export default App;
