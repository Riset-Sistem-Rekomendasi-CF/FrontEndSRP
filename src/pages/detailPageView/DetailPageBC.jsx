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
        <div className=" mx-auto p-4">
          {/* Section Heading */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Bhattacharyya Coefficient (BC)
            </h1>
          </div>

          <CardBanner
            heading1={"Penjelasan Bhattacharyya Coefficient (BC)"}
            heading2={"📍 Detail Perhitungan BC"}
            paragraph={
              "Menjelaskan tentang Bhattacharyya Coefficient(BC) Sistem rekomendasi menggunakan metode Bhattacharyya Coefficient (BC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
            }
            bgColor={"bg-red-400"}
            imgSrc={BC1}
          />
          <CardStepper steps={ReaderStepBC} />
          <BackToTopButtonHome />
        </div>
      </section>
    </>
  );
}
