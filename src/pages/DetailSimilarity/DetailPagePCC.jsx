import DetailLayout from "./DetailLayout";
import PCC1 from "../../assets/icons/PCC1.png";
import { StepsPcc } from "../../components/Steppers/SteppersPCC";

export default function DetailPagePCC() {
  return (
    <DetailLayout
      title="Pearson Correlation Coefficient (PCC) - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaTitle="Pearson Correlation Coefficient (PCC) - Rumus, Cara Hitung & Contoh | KoalaERS"
      metaDescription="Pelajari Pearson Correlation Coefficient (PCC) untuk sistem rekomendasi. Penjelasan lengkap rumus PCC, cara menghitung korelasi pearson, contoh perhitungan step-by-step, dan implementasi pada collaborative filtering."
      metaKeywords="pearson correlation coefficient, PCC, rumus PCC, cara menghitung PCC, korelasi pearson, pearson similarity, collaborative filtering PCC, sistem rekomendasi PCC, contoh perhitungan PCC, KoalaERS"
      canonicalUrl="https://koalaers.trunojoyo.ac.id/pccDetail"
      pageTitle="Pearson Correlation Coefficient (PCC)"
      bannerHeading1="Penjelasan Pearson Correlation Coefficient (PCC)"
      bannerHeading2="📍 Detail Perhitungan PCC"
      bannerParagraph="Menjelaskan tentang Pearson Correlation Coefficient (PCC) yang digunakan untuk mengukur kesamaan antara dua objek atau item berdasarkan data pengguna. Dalam perhitungan ini, kita akan membahas bagaimana cara mengimplementasikan metode ini dengan data yang tersedia untuk mendapatkan rekomendasi yang lebih akurat."
      bannerBgColor="bg-blue-400"
      bannerImage={PCC1}
      steps={StepsPcc}
    />
  );
}
