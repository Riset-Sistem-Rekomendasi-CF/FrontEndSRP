
import React, { useState, useEffect } from 'react';
import {
    ArrowUpward,
    Lightbulb,
    People, ShowChart,
    Star,
} from '@mui/icons-material'; // Updated icons
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const BackToTopButtonHome = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Scroll event listener to toggle button visibility
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true); // Show button when scrolling 300px down
            } else {
                setIsVisible(false); // Hide button when at the top
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll effect
        });
    };

    return (
        // Only render the button if it's visible
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-10 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Back to top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7-7-7 7M12 3v18"
                    />
                </svg>
            </button>
        )
    );
};




const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const scrollToSection = (sectionId) => {
        // Mencari elemen berdasarkan ID dan melakukan scroll halus
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        isVisible && (
            <div className="fixed bottom-10 right-10 flex flex-col items-center space-y-3">
                {/* Menu Options */}
                {isMenuOpen && (
                    <div className="flex flex-col items-center space-y-4">
                        {/* Option - Back to Top */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('topMenuSim')}
                                className="p-2 rounded-full bg-white text-blue-500 shadow-md hover:bg-white"
                                title="Back to Top"
                            >
                                <ArrowUpward />
                            </IconButton>
                        </div>

                        {/* Option - Home */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('mean-rating-section')}
                                className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200"
                                title="Home"
                            >
                                <Star/>
                            </IconButton>
                        </div>

                        {/* Option - Mean-Centered */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('mean-cen-section')}
                                className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200"
                                title="Mean-Centered"
                            >
                                <ShowChart/>
                            </IconButton>
                        </div>

                        {/* Option - Sim */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('sim-section')}
                                className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200"
                                title="Similaritas"
                            >
                                <People/>
                            </IconButton>
                        </div>
                        {/* Option - Prediksi */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('pred-section')}
                                className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200"
                                title="Prediksi"
                            >
                                <Lightbulb/>
                            </IconButton>
                        </div>

                        {/* Option - Top-N */}
                        <div className="relative flex items-center">
                            <IconButton
                                onClick={() => scrollToSection('topN-section')}
                                className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200"
                                title="Top-N"
                            >
                                <AssignmentTurnedInIcon/>
                            </IconButton>
                        </div>
                    </div>
                )}

                {/* Toggle Button to Open/Close Menu */}
                <button
                    onClick={toggleMenu}
                    className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none"
                    title="Open Menu"
                >
                    <KeyboardArrowUpIcon className="w-6 h-6" />
                </button>
            </div>
        )
    );
};

export default BackToTopButton;
