import { useCallback, useEffect, useState } from "react";
import TabelView from "../../components/table/TabelView.jsx";
import * as emoji from "../../helper/generateEmot";

import {
  DropdownMethodBased,
  DropdownSimilarityMeasure,
} from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import BodyTutorial from "../Layout/Tutorial/BodyTutorial.jsx";
import FormLayoutTutorial from "../Layout/Tutorial/FormTutorial.jsx";
import NotationCard from "../../components/table/NotaionCard.jsx";
import Chip from "@mui/material/Chip";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Star, ShowChart, People, Lightbulb } from "@mui/icons-material";

// import Navbar from "../../components/Navigate/NavBar.jsx";
import KoalaPage from "../../assets/icons/KoalaPage.png";
import CardWellcome from "../../components/Card/Home/CardWellcome.jsx";
import ListNavigasiMenu from "../../components/Navigate/ListNavigasiMenu.jsx";
import CardsSteps from "../../components/Card/Home/CardSteps.jsx";
import VidioSection from "../../components/modal/VidioSection.jsx";
import Toast from "../../components/Toggle/Toast.jsx";
import Navbar from "../../components/Navigate/Navbar/Navbar.jsx";
import { ModalTutorialYoutube } from "../../components/modal/ModalTutorialYoutube.jsx";
import { useExplanationModal } from "../../components/hooks/useExplanationModal.jsx";
import { Helmet } from "react-helmet";
// import Cookies from "js-cookie";

