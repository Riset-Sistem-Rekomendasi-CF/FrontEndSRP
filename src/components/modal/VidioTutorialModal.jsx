import React from "react";
import GifTut from "../../assets/vidioAsset/tutorialGif.gif";
import InfoIcon from "@mui/icons-material/Info";

import Img3 from "../../assets/images/img3.png";
import Img4 from "../../assets/images/img4.png";

const VideoTutorialModal = ({ id }) => {
  return (
    <>
      <section id={id} className="max-w-6xl mx-auto text-center py-10">
        {/* Title with images around it */}
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold z-20">
            Video Tutorial
          </h1>

          {/* Gambar pertama, hanya tampil di layar sm dan lebih besar */}
          {/* <img
            src={Img4} // Ganti dengan gambar pertama
            alt="Decorative Image"
            className="absolute top-10 -left-10 w-[60px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[60px] sm:h-[120px] md:h-[150px] lg:h-[200px] object-cover opacity-100 z-10 hidden sm:block"
          /> */}

          {/* Gambar kedua, hanya tampil di layar sm dan lebih besar */}
          {/* <img
            src={Img3} // Ganti dengan gambar kedua
            alt="Decorative Image"
            className="absolute bottom-0 right-0 w-[60px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[60px] sm:h-[120px] md:h-[150px] lg:h-[200px] object-cover opacity-100 z-10 hidden sm:block"
          /> */}
        </div>

        <h2 className="mt-4 text-lg sm:text-2xl font-semibold text-bold">
          <InfoIcon className="mr-2 text-blue-500" />
          Tekan pada setiap cell yang memiliki nilai untuk melihat detail
          perhitungan!
        </h2>

        {/* Card container */}

        <div className="relative inline-block mt-8 shadow-lg rounded-lg overflow-hidden">
          <div className="w-full sm:w-[800px] h-[300px] sm:h-[500px] bg-white p-3 flex items-center justify-center relative">
            {/* Embed YouTube Video */}
            <iframe
              width="100%" // Lebar 100% agar responsif
              height="100%" // Tinggi 100% agar responsif
              src="https://www.youtube.com/embed/xdce_71axzg?si=XJPXAQ9NcPf8XDVg" // Ganti dengan ID video YouTube yang sesuai
              title="Video Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoTutorialModal;
