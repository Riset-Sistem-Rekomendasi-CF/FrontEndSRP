import DetailLayout from "./DetailLayout";
import Cosine1 from "../../assets/icons/COSIEN1.png";
import { StepsCosine } from "../../components/Steppers/SteppersCosine";

export default function DetailPageCosine() {
  return (
    <DetailLayout
      title="Cosine Similarity - Rumus, Cara Hitung & Contoh Sistem Rekomendasi | KoalaERS"
      metaTitle="Cosine Similarity - Rumus, Cara Hitung & Contoh Sistem Rekomendasi | KoalaERS"
      metaDescription="Pelajari Cosine Similarity untuk sistem rekomendasi. Penjelasan lengkap rumus cosine similarity, cara menghitung kemiripan vektor, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
      metaKeywords="cosine similarity, rumus cosine similarity, cara menghitung cosine similarity, kemiripan cosine, vector similarity, collaborative filtering cosine, sistem rekomendasi cosine, contoh perhitungan cosine, KoalaERS"
      canonicalUrl="https://koalaers.trunojoyo.ac.id/cosineDetail"
      pageTitle="Cosine Similarity"
      bannerHeading1="Penjelasan Cosine"
      bannerHeading2="📍 Detail Perhitungan Cosine"
      bannerParagraph="Menjelaskan tentang Cosine Sistem rekomendasi menggunakan metode Cosine yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna"
      bannerBgColor="bg-green-400"
      bannerImage={Cosine1}
      steps={StepsCosine}
    />
  );
}
