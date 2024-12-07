import {
  getFormulaArgMax,
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
}) => {
  //   console.log("topSimilarities", topSimilarities);

  const resultMean =
    similarity === "Adjusted Vector Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];
  const resultMeanCentered =
    similarity === "Adjusted Vector Cosine"
      ? transposeMatrix(result["mean-centered-brother"])
      : result["mean-centered"];
  const [isNotation, setIsNotation] = useState(false);

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };
  const PredictionIndex = ({ rowIndex, colIndex, similarity, opsional }) => {
    const expression = getFormulaPredictionIndex(
      rowIndex,
      colIndex,
      similarity,
      opsional
    );
    return <MathJaxComponent>{expression}</MathJaxComponent>;
  };

  const PredictionValue = ({
    rowIndex,
    colIndex,
    similarValues,
    result,
    dataRating,
    similarity,
    opsional,
    isNotation,
    selectedValue,
  }) => {
    const expression = getFormulaPredictionValue(
      rowIndex,
      colIndex,
      similarValues,
      result,
      dataRating,
      similarity,
      opsional,
      isNotation,
      selectedValue
    );
    // console.log(expression);

    return (
      <MathJaxComponent>
        {expression.formula}
        {expression.proses_formula}
        {expression.result}
      </MathJaxComponent>
    );
  };

  const ArgMaxNeighbor = ({
    rowIndex,
    colIndex,
    opsional,
    similarity,
    topSimilarity,
  }) => {
    const expression = getFormulaArgMax(
      rowIndex,
      colIndex,
      opsional,
      similarity,
      topSimilarity
    );
    return <MathJaxComponent>{expression}</MathJaxComponent>;
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-h-[80%] overflow-y-auto m-6">
        <h2 className="text-xl font-semibold mb-4">
          Detail Perhitungan Prediksi
        </h2>

        {/* Switch Toggle */}
        <SwitchToggle
          title={"Tampilkan Notasi"}
          changeToggle={handleIsNotation}
        />

        <div className="overflow-x-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matrik Rating */}
            <div>
              <h2 className="font-semibold text-lg">
                Data <i> Rating </i>
              </h2>
              <table className="border border-black mt-4 mx-auto text-center w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">
                      {opsional === "item-based" ? "Item" : "User"}
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
                          {rowIndex + 1}
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

            {/* Matriks Mean-Centered */}
            <div>
              <h2 className="font-semibold text-lg">
                <span className="italic">Mean-Centered</span>{" "}
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
                          {index + 1}
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

            {/* Nilai Similarity */}
            <div>
              <h2 className="font-semibold text-lg">Nilai Similaritas</h2>
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
                          {rowIndex + 1}
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

            {/* Nilai Top-K */}
            {selectedIndex[opsional === "user-based" ? 0 : 1] <
            result["similarity"].length ? (
              <div>
                <h2 className="font-semibold text-lg">Nilai Prediksi</h2>
                <table className="border border-black mt-4 mx-auto text-center w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-black px-4 py-2">
                        {opsional === "item-based" ? "Item" : "User"}
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
                            {colIndex + 1}
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

        {/* Legend Table */}
        <div>
          <LegendTable
            list={[
              {
                color: "bg-green-200",
                description: (
                  <>
                    Menandakan Data <i className="mx-1"> Rating </i> yang akan
                    dihitung
                  </>
                ),
              },
              {
                color: "bg-yellow-200",
                description: (
                  <>
                    Menandakan Data Mean <i className="mx-1"> Rating </i> yang
                    akan dihitung
                  </>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <>
                    Menandakan Data <i className="mx-1"> Rating </i> yang tidak
                    diketahui
                  </>
                ),
              },
            ]}
          />
        </div>
        <h1 className="font-semibold text-xl my-5 underline underline-offset-8 decoration-4 decoration-card_blue_primary">
          Grafik Top-K
        </h1>
        <div className="flex justify-center my-3">
          <ScatterPlotDataFilter
            kValue={kValue}
            result={result}
            opsional={opsional}
            topSimilarities={topSimilarities}
            rowIndex={selectedIndex[0]}
            colIndex={selectedIndex[1]}
          />
        </div>
        {/* Perhitungan Manual */}
        <MathJaxContext options={mathjaxConfig}>
          <div className="overflow-x-auto mt-6 flex justify-center items-center flex-col px-4 sm:px-10">
            {selectedIndex ? (
              <div className="w-full min-w-[300px]">
                <ArgMaxNeighbor
                  rowIndex={selectedIndex[0]}
                  colIndex={selectedIndex[1]}
                  opsional={opsional}
                  similarity={similarity}
                  topSimilarity={topSimilarities}
                />
              </div>
            ) : (
              <p>No expression selected.</p>
            )}
          </div>
        </MathJaxContext>

        <MathJaxContext options={mathjaxConfig}>
          <div className="overflow-x-auto mt-6 flex justify-center items-center flex-col px-4 sm:px-10">
            {selectedIndex ? (
              <div className="w-full min-w-[300px]">
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
        </MathJaxContext>

        <MathJaxContext options={mathjaxConfig}>
          <div className="overflow-x-auto mt-6 flex justify-center items-center flex-col px-4 sm:px-10">
            {selectedIndex ? (
              <div className="w-full min-w-[200px]">
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
        </MathJaxContext>

        <p className="text-xl font-bold text-gray-700 mt-5 sm:text-md md:text-lg lg:text-xl xl:text-2xl">
          Hasil prediksi <i>rating</i>
          <span className="italic"> Item </span>
          target {selectedIndex[1] + 1} terhadap{" "}
          <span className="italic">item</span> {selectedIndex[1] + 1} adalah ={" "}
          {selectedValue.toFixed(3)}
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
