// components/Navbar/stepperData.js
import imgWork from "../../../assets/images/imgWorkshop.png";
import GifTut from "../../../assets/vidioAsset/tutorialGif.gif";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import VowelsPana from "../../../assets/images/VowelsPna.png";
import { StepRow } from "../../modal/StepeerModal";

export const StepperData = [
  {
    title: "Step 1: Perkenalan Pada Fitur Eksplorasi",
    content: (
      <>
        <p>
          Pada langkah pertama ini, Anda akan diperkenalkan dengan fitur utama
          dari sistem rekomendasi. Dimana pada fitur latihan akan menjelaskan
          langkah-langkah perhitungan metode user-based dan item-based pada
          fungsi similaritas yang digunakan dimana data rating harus membuat
          terlebih dahulu. Sehingga pengguna bisa bebas untuk membuat tabel data
          rating yang diiginkan setelah selesai membuat data rating pengguna
          baru bisa memulai belajar langkah-langkah perhitungannya.
        </p>
        <div className="flex justify-center">
          <img
            src={imgWork} // Ganti dengan gambar yang relevan
            alt="imgwork"
            className="w-[20rem] h-[20rem]  rounded-lg"
          />
        </div>
      </>
    ),
  },
  {
    title: "Step 2: Langkah-Langkah Sistem Rekomendasi",
    content: (
      <>
        <div>
          <p>
            Pada tahap ini, Anda akan mempelajari langkah-langkah yang perlu
            diikuti untuk menghitung fungsi similaritas berdasarkan data rating
            yang akan digunakan. Berikut adalah langkah-langkah yang perlu
            diikuti:
          </p>
          <StepRow />

          <div className="relative inline-block m-4 shadow-lg rounded-lg overflow-hidden">
            <div className="w-full sm:w-[600px] h-[300px] sm:h-[300px] bg-white p-3 flex items-center justify-center relative">
              <img
                src={GifTut}
                alt="Video Tutorial Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-red-500 font-semibold">
            <NotificationImportantIcon /> Catatan Setiap Cell pada tabel hasil
            perhitungan bisa ditekan dan akan memberikan detail perhitungan atau
            penjelasan lebih lanjut.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Step 3: Metode Prediksi Collaborative Filtering",
    content: (
      <>
        <div>
          <p>
            Pada Prediksi Collaborative Filtering, terdapat dua metode yang bisa
            digunakan, yaitu: User-Based dan Item-Based.
          </p>

          {/* Tabel dua kolom berisi nama metode dan keterangan */}
          <table className="min-w-full table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center font-semibold">
                  Metode
                </th>
                <th className="border px-4 py-2 text-center font-semibold">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">User-Based</td>
                <td className="border px-4 py-2">
                  Metode ini memanfaatkan preferensi pengguna lain yang memiliki
                  kesamaan dalam memberi rating terhadap item. Rekomendasi untuk
                  user target dibuat dengan mencari pengguna lain yang serupa
                  dan memberikan item yang mereka sukai.
                </td>
              </tr>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">Item-Based</td>
                <td className="border px-4 py-2">
                  Dalam metode ini, rekomendasi berdasarkan kesamaan antara item
                  yang telah diberi rating oleh pengguna target. Jika pengguna
                  telah menyukai suatu item, maka item lain yang serupa akan
                  direkomendasikan berdasarkan kesamaan atribut atau preferensi
                  sebelumnya.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: "Step 4: Fungsi Similaritas",
    content: (
      <>
        <div>
          <p>
            Pada Fungsi Similaritas ini, Anda akan mempelajari cara menghitung
            similaritas berdasarkan data rating yang digunakan. Terdapat 4
            Fungsi Similaritas yang bisa digunakan, yaitu:{" "}
            <i>Pearson Correlation Coefficient </i>(PCC), Cosine,{" "}
            <i>Adjusted Vector Cosine </i> (ACos), dan{" "}
            <i>Bhattacharyaa Coefficient Similarity </i> (BC).
          </p>
          {/* Tabel dua kolom berisi nama metode dan keterangan */}
          <table className="min-w-full table-auto border-collapse border ">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center font-semibold">
                  Metode
                </th>
                <th className="border px-4 py-2 text-center font-semibold">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">
                  <i>Pearson Correlation Coefficient </i>(PCC)
                </td>
                <td className="border px-4 py-2">
                  Dalam sudut pandang <i>Collaborative Filtering </i> , PCC
                  menghitung hubungan linier antara dua <i>user </i> atau{" "}
                  <i>item </i> berdasarkan data rating yang telah diberikan oleh{" "}
                  <i>user</i> terhadap <i>item </i>.
                </td>
              </tr>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">Cosine</td>
                <td className="border px-4 py-2">
                  Dalam konteks sistem rekomendasi, cosine similarity digunakan
                  untuk membandingkan kesamaan antara preferensi pengguna atau
                  kesamaan antara item. Nilai yang mendekati 1 menunjukkan
                  korelasi yang kuat antara kedua variabel, sementara nilai yang
                  mendekati 0 menunjukkan tidak adanya korelasi, yang berarti
                  kedua variabel bersifat independen.
                </td>
              </tr>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">
                  <i>Adjusted Vector Cosine </i> (ACos)
                </td>
                <td className="border px-4 py-2">
                  Adjusted Vector Cosine (ACos) adalah variasi dari fungsi
                  similaritas Cosine (Cos) yang mempertimbangkan mean rating
                  yang diberikan oleh masing-masing user. ACos membantu
                  mengatasi masalah bias yang mungkin muncul dari perbedaan
                  skala rating antara user.
                </td>
              </tr>
              <tr className="hover:bg-blue-200 cursor-pointer">
                <td className="border px-4 py-2">
                  <i>Bhattacharyaa Coefficient </i> (BC)
                </td>
                <td className="border px-4 py-2">
                  Dalam sudut pandang pemodelan Collaborative Filtering (CF),
                  perhitungan BC dilakukan dengan mengukur similaritas antara
                  dua distribusi probabilitas histogram rating. Dengan kata
                  lain, kinerja dari BC tergantung pada pola distribusi rating.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: "Step 5: Apa Anda Sudah Siap Untuk Belajar ?",
    content: (
      <>
        <div>
          <p>
            Selesai! Beri tanda centang untuk mengkonfirmasi bahwa Anda telah
            mengerti langkah-langkah yang telah dijelaskan.
          </p>
          <div className="flex justify-center">
            <img
              src={VowelsPana} // Ganti dengan gambar yang relevan
              alt="Pahami Langkah"
              className="w-[20rem] h-[20rem]  rounded-lg"
            />
          </div>
          <p>
            Sekarang adalah waktunya untuk belajar dan mengasah keterampilanmu
            dan tantang pemahamanmu pada Website Media Pembelajaran terkait
            Sistem Rekomendasi ini.
          </p>
        </div>
      </>
    ),
  },
];
