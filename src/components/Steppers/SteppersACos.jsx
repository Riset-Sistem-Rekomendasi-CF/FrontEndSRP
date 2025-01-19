import { MathJaxContext } from "better-react-mathjax";
import { FunctionMeasureDropdown } from "../MathSimilarity/DropdownFunction/FunctionMeasureDropdown";
import MathJaxComponent from "../../MathJaxComponent";
import mathjaxConfig from "../../mathjax-config";
import { FormulaPredictionItem, FormulaPredictionUser } from "./SteppersPCC";

export const FormulaDetailUserACos = {
  formula: `\\[ ACosine_{${"user"}}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{u \\in I_{u} \\cap I_{v}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in I_{u} \\cap I_{v}} s_{vi}^{2}}} \\]`,
  detail_formula: [
    `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{item } \\ i \\]`,
    `\\[ U_{i} = \\text{Himpunan } \\textit{ user } \\text{ yang memberi } \\textit{rating } \\textit{ item } \\ i \\]`,

    `\\[ I_{u} = \\text{Himpunan } \\textit{item } \\text{ yang telah diberi } \\textit{ rating } \\text{oleh} \\textit{ user } \\ u \\]`,
  ],
};

export const FormulaDetailItemACos = {
  formula: `\\[ ACosine_{${"item"}}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u \\in U_{i} \\cap U_{j}} s_{ui}^{2}}\\sqrt{\\sum_{i \\in U_{i} \\cap U_{j}} s_{uj}^{2}}} \\]`,
  detail_formula: [
    `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{ item } \\ i \\]`,
  ],
};

