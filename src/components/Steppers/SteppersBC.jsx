import { MathJaxContext } from "better-react-mathjax";
import { FunctionMeasureDropdown } from "../MathSimilarity/DropdownFunction/FunctionMeasureDropdown";
import MathJaxComponent from "../../MathJaxComponent";
import mathjaxConfig from "../../mathjax-config";
import { FormulaPredictionItem, FormulaPredictionUser } from "./SteppersPCC";

const FormulaBCUser = {
  formula: `\\[  BC_{${"user"}}(u,v) = \\sum_a \\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
  detail_formula: [
    `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
    `\\[ P = \\text{Menghitung probabilitas} \\]`,
    `\\[ r_{i*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
  ],
};

const FormulaBCItem = {
  formula: `\\[ BC_{${"item"}}(i,j) = \\sum_a \\sqrt{P\\left(r_{*i}=a\\right)\\times P\\left(r_{*j}=a\\right)}  \\]`,
  detail_formula: [
    `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
    `\\[ P = \\text{Menghitung probabilitas} \\]`,
    `\\[ r_{*i} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
  ],
};

const RatingExplanationTableDua = () => {
  // Data tabel yang berisi nilai dan penjelasan
  const ratingData = [
    {
      value: "1",
      description:
        "Nilai 1 menunjukkan hubungan positif sempurna, artinya dua user atau item memiliki pola rating yang sangat mirip. Misalnya, jika user A memberi rating tinggi pada suatu item, user B cenderung memberi rating tinggi juga pada item yang sama.",
    },
    {
      value: "0",
      description:
        "Nilai 0 berarti tidak ada hubungan linier antara dua user atau item. Perubahan rating user A tidak mempengaruhi rating user D, sehingga rekomendasi berdasarkan pola rating mereka tidak efektif.",
    },
  ];

  return (
    <div className=" mb-4">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nilai</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {ratingData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StepsBC = [
  {
    title: "Apa Itu Bhattacharyya Coefficient (BC)",
    description: "Memahami apa itu BC dan kegunaannya secara umum",
    content: (
      <>
        <p>
          Bhattacharyya Coefficient (BC) adalah metode yang digunakan untuk
          mengukur kesamaan antara dua distribusi probabilitas. BC mengukur
          seberapa mirip dua distribusi probabilitas berdasarkan nilai rata-rata
          dan varians dari distribusi tersebut. BC sering digunakan dalam sistem
          rekomendasi untuk membandingkan pola rating antara dua user atau item.
          Dengan menggunakan BC, kita dapat menentukan seberapa mirip dua user
          atau item berdasarkan data rating yang telah diberikan.
        </p>
      </>
    ),
  },
  {
    title: "Interpretasi Nilai BC",
    description: "Menginterpretasi hasil BC ",
    content: (
      <>
        <RatingExplanationTableDua />
      </>
    ),
  },
  {
    title: "Kelebihan dan Kekurangan BC",
    description: "Menilai kelebihan dan keterbatasan BC",
    content: (
      <>
        <p>
          Bhattacharyya Coefficient memiliki berbagai kelebihan dan kekurangan
          yang penting dipahami dalam konteks Collaborative Filtering. Berikut
          adalah beberapa di antaranya:
        </p>

        <h3 className="font-bold mt-4">
          Kelebihan Bhattacharyya Coefficient (BC):
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Mempertimbangkan distribusi probabilitas:</strong> BC
            mengukur kesamaan antara dua distribusi probabilitas, yang berarti
            ia dapat menangkap informasi yang lebih mendalam tentang pola rating
            pengguna dibandingkan dengan metode berbasis nilai tunggal seperti
            Cosine Similarity. Ini membuat BC sangat berguna dalam memahami
            kesamaan dalam pola rating pengguna atau item.
          </li>
          <li>
            <strong>Menangani data sparse dengan baik:</strong> BC lebih robust
            dalam menangani data sparse, yaitu data yang memiliki banyak nilai
            hilang (misalnya, sebagian besar pengguna tidak memberi rating pada
            sebagian besar item). Dalam Collaborative Filtering, hal ini sangat
            penting karena banyak dataset yang memiliki data yang sangat jarang
            (sparse).
          </li>
          <li>
            <strong>Fleksibel untuk berbagai jenis data:</strong> BC dapat
            diterapkan baik dalam **user-based** maupun **item-based
            Collaborative Filtering**, yang menjadikannya sangat fleksibel dalam
            berbagai jenis sistem rekomendasi.
          </li>
          <li>
            <strong>Pengukuran kesamaan yang lebih tepat:</strong> Karena BC
            berfokus pada distribusi probabilitas, ia dapat memberikan hasil
            yang lebih akurat dalam mengukur kesamaan dua entitas (misalnya, dua
            pengguna atau dua item) daripada metode lain yang hanya mengukur
            kesamaan berdasarkan nilai individu.
          </li>
        </ul>

        <h3 className="font-bold mt-4">
          Kekurangan Bhattacharyya Coefficient (BC):
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Komputasi yang lebih kompleks:</strong> BC membutuhkan
            perhitungan yang lebih kompleks dibandingkan dengan metode lain
            seperti **Cosine Similarity** atau **Pearson Correlation Coefficient
            (PCC)**. Proses penghitungan distribusi probabilitas dan kesamaan
            antara distribusi ini dapat memerlukan waktu komputasi lebih lama,
            terutama pada dataset besar.
          </li>
          <li>
            <strong>Ketergantungan pada distribusi rating:</strong> BC
            mengasumsikan bahwa distribusi rating antar pengguna atau item
            adalah relevan untuk mengukur kesamaan. Ini bisa menjadi kelemahan
            jika distribusi rating pengguna sangat bervariasi atau tidak
            mengikuti pola distribusi yang konsisten.
          </li>
          <li>
            <strong>Kurang efektif untuk data dengan sedikit variasi:</strong>{" "}
            Jika dataset memiliki sedikit variasi dalam rating (misalnya,
            sebagian besar pengguna memberikan rating yang sangat mirip atau
            hampir sama pada semua item), BC mungkin tidak memberikan informasi
            yang cukup untuk membedakan antara entitas yang berbeda.
          </li>
          <li>
            <strong>Tidak dapat mengukur hubungan sebab-akibat:</strong> Sama
            seperti metode kesamaan lainnya, BC hanya mengukur kesamaan antar
            dua entitas (misalnya, antara dua pengguna atau dua item). BC tidak
            dapat menggambarkan atau mengukur hubungan sebab-akibat atau
            korelasi sebab-akibat antara variabel dalam sistem rekomendasi.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Contoh Kasus BC dalam Sistem Rekomendasi",
    description:
      "Menggunakan BC untuk analisis dalam konteks sistem rekomendasi",
    content: (
      <>
        <p>
          Contoh kasus penggunaan Bhattacharyya Coefficient (BC) dalam sistem
          rekomendasi: Misalkan kita memiliki dua user, A dan B, yang memberikan
          rating pada beberapa item. Kita ingin mengetahui seberapa mirip pola
          rating antara user A dan B. Dengan menggunakan BC, kita dapat
          menghitung kesamaan distribusi rating antara kedua user tersebut dan
          menentukan seberapa mirip mereka dalam preferensi rating. Hasil dari
          perhitungan BC dapat membantu kita memberikan rekomendasi yang lebih
          akurat kepada user berdasarkan kesamaan pola rating mereka. Dengan
          demikian, BC dapat menjadi alat yang berguna dalam meningkatkan
          kualitas rekomendasi dalam sistem rekomendasi.
        </p>
      </>
    ),
  },
  {
    title: "Rumus Fungsi Similaritas BC",
    description: "Mengetahui cara menghitung BC dengan rumus matematika",
    content: (
      <>
        <div>
          <p>
            Rumus Bhattacharyya Coefficient (BC) User-Based untuk dua variabel u
            dan v adalah sebagai berikut:
          </p>

          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaBCUser.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown DetailRumus={FormulaBCUser.detail_formula} />
        </div>
        <div>
          <p>
            Rumus Bhattacharyya Coefficient (BC) Item-Based untuk dua variabel i
            dan j adalah sebagai berikut:
          </p>

          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaBCItem.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown DetailRumus={FormulaBCItem.detail_formula} />
        </div>
      </>
    ),
  },
  {
    title: "Prediksi Rating Menggunakan BC",
    description: "Menghitung prediksi rating menggunakan BC",
    content: (
      <>
        <div>
          <p>
            Prediksi rating menggunakan BC dilakukan dengan mengalikan nilai
            similaritas antara user dengan rating yang telah diberikan.
            Misalnya, untuk prediksi rating user u terhadap item i, kita dapat
            menggunakan rumus berikut:
          </p>
          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaPredictionUser.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown
            DetailRumus={FormulaPredictionUser.detail_formula}
          />
        </div>
        <div>
          <p>
            Prediksi rating menggunakan BC dilakukan dengan mengalikan nilai
            similaritas antara item dengan rating yang telah diberikan.
            Misalnya, untuk prediksi rating user u terhadap item i, kita dapat
            menggunakan rumus berikut:
          </p>
          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaPredictionItem.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown
            DetailRumus={FormulaPredictionItem.detail_formula}
          />
        </div>
      </>
    ),
  },
];
