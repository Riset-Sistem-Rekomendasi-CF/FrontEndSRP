import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ItemBasedSvg from "../../../assets/images/7.png";
import UserBasedSvg from "../../../assets/images/6.png";
import pearson from "../../../assets/images/people.png";
import sinus from "../../../assets/images/sinus.png";
import probs from "../../../assets/images/probability.png";
import social from "../../../assets/images/social-distancing.png";

const CardWelcome = ({ heading, detail, image, bgColor }) => {
  // Fungsi untuk scroll ke section tertentu
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Fungsi untuk membuka modal dengan konten yang sesuai
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div className="min-w-full min-h-screen mx-auto items-center p-5 ">
      <div
        className={`font-poppins max-w-5xl mx-auto p-6 ${bgColor} border-2 border-black rounded-[3rem] flex flex-col md:flex-row bg-box-grid-pattern animate-grid z-0`}
      >
        {/* Left - Image Section */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 md:mr-6">
          <img
            src={image}
            alt="Card Image"
            className="w-full h-auto object-cover rounded-lg shadow-md hidden md:block" // Gambar disembunyikan pada mobile, muncul di layar medium ke atas
          />
        </div>

        {/* Right - Text Section */}
        <div className="md:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {heading}
          </h2>
          <p className="text-white text-base sm:text-lg text-justify">
            {detail}
          </p>

          {/* Button below the paragraph */}
          <button
            onClick={() => scrollToSection("cardSteps")}
            className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          >
            Mulai Sekarang
            <ArrowForwardIcon className="ml-2 text-lg" />
          </button>
        </div>
      </div>

      {/* open modal click */}

      {/* Method and Similarity Cards */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 mt-12 font-poppins">
        <div className="bg-yellow-primary rounded-lg p-6 w-full md:w-1/2 border-2 border-black ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Metode Prediksi
          </h3>
          <p className="text-black font-medium text-md mb-4">
            Metode prediksi yang bisa digunakan dalam Collaborative Filtering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div
              className="bg-white rounded-lg p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300"
              onClick={() => openModal("User-Based Collaborative Filtering")}
            >
              <div className="text-4xl text-blue-500 mb-4">👤</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                User-Based
              </h4>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white rounded-lg p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300"
              onClick={() => openModal("Item-Based Collaborative Filtering")}
            >
              <div className="text-4xl text-green-500 mb-4">📚</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Item-Based
              </h4>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="py-5 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg m-5 p-8 max-w-2xl w-full relative max-h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
              {/* Tombol Close */}
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                <CloseIcon className="w-6 h-6" />
              </button>
              <p className="text-black font-medium text-md">
                {modalContent === "User-Based Collaborative Filtering" ? (
                  <>
                    <ContentUserBasedCF />
                  </>
                ) : (
                  <>
                    <ContentItemBasedCF />
                  </>
                )}
              </p>
              <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Second Card - Fungsi Similaritas */}
        <div className="bg-card_purple_secondary rounded-lg p-4 sm:p-6 w-full md:w-1/2 border-2 border-black">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Fungsi Similaritas
          </h3>
          <p className="text-black font-medium text-md mb-4">
            Fungsi Similaritas yang bisa digunakan dalam perhitungan prediksi
            pada Collaborative Filtering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <a href="/pccDetail">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300">
                <div className="text-4xl text-blue-500 mb-4">
                  <img src={pearson} alt="pearson" className="w-20 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  PCC
                </h4>
              </div>
            </a>

            {/* Card 2 */}
            <a href="/cosineDetail">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300">
                <div className="text-4xl text-green-500 mb-4">
                  <img src={sinus} alt="cosine" className="w-20 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Cosine
                </h4>
              </div>
            </a>

            {/* Card 3 */}
            <a href="/acosDetail">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300">
                <div className="text-4xl text-green-500 mb-4">
                  <img src={social} alt="acos" className="w-20 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  ACos
                </h4>
              </div>
            </a>

            {/* Card 4 */}
            <a href="/bcDetail">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md text-center border-2 cursor-pointer border-black hover:bg-blue-100 transition duration-300">
                <div className="text-4xl text-green-500 mb-4">
                  <img src={probs} alt="bc" className="w-20 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">BC</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


const ContentUserBasedCF = () => {
  return (
    <div className=" mx-auto ">
      <div className=" mx-auto flex flex-col md:flex-row gap-6">
        {/* Left - Text Section */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Apa Itu User-Based Collaborative Filtering ?
          </h2>
          <p className="text-gray-800 text-lg text-justify">
            User-Based Collaborative Filtering adalah metode prediksi yang
            dilakukan dengan mempertimbangkan preferensi pengguna yang mirip.
            Metode ini bekerja dengan cara mencari pengguna lain yang memiliki
            preferensi yang mirip dengan pengguna yang sedang dihitung
            prediksinya. Kemudian, prediksi dilakukan dengan mengambil rata-rata
            preferensi pengguna lain tersebut.
          </p>
        </div>

        {/* Right - Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
          <img
            src={UserBasedSvg}
            alt="User-Based CF Image"
            className="w-full h-auto object-cover rounded-lg shadow-md hidden md:block "
          />
          <a href={UserBasedSvg} target="_blank">
            <p className="p-2 bg-yellow-primary rounded-md mt-5 text-center shadow-sm hover:bg-yellow-400 cursor-pointer">
              Lihat Lebih Detail
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

const ContentItemBasedCF = () => {
  return (
    <div className=" mx-auto ">
      <div className=" mx-auto flex flex-col md:flex-row gap-6">
        {/* Left - Text Section */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Apa Itu Item-Based Collaborative Filtering ?
          </h2>
          <p className="text-gray-800 text-lg text-justify">
            Item-Based Collaborative Filtering adalah metode prediksi yang
            dilakukan dengan mempertimbangkan kesamaan antar item. Metode ini
            bekerja dengan cara mencari item lain yang memiliki kesamaan dengan
            item yang sedang dihitung prediksinya. Kemudian, prediksi dilakukan
            dengan mengambil rata-rata preferensi item lain tersebut.
          </p>
        </div>

        {/* Right - Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
          <img
            src={ItemBasedSvg}
            alt="Item-Based CF Image"
            className="w-full h-auto object-cover rounded-lg shadow-md hidden md:block"
          />
          <a href={ItemBasedSvg} target="_blank">
            <p className="p-2 bg-yellow-primary rounded-md mt-2 text-center shadow-sm hover:bg-yellow-400 cursor-pointer">
              Lihat Lebih Detail
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardWelcome;