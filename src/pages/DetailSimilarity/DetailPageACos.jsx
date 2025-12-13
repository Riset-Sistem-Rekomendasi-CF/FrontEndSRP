import DetailLayout from "./DetailLayout";
import Acos1 from "../../assets/icons/ACOS1.png";
import { StepsACos } from "../../components/Steppers/SteppersACos";

export default function DetailPageACos() {
  return (
    <DetailLayout
      title="Adjusted Cosine Similarity - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaTitle="Adjusted Cosine Similarity - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaDescription="Pelajari Adjusted Cosine Similarity untuk sistem rekomendasi item-based. Penjelasan lengkap rumus adjusted cosine, perbedaan dengan cosine biasa, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
      metaKeywords="adjusted cosine similarity, rumus adjusted cosine, cara menghitung adjusted cosine, item-based collaborative filtering, perbedaan cosine dan adjusted cosine, sistem rekomendasi adjusted cosine, contoh perhitungan adjusted cosine, KoalaERS"
      canonicalUrl="https://koalaers.trunojoyo.ac.id/acosDetail"
      pageTitle="Adjusted Cosine Similarity (ACos)"
      bannerHeading1="Penjelasan Adjusted Cosine (ACos)"
      bannerHeading2="📍 Detail Perhitungan ACos"
      bannerParagraph="Menjelaskan tentang Adjusted Cosine (ACos) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
      bannerBgColor="bg-yellow-400"
      bannerImage={Acos1}
      steps={StepsACos}
    />
  );
}
