import { MathJaxContext } from "better-react-mathjax";
import { FunctionMeasureDropdown } from "../MathSimilarity/DropdownFunction/FunctionMeasureDropdown";
import MathJaxComponent from "../../MathJaxComponent";
import mathjaxConfig from "../../mathjax-config";
import { FormulaPredictionItem, FormulaPredictionUser } from "./SteppersPCC";

const FormulaDetailUser = {
  formula: `\\[ Cosine_{${"user"}}\\left(u,v\\right) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}}r_{ui}r_{vi}}{\\sqrt{\\sum_{u\\in I_{u}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in I_{v}}r^{2}_{vi}}} \\]`,
  detail_formula: [
    `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{rating } \\text{oleh } \\textit{user} \\ u \\]`,
    `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\textit{item} \\ i \\]`,
    `\\[ r_{ui} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
  ],
};

const FormulaDetailItem = {
  formula: `\\[  Cosine_{${"item"}}\\left(i,j\\right) = \\frac{\\sum_{u\\in U_{ij}}r_{ui}r_{uj}}{\\sqrt{\\sum_{u\\in U_{i}}r^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{j}}r^{2}_{uj}}} \\]`,
  detail_formula: [
    `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\textit{item} \\ i \\]`,
    `\\[ U_{ij} = \\text{Himpunan } \\textit{user } \\text{ yang telah memberi } \\textit{ rating } \\text{pada } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j \\]`,
    `\\[ r_{ui} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ i \\]`,
    `\\[ r_{uj} = \\textit{Rating } \\textit{user } \\ u \\text{ terhadap } \\textit{item} \\ j \\]`,
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
            frameBorder="0"
            allowFullScreen
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
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
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
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailUser.detail_formula}
            title="Keterangan User-Based"
          />
          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailItem.detail_formula}
            title="Keterangan Item-Based"
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
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
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
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FunctionMeasureDropdown
            DetailRumus={FormulaPredictionUser.detail_formula}
            title="Keterangan User-Based"
          />
          <FunctionMeasureDropdown
            DetailRumus={FormulaPredictionItem.detail_formula}
            title="Keterangan Item-Based"
          />
        </div>
      </>
    ),
  },
  {
    title: "Contoh Perhitungan Similaritas Cosine",
    description:
      "Langkah-langkah menghitung similaritas Cosine dengan data contoh",
    content: (
      <>
        <div className="space-y-4">
          <p className="font-semibold">
            Data Rating (- = belum memberi rating):
          </p>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 text-sm w-full max-w-md mx-auto">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-2 py-1">U/I</th>
                  <th className="border border-gray-300 px-2 py-1">i1</th>
                  <th className="border border-gray-300 px-2 py-1">i2</th>
                  <th className="border border-gray-300 px-2 py-1">i3</th>
                  <th className="border border-gray-300 px-2 py-1">i4</th>
                  <th className="border border-gray-300 px-2 py-1">i5</th>
                  <th className="border border-gray-300 px-2 py-1">i6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    u1
                  </td>
                  <td className="border border-gray-300 px-2 py-1">5</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">5</td>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    u2
                  </td>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                  <td className="border border-gray-300 px-2 py-1">5</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    u3
                  </td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    u4
                  </td>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    u5
                  </td>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">2</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                  <td className="border border-gray-300 px-2 py-1">3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="font-semibold text-yellow-800 mb-2">
              Contoh: Hitung Cosine(u1, u2) - User-Based
            </p>

            <p className="mb-2">
              <strong>Step 1:</strong> Tentukan irisan item yang dirating oleh
              u1 dan u2
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ I_{u1} \\cap I_{u2} = \\{i1, i4, i5, i6\\} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Ambil rating pada item di irisan
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ r_{u1} = (5, 3, 5, 4), \\quad r_{u2} = (4, 3, 2, 3) \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 3:</strong> Hitung pembilang (dot product)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sum r_{u1,i} \\cdot r_{u2,i} = (5)(4) + (3)(3) + (5)(2) + (4)(3) \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 20 + 9 + 10 + 12 = 51 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 4:</strong> Hitung penyebut (magnitude)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum r_{u1,i}^2} = \\sqrt{25 + 9 + 25 + 16} = \\sqrt{75} = 8.66 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum r_{u2,i}^2} = \\sqrt{16 + 9 + 4 + 9} = \\sqrt{38} = 6.16 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 5:</strong> Hitung Cosine Similarity
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ Cosine(u1, u2) = \\frac{51}{8.66 \\times 6.16} = \\frac{51}{53.35} = 0.956 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: Cosine(u1, u2) ≈ 0.96 (sangat mirip)
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Contoh Perhitungan Prediksi Cosine",
    description: "Langkah-langkah menghitung prediksi rating dengan Cosine",
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-green-800 mb-2">
              Contoh: Prediksi rating u1 untuk item i2 (User-Based)
            </p>
            <p className="text-sm mb-3">
              Misalkan kita sudah menghitung similarity dan memilih top-2
              neighbors:
            </p>

            <div className="overflow-x-auto mb-3">
              <table className="table-auto border-collapse border border-gray-300 text-sm mx-auto">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 px-3 py-1">
                      Neighbor
                    </th>
                    <th className="border border-gray-300 px-3 py-1">
                      Sim(u1, v)
                    </th>
                    <th className="border border-gray-300 px-3 py-1">
                      r(v, i2)
                    </th>
                    <th className="border border-gray-300 px-3 py-1">
                      s(v, i2)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-1">u2</td>
                    <td className="border border-gray-300 px-3 py-1">0.96</td>
                    <td className="border border-gray-300 px-3 py-1">5</td>
                    <td className="border border-gray-300 px-3 py-1">1.6</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-1">u4</td>
                    <td className="border border-gray-300 px-3 py-1">0.85</td>
                    <td className="border border-gray-300 px-3 py-1">2</td>
                    <td className="border border-gray-300 px-3 py-1">-0.4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-2">
              <strong>Step 1:</strong> Gunakan rumus prediksi (μ_u1 = 4.2)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = \\mu_{u1} + \\frac{\\sum_{v} Sim(u1,v) \\cdot s_{v,i2}}{\\sum_{v} |Sim(u1,v)|} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Substitusi nilai
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = 4.2 + \\frac{(0.96)(1.6) + (0.85)(-0.4)}{|0.96| + |0.85|} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{1.536 - 0.34}{1.81} = 4.2 + \\frac{1.196}{1.81} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + 0.66 = 4.86 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: Prediksi rating u1 untuk i2 ≈ 4.86
            </p>
          </div>
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
