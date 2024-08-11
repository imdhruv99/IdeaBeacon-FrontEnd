import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import "./Loader.css";
import loader from '../../../Assets/loader/loader.json';

const Loader = () => {
    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: document.querySelector('#animationWindow'),
            animationData: loader,
            loop: true,
            autoplay: true,
        });

        anim.setSpeed(3.24);

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div className="loader-container">
            <div id="animationWindow"></div>
        </div>
    );
};

export default Loader;
