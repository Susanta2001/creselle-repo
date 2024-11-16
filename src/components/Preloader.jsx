// Preloader.js
import React from 'react';
import loadingGif from '../assets/loader gif.gif'
import preloaderGif from '../assets/preloader gif.gif'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="spinner"></div>
            <img src={loadingGif} alt="Loading..." className="loader-gif" />
            <img src={preloaderGif} alt="Loading..." className="preloader-gif" />
        </div>
    );
};

export default Preloader;
