import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navigate/NavBar";
import CardBanner from "../../components/Card/Home/CardBanner";
import PCC1 from "../../assets/icons/PCC1.png";
import CardStepper from "../../components/Card/Home/CardStepper";
import { StepsPcc } from "../../components/Steppers/SteppersPCC";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";

export default function DetailPagePCC() {
  const ReaderStepPCC = StepsPcc;
  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        {/* Navbar */}
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Pearson Correlation Coefficient (PCC)
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-lg text-gray-700 sm:text-md md:text-lg text-center">
              Sistem rekomendasi menggunakan metode PCC (Pearson Correlation
              Coefficient) yang digunakan untuk mengukur kesamaan antara dua
              objek atau item berdasarkan data pengguna. Dalam perhitungan ini,
              kita akan membahas bagaimana cara mengimplementasikan metode ini
              dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih
              akurat.
            </p>
          </div>

          <CardBanner
            heading1="Penjelasan Pearson Correlation Coefficient (PCC)"
            heading2="📍 Detail Perhitungan PCC"
            paragraph="Menjelaskan tentang Pearson Correlation Coefficient (PCC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
            bgColor="bg-blue-home"
            imgSrc={PCC1}
          />

          <CardStepper steps={ReaderStepPCC} />
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
