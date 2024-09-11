import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../Screens/login/index.js";

import Navbar from "../Common/Navbar/index.js";
import Footer from "../Common/Footer/index.js";
import ProtectedRoutes from "./ProtectedRoutes.js";
import Dashboard from "../Screens/dashboard/index.js";
import PostIdea from "../Screens/postIdea/index.js";
import UpdateIdea from "../Screens/updateIdea/index.js";
import Ideas from "../Screens/ideaList/index.js";
import IdeaDetail from "../Screens/ideaDetail/index.js";
import MyIdeaPage from "../Screens/myIdeaList/index.js";
import About from "../Screens/about/index.js";
import Loader from "../Common/Loader/index.js";
import { setAccessToken, setIsLoggedIn } from "../Redux/slice/auth-slice.js";
import NotFound from "../Screens/notFound/index.js";

const Web = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.idea);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedIsLoggedIn && storedAccessToken) {
      dispatch(setIsLoggedIn(true));
      dispatch(setAccessToken(storedAccessToken));
    }
  }, [dispatch]);

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <div className="App">
        <Routes>
          <Route exact={true} element={<ProtectedRoutes />}>
            <Route key={"/dashboard"} path="/dashboard" exact={true} element={<Dashboard />} />
            <Route key={"/post-idea"} path="/post-idea" exact={true} element={<PostIdea />} />
            <Route key={"/update-idea"} path="/update-idea" exact={true} element={<UpdateIdea />} />
            <Route key={"/ideas"} path="/ideas" exact={true} element={<Ideas />} />
            <Route key={"/my-ideas"} path="/my-ideas" exact={true} element={<MyIdeaPage />} />
            <Route key={"/about"} path="/about" exact={true} element={<About />} />
            <Route
              key={"/idea-details/:titleSlug"}
              path="/idea-details/:titleSlug"
              exact={true}
              element={<IdeaDetail />}
            />
          </Route>
          <Route path={"/"} exact={true} element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />

      {isLoading && <Loader />}
    </div>
  );
};

export default Web;
