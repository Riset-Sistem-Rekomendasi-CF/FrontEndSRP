import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CardWellcome = ({ heading, detail, image, bgColor }) => {
  const scrollToSection = (sectionId) => {
    // Mencari elemen berdasarkan ID dan melakukan scroll halus
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-w-full min-h-screen mx-auto items-center p-5">
      <div
        className={`font-poppins max-w-5xl mx-auto p-6 ${bgColor} border-2 border-black rounded-[3rem] flex flex-col md:flex-row bg-box-grid-pattern animate-grid z-0`}
      >
        {/* Left - Text Section */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-4">{heading}</h2>
          <p className="text-white text-lg text-justify">{detail}</p>

          {/* Button below the paragraph */}
          <button
            onClick={() => scrollToSection("cardSteps")}
            className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          >
            Get Started
            <ArrowForwardIcon className="ml-2 text-lg" />
          </button>
        </div>

        {/* Right - Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
          <img
            src={image}
            alt="Card Image"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Method and Similarity Cards */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 mt-12 font-poppins">
        {/* First Card - Metode Sistem Rekomendasi */}
        <div className="bg-yellow-primary rounded-lg p-6 w-full md:w-1/2 border-2 border-black ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Metode Sistem Rekomendasi
          </h3>
          <p className="text-black font-medium text-md mb-4">
            Metode yang bisa digunakan dalam sistem rekomendasi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-blue-500 mb-4">👤</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                User-Based
              </h4>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-green-500 mb-4">📚</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Item-Based
              </h4>
            </div>
          </div>
        </div>

        {/* Second Card - Fungsi Similaritas */}
        <div className="bg-card_purple_secondary rounded-lg p-6 w-full md:w-1/2 border-2 border-black">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Fungsi Similaritas
          </h3>
          <p className="text-black font-medium text-md mb-4">
            Fungsi Similartias yang bisa digunakan dalam perhitungan sistem
            rekomendasi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-blue-500 mb-4">👤</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">PCC</h4>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-green-500 mb-4">🔍</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Cosine
              </h4>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-green-500 mb-4">🎠</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">ACos</h4>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center border-2 border-black">
              <div className="text-4xl text-green-500 mb-4">📚</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">BC</h4>
            </div>
          </div>

          {/* <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition mt-6">
            Learn More
            <KeyboardArrowRightIcon className="ml-2 text-lg" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CardWellcome;
