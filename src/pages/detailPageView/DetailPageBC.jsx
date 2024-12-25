import CardBanner from "../../components/Card/Home/CardBanner";
import CardStepper from "../../components/Card/Home/CardStepper";
import Navbar from "../../components/Navigate/NavBar";
import BC1 from "../../assets/icons/BC1.png";
import { StepsBC } from "../../components/Steppers/SteppersBC";
import { BackToTopButtonHome } from "../../components/Navigate/BackToTopNavigate";
export default function DetailPageBC() {
  const ReaderStepBC = StepsBC;
  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Bhattacharyya Coefficient (BC)
            </h1>
          </div>
          {/* Description */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-lg text-gray-700 sm:text-md md:text-lg text-center">
              Sistem rekomendasi menggunakan metode Bhattacharyya Coefficient
              (BC) yang digunakan untuk mengukur kesamaan antara dua objek atau
              item berdasarkan data pengguna. Dalam perhitungan ini, kita akan
              membahas bagaimana cara mengimplementasikan metode ini dengan data
              yang tersedia untuk mendapatkan rekomendasi yang lebih akurat.
              Bhattacharyya Coefficient (BC) adalah metode yang digunakan untuk
              mengukur kesamaan antara dua objek atau item berdasarkan data
              pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara
              mengimplementasikan metode ini dengan data yang tersedia untuk
              mendapatkan rekomendasi yang lebih akurat.
            </p>
          </div>
          <CardBanner
            heading1={"Penjelasan Bhattacharyya Coefficient (BC)"}
            heading2={"📍 Detail Perhitungan BC"}
            paragraph={
              "Menjelaskan tentang Bhattacharyya Coefficient(BC) Sistem rekomendasi menggunakan metode Bhattacharyya Coefficient (BC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
            }
            bgColor={"bg-red-primary"}
            imgSrc={BC1}
          />
          <CardStepper steps={ReaderStepBC} />
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
