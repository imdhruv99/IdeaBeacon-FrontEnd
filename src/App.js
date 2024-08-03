import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import LandingPage from './Components/Screens/LandingPage';
import PostIdeaPage from './Components/Screens/PostIdeaPage';
import Footer from './Components/Common/Footer';
import Dashboard from './Components/Screens/Dashboard';
import IdeasPage from './Components/Screens/IdeasPage';

function App() {
    return (
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
    );
}

export default App;
