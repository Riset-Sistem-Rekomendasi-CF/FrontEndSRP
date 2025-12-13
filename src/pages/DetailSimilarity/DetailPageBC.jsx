import DetailLayout from "./DetailLayout";
import BC1 from "../../assets/icons/BC1.png";
import { StepsBC } from "../../components/Steppers/SteppersBC";

export default function DetailPageBC() {
  return (
    <DetailLayout
      title="Bhattacharyya Coefficient (BC) - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaTitle="Bhattacharyya Coefficient (BC) - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaDescription="Pelajari Bhattacharyya Coefficient (BC) untuk sistem rekomendasi. Penjelasan lengkap rumus BC, cara menghitung koefisien bhattacharyya, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
      metaKeywords="bhattacharyya coefficient, BC similarity, rumus bhattacharyya coefficient, cara menghitung BC, koefisien bhattacharyya, collaborative filtering BC, sistem rekomendasi BC, contoh perhitungan bhattacharyya, KoalaERS"
      canonicalUrl="https://koalaers.trunojoyo.ac.id/bcDetail"
      pageTitle="Bhattacharyya Coefficient (BC)"
      bannerHeading1="Penjelasan Bhattacharyya Coefficient (BC)"
      bannerHeading2="📍 Detail Perhitungan BC"
      bannerParagraph="Menjelaskan tentang Bhattacharyya Coefficient(BC) Sistem rekomendasi menggunakan metode Bhattacharyya Coefficient (BC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
      bannerBgColor="bg-red-400"
      bannerImage={BC1}
      steps={StepsBC}
    />
  );
}
