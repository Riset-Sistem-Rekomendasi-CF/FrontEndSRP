import { Helmet } from "react-helmet";
import CardBanner from "../../components/Card/Home/CardBanner";

import Acos1 from "../../assets/icons/ACOS1.png";
import CardStepper from "../../components/Card/Home/CardStepper";
import { StepsACos } from "../../components/Steppers/SteppersACos";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import Navbar from "../../components/Navigate/Navbar/Navbar";

export default function DetailPageACos() {
  const ReaderStepACos = StepsACos;
  return (
    <>
      <Helmet>
        <title>
          Adjusted Cosine Similarity - Rumus, Cara Hitung & Contoh | KoalaERS
        </title>
        <meta
          name="title"
          content="Adjusted Cosine Similarity - Rumus, Cara Hitung & Contoh | KoalaERS"
        />
        <meta
          name="description"
          content="Pelajari Adjusted Cosine Similarity untuk sistem rekomendasi item-based. Penjelasan lengkap rumus adjusted cosine, perbedaan dengan cosine biasa, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
        />
        <meta
          name="keywords"
          content="adjusted cosine similarity, rumus adjusted cosine, cara menghitung adjusted cosine, item-based collaborative filtering, perbedaan cosine dan adjusted cosine, sistem rekomendasi adjusted cosine, contoh perhitungan adjusted cosine, KoalaERS"
        />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://koalaers.trunojoyo.ac.id/acosDetail"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://koalaers.trunojoyo.ac.id/acosDetail"
        />
        <meta
          property="og:title"
          content="Adjusted Cosine Similarity - Rumus & Cara Hitung | KoalaERS"
        />
        <meta
          property="og:description"
          content="Pelajari Adjusted Cosine Similarity untuk sistem rekomendasi. Penjelasan lengkap rumus dan contoh perhitungan."
        />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Adjusted Cosine Similarity | KoalaERS"
        />
        <meta
          name="twitter:description"
          content="Pelajari Adjusted Cosine Similarity untuk sistem rekomendasi collaborative filtering."
        />
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <Navbar />
        <div className="mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8" data-aos="fade-down">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl">
              Adjusted Cosine Similarity (ACos)
            </h1>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <CardBanner
              heading1={"Penjelasan Adjusted Cosine (ACos)"}
              heading2={"📍 Detail Perhitungan ACos"}
              paragraph={
                "Menjelaskan tentang Adjusted Cosine (ACos) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
              }
              bgColor={"bg-yellow-400"}
              imgSrc={Acos1}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <CardStepper steps={ReaderStepACos} />
          </div>
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
