import React, { useEffect, useState } from "react";
import TabelView from "../../components/table/TabelView.jsx";
import CardSteps from "../../components/Card/Main/CardSteps.jsx";
import {
  DropdownMethodBased,
  DropdownSimilarityMeasure,
} from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import Navigator from "../../components/Navigate/Navigator";
import VideoTutorialModal from "../../components/modal/VidioTutorialModal";
import BodyTutorial from "../Layout/Tutorial/BodyTutorial.jsx";
import FormLayoutTutorial from "../Layout/Tutorial/FormTutorial.jsx";
import NotationCard from "../../components/table/NotaionCard.jsx";
import Chip from "@mui/material/Chip";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  RateReview,
  Build,
  Star,
  ShowChart,
  People,
  Lightbulb,
} from "@mui/icons-material";

import Navbar from "../../components/Navigate/NavBar.jsx";
import KoalaPage from "../../assets/icons/KoalaPage.png";
import CardWellcome from "../../components/Card/Home/CardWellcome.jsx";
import ListNavigasiMenu from "../../components/Navigate/ListNavigasiMenu.jsx";
import CardsSteps from "../../components/Card/Home/CardSteps.jsx";
import VidioSection from "../../components/modal/VidioSection.jsx";
import BackToTopButton from "../../components/Navigate/BackToTopNavigate.jsx";
// import Cookies from "js-cookie";

const Tutorial = () => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const form = [
    {
      header: "Pilih Sistem Rekomendasi",
      element: (
        <DropdownMethodBased
          turnDescription={setDescriptionVisible}
          onChange={(method) => {
            setSelectedMethod(method);
            handleTurnDescription(false);
          }}
        />
      ),
    },
    {
      header: "Pilih Metode Similaritas",
      element: (
        <DropdownSimilarityMeasure
          turnDescription={setDescriptionVisible}
          onChange={(similaritas) => {
            setSelectedSimilarity(similaritas);
            handleTurnDescription(false);
          }}
        />
      ),
    },
  ];

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const handleTurnDescription = (condition) => {
    setDescriptionVisible(condition);
  };

  const [data] = useState([
    [5, 0, 4, 3, 5, 4],
    [4, 5, 0, 3, 2, 3],
    [0, 3, 0, 2, 1, 0],
    [1, 2, 2, 0, 3, 4],
    [1, 0, 1, 2, 3, 3],
  ]);
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
        Data <i>Rating</i> Yang Digunakan
      </h1>
    </span>
  );
  const Tekssubheader = (
    <span>
      Data <i>rating</i> yaitu suatu kumpulan data yang telah diberikan{" "}
      <i>rating</i> pada <i>item</i> tertentu oleh <i>user</i>.
    </span>
  );

  return (
    <>
      <div>
        <Navbar />
        <div className="">
          <div className="p-4">
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-yellow-primary"
              role="alert"
            >
              <div className="flex flex-row mx-auto items-center">
                <img
                  src={KoalaPage} // Ganti dengan URL gambar yang Anda inginkan
                  alt="Icon"
                  className="w-10 h-10 object-cover rounded-full mr-3"
                />
                <p className="font-poppins font-semibold text-md">
                  {/* Teks di kanan */}
                  Selamat Datang Di Latihan Fungsi Similaritas
                </p>
              </div>
            </div>
          </div>
          <ListNavigasiMenu menuVersion={1} scrollToSection={scrollToSection} />
          <CardWellcome
            heading={"Tutorial Fungsi Similaritas"}
            bgColor={"bg-blue-home"}
            detail="Pada Page Tutorial ini pengguna akan diberikan tutorial tentang
              perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga
              pengguna paham tentang perhitungan Fungsi Similaritas dengan
              berbagai metode yang bisa digunakan"
            image={KoalaPage}
          />

          <section id="cardSteps" className="max-w-6xl mx-auto p-4 text-center">
            <CardsSteps />
          </section>

          <VidioSection id="vidio_ratingTutorial" />

          <BodyTutorial
            header={TeksHeader}
            subheader={Tekssubheader}
            id="data_ratingTutorial"
          >
            <TabelView />
          </BodyTutorial>
          <section
            id="notasi_ratingTutorial"
            className="max-w-4xl mx-auto text-center py-5"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-poppins   ">
              Notasi dan Penjelasan Data Rating
            </h1>

            <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
          </section>
          <FormLayoutTutorial id="metode_ratingTutorial" data={form} />

          <section className="max-w-6xl mx-auto text-center my-10 py-10 relative">
            <button
              onClick={toggleDescription}
              className="w-full sm:w-auto font-semibold font-poppins bg-blue-home border-2 border-black text-center text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center mx-auto"
            >
              Cek Hasil Perhitungan Similaritas
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
                  <div className="flex flex-wrap justify-center gap-2 font-poppins">
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
                    />
                  </div>
                  <BackToTopButton />
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
