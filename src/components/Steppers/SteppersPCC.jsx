import pccCor from "../../assets/images/detailPage/R.png";

import { MathJaxContext } from "better-react-mathjax";
import { FunctionMeasureDropdown } from "../MathSimilarity/DropdownFunction/FunctionMeasureDropdown";
import MathJaxComponent from "../../MathJaxComponent";
import mathjaxConfig from "../../mathjax-config";

const FormulaDetailUser = {
  formula: `\\[ PCC_{${"{user}"}}(u,v) = \\frac{\\sum_{i\\in I_{u} \\cap I_{v}} s_{ui} s_{vi}}{\\sqrt{\\sum_{i\\in I_{u} \\cap I_{i}} s_{ui}^{2}}\\sqrt{\\sum_{i\\in I_{v} \\cap I_{i}} s_{vi}^{2}}} \\]`,
  detail_formula: [
    `\\[ I_{u} = \\text{Himpunan } \\textit{item} \\text{ yang telah diberi } \\textit{ rating } \\text{oleh } \\textit{user} \\ u \\]`,
    `\\[ U_{ij} = \\text{Kumpulan } \\textit{user} \\text{ yang telah merating pada } \\textit{item} \\text{ yang sama oleh } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,

    `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{ rating } \\textit{item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
  ],
};

const FormulaDetailItem = {
  formula: `\\[ PCC_{${"item"}}(i,j) = \\frac{\\sum_{u\\in U_{i} \\cap U_{j}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{i} \\cap U_{j}} s^{2}_{uj}}} \\]`,
  detail_formula: [
    `\\[ U_{i} = \\text{Himpunan } \\textit{user} \\text{ yang telah memberi } \\textit{rating} \\text{ pada } \\textit{item} \\ i \\]`,
    `\\[ U_{ij} = \\text{Kumpulan } \\textit{user} \\text{ yang telah merating pada } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j \\]`,
    `\\[ s_{ui} = \\text{Nilai mean-centered dari } \\textit{rating} \\textit{ item} \\ i \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
    `\\[ s_{uj} = \\text{Nilai mean-centered dari } \\textit{rating} \\textit{ item} \\ j \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
  ],
};

export const FormulaPredictionUser = {
  formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{u} +\\frac{\\sum_{v\\in  X_{u}(j)} Sim_{uv}* s_{vi}}{\\sum_{v \\in  X_{u}(i)}\\mid Sim_{uv} \\mid} \\]`,
  detail_formula: [
    `\\[ s_{vi} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} u \\]`,

    `\\[ s_{uj} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan oleh } \\textit{user} \\ u \\text{ pada seluruh } \\textit{item} j \\]`,

    `\\[ Sim_{uv} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{user} \\ u \\text{ dan } \\textit{user} \\ v \\]`,
    `\\[ X_{u}(j) = \\text{Himpunan tetangga (top-k) dari } \\textit{user} \\ u \\text{ untuk } \\textit{item} \\ i \\]`,
  ],
};

export const FormulaPredictionItem = {
  formula: `\\[ {\\widetilde{r}_{ui}} = \\mu_{i} +\\frac{\\sum_{j\\in X_{i}(u)} Sim_{ij}* s_{uj}}{\\sum_{j \\in X_{i}(u)}\\mid Sim_{ij} \\mid} \\]`,
  detail_formula: [
    `\\[ \\mu_{i} = \\text{Rata-rata } \\textit{rating} \\text{ yang diberikan pada } \\textit{item} \\ i \\text{ oleh seluruh } \\textit{user} \\]`,
    `\\[ s_{uj} = \\text{Nilai mean-centered dari } \\textit{rating} \\textit{ item} \\ j \\text{ yang telah dinilai oleh } \\textit{user} \\ u \\]`,
    `\\[ Sim_{ij} = \\text{Nilai } \\textit{similarity} \\text{ antara } \\textit{item} \\ i \\text{ dan } \\textit{item} \\ j \\]`,
    `\\[ X_{i}(u) = \\text{Himpunan tetangga (top-k) dari } \\textit{item} \\ i \\text{ untuk } \\textit{user} \\ u \\]`,
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

export const StepsPcc = [
  {
    title: "Apa itu Pearson Correlation Coefficient (PCC)",
    description: "Memahami apa itu PCC dan kegunaannya secara umum",
    content: (
      <>
        <div>
          <p>
            Collaborative filtering adalah teknik dalam sistem rekomendasi yang
            digunakan untuk memprediksi preferensi pengguna berdasarkan data
            pengguna lain yang memiliki pola serupa. Pearson Correlation
            Coefficient (PCC) digunakan untuk mengukur kemiripan antara pengguna
            atau item dengan menghitung hubungan linier antara rating mereka.
            Dengan PCC, kita dapat menemukan pengguna atau item yang paling
            relevan, membantu menghasilkan rekomendasi yang lebih akurat.
          </p>

          <p className="mb-5">
            PCC digunakan secara luas dalam sistem rekomendasi produk, film, dan
            konten lainnya. Berikut adalah ilustrasi dari cara kerjanya:
          </p>
          <div className="flex justify-center items-center">
            <iframe
              title="Video Tutorial PCC"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/k7IctLRiZmo?si=p6H1OxuPi44ROY_-"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md shadow-sm"
            ></iframe>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Interpretasi Nilai PCC",
    description: "Menginterpretasi hasil PCC ",
    content: (
      <>
        <RatingExplanationTableSatu />
        <div className="flex  justify-center my-5">
          <img src={pccCor} alt="PPCOR" />
        </div>
        <p className="text-gray-600 text-center">Gambar Grafik Hubungan PCC</p>
      </>
    ),
  },
  {
    title: "Kelebihan dan Kekurangan PCC",
    description: "Menilai kelebihan dan keterbatasan PCC",
    content: (
      <>
        <p>
          Pearson Correlation Coefficient (PCC) memiliki berbagai kelebihan dan
          kekurangan yang penting untuk dipahami. Berikut adalah beberapa
          kelebihan dan kekurangannya:
        </p>

        <h3 className="font-bold mt-4">Kelebihan PCC:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Mengukur hubungan linier:</strong> PCC sangat efektif dalam
            mengukur hubungan linier antara dua variabel.
          </li>
          <li>
            <strong>Nilai antara -1 dan 1:</strong> Mudah dipahami, dengan nilai
            -1 menunjukkan hubungan negatif sempurna, 1 menunjukkan hubungan
            positif sempurna, dan 0 menunjukkan tidak ada hubungan linier.
          </li>
          <li>
            <strong>Sederhana dan cepat dihitung:</strong> PCC merupakan alat
            yang sederhana dan cepat dalam menghitung hubungan antar variabel.
          </li>
          <li>
            <strong>Fleksibel untuk berbagai jenis data:</strong> PCC dapat
            digunakan dalam berbagai bidang, termasuk ilmu sosial, ekonomi, dan
            bisnis.
          </li>
        </ul>

        <h3 className="font-bold mt-4">Kekurangan PCC:</h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>Hanya mengukur hubungan linier:</strong> PCC tidak dapat
            mengukur hubungan non-linier atau pola hubungan yang lebih kompleks.
          </li>
          <li>
            <strong>Sensitif terhadap outlier:</strong> Kehadiran data ekstrem
            atau outlier dapat mempengaruhi hasil PCC dan memberikan
            interpretasi yang menyesatkan.
          </li>
          <li>
            <strong>Asumsi normalitas data:</strong> PCC mengasumsikan bahwa
            data berdistribusi normal, yang bisa jadi tidak selalu berlaku pada
            data dunia nyata.
          </li>
          <li>
            <strong>Tidak menggambarkan hubungan sebab-akibat:</strong> PCC
            hanya mengukur kekuatan hubungan, tetapi tidak dapat membuktikan
            adanya hubungan sebab-akibat antara dua variabel.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Contoh Kasus PCC dalam Kehiduapan Sehari-hari",
    description: "Menggunakan PCC dala kehidupan sehari-hari",
    content: (
      <>
        <p>
          Contoh kasus penggunaan PCC dalam kehidupan sehari-hari adalah dalam
          sistem rekomendasi film. Dengan menggunakan PCC, sistem rekomendasi
          dapat menemukan pengguna yang memiliki preferensi film yang mirip
          dengan pengguna lain, dan memberikan rekomendasi berdasarkan kesamaan
          preferensi tersebut. Hal ini memungkinkan pengguna untuk menemukan
          film yang sesuai dengan selera mereka, berdasarkan pola rating
          pengguna lain yang serupa. PCC juga digunakan dalam sistem rekomendasi
          produk, musik, dan konten digital lainnya.
        </p>
      </>
    ),
  },
  {
    title: "Rumus Fungsi Similaritas PCC",
    description: "Mengetahui cara menghitung PCC dengan rumus matematika",
    content: (
      <>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8  ">
          <div>
            <p>
              Rumus Pearson Correlation Coefficient (PCC) User-Based untuk dua
              variabel u dan v adalah sebagai berikut:
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
              Rumus Pearson Correlation Coefficient (PCC) Item-Based untuk dua
              variabel i dan j adalah sebagai berikut:
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
    title: "Prediksi Rating Menggunakan PCC",
    description: "Menghitung prediksi rating menggunakan PCC",
    content: (
      <>
        <div className="flex flex-col sm:grid  sm:grid-cols-2 gap-8">
          <div>
            <p>
              Prediksi rating menggunakan PCC dilakukan dengan mengalikan nilai
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
          </div>
          <div>
            <p>
              Prediksi rating menggunakan PCC dilakukan dengan mengalikan nilai
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
    title: "Contoh Perhitungan Similaritas PCC",
    description:
      "Langkah-langkah menghitung similaritas PCC dengan data contoh",
    content: (
      <>
        <div className="space-y-4">
          <p className="font-semibold">
            Data Rating (0 = belum memberi rating):
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
              Contoh: Hitung PCC(u1, u2) - User-Based
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
              <strong>Step 4:</strong> Hitung pembilang (numerator)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sum s_{u1,i} \\cdot s_{u2,i} = (0.8)(0.6) + (-1.2)(-0.4) + (0.8)(-1.4) + (-0.2)(-0.4) \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 0.48 + 0.48 - 1.12 + 0.08 = -0.08 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 5:</strong> Hitung penyebut (denominator)
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum s_{u1,i}^2} = \\sqrt{0.64 + 1.44 + 0.64 + 0.04} = \\sqrt{2.76} = 1.661 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ \\sqrt{\\sum s_{u2,i}^2} = \\sqrt{0.36 + 0.16 + 1.96 + 0.16} = \\sqrt{2.64} = 1.625 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 6:</strong> Hitung PCC
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ PCC(u1, u2) = \\frac{-0.08}{1.661 \\times 1.625} = \\frac{-0.08}{2.699} = -0.0296 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: PCC(u1, u2) ≈ -0.03 (hubungan sangat lemah/hampir tidak
              ada)
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Contoh Perhitungan Prediksi PCC",
    description: "Langkah-langkah menghitung prediksi rating dengan PCC",
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
                    <td className="border border-gray-300 px-3 py-1">-0.03</td>
                    <td className="border border-gray-300 px-3 py-1">5</td>
                    <td className="border border-gray-300 px-3 py-1">1.6</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-1">u4</td>
                    <td className="border border-gray-300 px-3 py-1">0.87</td>
                    <td className="border border-gray-300 px-3 py-1">2</td>
                    <td className="border border-gray-300 px-3 py-1">-0.4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-2">
              <strong>Step 1:</strong> Gunakan rumus prediksi
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = \\mu_{u1} + \\frac{\\sum_{v} Sim(u1,v) \\cdot s_{v,i2}}{\\sum_{v} |Sim(u1,v)|} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Substitusi nilai
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = 4.2 + \\frac{(-0.03)(1.6) + (0.87)(-0.4)}{|-0.03| + |0.87|} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{-0.048 - 0.348}{0.03 + 0.87} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{-0.396}{0.9} = 4.2 - 0.44 = 3.76 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: Prediksi rating u1 untuk i2 ≈ 3.76
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Kesimpulan",
    description: "Menarik kesimpulan dari PCC",
    content: (
      <>
        <p>
          Pearson Correlation Coefficient (PCC) adalah metode yang efektif dalam
          mengukur kemiripan antara pengguna atau item berdasarkan pola rating
          mereka. PCC digunakan dalam sistem rekomendasi untuk menemukan
          pengguna atau item yang paling relevan, dan memberikan rekomendasi
          yang lebih akurat. Dengan memahami konsep PCC dan cara menghitungnya,
          kita dapat meningkatkan kualitas rekomendasi dan pengalaman pengguna.
        </p>
      </>
    ),
  },
];
