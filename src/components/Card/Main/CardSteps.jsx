import { FaArrowRight } from "react-icons/fa"; // 

function CardSteps({ heading, description, icon, sectionId }) {
  // Fungsi untuk melakukan scroll ke section tertentu
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl shadow-lg p-6 m-4 sm:max-w-xs md:max-w-sm lg:max-w-md w-full flex flex-col justify-between h-full">
      <div className="flex items-center mb-4">
        <div className="text-3xl text-blue-500 mr-4">{icon}</div>
        <h2 className="text-lg text-start sm:text-xl lg:text-2xl font-semibold text-gray-900">
          {heading}
        </h2>
      </div>
      <p className="text-sm text-justify sm:text-base lg:text-lg text-gray-600 mb-4 flex-grow">
        {description}
      </p>

      {/* Button dengan Icon */}
      <button
        onClick={() => scrollToSection(sectionId)} // Menyediakan sectionId yang akan dipindahkan
        className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        <span className="mr-2 ">Lihat Detail</span>
        <FaArrowRight className="text-lg" />
      </button>
    </div>
  );
}

export default CardSteps;
