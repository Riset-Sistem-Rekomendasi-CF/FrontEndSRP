import React from 'react';
import GifTut from '../../assets/vidioAsset/tutorialGif.gif'
import InfoIcon from '@mui/icons-material/Info';

import Img3 from '../../assets/images/img3.png';
import Img4 from '../../assets/images/img4.png';

const VideoTutorialModal = () => {
    return (
        <>
            <section className="max-w-6xl mx-auto text-center py-10">
                {/* Title with images around it */}
                <div className="relative">
                    <h1 className="text-3xl sm:text-4xl font-poppins font-bold z-20">
                        Video Tutorial
                    </h1>
                    <img
                        src={Img4}  // Ganti dengan gambar pertama
                        alt="Decorative Image"
                        className="absolute top-10 -left-10 w-[80px] sm:w-[150px] h-[80px] sm:h-[150px] object-cover opacity-100 z-10"
                    />
                    <img
                        src={Img3}  // Ganti dengan gambar kedua
                        alt="Decorative Image"
                        className="absolute bottom-0 right-0 w-[80px] sm:w-[150px] h-[80px] sm:h-[150px] object-cover opacity-100 z-10"
                    />
                </div>

                <h2 className="mt-4 text-lg sm:text-2xl font-semibold text-bold">
                    <InfoIcon className="mr-2 text-blue-500" />
                    Tekan pada setiap cell yang memiliki nilai untuk melihat detail perhitungan!
                </h2>

                {/* Card container */}
                <div className="relative inline-block mt-8 shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full sm:w-[800px] h-[300px] sm:h-[500px] bg-white p-3 flex items-center justify-center relative">
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


