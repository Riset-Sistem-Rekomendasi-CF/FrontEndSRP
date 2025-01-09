import { MathJaxContext } from "better-react-mathjax";
import { FunctionMeasureDropdown } from "../MathSimilarity/DropdownFunction/FunctionMeasureDropdown";
import MathJaxComponent from "../../MathJaxComponent";
import mathjaxConfig from "../../mathjax-config";
import { FormulaPredictionItem, FormulaPredictionUser } from "./SteppersPCC";

const FormulaDetailUser = {
  formula: `\\[ Cosine_{${"user"}}\\left(u,v\\right) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}}r_{ui}r_{vi}}{\\sqrt{\\sum_{u\\in I_{u}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in I_{v}}r^{2}_{vi}}} \\]`,
  detail_formula: [
    `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{rating } \\text{oleh } \\textit{user} \\ u \\]`,
    `\\[ r_{ui} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
  ],
};

const FormulaDetailItem = {
  formula: `\\[  Cosine_{${"item"}}\\left(i,j\\right) = \\frac{\\sum_{u\\in U_{ij}}r_{ui}r_{uj}}{\\sqrt{\\sum_{u\\in U_{i}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{j}}r^{2}_{uj}}} \\]`,
  detail_formula: [
    `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\textit{item} \\ i \\]`,
    `\\[ r_{ui} = \\text{Nilai } \\textit{rating } \\text{pada}  \\textit{user } \\ u \\text{ pada } \\textit{item} \\ i \\]`,
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

export const StepsCosine = [
  {
    title: "Apa itu Cosine Similarity",
    description:
      "Memahami konsep Cosine Similarity dan kegunaannya secara umum",
    content: (
      <>
        <p>
          Cosine Similarity adalah metrik yang digunakan untuk mengukur kesamaan
          arah antara dua vektor dalam ruang berdimensi banyak. Cosine
          Similarity sering digunakan dalam berbagai aplikasi analisis data,
          seperti sistem rekomendasi, pengolahan teks, dan pengenalan pola.
          Cosine Similarity memberikan nilai antara -1 dan 1, di mana nilai 1
          menunjukkan kesamaan sempurna antara dua vektor, nilai 0 menunjukkan
          ketidakserupaan, dan nilai -1 menunjukkan arah yang berlawanan.
        </p>
        <p className="mb-5">
          Cosine Similarity sangat berguna dalam membandingkan dokumen, item,
          atau entitas lain berdasarkan fitur-fitur yang dimiliki oleh
          masing-masing.
        </p>
        <div className="flex justify-center items-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/e9U0QAFbfLI?si=JdjHjRtLpm8Q0lmF"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            allowfullscreen
            className="rounded-md shadow-sm"
          ></iframe>
        </div>
      </>
    ),
  },
  {
    title: "Interpretasi Nilai Cosine Similarity",
    description: "Menginterpretasi Nilai Cosine Similarity ",
    content: (
      <>
        <RatingExplanationTableDua />
      </>
    ),
  },
  {
    title: "Kelebihan dan Kekurangan Cosine Similarity",
    description: "Menilai kelebihan dan keterbatasan Cosine Similarity ",
    content: (
      <>
        <p>
          Cosine Similarity memiliki berbagai kelebihan dan kekurangan yang
          penting dipahami dalam konteks Collaborative Filtering. Berikut adalah
          beberapa di antaranya:
        </p>

        <h3 className="font-bold mt-4">Kelebihan Cosine Similarity:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Mengukur kesamaan sudut antara vektor:</strong> Cosine
            Similarity mengukur kesamaan antara dua vektor dengan menghitung
            sudut antara mereka, yang berguna dalam mengukur kesamaan antara dua
            entitas dalam sistem rekomendasi.
          </li>
          <li>
            <strong>Independen terhadap ukuran vektor:</strong> Cosine
            Similarity tidak dipengaruhi oleh panjang vektor (misalnya, jumlah
            rating atau fitur), sehingga cocok untuk membandingkan vektor yang
            mungkin memiliki ukuran yang berbeda.
          </li>
          <li>
            <strong>Mudah diimplementasikan dan dipahami:</strong> Rumus untuk
            menghitung Cosine Similarity sederhana dan mudah diimplementasikan
            dalam sistem rekomendasi berbasis Collaborative Filtering.
          </li>
          <li>
            <strong>Fleksibel dalam sistem rekomendasi:</strong> Cosine
            Similarity banyak digunakan dalam Collaborative Filtering untuk
            menemukan kesamaan antar pengguna atau item, dan dapat digunakan
            dalam sistem rekomendasi berbasis pengguna maupun item.
          </li>
        </ul>

        <h3 className="font-bold mt-4">Kekurangan Cosine Similarity:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Kesalahan pada vektor dengan sedikit data:</strong> Cosine
            Similarity mungkin memberikan hasil yang tidak akurat jika vektor
            yang dibandingkan memiliki sedikit data atau fitur yang hilang.
          </li>
          <li>
            <strong>Tidak mempertimbangkan preferensi absolut:</strong> Cosine
            Similarity hanya memperhatikan arah (arah sudut) antara dua vektor,
            tanpa mempertimbangkan besaran nilai absolut, yang mungkin penting
            dalam beberapa kasus.
          </li>
          <li>
            <strong>Kesulitan dalam menangani data sparse:</strong> Pada data
            yang sangat sparse (misalnya, data rating pengguna yang sangat
            jarang), Cosine Similarity bisa menghasilkan hasil yang kurang
            akurat.
          </li>
          <li>
            <strong>Masalah dengan kesamaan nol:</strong> Cosine Similarity
            mungkin tidak efektif saat membandingkan item yang memiliki kesamaan
            nol atau sangat sedikit kesamaan (misalnya, jika dua pengguna belum
            memberikan rating pada item yang sama).
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Contoh Kasus Cosine Similarity dalam Sistem Rekomendasi",
    description:
      "Menggunakan Cosine Similarity untuk analisis dalam konteks sistem rekomendasi",
    content: (
      <>
        <p>
          Cosine Similarity sering digunakan dalam sistem rekomendasi berbasis
          konten untuk mengukur kesamaan antara preferensi pengguna dengan item
          yang tersedia. Misalnya, dalam aplikasi film atau musik, sistem akan
          membandingkan film yang telah ditonton pengguna dengan film lain yang
          memiliki genre atau fitur serupa, untuk memberikan rekomendasi yang
          lebih akurat. Cosine Similarity mengukur seberapa mirip dua film atau
          item berdasarkan atribut-atribut mereka.
        </p>
      </>
    ),
  },
  {
    title: "Rumus Fungsi Similartias Cosine Similarity",
    description: "Rumus Cosine Similarity dan cara menghitungnya",
    content: (
      <>
        <div>
          <p>
            Prediksi rating menggunakan Cosine Similarity dilakukan dengan
            mengalikan nilai similaritas antara user dengan rating yang telah
            diberikan. Misalnya, untuk prediksi rating user u terhadap item i,
            kita dapat menggunakan rumus berikut:
          </p>
          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaDetailUser.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailUser.detail_formula}
          />
        </div>
        <div>
          <p>
            Prediksi rating menggunakan Cosine Similarity dilakukan dengan
            mengalikan nilai similaritas antara item dengan rating yang telah
            diberikan. Misalnya, untuk prediksi rating user u terhadap item i,
            kita dapat menggunakan rumus berikut:
          </p>
          <MathJaxContext options={mathjaxConfig}>
            <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
              {/* Membungkus MathJax dengan overflow dan responsif */}
              <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                  {FormulaDetailItem.formula}
                </MathJaxComponent>
              </div>
            </div>
          </MathJaxContext>

          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailItem.detail_formula}
          />
        </div>
      </>
    ),
  },
  {
    title: "Prediksi Rating Menggunakan Cosine Similarity",
    description: "Menghitung prediksi rating menggunakan Cosine Similarity",
    content: (
      <>
        <div>
          <p>
            Prediksi rating menggunakan Cosine Similarity dilakukan dengan
            mengalikan nilai similaritas antara user dengan rating yang telah
            diberikan. Misalnya, untuk prediksi rating user u terhadap item i,
            kita dapat menggunakan rumus berikut:
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
            Prediksi rating menggunakan Cosine Similarity dilakukan dengan
            mengalikan nilai similaritas antara item dengan rating yang telah
            diberikan. Misalnya, untuk prediksi rating user u terhadap item i,
            kita dapat menggunakan rumus berikut:
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
  {
    title: "Kesimpulan",
    description: "Kesimpulan dari Cosine Similarity",
    content: (
      <>
        <p>
          Cosine Similarity adalah metrik yang berguna dalam mengukur kesamaan
          antara dua vektor dalam ruang berdimensi banyak. Dalam konteks
          Collaborative Filtering, Cosine Similarity digunakan untuk mengukur
          kesamaan antara preferensi pengguna atau item berdasarkan rating yang
          telah diberikan. Cosine Similarity memberikan nilai antara -1 dan 1,
          di mana nilai 1 menunjukkan kesamaan sempurna, nilai 0 menunjukkan
          ketidakserupaan, dan nilai -1 menunjukkan arah yang berlawanan.
        </p>
        <p>
          Dengan memahami Cosine Similarity, pengguna dapat menghitung prediksi
          rating dalam sistem rekomendasi berbasis Collaborative Filtering dan
          memahami konsep kesamaan antara pengguna atau item. Cosine Similarity
          memiliki kelebihan dan kekurangan yang perlu dipertimbangkan dalam
          penggunaannya, dan dapat digunakan dalam berbagai aplikasi analisis
          data.
        </p>
      </>
    ),
  },
];
