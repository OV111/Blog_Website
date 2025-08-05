import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FullStack from "./pages/CategoryPages/FullStack";
import QA from "./pages/CategoryPages/QA"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route >
          <Route path="categories/fullstack" element={<FullStack />}></Route>
          <Route path="/qa" element={<QA />}></Route>
        </Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
