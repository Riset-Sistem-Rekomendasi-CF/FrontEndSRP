import { Helmet } from "react-helmet";
import CardBanner from "../../components/Card/Home/CardBanner";
import CardStepper from "../../components/Card/Home/CardStepper";

import BC1 from "../../assets/icons/BC1.png";
import { StepsBC } from "../../components/Steppers/SteppersBC";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import Navbar from "../../components/Navigate/Navbar/Navbar";

export default function DetailPageBC() {
  const ReaderStepBC = StepsBC;
  return (
    <>
      <Helmet>
        <title>
          Bhattacharyya Coefficient (BC) - Rumus, Cara Hitung & Contoh |
          KoalaERS
        </title>
        <meta
          name="title"
          content="Bhattacharyya Coefficient (BC) - Rumus, Cara Hitung & Contoh | KoalaERS"
        />
        <meta
          name="description"
          content="Pelajari Bhattacharyya Coefficient (BC) untuk sistem rekomendasi. Penjelasan lengkap rumus BC, cara menghitung koefisien bhattacharyya, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
        />
        <meta
          name="keywords"
          content="bhattacharyya coefficient, BC similarity, rumus bhattacharyya coefficient, cara menghitung BC, koefisien bhattacharyya, collaborative filtering BC, sistem rekomendasi BC, contoh perhitungan bhattacharyya, KoalaERS"
        />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://koalaers.trunojoyo.ac.id/bcDetail"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://koalaers.trunojoyo.ac.id/bcDetail"
        />
        <meta
          property="og:title"
          content="Bhattacharyya Coefficient (BC) - Rumus & Cara Hitung | KoalaERS"
        />
        <meta
          property="og:description"
          content="Pelajari Bhattacharyya Coefficient (BC) untuk sistem rekomendasi. Penjelasan lengkap rumus dan contoh perhitungan."
        />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bhattacharyya Coefficient (BC) | KoalaERS"
        />
        <meta
          name="twitter:description"
          content="Pelajari Bhattacharyya Coefficient (BC) untuk sistem rekomendasi collaborative filtering."
        />
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <Navbar />
        <div className=" mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8" data-aos="fade-down">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl">
              Bhattacharyya Coefficient (BC)
            </h1>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <CardBanner
              heading1={"Penjelasan Bhattacharyya Coefficient (BC)"}
              heading2={"📍 Detail Perhitungan BC"}
              paragraph={
                "Menjelaskan tentang Bhattacharyya Coefficient(BC) Sistem rekomendasi menggunakan metode Bhattacharyya Coefficient (BC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
              }
              bgColor={"bg-red-400"}
              imgSrc={BC1}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <CardStepper steps={ReaderStepBC} />
          </div>
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
