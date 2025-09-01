import React from "react";
import LayoutHome from "../Layout/Home/LayoutHome.jsx";
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
import About from "../../components/Card/Main/About.jsx";
import CardSimilaritas from "../../components/Card/Home/CardSimilaritas.jsx";
// import Cookies from "js-cookie";

const Home = () => {
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