const RatingExplanationTableSatu = () => {
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
    {
      value: "-1",
      description:
        "Nilai -1 menunjukkan hubungan negatif sempurna, di mana kedua user atau item memiliki pola rating yang bertentangan. Contohnya, jika user A tidak menyukai suatu item, user C mungkin justru menyukai item tersebut.",
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

export const StepsACos = [
  {
    title: "Apa Itu Adjusted Cosine Similarity (ACos)",
    description: "Memahami apa itu ACos dan kegunaannya secara umum",
    content: (
      <>
        "Adjusted Cosine Similarity (ACos) adalah metrik yang digunakan untuk
        mengukur kesamaan antara dua pengguna berdasarkan perbedaan rating
        mereka terhadap item. ACos disesuaikan dengan mengurangi pengaruh bias
        individu terhadap item yang mereka beri rating, sehingga memungkinkan
        perbandingan yang lebih adil antara pengguna yang memiliki preferensi
        yang berbeda. ACos sering digunakan dalam sistem rekomendasi berbasis
        kolaboratif untuk mengukur kesamaan antara pengguna.",
      </>
    ),
  },
  {
    title: "Penerapan ACos pada Data Empiris",
    description: "Menerapkan ACos pada data nyata untuk analisis lebih lanjut",
    content: (
      <>
        "ACos banyak digunakan dalam sistem rekomendasi berbasis kolaboratif
        untuk mengukur kesamaan antara pengguna. Sebagai contoh, sistem
        rekomendasi film dapat menggunakan ACos untuk mencari pengguna dengan
        selera yang serupa, sehingga dapat memberikan rekomendasi film yang
        relevan. ACos menghilangkan pengaruh bias individu, seperti perbedaan
        dalam kebiasaan memberi rating antara pengguna, dan fokus pada kesamaan
        preferensi terhadap item tertentu.",
      </>
    ),
  },
  {
    title: "Interpretasi Nilai ACos",
    description: "Menginterpretasi hasil ACos ",
    content: (
      <>
        <RatingExplanationTableSatu />
      </>
    ),
  },
  {
    title: "Kelebihan dan Kekurangan ACos",
    description: "Menilai kelebihan dan keterbatasan ACos",
    content: (
      <>
        <p>
          Adjusted Cosine Similarity (ACos) memiliki berbagai kelebihan dan
          kekurangan yang penting untuk dipahami dalam konteks **Collaborative
          Filtering**. Berikut adalah beberapa kelebihan dan kekurangannya:
        </p>

        <h3 className="font-bold mt-4">Kelebihan ACos:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Memperhitungkan bias pengguna:</strong> ACos mengatasi
            kelemahan dari Cosine Similarity dengan menyesuaikan perbedaan
            preferensi dasar antara pengguna, seperti kecenderungan untuk
            memberikan rating lebih tinggi atau lebih rendah pada semua item.
          </li>
          <li>
            <strong>Mengukur hubungan linier antar item atau pengguna:</strong>{" "}
            ACos sangat efektif dalam mengukur kesamaan linier antar item atau
            pengguna setelah memperhitungkan bias individu, membuatnya lebih
            relevan dalam sistem rekomendasi.
          </li>
          <li>
            <strong>Nilai antara -1 dan 1:</strong> Nilai ACos juga mudah
            dipahami, dengan nilai -1 menunjukkan kesamaan negatif sempurna, 1
            menunjukkan kesamaan positif sempurna, dan 0 menunjukkan tidak ada
            kesamaan.
          </li>
          <li>
            <strong>Fleksibel untuk berbagai jenis data:</strong> ACos dapat
            digunakan dalam berbagai bidang dan jenis data dalam **Collaborative
            Filtering**, seperti pengguna terhadap item atau antar item itu
            sendiri.
          </li>
        </ul>

        <h3 className="font-bold mt-4">Kekurangan ACos:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Hanya mengukur hubungan linier:</strong> ACos tetap terbatas
            dalam mengukur hanya hubungan linier antar pengguna atau item,
            sehingga tidak bisa mengukur hubungan non-linier atau pola yang
            lebih kompleks.
          </li>
          <li>
            <strong>Kompleksitas perhitungan lebih tinggi:</strong> Dibandingkan
            dengan metode Cosine Similarity biasa, ACos memerlukan perhitungan
            tambahan untuk mengurangi bias pengguna, sehingga lebih kompleks dan
            memerlukan lebih banyak waktu komputasi.
          </li>
          <li>
            <strong>Sensitif terhadap data sparsitas:</strong> Seperti halnya
            metode lain dalam **Collaborative Filtering**, ACos bisa memberikan
            hasil yang kurang akurat pada data yang sangat sparse, yaitu ketika
            pengguna atau item hanya memberikan sedikit rating.
          </li>
          <li>
            <strong>Asumsi distribusi rating pengguna:</strong> ACos
            mengasumsikan bahwa rating yang diberikan oleh pengguna terhadap
            item memiliki distribusi tertentu, yang mungkin tidak selalu berlaku
            pada semua dataset dunia nyata.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Contoh Kasus ACos dalam Sistem Rekomendasi Film",
    description:
      "Menggunakan ACos untuk analisis dalam konteks sistem rekomendasi film",
    content: (
      <>
        <p>
          Contoh kasus ACos dalam sistem rekomendasi film adalah sebagai berikut
          : Jika user A memberi rating tinggi pada film X dan user B memberi
          rating tinggi pada film X dan film Y, maka ACos akan menghitung
          kesamaan antara user A dan user B berdasarkan rating yang mereka
          berikan pada film X. Dengan demikian, ACos dapat membantu sistem
          rekomendasi untuk menemukan pengguna dengan preferensi yang serupa dan
          memberikan rekomendasi film yang relevan kepada mereka.
        </p>
      </>
    ),
  },
  {
    title: "Rumus Fungsi Similaritas Ajusted Cosine",
    description:
      "Mengetahui cara menghitung Ajusted Cosine dengan rumus matematika",
    content: (
      <>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
          <div>
            <p>
              Rumus Ajusted (ACos) User-Based untuk dua variabel u dan v adalah
              sebagai berikut:
            </p>

            <MathJaxContext options={mathjaxConfig}>
              <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
                {/* Membungkus MathJax dengan overflow dan responsif */}
                <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                  <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                    {FormulaDetailUserACos.formula}
                  </MathJaxComponent>
                </div>
              </div>
            </MathJaxContext>
          </div>
          <div>
            <p>
              Rumus Ajusted (ACos) Item-Based untuk dua variabel i dan j adalah
              sebagai berikut:
            </p>

            <MathJaxContext options={mathjaxConfig}>
              <div className="flex justify-start items-start text-start flex-col px-4 sm:px-8 md:px-10 w-full">
                {/* Membungkus MathJax dengan overflow dan responsif */}
                <div className="w-full max-w-full overflow-x-auto sm:overflow-x-visible">
                  <MathJaxComponent className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 break-words text-center sm:text-left md:text-left">
                    {FormulaDetailItemACos.formula}
                  </MathJaxComponent>
                </div>
              </div>
            </MathJaxContext>
          </div>
        </div>
        <FunctionMeasureDropdown
          DetailRumus={FormulaDetailUserACos.detail_formula}
        />
      </>
    ),
  },
  {
    title: "Prediksi Rating Menggunakan Ajusted Cosine",
    description: "Menghitung prediksi rating menggunakan Ajusted Cosine",
    content: (
      <>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
          <div>
            <p>
              Prediksi rating menggunakan Ajusted Cosine dilakukan dengan
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
          </div>
          <div>
            <p>
              Prediksi rating menggunakan Ajusted Cosine dilakukan dengan
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
          </div>
        </div>

        <FunctionMeasureDropdown
          DetailRumus={FormulaPredictionUser.detail_formula}
        />
      </>
    ),
  },
];
