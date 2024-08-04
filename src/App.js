import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./Components/Common/Navbar";
import LandingPage from "./Components/Screens/LandingPage";
import PostIdeaPage from "./Components/Screens/PostIdeaPage";
import Footer from "./Components/Common/Footer";
import Dashboard from "./Components/Screens/Dashboard";
import IdeasPage from "./Components/Screens/IdeasPage";
import { store } from "./Components/Redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-idea" element={<PostIdeaPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
