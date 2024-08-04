import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "../Screens/login";

import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import ProtectedRoutes from "./ProtectedRoutes.js";
import Dashboard from "../Screens/dashboard";
import PostIdea from "../Screens/postIdea";
import Ideas from "../Screens/ideaList";

const Web = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <div className="App">
        <Routes>
          <Route exact={true} element={<ProtectedRoutes />}>
            <Route key={"/dashboard"} path="/dashboard" exact={true} element={<Dashboard />} />
            <Route key={"/post-idea"} path="/post-idea" exact={true} element={<PostIdea />} />
            <Route key={"/ideas"} path="/ideas" exact={true} element={<Ideas />} />
          </Route>

          <Route path={"/"} exact={true} element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Web;
