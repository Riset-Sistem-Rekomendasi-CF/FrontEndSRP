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
import StepperModal, { StepRow } from "../../components/modal/StepeerModal";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import VowelsPana from "../../assets/images/VowelsPna.png";
import imgWork from "../../assets/images/imgWorkshop.png";
import GifTut from "../../assets/vidioAsset/tutorialGif.gif";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

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
      title: "Step 1: Perkenalan Pada Fitur Tutorial",
      content: (
        <>
          <p>
            Pada langkah pertama ini, Anda akan diperkenalkan dengan fitur utama
            dari sistem rekomendasi. Dimana pada fitur tutorial akan menjelaskan
            langkah-langkah perhitungan metode user-based dan item-based pada
            fungsi similaritas yang digunakan dengan data rating yang sudah
            disiapkan sebelumnya. Sehingga pengguna bisa langsung memulai
            belajar langkah-langkah cara perhitungannya.
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
        header={"Tutorial Fungsi Similaritas"}
        subheader={
          " Pada Page Tutorial ini pengguna akan diberikan tutorial tentang" +
          " perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga pengguna paham tentang perhitungan Fungsi Similaritas dengan berbagai metode yang bisa digunakan "
        }
      />

      <BodyTutorial
        header={"Langkah-langkah"}
        subheader={
          "Berikut adalah langkah-langkah yang perlu diikuti untuk menghitung fungsi similaritas berdasarkan data rating yang akan digunakan:"
        }
      />

      <section className="max-w-5xl mx-auto p-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSteps
            heading="Menyiapkan Data Rating"
            description="Menyiapkan data rating yang akan digunakan untuk perhitungan fungsi similaritas."
            icon={<RateReview className="w-8 h-8" />} // Ikon untuk langkah 1
            sectionId="data_ratingTutorial" // Pass sectionId ke CardSteps
          />
          <CardSteps
            heading="Melihat Notasi dan Penjelasan"
            description="Melihat Notasi dan Penjelasan secara detail untuk notasi yang digunakan."
            icon={<RateReview className="w-8 h-8" />} // Ikon untuk langkah 1
            sectionId="notasi_ratingTutorial"
          />
          <CardSteps
            heading="Memilih Metode Digunakan"
            description="Memilih metode yang ingin digunakan, apakah User-Based atau Item-Based."
            icon={<Build className="w-8 h-8" />} // Ikon untuk langkah 2
            sectionId="metode_ratingTutorial"
          />
        </div>
      </section>
      <VideoTutorialModal id="vidio_ratingTutorial" />

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
        <h1 className="text-3xl sm:text-4xl font-bold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary  ">
          Notasi dan Penjelasan Data Rating
        </h1>

        <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
      </section>
      <FormLayoutTutorial id="metode_ratingTutorial" data={form} />

      <section className="max-w-6xl mx-auto text-center my-10 py-10 relative">
        <button
          onClick={toggleDescription}
          className="w-full sm:w-auto font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center mx-auto"
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
            </section>
          </div>
        )}
      </section>
    </div>
  );
};

export default Tutorial;
