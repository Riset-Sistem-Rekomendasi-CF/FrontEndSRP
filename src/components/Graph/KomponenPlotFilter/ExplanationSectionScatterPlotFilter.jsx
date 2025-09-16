import { OnlyDivider } from "../../tabelData/DividerHeading";

export const ExplanationSectionScatterPlotFilter = ({ opsional }) => {
  return (
    <div className="mt-6 text-justify mx-auto w-full max-w-full px-4">
      <h2 className="text-xl text-center font-bold mb-3 font-poppins">
        Cara Membaca Scatter Plot 2D
      </h2>
      <p className="text-sm font-medium mb-2 font-poppins">
        Grafik plot ini menunjukkan himpunan{" "}
        {opsional === "user-based" ? "User" : "Item"} yang diambil dari data
        kemiripan pengguna. Setiap titik mewakili{" "}
        {opsional === "user-based" ? "User" : "Item"}, dan posisi titik yang
        diambil berdasarkan Top-K terdekat dan terdapat 2 kriteria dalam memilih
        Top-K :
      </p>

      {/* Tabel untuk Kriteria 1 dan Kriteria 2 */}
      <div className="overflow-x-auto ">
        <table className="max-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-black">Kriteria 1</th>
              <th className="px-4 py-2 border border-black">Kriteria 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-sm px-4 py-2 border border-black bg-green-200">
                Kriteria 1 digunakan untuk memilih Top-K berdasarkan nilai
                similaritas tertinggi terhadap{" "}
                {opsional === "user-based" ? "User" : "Item"} target.
              </td>
              <td className="font-medium text-sm px-4 py-2 border border-black bg-yellow-200">
                Kriteria 2 digunakan ketika{" "}
                {opsional === "user-based" ? "User" : "Item"} dan{" "}
                {opsional === "user-based" ? "Item" : "User"} target sama-sama
                telah memberikan rating.
              </td>
            </tr>
            {/* Baris selanjutnya dapat ditambahkan sesuai kebutuhan */}
          </tbody>
        </table>
        <OnlyDivider />
        <p className="text-sm font-medium mb-2 font-poppins">
          Grafik plot ini menunjukkan himpunan{" "}
          {opsional === "user-based" ? "User" : "Item"} yang diambil dari data
          kemiripan pengguna. Setiap titik mewakili{" "}
          {opsional === "user-based" ? "User" : "Item"}, dan posisi titik yang
          diambil berdasarkan Top-K terdekat dan terdapat 2 kriteria dalam
          memilih Top-K :
        </p>

        {/* Penjelasan tambahan */}
        <div className="bg-green-100 p-3 rounded-md text-sm font-poppins mb-3 border-l-4 border-blue-500">
          <p className="font-semibold mb-1">Penjelasan Tambahan:</p>
          <p>
            Pada grafik ini, titik berwarna hitam merupakan{" "}
            <strong>
              {opsional === "user-based" ? "User" : "Item"} target
            </strong>{" "}
            yang sedang dianalisis. Titik-titik berwarna hijau adalah entitas
            yang termasuk dalam <strong>Top-K terdekat</strong> terhadap target
            berdasarkan kriteria pemilihan berikut:
          </p>
          <ul className="list-disc list-inside mt-2 mb-2">
            <li>
              <strong>Kriteria 1</strong>: Jika target dan entitas lain belum
              memberikan rating pada item yang sama, maka pemilihan Top-K
              dilakukan berdasarkan <em>similaritas tertinggi</em> terhadap
              target (misalnya: menggunakan cosine similarity).
            </li>
            <li>
              <strong>Kriteria 2</strong>: Jika target dan entitas lain telah
              memberikan rating pada item yang sama, maka Top-K dipilih
              berdasarkan <em>nilai rating aktual</em> untuk membandingkan
              kesamaan persepsi.
            </li>
          </ul>
          <p>
            Sedangkan titik-titik berwarna merah merupakan entitas yang{" "}
            <strong>tidak termasuk</strong> ke dalam Top-K. Ellips berwarna
            menggambarkan kelompok atau kedekatan antar entitas berdasarkan
            kemiripan posisi pada ruang vektorial 2D.
          </p>
        </div>
      </div>
    </div>
  );
};
