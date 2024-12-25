import CardBanner from "../../components/Card/Home/CardBanner";
import CardStepper from "../../components/Card/Home/CardStepper";
import Navbar from "../../components/Navigate/NavBar";
import Cosine1 from "../../assets/icons/COSIEN1.png";
import { StepsCosine } from "../../components/Steppers/SteppersCosine";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";

export default function DetailPageCosine() {
  const ReaderStepCosine = StepsCosine;
  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Cosine
            </h1>
          </div>
          {/* Description */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-lg text-gray-700 sm:text-md md:text-lg text-center">
              Sistem rekomendasi menggunakan metode Cosine yang digunakan untuk
              mengukur kesamaan antara dua objek atau item berdasarkan data
              pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara
              mengimplementasikan metode ini dengan data yang tersedia untuk
              mendapatkan rekomendasi yang lebih akurat. Cosine adalah metode
              yang digunakan untuk mengukur kesamaan antara dua objek atau item
              berdasarkan data pengguna. Dalam perhitungan ini, kita akan
              membahas bagaimana cara mengimplementasikan metode ini dengan data
              yang tersedia untuk mendapatkan rekomendasi yang lebih akurat.
            </p>
          </div>
          <CardBanner
            heading1={"Penjelasan Cosine"}
            heading2={"📍 Detail Perhitungan Cosine"}
            paragraph={
              "Menjelaskan tentang Cosine Sistem rekomendasi menggunakan metode Cosine yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
            }
            bgColor={"bg-card_purple_primary"}
            imgSrc={Cosine1}
          />

          <CardStepper steps={ReaderStepCosine} />
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
