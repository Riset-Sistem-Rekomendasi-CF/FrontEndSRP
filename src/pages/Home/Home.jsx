import React, { useState, useEffect } from "react";
import { AccordionMeasure } from "../../components/AccordionMeasure";
import LayoutHome from "../Layout/Home/LayoutHome.jsx";
import CardHome from "../../components/Card/Home/CardHome.jsx";
import CardMenuFitur from "../../components/Card/Home/CardMenuFitur.jsx";
import CardAnggotaHome from "../../components/Card/Home/CardAnggotaHome.jsx";
import HeaderHome from "../Layout/Home/HeaderHome.jsx";
import BodyHome from "../Layout/Home/BodyHome.jsx";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import OverViewRekomendasi from "../../components/Toggle/OverViewPage";
import buifa from "../../assets/images/ibu_Ifada.jpg";
import alfi from "../../assets/images/alfinur.JPG";
import dimas from "../../assets/images/Dimas.png";
import tutorialPage from "../../assets/images/tutorialPage.png";

import ModalHomeFirst from "../../components/modal/ModalHomeFirst.jsx";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import About from "../../components/Card/Main/About.jsx";
import CardSimilaritas from "../../components/Card/Home/CardSimilaritas.jsx";
// import Cookies from "js-cookie";

const RatingExplanationTable = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
    },
    {
      value: "-1",
      description:
        "Nilai -1 menunjukkan hubungan negatif sempurna, di mana kedua user atau item memiliki pola rating yang bertentangan. Contohnya, jika user A tidak menyukai suatu item, user C mungkin justru menyukai item tersebut.",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingExplanationTable2 = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingExplanationTable3 = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Ketika Nilai BC adalah 1 maka menunjukkan hubungan disitribusi positif  sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip dan hampir tidak ada berbedaanya sama sekali. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Ketika nilai Bhattacharyya Coefficient (BC) menjadi 0, misalnya pada User A dan User D memiliki distribusi rating yang sepenuhnya berbeda. Ini menunjukkan bahwa tidak ada kesamaan atau tumpang tindih antara distribusi rating mereka. Dengan kata lain, perubahan rating pengguna A tidak mempengaruhi pengguna D, karena keduanya memiliki pola rating yang sangat berbeda. Ini menggambarkan bahwa rekomendasi berdasarkan pola rating mereka tidak efektif, karena tidak ada kesamaan dalam cara mereka memberikan rating terhadap item-item yang sama. ",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Home = () => {
  // end modal home
  const listOfSimilarity = [
    {
      title: "Pearson Coefficient Correlation (PCC)",
      description: (
        <>
          <p className="mb-4">
            {" "}
            <a
              href="https://www.sciencedirect.com/science/article/pii/S1319157821002652"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pearson Coefficient Correlation (PCC)
            </a>{" "}
            adalah salah satu fungsi similaritas yang paling umum digunakan
            untuk mengukur similaritas di dalam Sistem Rekomendasi. Dalam sudut
            pandang CF, PCC menghitung hubungan linier antara dua user atau item
            berdasarkan data rating yang telah diberikan oleh user terhadap
            item. Nilai similaritas PCC berkisar antara -1 hingga 1:
          </p>
          <RatingExplanationTable />
        </>
      ),
    },
    {
      title: "Vector Similarity (Cosine)",
      description: (
        <>
          <p>
            <a
              href="https://rifqimulyawan.com/kamus/cosine-similarity/#:~:text=Contoh%20penerapan%20Cosine%20Similarity%20adalah%20pada%20sistem%20rekomendasi,pengguna%20dengan%20film-film%20yang%20tersedia%20di%20dalam%20database."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            >
              Cosine Similarity
            </a>{" "}
            digunakan dalam sistem rekomendasi untuk mengukur kesamaan atau
            kemiripan antara dua objek, seperti pengguna, item, atau dokumen.
            Dalam konteks sistem rekomendasi, cosine similarity digunakan untuk
            membandingkan kesamaan antara preferensi pengguna atau kesamaan
            antara item. Nilai yang mendekati 1 menunjukkan korelasi yang kuat
            antara kedua variabel, sementara nilai yang mendekati 0 menunjukkan
            tidak adanya korelasi, yang berarti kedua variabel bersifat
            independen.
          </p>
          <RatingExplanationTable2 />
        </>
      ),
    },
    {
      title: "Adjusted Vector Cosine",
      description: (
        <>
          <p className="mb-4">
            <a
              href="https://medium.com/@sujathamudadla1213/what-is-the-difference-between-cosine-similarity-and-adjusted-cosine-similarity-eb2b71f2236c"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adjusted Vector Cosine (ACos)
            </a>{" "}
            adalah variasi dari fungsi similaritas Cosine (Cos) yang
            mempertimbangkan mean rating yang diberikan oleh masing-masing user.
            ACos membantu mengatasi masalah bias yang mungkin muncul dari
            perbedaan skala rating antara user. Masalah bias ini terjadi karena
            user sering memberikan rating dengan cara yang berbeda. Misalnya,
            seorang user dapat memiliki cenderung memberikan rating yang lebih
            tinggi secara keseluruhan dibandingkan dengan user lain. Nilai
            similaritas ACos berkisar antara -1 hingga 1.
          </p>

          <RatingExplanationTable />
        </>
      ),
    },
    {
      title: "Bhattacharyya Coefficient Similarity (BC)",
      description: (
        <>
          <p className="mb-4">
            <a
              href="https://medium.com/@yoavyeledteva/bhattacharyya-distance-from-statistics-to-application-in-data-science-8eb5ccdbba62"
              className="font-bold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            >
              Bhattacharyya Coefficient Similarity
            </a>{" "}
            adalah fungsi similaritas yang telah digunakan secara luas dalam
            pemrosesan sinyal, pemrosesan gambar, pengenalan pola, dan Sistem
            Rekomendasi. Dalam sudut pandang pemodelan Collaborative Filtering
            (CF), perhitungan BC dilakukan dengan mengukur similaritas antara
            dua distribusi probabilitas histogram rating. Dengan kata lain,
            kinerja dari BC tergantung pada pola distribusi rating. Nilai
            Similaritas BC berkisar antara 0 hingga 1, dan bersifat simetris
          </p>
          <RatingExplanationTable3 />
        </>
      ),
    },
  ];

  return (
    <LayoutHome>
      <HeaderHome>
        <>
          <div>
            Media Pembelajaran Interaktif Sistem Rekomendasi Berbasis
            Collaborative Filtering User-Based dan Item-Based
          </div>
        </>
      </HeaderHome>
      <OverViewRekomendasi />
      <CardSimilaritas />
      <BodyHome
        // idName={"belajar"}
        header={
          "Pilih Tutorial atau Latihan Untuk Perhitungan Fungsi Similaritas"
        }
        subheader={
          "Untuk memulai pembelajaran sistem rekomendasi, pengguna dapat memilih antara dua opsi menarik: Tutorial Fungsi Similaritas, yang menjelaskan konsep dasar dan memberi contoh penerapan dalam perhitungan dan prediksi, atau Latihan Fungsi Similaritas, yang memungkinkan pengguna berlatih dengan memasukkan nilai rating secara bebas."
        }
        hirarki={"1"}
        type="grid"
        bgColor={"bg-white"}
      >
        <CardMenuFitur
          Image={tutorialPage}
          bgColor={"bg-card_yellow_primary"}
          Heading={"Tutorial Fungsi Similaritas"}
          buttonName={"Tutorial Sekarang"}
          anchor={"/tutorial"}
        >
          {" "}
          Untuk belajar dan memahami cara perhitungan{" "}
          <span className="bold">fungsi similaritas</span>.
        </CardMenuFitur>

        <CardMenuFitur
          Image={tutorialPage}
          bgColor={"bg-blue-home"}
          Heading={"Eksplorasi Data Rating"}
          buttonName={"Eksplorasi Sekarang"}
          anchor={"/eksplorasi"}
        >
          {" "}
          Untuk eksplorasi perhitungan fungsi similaritas dengan data rating
          yang berbeda.
        </CardMenuFitur>
      </BodyHome>

      <About />

      {/* Team Section */}

      <BodyHome
        header={"Tim Pengembang Website"}
        subheader={
          "Tim KoalaERS-AI mengembangan website dengan metode Fungsi Similaritas terdiri dari mahasiswa dan dosen pembimbing yang memiliki minat di bidang sistem rekomendasi. Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari pengembangan perangkat lunak, hingga desain antarmuka pengguna."
        }
        type="gridAnggota"
        bgColor={"bg-white"}
      >
        <CardAnggotaHome
          name={"Noor Ifada"}
          imageUrl={buifa}
          email={"noor.ifada@trunojoyo.ac.id"}
        />
        <CardAnggotaHome
          imageUrl={alfi}
          name={"Alfi Nur Danialin"}
          email={"alfinurdanialin900@gmail.com"}
        />
        <CardAnggotaHome
          imageUrl={dimas}
          name={"Dimas Dliyaur Rahman"}
          email={"dimasdliyaurrahman@gmail.com"}
        />
      </BodyHome>
      <BackToTopButtonHome />
    </LayoutHome>
  );
};

export default Home;
