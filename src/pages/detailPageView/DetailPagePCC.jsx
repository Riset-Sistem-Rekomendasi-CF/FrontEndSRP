import React from "react";
import { Helmet } from "react-helmet";

import CardBanner from "../../components/Card/Home/CardBanner";
import PCC1 from "../../assets/icons/PCC1.png";
import CardStepper from "../../components/Card/Home/CardStepper";
import { StepsPcc } from "../../components/Steppers/SteppersPCC";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
import Navbar from "../../components/Navigate/Navbar/Navbar";

export default function DetailPagePCC() {
  const ReaderStepPCC = StepsPcc;
  return (
    <>
      <Helmet>
        <title>
          Pearson Correlation Coefficient (PCC) - Rumus, Cara Hitung & Contoh |
          KoalaERS
        </title>
        <meta
          name="title"
          content="Pearson Correlation Coefficient (PCC) - Rumus, Cara Hitung & Contoh | KoalaERS"
        />
        <meta
          name="description"
          content="Pelajari Pearson Correlation Coefficient (PCC) untuk sistem rekomendasi. Penjelasan lengkap rumus PCC, cara menghitung korelasi pearson, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
        />
        <meta
          name="keywords"
          content="pearson correlation coefficient, PCC, rumus PCC, cara menghitung PCC, korelasi pearson, pearson similarity, collaborative filtering PCC, sistem rekomendasi PCC, contoh perhitungan PCC, KoalaERS"
        />
        <meta
          name="author"
          content="KoalaERS Team - Universitas Trunojoyo Madura"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://koalaers.trunojoyo.ac.id/pccDetail"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://koalaers.trunojoyo.ac.id/pccDetail"
        />
        <meta
          property="og:title"
          content="Pearson Correlation Coefficient (PCC) - Rumus & Cara Hitung | KoalaERS"
        />
        <meta
          property="og:description"
          content="Pelajari Pearson Correlation Coefficient (PCC) untuk sistem rekomendasi. Penjelasan lengkap rumus dan contoh perhitungan."
        />
        <meta
          property="og:image"
          content="https://koalaers.trunojoyo.ac.id/Frame%201.png"
        />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pearson Correlation Coefficient (PCC) | KoalaERS"
        />
        <meta
          name="twitter:description"
          content="Pelajari Pearson Correlation Coefficient (PCC) untuk sistem rekomendasi collaborative filtering."
        />
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        {/* Navbar */}
        <Navbar />
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Section Heading */}
          <div className="text-center my-8" data-aos="fade-down">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl">
              Pearson Correlation Coefficient (PCC)
            </h1>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <CardBanner
              heading1="Penjelasan Pearson Correlation Coefficient (PCC)"
              heading2="📍 Detail Perhitungan PCC"
              paragraph="Menjelaskan tentang Pearson Correlation Coefficient (PCC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
              bgColor="bg-blue-400"
              imgSrc={PCC1}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <CardStepper steps={ReaderStepPCC} />
          </div>
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
