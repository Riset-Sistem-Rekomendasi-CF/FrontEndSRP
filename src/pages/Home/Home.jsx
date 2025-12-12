import { useState, useEffect } from "react";
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
import { Helmet } from "react-helmet";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <LayoutHome>
      <Helmet>
        <title>
          KoalaERS - Media Pembelajaran Sistem Rekomendasi Collaborative
          Filtering Terlengkap
        </title>
        <meta
          name="title"
          content="KoalaERS - Media Pembelajaran Sistem Rekomendasi Collaborative Filtering Terlengkap"
        />
        <meta
          name="description"
          content="KoalaERS adalah platform edukasi interaktif untuk mempelajari sistem rekomendasi dengan metode Collaborative Filtering User-Based dan Item-Based. Tutorial lengkap PCC, Cosine, Adjusted Cosine, dan Bhattacharyya Coefficient dengan kalkulator interaktif."
        />
        <meta
          name="keywords"
          content="sistem rekomendasi, collaborative filtering, user-based, item-based, PCC, cosine similarity, adjusted cosine, bhattacharyya coefficient, fungsi similaritas, tutorial sistem rekomendasi, belajar machine learning, KoalaERS"
        />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://koalaers.trunojoyo.ac.id/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koalaers.trunojoyo.ac.id/" />
        <meta
          property="og:title"
          content="KoalaERS - Media Pembelajaran Sistem Rekomendasi Collaborative Filtering Terlengkap"
        />
        <meta
          property="og:description"
          content="Platform edukasi interaktif untuk mempelajari sistem rekomendasi dengan metode Collaborative Filtering. Tutorial lengkap dan kalkulator interaktif."
        />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="KoalaERS - Media Pembelajaran Sistem Rekomendasi"
        />
        <meta
          name="twitter:description"
          content="Platform edukasi interaktif untuk mempelajari sistem rekomendasi dengan metode Collaborative Filtering."
        />
        <meta
          name="twitter:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
      </Helmet>
      <div
        className={`transition-all duration-1000 ${
          isLoaded
            ? "opacity-100 transform-none"
            : "opacity-0 transform -translate-y-4"
        }`}
      >
        <div data-aos="fade-down">
          <HeaderHome>
            <>
              <div>
                Media Pembelajaran Interaktif Sistem Rekomendasi Berbasis
                Collaborative Filtering User-Based dan Item-Based
              </div>
            </>
          </HeaderHome>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <OverViewRekomendasi />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <CardSimilaritas />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <BodyHome
            idName="mulai"
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
            <div data-aos="zoom-in" data-aos-delay="400">
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
            </div>

            <div data-aos="zoom-in" data-aos-delay="500">
              <CardMenuFitur
                Image={tutorialPage}
                bgColor={"bg-blue-home"}
                Heading={"Eksplorasi Data Rating"}
                buttonName={"Eksplorasi Sekarang"}
                anchor={"/eksplorasi"}
              >
                {" "}
                Untuk eksplorasi perhitungan fungsi similaritas dengan data
                rating yang berbeda.
              </CardMenuFitur>
            </div>
          </BodyHome>
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <About />
        </div>

        {/* Team Section */}

        <div data-aos="fade-up" data-aos-delay="500">
          <BodyHome
            header={"Tim Pengembang Website"}
            subheader={
              "Tim KoalaERS-AI mengembangan website dengan metode Fungsi Similaritas terdiri dari mahasiswa dan dosen pembimbing yang memiliki minat di bidang sistem rekomendasi. Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari pengembangan perangkat lunak, hingga desain antarmuka pengguna."
            }
            type="gridAnggota"
            bgColor={"bg-white"}
          >
            <div data-aos="flip-left" data-aos-delay="600">
              <CardAnggotaHome
                name={"Noor Ifada"}
                imageUrl={buifa}
                email={"noor.ifada@trunojoyo.ac.id"}
              />
            </div>
            <div data-aos="flip-left" data-aos-delay="700">
              <CardAnggotaHome
                imageUrl={alfi}
                name={"Alfi Nur Danialin"}
                email={"alfinurdanialin900@gmail.com"}
              />
            </div>
            <div data-aos="flip-left" data-aos-delay="800">
              <CardAnggotaHome
                imageUrl={dimas}
                name={"Dimas Dliyaur Rahman"}
                email={"dimasdliyaurrahman@gmail.com"}
              />
            </div>
          </BodyHome>
        </div>
        <BackToTopButtonHome />
      </div>
    </LayoutHome>
  );
};

export default Home;
