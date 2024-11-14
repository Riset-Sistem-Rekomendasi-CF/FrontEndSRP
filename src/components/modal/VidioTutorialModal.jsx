import React from 'react';
import GifTut from '../../assets/vidioAsset/vidioTUT.gif'
import InfoIcon from '@mui/icons-material/Info';

const VideoTutorialModal = () => {
    return (
        <>
            <section className="max-w-6xl mx-auto text-center py-10">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-poppins font-bold">
                    Video Tutorial
                </h1>
                <h2 className="mt-4 text-lg sm:text-2xl font-semibold text-bold">
                    <InfoIcon className="mr-2 text-blue-500" />
                    Tekan pada setiap sel yang memiliki nilai untuk melihat detail perhitungan!
                </h2>

                {/* Card container */}
                <div className="relative inline-block mt-8 shadow-lg rounded-lg overflow-hidden">
                    {/* Responsively scale the card container */}
                    <div className="w-full sm:w-[800px] h-[300px] sm:h-[500px] bg-white p-3 flex items-center justify-center">
                        <img
                            src={GifTut}
                            alt="Video Tutorial Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default VideoTutorialModal;


