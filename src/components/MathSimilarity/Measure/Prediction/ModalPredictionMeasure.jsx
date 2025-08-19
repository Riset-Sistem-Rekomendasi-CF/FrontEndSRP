import {
  getFormulaArgMax,
  getFormulaPrediction,
  getFormulaPredictionIndex,
  getFormulaPredictionValue,
} from "../Formula/FormulaPrediction";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { transposeMatrix } from "../../../../helper/helper";
import LegendTable from "../../../tabelData/LegendTable";
import { useState } from "react";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import { ScatterPlotDataFilter } from "../../../Graph/ScaterPlotFilter";
import MathJaxComponent from "../../../../MathJaxComponent";
import CloseIcon from "@mui/icons-material/Close";
import ScatterPlot from "../../../Graph/ChartJsPlot";
import ScatterPlotChart from "../../../Graph/ChartJsPlot";
import { ArgMaxNeighbor } from "./PredictionArgMax";
import { PredictionIndex } from "./PredictionIndex";
import { PredictionValue } from "./PredictionValue";

const ModalPredictionMeasure = ({
  dataRating,
  opsional,
  similarity,
  topSimilarities,
  selectedValue,
  selectedIndex,
  data,
  result,
  kValue,
  close,
  headers,
  columns,
  funnyMode,
}) => {
  //   console.log("topSimilarities", topSimilarities);

  const resultMean =
    similarity === "Adjusted Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];
  const resultMeanCentered =
    similarity === "Adjusted Cosine"
      ? transposeMatrix(result["mean-centered-brother"])
      : result["mean-centered"];
  const [isNotation, setIsNotation] = useState(false);

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const current = opsional.split("-")[0]; // "user" atau "item"
  const opposite = current === "user" ? "item" : "user";

  const handleOpenDetailPrediksi = () => {
    const detailData = {
      dataRating,
      opsional,
      similarity,
      topSimilarities,
      selectedValue,
      selectedIndex,
      data,
      result,
      kValue,
      close,
      headers,
      columns,
      funnyMode,
    };

    // simpan ke sessionStorage
    sessionStorage.setItem("prediksiDetail", JSON.stringify(detailData));
    // buka jendela baru
    setTimeout(() => {
      const newTab = window.open("/detail-prediksi", "_blank");
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
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm">
            <span>Detail Perhitungan Prediksi</span>
          </h2>
          <button
            onClick={close}
            className="absolute top-1 right-2 text-lg text-gray-600 hover:text-gray-800 focus:outline-none bg-red-200 px-2 py-1 rounded-full z-20"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        {/* Switch Toggle */}
        <SwitchToggle
          title={"Tampilkan Notasi"}
          changeToggle={handleIsNotation}
        />

        <div className="overflow-x-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matrik Rating */}
            <div>
              <h2 className="font-semibold text-lg">Data Rating</h2>
              <table className="border border-black mt-4 mx-auto text-center w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">
                      {opsional === "item-based" ? "I" : "U"}
                    </th>
                    <th className="border border-black px-4 py-2 italic font-serif">
                      r
                      <sub>
                        {opsional === "item-based"
                          ? `${
                              selectedIndex[opsional === "item-based" ? 1 : 0] +
                              1
                            }*`
                          : `*${
                              selectedIndex[opsional === "item-based" ? 1 : 0] +
                              1
                            }`}
                      </sub>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => {
                    const IsZero =
                      opsional === "item-based"
                        ? data[rowIndex][selectedIndex[0]] === 0
                        : data[rowIndex][selectedIndex[1]] === 0;
                    return (
                      <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">
                          {!funnyMode
                            ? rowIndex + 1
                            : (opsional === "user-based" ? columns : headers)[
                                rowIndex
                              ]}
                        </td>
                        <td
                          className={`border border-black px-4 py-2 text-center ${
                            IsZero ? "bg-red-200" : ""
                          }`}
                        >
                          {!isNotation ? (
                            row[
                              selectedIndex[opsional === "item-based" ? 0 : 1]
                            ]?.toFixed(1)
                          ) : (
                            <span className="italic font-serif">
                              r
                              <sub>
                                {opsional === "user-based"
                                  ? `${rowIndex + 1}${selectedIndex[0] + 1}`
                                  : `${selectedIndex[1] + 1}${rowIndex + 1}`}
                              </sub>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Matriks Mean-Rating */}
            <div>
              <h2 className="font-semibold text-lg">
                <span>Mean-Rating</span>{" "}
              </h2>
              <table className="border border-black mt-4 mx-auto text-center w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2 italic">U</th>
                    <th className="border border-black italic px-4 py-2 ">μ</th>
                  </tr>
                </thead>
                <tbody>
                  {resultMean.map((mean, index) => {
                    const isActiveUser =
                      index ===
                      selectedIndex[opsional === "user-based" ? 0 : 1];
                    return (
                      <tr
                        key={index}
                        className={isActiveUser ? "bg-green-200" : ""}
                      >
                        <td className="border border-black px-4 py-2">
                          {!funnyMode
                            ? index + 1
                            : (opsional === "user-based" ? columns : headers)[
                                index
                              ]}
                        </td>
                        <td className="border border-black px-4 py-2">
                          <div className="text-center">
                            {!isNotation ? (
                              mean.toFixed(2)
                            ) : (
                              <span className="italic font-serif">
                                μ<sub>{index + 1}</sub>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Nilai Mean-Centered */}
            <div>
              <h2 className="font-semibold text-lg">Nilai Mean-Centered</h2>
              <table className="border border-black mt-4 mx-auto text-center w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">
                      {
                        opsional
                          .replace("-", " ")
                          .toLowerCase()
                          .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
                          .split(" ")[0]
                      }
                    </th>
                    <th className="border border-black px-4 py-2 italic font-serif">
                      S
                      <sub>
                        {opsional === "item-based"
                          ? `${
                              selectedIndex[opsional === "item-based" ? 0 : 1] +
                              1
                            }*`
                          : `*${
                              selectedIndex[opsional === "item-based" ? 0 : 1] +
                              1
                            }`}
                      </sub>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultMeanCentered.map((row, rowIndex) => {
                    const IsZero =
                      opsional === "item-based"
                        ? data[rowIndex][selectedIndex[0]] === 0
                        : data[rowIndex][selectedIndex[1]] === 0;
                    const isTopSimilarity = topSimilarities.some(
                      (top) => top.index === rowIndex && !IsZero
                    );
                    return (
                      <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">
                          {!funnyMode
                            ? rowIndex + 1
                            : (opsional === "user-based" ? columns : headers)[
                                rowIndex
                              ]}
                        </td>
                        <td
                          className={`border border-black px-4 py-2 text-center ${
                            IsZero ? "bg-red-200" : ""
                          } ${isTopSimilarity ? "bg-green-200" : ""}`}
                        >
                          {!isNotation ? (
                            row[
                              selectedIndex[opsional === "item-based" ? 0 : 1]
                            ]?.toFixed(2) || "N/A"
                          ) : (
                            <span className="italic font-serif">
                              S
                              <sub>
                                {opsional === "item-based"
                                  ? `${
                                      selectedIndex[
                                        opsional === "item-based" ? 0 : 1
                                      ] + 1
                                    }${rowIndex + 1}`
                                  : `${rowIndex + 1}${
                                      selectedIndex[
                                        opsional === "item-based" ? 0 : 1
                                      ] + 1
                                    }`}
                              </sub>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Nilai Similaritas */}
            {selectedIndex[opsional === "user-based" ? 0 : 1] <
            result["similarity"].length ? (
              <div>
                <h2 className="font-semibold text-lg">Nilai Similaritas</h2>
                <table className="border border-black mt-4 mx-auto text-center w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-black px-4 py-2">
                        {opsional === "item-based" ? "I" : "U"}
                      </th>
                      <th className="border border-black px-4 py-2 italic font-serif">
                        Sim
                        <sub>{`${
                          selectedIndex[opsional === "item-based" ? 0 : 1] + 1
                        }*`}</sub>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result["similarity"].map((row, colIndex) => {
                      const isTopSimilarity = topSimilarities.some(
                        (top) => top.index === colIndex
                      );
                      return (
                        <tr key={colIndex}>
                          <td className="border border-black px-4 py-2 bg-gray-200">
                            {!funnyMode
                              ? colIndex + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  colIndex
                                ]}
                          </td>
                          <td
                            className={`border border-black px-4 py-2 text-center ${
                              isTopSimilarity ? "bg-green-200" : ""
                            }`}
                          >
                            {!isNotation ? (
                              row[
                                selectedIndex[opsional === "user-based" ? 0 : 1]
                              ]?.toFixed(4) || "N/A"
                            ) : (
                              <span className="italic font-serif">
                                Sim
                                <sub>
                                  {opsional === "item-based"
                                    ? `${
                                        selectedIndex[
                                          opsional === "item-based" ? 0 : 1
                                        ] + 1
                                      }${colIndex + 1}`
                                    : `${colIndex + 1}${
                                        selectedIndex[
                                          opsional === "item-based" ? 0 : 1
                                        ] + 1
                                      }`}
                                </sub>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Data for this user is not available.</p>
            )}
          </div>
        </div>

        <div>
          <button
            className="p-2 mt-2 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors  font-semibold"
            onClick={handleOpenDetailPrediksi}
          >
            Detail Prediksi {capitalize(opsional.split("-")[0])}
          </button>
        </div>

        {/* Legend Table */}
        <div>
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
                color: "bg-yellow-200",
                description: (
                  <>
                    <p>
                      Menandakan Data Mean <i className="mx-1"> Rating </i> yang
                      akan dihitung
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
        {/* PLOT */}
        {/* <h1 className="font-semibold text-xl my-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Grafik Top-K
        </h1>
        <div className="flex flex-col justify-center my-3">
          <ScatterPlotDataFilter
            kValue={kValue}
            result={result}
            opsional={opsional}
            topSimilarities={topSimilarities}
            rowIndex={selectedIndex[0]}
            colIndex={selectedIndex[1]}
          />
          <ScatterPlotChart
            kValue={kValue}
            result={result}
            opsional={opsional}
            topSimilarities={topSimilarities}
            rowIndex={selectedIndex[0]}
            colIndex={selectedIndex[1]}
          />
        </div> */}
        {/* END PLOT */}
        {/* Perhitungan Manual */}
        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full overflow-x-auto overflow-y-hidden mb-4">
            <div className="text-[0.75rem] sm:text-sm md:text-base flex justify-center items-center flex-col px-4 sm:px-10">
              {selectedIndex ? (
                <div>
                  <ArgMaxNeighbor
                    rowIndex={selectedIndex[0]}
                    colIndex={selectedIndex[1]}
                    opsional={opsional}
                    similarity={similarity}
                    topSimilarity={topSimilarities}
                    kValue={kValue}
                  />
                </div>
              ) : (
                <p>No expression selected.</p>
              )}
            </div>
          </div>
        </MathJaxContext>

        <div>
          <MathJaxContext options={mathjaxConfig}>
            <div className="w-full overflow-x-auto overflow-y-hidden mb-4">
              <div className="text-[0.75rem] sm:text-sm md:text-base flex justify-center items-center flex-col px-4 sm:px-10">
                {selectedIndex ? (
                  <div>
                    <PredictionIndex
                      rowIndex={selectedIndex[0]}
                      colIndex={selectedIndex[1]}
                      opsional={opsional}
                      similarity={similarity}
                    />
                  </div>
                ) : (
                  <p>No expression selected.</p>
                )}
              </div>
            </div>
          </MathJaxContext>
        </div>

        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full overflow-x-auto overflow-y-hidden">
            <div className="text-[0.75rem] sm:text-sm md:text-base flex justify-center items-center flex-col px-4 sm:px-10">
              {selectedIndex ? (
                <div>
                  <PredictionValue
                    rowIndex={selectedIndex[0]}
                    colIndex={selectedIndex[1]}
                    similarValues={topSimilarities}
                    result={result}
                    dataRating={dataRating}
                    opsional={opsional}
                    similarity={similarity}
                    isNotation={isNotation}
                    selectedValue={selectedValue}
                  />
                </div>
              ) : (
                <p>No expression selected.</p>
              )}
            </div>
          </div>
        </MathJaxContext>
        <p className="mt-5 text-xl font-bold text-gray-700 sm:text-md md:text-lg lg:text-xl xl:text-2xl">
          Hasil prediksi {similarity} pada untuk{" "}
          {opsional === "User-Based" ? (
            <>
              <i>User-{selectedIndex[0] + 1}</i> dengan target{" "}
              <i>Item-{selectedIndex[1] + 1}</i>
            </>
          ) : (
            <>
              <i>Item-{selectedIndex[0] + 1}</i> dengan target{" "}
              <i>User-{selectedIndex[1] + 1}</i>
            </>
          )}{" "}
          adalah: {selectedValue.toFixed(3)}
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
};

export default ModalPredictionMeasure;
