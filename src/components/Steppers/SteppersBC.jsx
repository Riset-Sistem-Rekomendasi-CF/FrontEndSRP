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
    `\\[ r_{ij*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,

    `\\[ r_{uv*} = \\text{Seluruh nilai } \\textit{rating } \\textit{ item } \\text{ yang telah diberi oleh } \\textit{ user } \\ i \\]`,
  ],
};

const FormulaBCItem = {
  formula: `\\[ BC_{${"item"}}(i,j) = \\sum_a \\sqrt{P\\left(r_{*i}=a\\right)\\times P\\left(r_{*j}=a\\right)}  \\]`,
  detail_formula: [
    `\\[ a = \\text{mewakili semua nilai dalam distribusi atau seluruh nilai } \\textit{rating } \\]`,
    `\\[ P = \\text{Menghitung probabilitas} \\]`,
    `\\[ r_{*i} = \\text{Seluruh nilai } \\textit{rating } \\text{ yang diberikan oleh semua } \\textit{user } \\text{ pada } \\textit{item } \\ i \\]`,
    `\\[ r_{*j} = \\text{Seluruh nilai } \\textit{rating } \\text{ yang diberikan oleh semua } \\textit{user } \\text{ pada } \\textit{item } \\ j \\]`,
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
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
          <div>
            <p>
              Rumus Bhattacharyya Coefficient (BC) User-Based untuk dua variabel
              u dan v adalah sebagai berikut:
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
          </div>
          <div>
            <p>
              Rumus Bhattacharyya Coefficient (BC) Item-Based untuk dua variabel
              i dan j adalah sebagai berikut:
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
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FunctionMeasureDropdown
            DetailRumus={FormulaBCUser.detail_formula}
            title="Keterangan User-Based"
          />
          <FunctionMeasureDropdown
            DetailRumus={FormulaBCItem.detail_formula}
            title="Keterangan Item-Based"
          />
        </div>
      </>
    ),
  },
  {
    title: "Prediksi Rating Menggunakan BC",
    description: "Menghitung prediksi rating menggunakan BC",
    content: (
      <>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
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
    title: "Contoh Perhitungan Similaritas BC",
    description: "Langkah-langkah menghitung similaritas BC dengan data contoh",
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
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="font-semibold text-yellow-800 mb-2">
              Contoh: Hitung BC(u1, u2) - User-Based
            </p>

            <p className="mb-2">
              <strong>Step 1:</strong> Hitung frekuensi rating untuk setiap user
              (rating 1-5)
            </p>
            <div className="overflow-x-auto mb-3">
              <table className="table-auto border-collapse border border-gray-300 text-sm mx-auto">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="border border-gray-300 px-2 py-1">Rating</th>
                    <th className="border border-gray-300 px-2 py-1">1</th>
                    <th className="border border-gray-300 px-2 py-1">2</th>
                    <th className="border border-gray-300 px-2 py-1">3</th>
                    <th className="border border-gray-300 px-2 py-1">4</th>
                    <th className="border border-gray-300 px-2 py-1">5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      u1 freq
                    </td>
                    <td className="border border-gray-300 px-2 py-1">0</td>
                    <td className="border border-gray-300 px-2 py-1">0</td>
                    <td className="border border-gray-300 px-2 py-1">1</td>
                    <td className="border border-gray-300 px-2 py-1">2</td>
                    <td className="border border-gray-300 px-2 py-1">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      u2 freq
                    </td>
                    <td className="border border-gray-300 px-2 py-1">0</td>
                    <td className="border border-gray-300 px-2 py-1">1</td>
                    <td className="border border-gray-300 px-2 py-1">2</td>
                    <td className="border border-gray-300 px-2 py-1">1</td>
                    <td className="border border-gray-300 px-2 py-1">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-2">
              <strong>Step 2:</strong> Hitung probabilitas P(r=a) untuk setiap
              rating
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ P(r_{u1}=3) = \\frac{1}{5} = 0.2, \\quad P(r_{u1}=4) = \\frac{2}{5} = 0.4, \\quad P(r_{u1}=5) = \\frac{2}{5} = 0.4 \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ P(r_{u2}=2) = \\frac{1}{5} = 0.2, \\quad P(r_{u2}=3) = \\frac{2}{5} = 0.4, \\quad P(r_{u2}=4) = \\frac{1}{5} = 0.2, \\quad P(r_{u2}=5) = \\frac{1}{5} = 0.2 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 3:</strong> Hitung BC dengan menjumlahkan √(P_u1 ×
              P_u2) untuk setiap rating
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ BC(u1,u2) = \\sqrt{0 \\times 0} + \\sqrt{0 \\times 0.2} + \\sqrt{0.2 \\times 0.4} + \\sqrt{0.4 \\times 0.2} + \\sqrt{0.4 \\times 0.2} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 0 + 0 + \\sqrt{0.08} + \\sqrt{0.08} + \\sqrt{0.08} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 0 + 0 + 0.283 + 0.283 + 0.283 = 0.849 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: BC(u1, u2) ≈ 0.85 (cukup mirip)
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Contoh Perhitungan Prediksi BC",
    description: "Langkah-langkah menghitung prediksi rating dengan BC",
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-green-800 mb-2">
              Contoh: Prediksi rating u1 untuk item i2 (User-Based)
            </p>
            <p className="text-sm mb-3">
              Misalkan kita sudah menghitung similarity BC dan memilih top-2
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
                      BC(u1, v)
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
                    <td className="border border-gray-300 px-3 py-1">0.85</td>
                    <td className="border border-gray-300 px-3 py-1">5</td>
                    <td className="border border-gray-300 px-3 py-1">1.6</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-1">u4</td>
                    <td className="border border-gray-300 px-3 py-1">0.72</td>
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
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = \\mu_{u1} + \\frac{\\sum_{v} BC(u1,v) \\cdot s_{v,i2}}{\\sum_{v} |BC(u1,v)|} \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mb-2">
              <strong>Step 2:</strong> Substitusi nilai
            </p>
            <MathJaxContext options={mathjaxConfig}>
              <MathJaxComponent>{`\\[ \\widetilde{r}_{u1,i2} = 4.2 + \\frac{(0.85)(1.6) + (0.72)(-0.4)}{|0.85| + |0.72|} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + \\frac{1.36 - 0.288}{1.57} = 4.2 + \\frac{1.072}{1.57} \\]`}</MathJaxComponent>
              <MathJaxComponent>{`\\[ = 4.2 + 0.683 = 4.88 \\]`}</MathJaxComponent>
            </MathJaxContext>

            <p className="mt-3 text-green-700 font-semibold">
              Hasil: Prediksi rating u1 untuk i2 ≈ 4.88
            </p>
          </div>
        </div>
      </>
    ),
  },
];
