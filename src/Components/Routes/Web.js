import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "../Screens/login/index.js";

import Navbar from "../Common/Navbar/index.js";
import Footer from "../Common/Footer/index.js";
import ProtectedRoutes from "./ProtectedRoutes.js";
import Dashboard from "../Screens/dashboard/index.js";
import PostIdea from "../Screens/postIdea/index.js";
import Ideas from "../Screens/ideaList/index.js";
import IdeaDetail from "../Screens/ideaDetail/index.js";
import MyIdeaPage from "../Screens/myIdeaList/index.js";

const Web = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <div className="App" style={{ padding: "5rem 2rem 5rem 2rem" }}>
        <Routes>
          <Route exact={true} element={<ProtectedRoutes />}>
            <Route key={"/dashboard"} path="/dashboard" exact={true} element={<Dashboard />} />
            <Route key={"/post-idea"} path="/post-idea" exact={true} element={<PostIdea />} />
            <Route key={"/update-idea"} path="/update-idea" exact={true} element={<PostIdea />} />
            <Route key={"/ideas"} path="/ideas" exact={true} element={<Ideas />} />
            <Route key={"/my-ideas"} path="/my-ideas" exact={true} element={<MyIdeaPage />} />
            <Route key={"/idea-details/:id"} path="/idea-details/:id" exact={true} element={<IdeaDetail />} />
          </Route>

          <Route path={"/"} exact={true} element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Web;
