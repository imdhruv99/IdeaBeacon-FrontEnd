import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import LandingPage from './Components/Screens/LandingPage';
import PostIdeaPage from './Components/Screens/PostIdeaPage';
import Footer from './Components/Common/Footer';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/post-idea" element={<PostIdeaPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
