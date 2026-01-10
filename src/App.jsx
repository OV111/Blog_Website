import React, {  Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import router from "./router";
import LoadingSuspense from "./components/LoadingSuspense";

const App = () => {
  return (
    <React.Fragment>
          <Suspense fallback={<LoadingSuspense />}>
            <RouterProvider router={router}></RouterProvider>
          </Suspense>
    </React.Fragment>
  );
  // return (
  //   <ThemeProvider>
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route element={<MainLayout />}>
  //             <Route path="/" element={<Home />}></Route>
  //             <Route path="about" element={<About />}></Route>
  //             <Route path="sign-in" element={<SignIn />}></Route>
  //             <Route path="sign-up" element={<SignUp />}></Route>
  //           </Route>

  //           <Route path="/categories" element={<CategoryLayout />}>
  //             <Route path="fullstack" element={<FullStack />} />
  //             <Route path="backend" element={<Backend />} />
  //             <Route path="mobile" element={<Mobile />} />
  //             <Route path="ai&ml" element={<AIandML />} />
  //             <Route path="qa" element={<QA />} />
  //           </Route>
  //         </Routes>
  //       </BrowserRouter>
  //     </AuthProvider>
  //   </ThemeProvider>
  // );
};
export default App;