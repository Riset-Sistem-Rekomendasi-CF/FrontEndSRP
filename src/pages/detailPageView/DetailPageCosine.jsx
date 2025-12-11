import { Helmet } from "react-helmet";
import CardBanner from "../../components/Card/Home/CardBanner";
import CardStepper from "../../components/Card/Home/CardStepper";

import Cosine1 from "../../assets/icons/COSIEN1.png";
import { StepsCosine } from "../../components/Steppers/SteppersCosine";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import Navbar from "../../components/Navigate/Navbar/Navbar";

export default function DetailPageCosine() {
  const ReaderStepCosine = StepsCosine;
  return (
    <>
      <Helmet>
        <title>
          Cosine Similarity - Rumus, Cara Hitung & Contoh Sistem Rekomendasi |
          KoalaERS
        </title>
        <meta
          name="title"
          content="Cosine Similarity - Rumus, Cara Hitung & Contoh Sistem Rekomendasi | KoalaERS"
        />
        <meta
          name="description"
          content="Pelajari Cosine Similarity untuk sistem rekomendasi. Penjelasan lengkap rumus cosine similarity, cara menghitung kemiripan vektor, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
        />
        <meta
          name="keywords"
          content="cosine similarity, rumus cosine similarity, cara menghitung cosine similarity, kemiripan cosine, vector similarity, collaborative filtering cosine, sistem rekomendasi cosine, contoh perhitungan cosine, KoalaERS"
        />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://koalaers.trunojoyo.ac.id/cosineDetail"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://koalaers.trunojoyo.ac.id/cosineDetail"
        />
        <meta
          property="og:title"
          content="Cosine Similarity - Rumus & Cara Hitung | KoalaERS"
        />
        <meta
          property="og:description"
          content="Pelajari Cosine Similarity untuk sistem rekomendasi. Penjelasan lengkap rumus dan contoh perhitungan."
        />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cosine Similarity | KoalaERS" />
        <meta
          name="twitter:description"
          content="Pelajari Cosine Similarity untuk sistem rekomendasi collaborative filtering."
        />
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <Navbar />
        <div className="mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8" data-aos="fade-down">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl">
              Cosine Similarity
            </h1>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <CardBanner
              heading1={"Penjelasan Cosine"}
              heading2={"📍 Detail Perhitungan Cosine"}
              paragraph={
                "Menjelaskan tentang Cosine Sistem rekomendasi menggunakan metode Cosine yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
              }
              bgColor={"bg-green-400"}
              imgSrc={Cosine1}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <CardStepper steps={ReaderStepCosine} />
          </div>
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
