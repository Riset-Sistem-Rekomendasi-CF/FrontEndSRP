import React, { useState, useEffect } from "react";

import {
  DropdownMethodBased,
  DropdownSimilarityMeasure,
} from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navigator from "../../components/Navigate/Navigator";
import NotationCard from "../../components/table/NotaionCard.jsx";

import FormMeasure from "../../components/Form/FormMeasure";
import VidioTutorialModal from "../../components/modal/VidioTutorialModal";
import {
  Build,
  Lightbulb,
  People,
  RateReview,
  ShowChart,
  Star,
} from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BodyTutorial from "../Layout/Tutorial/BodyTutorial";
// import Navbar from "../../components/Navigate/NavBar.jsx";
import KoalaPage from "../../assets/icons/KoalaPage.png";
import CardWellcome from "../../components/Card/Home/CardWellcome.jsx";
import ListNavigasiMenu from "../../components/Navigate/ListNavigasiMenu.jsx";
import CardsSteps from "../../components/Card/Home/CardSteps.jsx";
import VidioSection from "../../components/modal/VidioSection.jsx";
import Toast from "../../components/Toggle/Toast.jsx";
import * as Emoji from "../../helper/generateEmot.js";
import { transposeMatrix } from "../../helper/helper.js";
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import Navbar from "../../components/Navigate/Navbar/Navbar.jsx";
// import Cookies from "js-cookie";

function Eksplorasi() {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [funnyMode, setFunnyMode] = useState(false);

  // show toast
  useEffect(() => {
    setToastMessage("Selamat Datang di Halaman Eksplorasi Fungsi Similaritas");
    setToastType("success");
    setShowToast(true);
  }, []);

  // Toggle funny mode
  const changeFunny = () => {
    setFunnyMode(!funnyMode);
  };

  // Hide toast
  const handleCloseToast = () => {
    setShowToast(false);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSimilarity, setSelectedSimilarity] = useState("");
  const [data, setData] = useState([]);

  const headers =
    data.length > 0
      ? Emoji.GEmot(transposeMatrix(data).length + 1, "item")
      : null;
  const columns = data.length > 0 ? Emoji.GEmot(data.length + 1, "user") : null;

  // console.log(data.length, data, headers);
  // console.log(data.length, data, columns);
  // console.log(funnyMode);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setDescriptionVisible(false);
  };

  const handleTurnDescription = (condition) => {
    setDescriptionVisible(condition);
  };

  const handleSimilarityChange = (similaritas) => {
    setSelectedSimilarity(similaritas);
    setDescriptionVisible(false);
  };

  const handleDataChange = (data) => {
    setData(data);
  };

  const scrollToSection = (sectionId) => {
    // Mencari elemen berdasarkan ID dan melakukan scroll halus
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div>
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={handleCloseToast}
            />
          )}
          <ListNavigasiMenu menuVersion={2} scrollToSection={scrollToSection} />
          <CardWellcome
            heading={"Eksplorasi Fungsi Similaritas"}
            bgColor={"bg-card_purple_primary"}
            detail="Pada Page Eksplorasi Rating pengguna bisa bereksplorasi dan ingin melakukan
              eksperiment tentang perhitungan  Fungsi Similaritas dengan data rating yang berbeda-beda untuk pemahaman yang
              lebih lanjut."
            image={KoalaPage}
          />
          <VidioSection />

          <section id="cardSteps" className="max-w-5xl mx-auto p-6 text-center">
            <CardsSteps />
          </section>

          <section
            id="data_ratingLatihan"
            className="max-w-4xl mx-auto text-center py-5"
          >
            <h1 className="text-4xl sm:text-5xl font-bold font-poppins py-10 ">
              Buat Tabel Data Rating Yang Akan Digunakan
            </h1>
            <div className="flex flex-row items-center justify-center">
              <div className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                1
              </div>
              <h1 className="text-2xl font-bold font-poppins py-5 ml-3">
                Buat Tabel Rating:
              </h1>
            </div>
            <FormMeasure
              onDataChange={handleDataChange}
              onDescriptionChange={handleTurnDescription}
              changeFunny={changeFunny}
              funnyMode={funnyMode}
              headers={headers}
              columns={columns}
            />
          </section>

          <section
            id="notasi_ratingLatihan"
            className="max-w-4xl mx-auto text-center py-5"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-poppins  ">
              Notasi dan Penjelasan Data Rating
            </h1>
            <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
          </section>

          <section
            id="metode_ratingLatihan"
            className="max-w-6xl mx-auto text-center py-5"
          >
            <div className="px-5">
              <h1 className="text-5xl sm:text-6xl font-bold font-poppins py-10">
                Pilih Metode Prediksi dan Fungsi Similaritas
              </h1>
            </div>

            <div className="p-5 flex flex-col sm:flex-row justify-center sm:justify-around gap-8 sm:gap-10">
              {/* First Column */}
              <div className="flex flex-col items-center w-full sm:w-auto">
                <div className="flex flex-row items-center">
                  <div className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                    3
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold font-poppins py-5 sm:py-10 px-3">
                    Pilih Metode Prediksi
                  </h1>
                </div>
                <DropdownMethodBased
                  turnDescription={setDescriptionVisible}
                  onChange={handleMethodChange}
                />
              </div>

              {/* Second Column */}
              <div className="flex flex-col items-center w-full sm:w-auto">
                <div className="flex flex-row items-center">
                  <div className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                    4
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold font-poppins py-5 sm:py-10 px-3">
                    Pilih Fungsi Similaritas
                  </h1>
                </div>
                <DropdownSimilarityMeasure
                  turnDescription={setDescriptionVisible}
                  onChange={handleSimilarityChange}
                />
              </div>
            </div>
          </section>

          <section className="max-w-full mx-auto text-center my-10 pt-10 relative">
            <button
              onClick={toggleDescription}
              // className="w-full sm:w-auto font-semibold font-poppins bg-blue-home border-2 border-black text-center text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center mx-auto"
              className="max-w-6xl sm:w-auto font-semibold font-poppins bg-blue-home border-2 border-black text-center text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center mx-auto"
            >
              Cek Hasil Perhitungan
              {isDescriptionVisible ? (
                <ExpandLessIcon className="ml-2 text-lg" />
              ) : (
                <ExpandMoreIcon className="ml-2 text-lg" />
              )}
            </button>
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
                  <div className="mt-8">
                    <DetailPageBox
                      method={selectedMethod}
                      similarity={selectedSimilarity}
                      data={data}
                      headers={headers}
                      columns={columns}
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
}

export default Eksplorasi;
