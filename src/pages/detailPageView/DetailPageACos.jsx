import CardBanner from "../../components/Card/Home/CardBanner";
import Navbar from "../../components/Navigate/NavBar";
import Acos1 from "../../assets/icons/ACOS1.png";
import CardStepper from "../../components/Card/Home/CardStepper";
import { StepsACos } from "../../components/Steppers/SteppersACos";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";

export default function DetailPageACos() {
  const ReaderStepACos = StepsACos;
  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Adjusted Cosine (ACos)
            </h1>
          </div>

          <CardBanner
            heading1={"Penjelasan Adjusted Cosine (ACos)"}
            heading2={"📍 Detail Perhitungan ACos"}
            paragraph={
              "Menjelaskan tentang Adjusted Cosine (ACos) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
            }
            bgColor={"bg-yellow-btn-primary"}
            imgSrc={Acos1}
          />

          <CardStepper steps={ReaderStepACos} />
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
