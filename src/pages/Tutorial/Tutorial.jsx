import React, { useCallback, useEffect, useState } from "react";
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
      <div>
        <Helmet>
          <title>KoalaERS | Tutorial Fungsi Similaritas</title>
          <meta
            name="description"
            content="Pelajari cara menghitung fungsi similaritas pada sistem rekomendasi berbasis collaborative filtering. Tutorial interaktif dan mudah dipahami."
          />
          <meta
            name="keywords"
            content="KoalaERS, tutorial, sistem rekomendasi, fungsi similaritas, collaborative filtering, mean rating, cosine, PCC"
          />
          <meta name="author" content="KoalaERS Team" />
          <meta
            property="og:title"
            content="KoalaERS | Tutorial Fungsi Similaritas"
          />
          <meta
            property="og:description"
            content="Tutorial interaktif untuk memahami metode perhitungan sistem rekomendasi."
          />
          <meta property="og:image" content="%PUBLIC_URL%/Frame%201.png" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://koalaers.trunojoyoan.com/tutorial"
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
          <CardWellcome
            heading={"Tutorial Fungsi Similaritas"}
            bgColor={"bg-blue-home"}
            detail="Pada Page Tutorial ini pengguna akan diberikan tutorial tentang
              perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga
              pengguna paham tentang perhitungan Metode Prediksi Collaborative Filterin dengan
              berbagai fungsi similaritas yang berbeda"
            image={KoalaPage}
          />

          <VidioSection id="vidio_ratingTutorial" />

          <section id="cardSteps" className="max-w-6xl mx-auto p-4 text-center">
            <CardsSteps />
          </section>

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
          <section
            id="notasi_ratingTutorial"
            className="max-w-4xl mx-auto text-center py-5"
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
          <FormLayoutTutorial id="metode_ratingTutorial" data={form} />

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
