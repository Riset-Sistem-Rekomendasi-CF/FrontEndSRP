import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { OnlyDivider } from "../../tabelData/DividerHeading";
import { useState } from "react";

export const Explanation = ({ closePairs, opsional }) => {
  const [selectedPair, setSelectedPair] = useState(null);

  return (
    <div className="mt-6 text-justify max-w-xl w-full px-4 sm:px-0">
      <h2 className="text-xl text-center font-bold mb-3">
        Cara Membaca Scatter Plot 2D
      </h2>

      <p className="text-sm sm:text-base mb-2">
        Plot ini menggunakan{" "}
        <b>
          <a
            className="no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            href="https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Multidimensional Scaling (MDS)
          </a>
        </b>
        , yaitu teknik reduksi dimensi yang memetakan data kompleks ke dalam
        ruang 2 dimensi sambil mempertahankan jarak antar objek.
      </p>

      <p className="text-sm sm:text-base mb-2">
        Setiap titik mewakili{" "}
        <b>{opsional === "user-based" ? "user" : "item"}</b>. Titik yang berada
        dekat secara spasial menunjukkan kemiripan tinggi dalam data asli.
      </p>
      <MathJaxContext>
        <div className="bg-yellow-100 rounded-md shadow-sm p-4 text-gray-900 mb-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            Rumus Euclidean Distance
          </h3>
          <p>
            Plot ini menggunakan teknik <b>Multidimensional Scaling (MDS)</b>{" "}
            untuk mereduksi dimensi data dan memetakan objek ke ruang 2D sambil
            mempertahankan jarak antar objek sebanyak mungkin.
          </p>
          <div className=" overflow-x-auto whitespace-nowrap overflow-y-hidden mb-4">
            <MathJaxContext config={mathjaxConfig}>
              <div className="text-[0.75rem] sm:text-sm md:text-base text-center">
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ d(A, B) = \\sqrt{(x_A - x_B)^2 + (y_A - y_B)^2} $$"}
                </MathJax>
              </div>

              <p className="mt-1 text-sm text-center">
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {/* keteranganm */}
                  {"$$ \\text{Keterangan:} $$"}
                  {
                    "$$ d(A, B) = \\text{Jarak Euclidean antara titik A dan B} $$"
                  }
                  {"$$ (x_A, y_A) = \\text{Koordinat titik A} $$"}
                  {"$$ (x_B, y_B) = \\text{Koordinat titik B} $$"}
                </MathJax>
              </p>
            </MathJaxContext>
          </div>
          <p>
            Dua titik dianggap <b>berdekatan secara spasial</b> jika jaraknya
            lebih kecil dari threshold tertentu (pada case ini menggunakan
            threshold = 0.5). Titik-titik yang berdekatan akan diberi warna biru
            dan jika lebih dari dua titik saling berdekatan, maka akan dibentuk
            area (cluster).
          </p>
          {/* buatkan contoh perhitunganya */}
          <div>
            <p className="mt-2 text-sm">Contoh, misalkan ada dua titik:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Titik A (User-1) di koordinat (1.0, 2.0)</li>
              <li>Titik B (User-2) di koordinat (1.3, 2.4)</li>
            </ul>
            <p className="mt-2 text-sm">
              Maka jarak Euclidean antara titik A dan B adalah:
            </p>
            <div className="text-sm text-center">
              <div className="overflow-x-auto whitespace-nowrap overflow-y-hidden mb-4">
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ d(A, B) = \\sqrt{(1.0 - 1.3)^2 + (2.0 - 2.4)^2} $$"}
                </MathJax>
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ = \\sqrt{(-0.3)^2 + (-0.4)^2} $$"}
                </MathJax>
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ = \\sqrt{0.09 + 0.16} $$"}
                </MathJax>
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ = \\sqrt{0.25} $$"}
                </MathJax>
                <MathJax className="text-[0.75rem] sm:text-sm md:text-base">
                  {"$$ = 0.5 $$"}
                </MathJax>
              </div>

              <p className="mt-1 text-sm">
                Karena jarak 0.5 ini sama dengan threshold, maka titik A dan B
                dianggap berdekatan.
              </p>
              <div className="mt-2 text-sm italic text-gray-600">
                (Catatan: Koordinat titik pada contoh ini hanya ilustrasi dan
                tidak mencerminkan data sebenarnya)
              </div>
            </div>
          </div>
        </div>
      </MathJaxContext>
      <div className="bg-blue-200 rounded-md p-2 shadow-sm">
        <p className="text-lg font-bold mb-1 text-blue-700 text-center">
          {" "}
          {opsional === "user-based" ? "User" : "Item"} yang saling berdekatan:{" "}
        </p>{" "}
        <OnlyDivider colorBorder="border-black" />
        <ul className="text-sm list-disc list-inside text-gray-800 mb-2 max-h-60 overflow-auto">
          {closePairs.map((pair, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center mt-2"
              style={{ minWidth: 0 }} // supaya text overflow gak bikin tombol terdesak
            >
              <span className="flex-1 min-w-0">
                <b>{pair.label1}</b> dekat dengan <b>{pair.label2}</b> karena
                jaraknya{" "}
                <span className="bg-green-200 p-1 rounded-full font-poppins font-semibold text-center">
                  {pair.distance}
                </span>
              </span>
              <button
                className="flex items-center gap-1 text-sm text-gray-700 bg-white/70 hover:bg-white/90 px-2 py-1 rounded-full shadow-sm ml-4 flex-shrink-0"
                onClick={() => {
                  setSelectedPair(pair);
                }}
              >
                <ZoomOutMapIcon fontSize="small" />
                <span className="hidden sm:inline">Lihat Detail</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedPair && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start sm:items-center pt-6 sm:pt-0 z-50 overflow-y-auto">
          <div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg 
            w-full max-w-4xl 
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative"
          >
            {/* Tombol Close */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelectedPair(null)}
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold text-center mb-4">
              Perhitungan Jarak antara{" "}
              <span className="text-blue-600">{selectedPair.label1}</span> dan{" "}
              <span className="text-blue-600">{selectedPair.label2}</span>
            </h3>
            <OnlyDivider />

            <MathJaxContext config={mathjaxConfig}>
              <div className="text-base space-y-4 text-center">
                <p>
                  Diketahui koordinat dari MDS:
                  <br />
                  {selectedPair.label1}: ({selectedPair.x1}, {selectedPair.y1})
                  <br />
                  {selectedPair.label2}: ({selectedPair.x2}, {selectedPair.y2})
                </p>

                <div className="overflow-x-auto whitespace-nowrap">
                  <MathJax>
                    {"$$ d = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2} $$"}
                  </MathJax>
                </div>

                <div className="overflow-x-auto overflow-y-hidden max-w-full">
                  <MathJax>{`$$ = \\sqrt{(${selectedPair.x1.toFixed(
                    6
                  )} - ${selectedPair.x2.toFixed(
                    6
                  )})^2 + (${selectedPair.y1.toFixed(
                    6
                  )} - ${selectedPair.y2.toFixed(6)})^2} $$`}</MathJax>
                </div>

                <MathJax>{`$$ = \\sqrt{${Math.pow(
                  selectedPair.x1 - selectedPair.x2,
                  2
                ).toFixed(6)} + ${Math.pow(
                  selectedPair.y1 - selectedPair.y2,
                  2
                ).toFixed(6)}} $$`}</MathJax>

                <MathJax>{`$$ = ${selectedPair.distance} $$`}</MathJax>

                <p
                  className={`mt-2 font-medium max-w-fit items-center bg-blue-200 rounded-md shadow-sm p-2 text-center mx-auto ${
                    selectedPair.distance <= 0.5
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {selectedPair.distance <= 0.5
                    ? "Karena jarak < 0.5, maka dianggap berdekatan."
                    : "Karena jarak > 0.5, maka tidak berdekatan."}
                </p>
              </div>
            </MathJaxContext>
          </div>
        </div>
      )}
    </div>
  );
};