const Tutorial = () => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [funnyMode, setFunnyMode] = useState(false);

  // show toast
  useEffect(() => {
    setToastMessage("Selamat Datang di Halaman Tutorial Fungsi Similaritas");
    setToastType("success");
    setShowToast(true);
  }, []);

  // Hide toast
  const handleCloseToast = () => {
    setShowToast(false);
  };

  // Toggle funny mode
  const changeFunny = () => {
    setFunnyMode(!funnyMode);
  };

  // definisikan handleTurnDescription
  const handleTurnDescription = useCallback((value) => {
    setDescriptionVisible(value);
  }, []);

  // 2. Baru pakai di useCallback yang lain
  const handleMethodChange = useCallback(
    (method) => {
      setSelectedMethod(method);
      handleTurnDescription(false);
    },
    [handleTurnDescription]
  );

  const handleSimilarityChange = useCallback(
    (similarity) => {
      setSelectedSimilarity(similarity);
      handleTurnDescription(false);
    },
    [handleTurnDescription]
  );

  // panggi hook
  const {
    showModal,
    dontShowAgain,
    setShowModal,
    toggleExplanation,
    handleContinue,
    handleCheckboxChange,
  } = useExplanationModal("hideExplanationModal_Tutorial");

  const form = [
    {
      header: "Pilih Metode Prediksi",
      element: (
        <DropdownMethodBased
          onChange={handleMethodChange}
          turnDescription={handleTurnDescription}
        />
      ),
    },
    {
      header: "Pilih Fungsi Similaritas",
      element: (
        <DropdownSimilarityMeasure
          onChange={handleSimilarityChange}
          turnDescription={handleTurnDescription}
        />
      ),
    },
  ];

  const [data] = useState([
    [5, 0, 4, 3, 5, 4],
    [4, 5, 0, 3, 2, 3],
    [0, 3, 0, 2, 1, 0],
    [1, 2, 2, 0, 3, 4],
    [1, 0, 1, 2, 3, 3],
  ]);

  const header = emoji.GEmot(5, "item");
  const column = emoji.GEmot(5, "user");

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSimilarity, setSelectedSimilarity] = useState("");

  const scrollToSection = (sectionId) => {
    // Mencari elemen berdasarkan ID dan melakukan scroll halus
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const TeksHeader = (
    <span>
      <h1>
        {" "}
        <span className="curved-underline">
          Data Rating Yang Digunakan
          <svg viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0 20 Q 50 0, 100 20"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </span>
      </h1>
    </span>
  );
  const Tekssubheader = (
    <span>
      Data Rating yaitu suatu kumpulan data yang telah diberikan Rating pada
      item tertentu oleh user.
    </span>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
        <Helmet>
          <title>
            Tutorial Fungsi Similaritas Sistem Rekomendasi - PCC, Cosine,
            Adjusted Cosine, BC | KoalaERS
          </title>
          <meta
            name="title"
            content="Tutorial Fungsi Similaritas Sistem Rekomendasi - PCC, Cosine, Adjusted Cosine, BC | KoalaERS"
          />
          <meta
            name="description"
            content="Tutorial lengkap cara menghitung fungsi similaritas pada sistem rekomendasi: Pearson Correlation Coefficient (PCC), Cosine Similarity, Adjusted Cosine, dan Bhattacharyya Coefficient. Dengan contoh perhitungan step-by-step dan visualisasi interaktif."
          />
          <meta
            name="keywords"
            content="tutorial fungsi similaritas, cara menghitung PCC, rumus cosine similarity, adjusted cosine tutorial, bhattacharyya coefficient, mean rating, mean centered, prediksi rating, collaborative filtering tutorial, sistem rekomendasi tutorial, KoalaERS"
          />
          <meta
            name="author"
            content="KoalaERS Team - Universitas Trunojoyo Madura"
          />
          <meta name="robots" content="index, follow" />
          <link
            rel="canonical"
            href="https://koalaers.trunojoyo.ac.id/tutorial"
          />

          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content="https://koalaers.trunojoyo.ac.id/tutorial"
          />
          <meta
            property="og:title"
            content="Tutorial Fungsi Similaritas Sistem Rekomendasi | KoalaERS"
          />
          <meta
            property="og:description"
            content="Tutorial lengkap cara menghitung fungsi similaritas: PCC, Cosine, Adjusted Cosine, dan BC dengan contoh perhitungan step-by-step."
          />
          <meta
            property="og:image"
            content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
          />
          <meta property="og:locale" content="id_ID" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Tutorial Fungsi Similaritas Sistem Rekomendasi | KoalaERS"
          />
          <meta
            name="twitter:description"
            content="Tutorial lengkap cara menghitung fungsi similaritas pada sistem rekomendasi collaborative filtering."
          />
          <meta
            name="twitter:image"
            content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
          />
        </Helmet>
        <Navbar />
        <div className="">
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={handleCloseToast}
            />
          )}

          <ListNavigasiMenu menuVersion={1} scrollToSection={scrollToSection} />
          <div data-aos="fade-down">
            <CardWellcome
              heading={"Tutorial Fungsi Similaritas"}
              bgColor={"bg-blue-home"}
              detail="Pada Page Tutorial ini pengguna akan diberikan tutorial tentang
                perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga
                pengguna paham tentang perhitungan Metode Prediksi Collaborative Filterin dengan
                berbagai fungsi similaritas yang berbeda"
              image={KoalaPage}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <VidioSection id="vidio_ratingTutorial" />
          </div>

          <section
            id="cardSteps"
            className="max-w-6xl mx-auto p-4 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CardsSteps />
          </section>

          <div data-aos="fade-up" data-aos-delay="300">
            <BodyTutorial
              header={TeksHeader}
              subheader={Tekssubheader}
              id="data_ratingTutorial"
            >
              <TabelView
                changeFunny={changeFunny}
                headers={funnyMode ? header : ["1", "2", "3", "4", "5", "6"]}
                columns={funnyMode ? column : ["1", "2", "3", "4", "5"]}
              />
            </BodyTutorial>
          </div>
          <section
            id="notasi_ratingTutorial"
            className="max-w-4xl mx-auto text-center py-5"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-poppins   ">
              <span className="curved-underline">
                Notasi dan Penjelasan Data Rating
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M0 20 Q 50 0, 100 20"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
          </section>
          <div data-aos="fade-up" data-aos-delay="500">
            <FormLayoutTutorial id="metode_ratingTutorial" data={form} />
          </div>

          <section className="max-w-full mx-auto text-center my-10  pt-10 relative">
            <button
              onClick={() =>
                toggleExplanation(isDescriptionVisible, setDescriptionVisible)
              }
              className="max-w-6xl sm:w-auto font-semibold font-poppins bg-blue-home border-2 border-black text-center text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center mx-auto"
            >
              Cek Hasil Perhitungan
              {isDescriptionVisible ? (
                <ExpandLessIcon className="ml-2 text-lg" />
              ) : (
                <ExpandMoreIcon className="ml-2 text-lg" />
              )}
            </button>

            {showModal && (
              <ModalTutorialYoutube
                dontShowAgain={dontShowAgain}
                handleCheckboxChange={handleCheckboxChange}
                handleContinue={() => handleContinue(setDescriptionVisible)}
                onClose={() => setShowModal(false)}
              />
            )}

            {isDescriptionVisible && (
              <div className="mt-8">
                <section className="max-w-6xl mx-auto text-center py-10">
                  <h1
                    id="topMenuSim"
                    className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins py-5 sm:py-6 md:py-8 lg:py-10"
                  >
                    Hasil dan Pembahasan :
                  </h1>

                  {/* Flex container for chips */}
                  <div className="p-5 flex flex-wrap justify-center gap-2 font-poppins">
                    <h1 className="text-lg justify-center font-semibold underline underline-offset-4 decoration-3 decoration-card_blue_primary">
                      Daftar Isi :{" "}
                    </h1>
                    {/* Chip components */}
                    <Chip
                      label="Mean Rating"
                      icon={<Star />}
                      onClick={() => scrollToSection("mean-rating-section")}
                      color="success"
                      variant="outlined"
                      clickable
                      className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                    />
                    <Chip
                      label="Mean-Centered"
                      icon={<ShowChart />}
                      onClick={() => scrollToSection("mean-cen-section")}
                      color="primary"
                      variant="outlined"
                      clickable
                      className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                    />
                    <Chip
                      label="Similaritas"
                      icon={<People />}
                      onClick={() => scrollToSection("sim-section")}
                      color="warning"
                      variant="outlined"
                      clickable
                      className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                    />
                    <Chip
                      label="Prediksi"
                      icon={<Lightbulb />}
                      onClick={() => scrollToSection("pred-section")}
                      color="success"
                      variant="outlined"
                      clickable
                      className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                    />
                    <Chip
                      label="Top-N"
                      icon={<AssignmentTurnedInIcon />}
                      onClick={() => scrollToSection("topN-section")}
                      color="secondary"
                      variant="outlined"
                      clickable
                      className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
                    />
                  </div>
                  {/* Display the details */}
                  <div className="mt-8">
                    <DetailPageBox
                      method={selectedMethod}
                      similarity={selectedSimilarity}
                      data={data}
                      headers={header}
                      columns={column}
                      funnyMode={funnyMode}
                    />
                  </div>
                </section>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
