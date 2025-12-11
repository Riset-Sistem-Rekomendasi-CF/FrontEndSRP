const VidioSection = () => {
  return (
    <div className="min-h-screen bg-blue-100 py-8 bg-box-grid-pattern animate-grid z-0 dark:bg-blue-400">
      <div className="p-8 font-poppins max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-5">
          <a
            href="https://s.id/GuideBookWebsiteKoalaERS"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-2 bg-blue-home text-center rounded-full shadow-sm border-2 border-black text-white font-semibold text-md hover:bg-blue-200"
          >
            Guide Book Website KoalaERS
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">
          Video Tutorial Website KoalaERS
        </h1>
        <p className="text-lg font-semibold text-md mb-4 text-center">
          Tutorial kali ini membahas terkait langkah-langkah perhitungan
          prediksi Collaborative Filtering dengan berbagai fungsi similaritas
          yang bisa digunakan.
        </p>

        {/* Video Container with Background */}
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          {/* Responsive Aspect Ratio for YouTube Video */}
          <div className="relative pb-[56.25%] mb-4">
            {" "}
            {/* 16:9 Aspect Ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/W8V6u9x2Eg0?si=Wex-1qGJLXLgK8iJ"
              title="Video Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Title/Info */}
          <div className="p-4 bg-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.75 18.75H5.25m9.5 0V9.25m0 9.5V18.75"
                />
              </svg>
              <span className="ml-2 font-medium text-gray-800">
                Vidio Tutorial Sistem Rekomendasi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidioSection;
