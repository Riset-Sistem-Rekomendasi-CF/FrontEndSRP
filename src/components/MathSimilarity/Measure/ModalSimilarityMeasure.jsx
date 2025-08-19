import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import {
  FormulaSimilarityIndex,
  FormulaSimilarityNonZero,
  FormulaSimilarityValue,
  getFormulaSimilarity,
} from "./Formula/FormulaSimilarity";
import { transposeMatrix } from "../../../helper/helper";
import { useState } from "react";
import SwitchToggle from "../../Toggle/SwitchToggle";
import MathJaxComponent from "../../../MathJaxComponent";
import LegendTable from "../../tabelData/LegendTable";
import Warm from "../../Warm/Warm";
import { sum } from "../../../helper/Measure";
import CloseIcon from "@mui/icons-material/Close";
import { SimilarityIndex } from "./Similarity/SimilarityIndex";
import { SimilarityIndexNonZero } from "./Similarity/SimilarityIdxNonZero";
import { SimilarityValue } from "./Similarity/SimilarityValue";

export default function ModalSimilarity({
  data,
  close,
  selectedIndex,
  selectedMean,
  dataOnly,
  similarity,
  opsional,
  headers,
  columns,
  funnyMode,
}) {
  const dataModify =
    similarity !== "Cosine" && similarity !== "Bhattacharyya Coefficient"
      ? similarity === "Adjusted Cosine" || opsional === "item-based"
        ? transposeMatrix(data["mean-centered"])
        : data["mean-centered"]
      : dataOnly;

  const [isNotation, setIsNotation] = useState(false);

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const numberOfColumnsCen = dataOnly[0].length;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  // Emoji
  // const headers = emoji.GEmot(5, "item")
  // const columns = emoji.GEmot(5, "user")

  // handle new windows
  const handleOpenDetailSimilarity = () => {
    const detailData = {
      data,
      close,
      selectedIndex,
      selectedMean,
      dataOnly,
      similarity,
      opsional,
      headers,
      columns,
      funnyMode,
    };

    // simpan ke sessionStorage
    sessionStorage.setItem("similarityDetail", JSON.stringify(detailData));
    // buka jendela baru
    setTimeout(() => {
      const newTab = window.open("/detail-similarity", "_blank");
      if (!newTab) {
        alert(
          "Silakan nonaktifkan pop-up blocker untuk membuka detail similarity."
        );
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg 
            w-full max-w-4xl 
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative"
      >
        {/* Header / Title */}
        <div className="relative">
          <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm">
            <span>Detail Perhitungan Fungsi Similaritas</span>
          </h2>
          <button
            onClick={close}
            className="absolute top-1 right-2 text-lg text-gray-600 hover:text-gray-800 focus:outline-none bg-red-200 px-2 py-1 rounded-full z-20"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <SwitchToggle
          changeToggle={handleIsNotation}
          title={"Tampilkan Notasi"}
        />

        <h2 className="font-semibold text-md mt-4">
          Data Tabel Mean-Centered {similarity}
        </h2>

        {/* Tabel dengan Scroll Horizontal */}
        <div className="overflow-x-auto mt-4">
          <table className="border border-black mx-auto text-center w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2">U/I</th>
                {Array.from({ length: numberOfColumnsCen }, (_, index) => (
                  <th key={index} className="border border-black px-4 py-2">
                    {!isNotation ? (
                      !funnyMode ? (
                        index + 1
                      ) : (
                        (opsional === "user-based" ? columns : headers)[index]
                      )
                    ) : (
                      <span className="font-serif">
                        i<sub>{index + 1}</sub>
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataModify.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-black px-4 py-2 w-20 bg-gray-200">
                    {!isNotation ? (
                      !funnyMode ? (
                        rowIndex + 1
                      ) : (
                        (opsional === "user-based" ? columns : headers)[
                          rowIndex
                        ]
                      )
                    ) : (
                      <span className="font-serif">
                        u<sub>{rowIndex + 1}</sub>
                      </span>
                    )}
                  </td>
                  {row.map((value, colIndex) => {
                    const IsZero = dataOnly[rowIndex][colIndex] === 0;
                    return (
                      <td
                        key={colIndex}
                        className={`border border-black px-4 py-2 text-center w-20 
                    ${IsZero ? "bg-red-200" : ""} 
                    ${
                      !IsZero &&
                      selectedIndex.includes(
                        opsional === "item-based" ? colIndex : rowIndex
                      )
                        ? "bg-green-200"
                        : ""
                    }`}
                      >
                        {!isNotation ? (
                          value.toFixed(
                            similarity !== "Cosine" &&
                              similarity !== "Bhattacharyya Coefficient (BC)"
                              ? 2
                              : 0
                          )
                        ) : (
                          <span className="font-serif">
                            {`${
                              similarity !== "Cosine" &&
                              similarity !== "Bhattacharyya Coefficient"
                                ? "s"
                                : "r"
                            }`}
                            <sub>
                              {colIndex + 1}
                              {rowIndex + 1}
                            </sub>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button
              className="text-center p-2 mt-2 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors  font-semibold"
              onClick={handleOpenDetailSimilarity}
            >
              Detail Fungsi Similaritas {capitalize(opsional.split("-")[0])}
            </button>
          </div>

          {/* Tabel Legend */}
          <LegendTable
            list={[
              {
                color: "bg-green-200",
                description: (
                  <>
                    <p>
                      Menandakan Data <i className="mx-1"> Rating </i> yang akan
                      dihitung
                    </p>
                  </>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <>
                    <p>
                      Menandakan Data <i className="mx-1"> Rating </i> yang
                      tidak diketahui
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* MathJax untuk rumus */}
        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left">
              {selectedIndex ? (
                <>
                  {/* RUMUS */}
                  <div className="w-full min-w-[200px]">
                    <SimilarityIndex
                      rowIndex={selectedIndex[0]}
                      colIndex={selectedIndex[1]}
                      dataOnly={dataOnly}
                      opsional={opsional}
                      isNotation={isNotation}
                      similarity={similarity}
                    />
                  </div>
                  {/* END RUMUS */}
                  {/* IRISAN */}
                  {similarity !== "Bhattacharyya Coefficient" ? (
                    <div className="w-full min-w-[200px]">
                      <SimilarityIndexNonZero
                        rowIndex={selectedIndex[0]}
                        colIndex={selectedIndex[1]}
                        similarity={similarity}
                        opsional={opsional}
                        dataOnly={dataOnly}
                        isNotation={isNotation}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p>No expression selected.</p>
              )}
              {/* END IRISAN */}
            </div>
          </div>
        </MathJaxContext>

        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left">
              {/* DETAIL PERHITUNGAN */}
              {selectedIndex && dataOnly ? (
                <>
                  <div>
                    <SimilarityValue
                      rowIndex={selectedIndex[0]}
                      colIndex={selectedIndex[1]}
                      data={data}
                      dataOnly={dataOnly}
                      similarity={similarity}
                      selectedMean={selectedMean}
                      opsional={opsional}
                      isNotation={isNotation}
                    />
                  </div>
                </>
              ) : (
                <p>No expression selected.</p>
              )}
              {/* END DETAIL PERHITUNGAN */}
            </div>
          </div>
        </MathJaxContext>

        <p className="text-xl font-bold text-gray-700 mt-5 sm:text-md md:text-lg lg:text-xl xl:text-2xl">
          Hasil Similaritas antara{" "}
          <span className="italic">
            {opsional.split("-")[0]}-{selectedIndex[0] + 1} dengan{" "}
            {opsional.split("-")[0]}-{selectedIndex[1] + 1} ={" "}
            {selectedMean.toFixed(4)}
          </span>
        </p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={close}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
