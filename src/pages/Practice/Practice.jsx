import React, { useState, useEffect } from "react";
import CardSteps from "../../components/Card/Main/CardSteps.jsx";
import {
  DropdownMethodBased,
  DropdownSimilarityMeasure,
} from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
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
import StepperModal, { StepRow } from "../../components/modal/StepeerModal";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import VowelsPana from "../../assets/images/VowelsPna.png";
import imgWork from "../../assets/images/imgWorkshop.png";
import GifTut from "../../assets/vidioAsset/tutorialGif.gif";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

function Practice() {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSimilarity, setSelectedSimilarity] = useState("");
  const [data, setData] = useState([]);

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

  // modal stepper

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    // const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // jika belum pernah dikunjungi, tampilkan modal
      setIsModalOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const stepsData = [
    {
      title: "Step 1: Perkenalan Pada Fitur Latihab",
      content: (
        <>
          <p>
            Pada langkah pertama ini, Anda akan diperkenalkan dengan fitur utama
            dari sistem rekomendasi. Dimana pada fitur latihan akan menjelaskan
            langkah-langkah perhitungan metode user-based dan item-based pada
            fungsi similaritas yang digunakan dimana data rating harus membuat
            terlebih dahulu. Sehingga pengguna bisa bebas untuk membuat tabel
            data rating yang diiginkan setelah selesai membuat data rating
            pengguna baru bisa memulai belajar langkah-langkah perhitungannya.
          </p>
          <div className="flex justify-center">
            <img
              src={imgWork} // Ganti dengan gambar yang relevan
              alt="imgwork"
              className="w-[20rem] h-[20rem]  rounded-lg"
            />
          </div>
        </>
      ),
    },
    {
      title: "Step 2: Langkah-Langkah Sistem Rekomendasi",
      content: (
        <>
          <div>
            <p>
              Pada tahap ini, Anda akan mempelajari langkah-langkah yang perlu
              diikuti untuk menghitung fungsi similaritas berdasarkan data
              rating yang akan digunakan. Berikut adalah langkah-langkah yang
              perlu diikuti:
            </p>
            <StepRow />

            <div className="relative inline-block m-4 shadow-lg rounded-lg overflow-hidden">
              <div className="w-full sm:w-[600px] h-[300px] sm:h-[300px] bg-white p-3 flex items-center justify-center relative">
                <img
                  src={GifTut}
                  alt="Video Tutorial Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-red-500 font-semibold">
              <NotificationImportantIcon /> Catatan Setiap Cell pada tabel hasil
              perhitungan bisa ditekan dan akan memberikan detail perhitungan
              atau penjelasan lebih lanjut.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Step 3: Metode Sistem Rekomendasi",
      content: (
        <>
          <div>
            <p>
              Pada Sistem Rekomendasi terdapat dua metode yang bisa digunakan,
              yaitu: User-Based dan Item-Based.
            </p>

            {/* Tabel dua kolom berisi nama metode dan keterangan */}
            <table className="min-w-full table-auto border-collapse border">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Metode
                  </th>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">User-Based</td>
                  <td className="border px-4 py-2">
                    Metode ini memanfaatkan preferensi pengguna lain yang
                    memiliki kesamaan dalam memberi rating terhadap item.
                    Rekomendasi untuk user target dibuat dengan mencari pengguna
                    lain yang serupa dan memberikan item yang mereka sukai.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">Item-Based</td>
                  <td className="border px-4 py-2">
                    Dalam metode ini, rekomendasi berdasarkan kesamaan antara
                    item yang telah diberi rating oleh pengguna target. Jika
                    pengguna telah menyukai suatu item, maka item lain yang
                    serupa akan direkomendasikan berdasarkan kesamaan atribut
                    atau preferensi sebelumnya.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: "Step 4: Fungsi Similaritas",
      content: (
        <>
          <div>
            <p>
              Pada Fungsi Similaritas ini, Anda akan mempelajari cara menghitung
              similaritas berdasarkan data rating yang digunakan. Terdapat 4
              Fungsi Similaritas yang bisa digunakan, yaitu:{" "}
              <i>Pearson Correlation Coefficient </i>(PCC), Cosine,{" "}
              <i>Adjusted Vector Cosine </i> (ACos), dan{" "}
              <i>Bhattacharyaa Coefficient Similarity </i> (BC).
            </p>
            {/* Tabel dua kolom berisi nama metode dan keterangan */}
            <table className="min-w-full table-auto border-collapse border ">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Metode
                  </th>
                  <th className="border px-4 py-2 text-center font-semibold">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Pearson Correlation Coefficient </i>(PCC)
                  </td>
                  <td className="border px-4 py-2">
                    Dalam sudut pandang <i>Collaborative Filtering </i> , PCC
                    menghitung hubungan linier antara dua <i>user </i> atau{" "}
                    <i>item </i> berdasarkan data rating yang telah diberikan
                    oleh <i>user</i> terhadap <i>item </i>.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">Cosine</td>
                  <td className="border px-4 py-2">
                    Dalam konteks sistem rekomendasi, cosine similarity
                    digunakan untuk membandingkan kesamaan antara preferensi
                    pengguna atau kesamaan antara item. Nilai yang mendekati 1
                    menunjukkan korelasi yang kuat antara kedua variabel,
                    sementara nilai yang mendekati 0 menunjukkan tidak adanya
                    korelasi, yang berarti kedua variabel bersifat independen.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Adjusted Vector Cosine </i> (ACos)
                  </td>
                  <td className="border px-4 py-2">
                    Adjusted Vector Cosine (ACos) adalah variasi dari fungsi
                    similaritas Cosine (Cos) yang mempertimbangkan mean rating
                    yang diberikan oleh masing-masing user. ACos membantu
                    mengatasi masalah bias yang mungkin muncul dari perbedaan
                    skala rating antara user.
                  </td>
                </tr>
                <tr className="hover:bg-blue-200 cursor-pointer">
                  <td className="border px-4 py-2">
                    <i>Bhattacharyaa Coefficient Similarity </i> (BC)
                  </td>
                  <td className="border px-4 py-2">
                    Dalam sudut pandang pemodelan Collaborative Filtering (CF),
                    perhitungan BC dilakukan dengan mengukur similaritas antara
                    dua distribusi probabilitas histogram rating. Dengan kata
                    lain, kinerja dari BC tergantung pada pola distribusi
                    rating.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: "Step 5: Apa Anda Sudah Siap Untuk Belajar ?",
      content: (
        <>
          <div>
            <p>
              Selesai! Beri tanda centang untuk mengkonfirmasi bahwa Anda telah
              mengerti langkah-langkah yang telah dijelaskan.
            </p>
            <div className="flex justify-center">
              <img
                src={VowelsPana} // Ganti dengan gambar yang relevan
                alt="Pahami Langkah"
                className="w-[20rem] h-[20rem]  rounded-lg"
              />
            </div>
            <p>
              Sekarang adalah waktunya untuk belajar dan mengasah keterampilanmu
              dan tantang pemahamanmu pada Website Media Pembelajaran terkait
              Sistem Rekomendasi ini.
            </p>
          </div>
        </>
      ),
    },
  ];

  // end modal stepper

  return (
    <div className="p-4">
      {/* Modal Stepper */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-card_blue_primary  font-poppins font-semibold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
      >
        Modal Tutorial
        <PlayCircleFilledWhiteIcon className="ml-2" />
      </button>
      <StepperModal
        isOpen={isModalOpen}
        onClose={closeModal}
        stepsContent={stepsData}
      />

      {/* Section Of Navigate */}
      <Navigator />

      <BodyTutorial
        header={"Practice Fungsi Similaritas"}
        subheader={
          "Pada Page Practice pengguna bisa  bereksplorasi dan ingin melakukan" +
          " eksperiment tentang perhitungan Fungsi Similaritas untuk pemahaman yang" +
          " lebih lanjut. "
        }
      />

      <BodyTutorial
        header={"Langkah-langkah"}
        subheader={
          "Berikut adalah langkah-langkah yang perlu diikuti untuk menghitung fungsi similaritas berdasarkan data rating yang akan digunakan:"
        }
      />

      <section className="max-w-5xl mx-auto p-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSteps
            heading="Menyiapkan Data Rating"
            description="Menyiapkan data rating yang akan digunakan untuk perhitungan fungsi similaritas."
            icon={<RateReview className="w-8 h-8" />} // Ikon untuk langkah 1
            sectionId="data_ratingLatihan" // Pass sectionId ke CardSteps
          />
          <CardSteps
            heading="Melihat Notasi dan Penjelasan"
            description="Melihat Notasi dan Penjelasan secara detail untuk notasi yang digunakan."
            icon={<RateReview className="w-8 h-8" />} // Ikon untuk langkah 1
            sectionId="notasi_ratingLatihan"
          />
          <CardSteps
            heading="Memilih Metode Digunakan"
            description="Memilih metode yang ingin digunakan, apakah User-Based atau Item-Based."
            icon={<Build className="w-8 h-8" />} // Ikon untuk langkah 2
            sectionId="metode_ratingLatihan"
          />
        </div>
      </section>

      <VidioTutorialModal />

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
        />
      </section>

      <section
        id="notasi_ratingLatihan"
        className="max-w-4xl mx-auto text-center py-5"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary  ">
          Notasi dan Penjelasan Data Rating
        </h1>
        <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
      </section>

      <section
        id="metode_ratingLatihan"
        className="max-w-6xl mx-auto text-center py-5"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-poppins py-10 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Pilih Sistem Rekomendasi dan Metode Similaritas
        </h1>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-around gap-8 sm:gap-10">
          {/* First Column */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="flex flex-row items-center">
              <div className="w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                3
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-poppins py-5 sm:py-10 px-3">
                Pilih Sistem Rekomendasi
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
                Pilih Metode Similaritas
              </h1>
            </div>
            <DropdownSimilarityMeasure
              turnDescription={setDescriptionVisible}
              onChange={handleSimilarityChange}
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto text-center my-10 py-10 ">
        <button
          onClick={toggleDescription}
          className=" w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md"
        >
          Cek Hasil Perhitungan Similaritas
          {isDescriptionVisible ? (
            <ExpandLessIcon className="ml-2 text-lg" />
          ) : (
            <ExpandMoreIcon className="ml-2 text-lg" />
          )}
        </button>
        {isDescriptionVisible && (
          <section className="max-w-6xl mx-auto text-center my-10 py-10">
            <h1
              id="topMenuSim"
              className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins py-5 sm:py-6 md:py-8 lg:py-10"
            >
              Hasil dan Pembahasan :
            </h1>

            <div className="flex flex-wrap space-x-2 space-y-2 items-center justify-center mx-auto">
              <h1 className="text-lg justify-center font-semibold underline underline-offset-4 decoration-3 decoration-card_blue_primary">
                Daftar Isi :{" "}
              </h1>
              {/* Mean Rating */}
              <Chip
                label="Mean Rating"
                icon={<Star />}
                onClick={() => scrollToSection("mean-rating-section")}
                color="success"
                variant="outlined"
                clickable
                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
              />

              {/* Mean-Centered */}
              <Chip
                label="Mean-Centered"
                icon={<ShowChart />}
                onClick={() => scrollToSection("mean-cen-section")}
                color="primary"
                variant="outlined"
                clickable
                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
              />

              {/* Similaritas */}
              <Chip
                label="Similaritas"
                icon={<People />}
                onClick={() => scrollToSection("sim-section")}
                color="warning"
                variant="outlined"
                clickable
                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
              />

              {/* Prediksi */}
              <Chip
                label="Prediksi"
                icon={<Lightbulb />}
                onClick={() => scrollToSection("pred-section")}
                color="success"
                variant="outlined"
                clickable
                className="cursor-pointer w-full sm:w-auto sm:rounded-md rounded-full sm:flex sm:items-center sm:justify-center flex items-center justify-center"
              />

              {/* Top-N */}
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

            <DetailPageBox
              method={selectedMethod}
              similarity={selectedSimilarity}
              data={data}
            />
          </section>
        )}
      </section>
    </div>
  );
}

export default Practice;
