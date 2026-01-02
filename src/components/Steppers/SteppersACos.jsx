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
    `\\[ U_{i} = \\text{Himpunan } \\textit{user } \\text{ yang memberi } \\textit{rating } \\textit{item } \\ i \\]`,
    `\\[ U_{ij} = \\text{Himpunan } \\textit{user } \\text{ yang memberi } \\textit{rating } \\text{pada } \\textit{item } \\ i \\text{ dan } \\textit{item } \\ j \\]`,
    `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{item } \\ i \\]`,
    `\\[ s_{uj} = \\text{Nilai mean-centered dari } \\textit{user } \\ u \\text{ pada } \\textit{item } \\ j \\]`,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailUserACos.detail_formula}
            title="Keterangan User-Based"
          />
          <FunctionMeasureDropdown
            DetailRumus={FormulaDetailItemACos.detail_formula}
            title="Keterangan Item-Based"
          />
        </div>
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
    title: "Contoh Perhitungan Similaritas ACos",
    description:
      "Langkah-langkah menghitung similaritas Adjusted Cosine dengan data contoh",
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
              Contoh: Hitung ACos(u1, u2) - User-Based
            </p>

            <p className="mb-2">
              <strong>Step 1:</strong> Tentukan irisan item yang dirating oleh
              u1 dan u2
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ I_{u1} \\cap I_{u2} = \\{i1, i4, i5, i6\\} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Hitung mean rating masing-masing user
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\mu_{u1} = \\frac{5+4+3+5+4}{5} = 4.2 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ \\mu_{u2} = \\frac{4+5+3+2+3}{5} = 3.4 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 3:</strong> Hitung mean-centered (s) untuk item di
              irisan
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ s_{u1,i1} = 5 - 4.2 = 0.8, \\quad s_{u1,i4} = 3 - 4.2 = -1.2 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ s_{u1,i5} = 5 - 4.2 = 0.8, \\quad s_{u1,i6} = 4 - 4.2 = -0.2 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ s_{u2,i1} = 4 - 3.4 = 0.6, \\quad s_{u2,i4} = 3 - 3.4 = -0.4 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ s_{u2,i5} = 2 - 3.4 = -1.4, \\quad s_{u2,i6} = 3 - 3.4 = -0.4 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 4:</strong> Hitung pembilang (dot product
              mean-centered)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sum s_{u1,i} \\cdot s_{u2,i} = (0.8)(0.6) + (-1.2)(-0.4) + (0.8)(-1.4) + (-0.2)(-0.4) \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 0.48 + 0.48 - 1.12 + 0.08 = -0.08 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 5:</strong> Hitung penyebut (magnitude mean-centered)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum s_{u1,i}^2} = \\sqrt{0.64 + 1.44 + 0.64 + 0.04} = \\sqrt{2.76} = 1.661 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum s_{u2,i}^2} = \\sqrt{0.36 + 0.16 + 1.96 + 0.16} = \\sqrt{2.64} = 1.625 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 6:</strong> Hitung Adjusted Cosine
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ ACos(u1, u2) = \\frac{-0.08}{1.661 \\times 1.625} = \\frac{-0.08}{2.699} = -0.0296 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: ACos(u1, u2) ≈ -0.03 (hubungan sangat lemah/hampir tidak
              ada)
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Contoh Perhitungan Prediksi ACos",
    description:
      "Langkah-langkah menghitung prediksi rating dengan Adjusted Cosine",
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-green-800 mb-2">
              Contoh: Prediksi rating u1 untuk item i2 (User-Based)
            </p>
            <p className="text-sm mb-3">
              Misalkan kita sudah menghitung similarity ACos dan memilih top-2
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
                      ACos(u1, v)
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
                    <td className="border border-gray-300 px-3 py-1">-0.03</td>
                    <td className="border border-gray-300 px-3 py-1">5</td>
                    <td className="border border-gray-300 px-3 py-1">1.6</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-1">u4</td>
                    <td className="border border-gray-300 px-3 py-1">0.78</td>
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
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = \\mu_{u1} + \\frac{\\sum_{v} ACos(u1,v) \\cdot s_{v,i2}}{\\sum_{v} |ACos(u1,v)|} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Substitusi nilai
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = 4.2 + \\frac{(-0.03)(1.6) + (0.78)(-0.4)}{|-0.03| + |0.78|} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{-0.048 - 0.312}{0.03 + 0.78} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{-0.36}{0.81} = 4.2 - 0.444 = 3.756 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: Prediksi rating u1 untuk i2 ≈ 3.76
            </p>
          </div>
        </div>
      </>
    ),
  },
];
