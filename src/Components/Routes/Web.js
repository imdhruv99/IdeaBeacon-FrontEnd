import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../Screens/login/index.js";
import Navbar from "../Common/Navbar/index.js";
import Footer from "../Common/Footer/index.js";
// Removed ProtectedRoutes
import Dashboard from "../Screens/dashboard/index.js";
import PostIdea from "../Screens/postIdea/index.js";
import UpdateIdea from "../Screens/updateIdea/index.js";
import Ideas from "../Screens/ideaList/index.js";
import IdeaDetail from "../Screens/ideaDetail/index.js";
import MyIdeaPage from "../Screens/myIdeaList/index.js";
import About from "../Screens/about/index.js";
import NotFound from "../Screens/notFound/index.js";
import Loader from "../Common/Loader/index.js";
import { setAccessToken, setIsLoggedIn } from "../Redux/slice/auth-slice.js";
import UserGuide from "../Screens/userGuide/index.js";
import Admin from "../Screens/admin/index.js";

// Optional: Make AdminRoute a pass-through
import AdminRoute from "./AdminRoute";

const Web = () => {
    const dispatch = useDispatch();
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
            <Navbar /> {/* Always render */}
            <div className="App">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/post-idea" element={<PostIdea />} />
                    <Route path="/update-idea" element={<UpdateIdea />} />
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/my-ideas" element={<MyIdeaPage />} />
                    {/* <Route path="/about" element={<About />} /> */}
                    {/* <Route path="/user-guide" element={<UserGuide />} /> */}
                    <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
                    <Route path="/idea-details/:titleSlug" element={<IdeaDetail />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </div>
            <Footer />
            {isLoading && <Loader />}
        </div>
    );
};

export default Web;
