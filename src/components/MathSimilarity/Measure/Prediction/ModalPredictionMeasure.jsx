import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { transposeMatrix } from "../../../../helper/helper";
import LegendTable from "../../../tabelData/LegendTable";
import { useState } from "react";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import CloseIcon from "@mui/icons-material/Close";
import { ArgMaxNeighbor } from "./PredictionArgMax";
import { PredictionIndex } from "./PredictionIndex";
import { PredictionValue } from "./PredictionValue";
import InfoIcon from "@mui/icons-material/Info";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DividerHeading, OnlyDivider } from "../../../tabelData/DividerHeading";
import { ScatterPlotFilterData } from "../../../Graph/ScatterPlotFilter";
import { PredictionFormula } from "./PredictionFormula";

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
  // console.log("data ", data);

  const resultMean = result["mean-list"];
  // const resultMeanCentered =
  //   similarity === "Adjusted Cosine"
  //     ? transposeMatrix(result["mean-centered-brother"])
  //     : result["mean-centered"];
  const resultMeanCentered =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? transposeMatrix(result["mean-centered"])
        : result["mean-centered"]
      : result["mean-centered"];

  const resultMeanCenteredTranspose =
    opsional === "item-based"
      ? similarity === "Adjusted Cosine"
        ? resultMeanCentered
        : transposeMatrix(resultMeanCentered)
      : similarity === "Adjusted Cosine"
      ? transposeMatrix(resultMeanCentered)
      : resultMeanCentered;

  // console.log("mean-cented", resultMeanCentered);
  const [isNotation, setIsNotation] = useState(false);

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  // Removed unused variables: capitalize, current, opposite

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
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative text-black"
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
              <DividerHeading text={"Data Rating"} />
              <div className="overflow-x-auto w-full mt-4">
                <div className="rounded-xl shadow-lg inline-block min-w-full">
                  <table className="mx-auto text-center w-full">
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-3 font-semibold border-r border-blue-400">
                          {opsional === "item-based" ? "I" : "U"}
                        </th>
                        <th className="px-4 py-3 italic font-serif font-semibold">
                          r
                          <sub>
                            {opsional === "item-based"
                              ? `*${
                                  selectedIndex[
                                    opsional === "item-based" ? 1 : 0
                                  ] + 1
                                }`
                              : `${
                                  selectedIndex[
                                    opsional === "item-based" ? 1 : 0
                                  ] + 1
                                }*`}
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
                          <tr
                            key={rowIndex}
                            className={`transition-all duration-200 ${
                              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="px-4 py-3 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
                              {!funnyMode
                                ? rowIndex + 1
                                : (opsional === "user-based"
                                    ? columns
                                    : headers)[rowIndex]}
                            </td>
                            <td
                              className={`px-4 py-3 text-center transition-all duration-200 ${
                                IsZero ? "bg-red-100 text-red-600" : ""
                              }`}
                            >
                              {!isNotation ? (
                                row[
                                  selectedIndex[
                                    opsional === "item-based" ? 0 : 1
                                  ]
                                ]?.toFixed(1)
                              ) : (
                                <span className="italic font-serif">
                                  r
                                  <sub>
                                    {opsional === "user-based"
                                      ? `${rowIndex + 1}${selectedIndex[0] + 1}`
                                      : `${selectedIndex[1] + 1}${
                                          rowIndex + 1
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
              </div>
            </div>

            {/* Matriks Mean-Rating */}
            <div>
              <DividerHeading text={"Mean-Rating"} />
              <div className="overflow-x-auto w-full mt-4">
                <div className="rounded-xl shadow-lg inline-block min-w-full">
                  <table className="mx-auto text-center w-full">
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-3 italic font-semibold border-r border-blue-400">
                          U
                        </th>
                        <th className="px-4 py-3 italic font-semibold">
                          μ
                          <sub>
                            {opsional === "user-based" ? "User" : "Item"}
                          </sub>
                        </th>
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
                            className={`transition-all duration-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } ${isActiveUser ? "!bg-green-100" : ""}`}
                          >
                            <td className="px-4 py-3 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
                              {!funnyMode
                                ? index + 1
                                : (opsional === "user-based"
                                    ? columns
                                    : headers)[index]}
                            </td>
                            <td
                              className={`px-4 py-3 ${
                                isActiveUser ? "text-green-700 font-medium" : ""
                              }`}
                            >
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
              </div>
            </div>

            {/* Nilai Mean-Centered */}
            <div>
              <DividerHeading text={"Mean-Centered"} />
              <div className="overflow-x-auto w-full mt-4">
                <div className="rounded-xl shadow-lg inline-block min-w-full">
                  <table className="mx-auto text-center w-full">
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-3 font-semibold border-r border-blue-400">
                          {
                            opsional
                              .replace("-", " ")
                              .toLowerCase()
                              .replace(/\b[a-z]/g, (letter) =>
                                letter.toUpperCase()
                              )
                              .split(" ")[0]
                          }
                        </th>
                        <th className="px-4 py-3 italic font-serif font-semibold">
                          S
                          <sub>
                            {opsional === "item-based"
                              ? `${
                                  selectedIndex[
                                    opsional === "item-based" ? 1 : 0
                                  ] + 1
                                }*`
                              : `*${
                                  selectedIndex[
                                    opsional === "item-based" ? 0 : 1
                                  ] + 1
                                }`}
                          </sub>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultMeanCenteredTranspose.map((row, rowIndex) => {
                        const IsZero =
                          opsional === "item-based"
                            ? data[rowIndex][selectedIndex[0]] === 0
                            : data[rowIndex][selectedIndex[1]] === 0;
                        const isTopSimilarity = topSimilarities.some(
                          (top) => top.index === rowIndex && !IsZero
                        );
                        return (
                          <tr
                            key={rowIndex}
                            className={`transition-all duration-200 ${
                              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="px-4 py-3 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
                              {!funnyMode
                                ? rowIndex + 1
                                : (opsional === "user-based"
                                    ? columns
                                    : headers)[rowIndex]}
                            </td>
                            <td
                              className={`px-4 py-3 text-center transition-all duration-200 ${
                                IsZero ? "bg-red-100 text-red-600" : ""
                              } ${
                                isTopSimilarity
                                  ? "!bg-green-100 text-green-700 font-medium"
                                  : ""
                              }`}
                            >
                              {!isNotation ? (
                                row[
                                  selectedIndex[
                                    opsional === "item-based" ? 1 : 0
                                  ]
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
              </div>
            </div>

            {/* Nilai Similaritas */}
            {selectedIndex[opsional === "user-based" ? 0 : 1] <
            result["similarity"].length ? (
              <div>
                <DividerHeading text={"Similaritas"} />
                <div className="overflow-x-auto w-full mt-4">
                  <div className="rounded-xl shadow-lg inline-block min-w-full">
                    <table className="mx-auto text-center w-full">
                      <thead>
                        <tr className="bg-blue-500 text-white">
                          <th className="px-4 py-3 font-semibold border-r border-blue-400">
                            {opsional === "item-based" ? "I" : "U"}
                          </th>
                          <th className="px-4 py-3 italic font-serif font-semibold">
                            Sim
                            <sub>{`${
                              selectedIndex[opsional === "item-based" ? 1 : 0] +
                              1
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
                            <tr
                              key={colIndex}
                              className={`transition-all duration-200 ${
                                colIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="px-4 py-3 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
                                {!funnyMode
                                  ? colIndex + 1
                                  : (opsional === "user-based"
                                      ? columns
                                      : headers)[colIndex]}
                              </td>
                              <td
                                className={`px-4 py-3 text-center transition-all duration-200 ${
                                  isTopSimilarity
                                    ? "!bg-green-100 text-green-700 font-medium"
                                    : ""
                                }`}
                              >
                                {!isNotation ? (
                                  row[
                                    selectedIndex[
                                      opsional === "user-based" ? 0 : 1
                                    ]
                                  ]?.toFixed(4) || "N/A"
                                ) : (
                                  <span className="italic font-serif">
                                    Sim
                                    <sub>
                                      {opsional === "item-based"
                                        ? `${
                                            selectedIndex[
                                              opsional === "item-based" ? 1 : 0
                                            ] + 1
                                          }${colIndex + 1}`
                                        : `${
                                            selectedIndex[
                                              opsional === "item-based" ? 1 : 0
                                            ] + 1
                                          }${colIndex + 1}`}
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
                </div>
              </div>
            ) : (
              <p>Data for this user is not available.</p>
            )}
          </div>

          {/* Legend Table */}

          <LegendTable
            list={[
              {
                color: "bg-green-200",
                description: (
                  <>
                    <p>Menandakan Data Rating yang akan dihitung</p>
                  </>
                ),
              },
              {
                color: "bg-yellow-200",
                description: (
                  <>
                    <p>Menandakan Data Mean Rating yang akan dihitung</p>
                  </>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <>
                    <p>Menandakan Data Rating yang tidak diketahui</p>
                  </>
                ),
              },
            ]}
          />

          {/* Tabel Ringkasan Data yang Digunakan */}
          <div className="mt-4">
            <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
            <div className="flex flex-row gap-4 justify-center mt-2 flex-wrap">
              {/* Tabel Mean User Aktif */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-yellow-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Mean {opsional === "user-based" ? "User" : "Item"} Aktif
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        μ
                        <sub>
                          {selectedIndex[opsional === "user-based" ? 0 : 1] + 1}
                        </sub>
                      </td>
                      <td className="px-4 py-2 text-center bg-yellow-100 text-yellow-700 font-semibold">
                        {resultMean[
                          selectedIndex[opsional === "user-based" ? 0 : 1]
                        ]?.toFixed(2) || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tabel Top-K Similaritas */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={4}
                      >
                        Top-{kValue} Neighbor (Similaritas & Mean-Centered)
                      </th>
                    </tr>
                    <tr className="bg-blue-100 text-xs">
                      <td className="px-3 py-1 font-medium text-gray-600 border-r border-blue-200">
                        {opsional === "user-based" ? "User" : "Item"}
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600 border-r border-blue-200">
                        Similaritas
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600 border-r border-blue-200">
                        Mean-Centered
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600">
                        Sim × MC
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {topSimilarities.map((top, idx) => {
                      const mcValue =
                        opsional === "user-based"
                          ? resultMeanCenteredTranspose[top.index]?.[
                              selectedIndex[1]
                            ]
                          : resultMeanCenteredTranspose[top.index]?.[
                              selectedIndex[0]
                            ];
                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-3 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                            {!funnyMode
                              ? top.index + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  top.index
                                ]}
                          </td>
                          <td className="px-3 py-2 text-center bg-blue-50 text-blue-700 font-medium border-r border-blue-100">
                            {top.value?.toFixed
                              ? top.value.toFixed(4)
                              : top.value}
                          </td>
                          <td className="px-3 py-2 text-center bg-green-50 text-green-700 font-medium border-r border-green-100">
                            {mcValue?.toFixed
                              ? mcValue.toFixed(2)
                              : mcValue || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-center bg-purple-50 text-purple-700 font-medium">
                            {top.value && mcValue
                              ? (top.value * mcValue).toFixed(4)
                              : "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tabel Hasil Prediksi */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Hasil Prediksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        P
                        <sub>
                          {selectedIndex[0] + 1},{selectedIndex[1] + 1}
                        </sub>
                      </td>
                      <td className="px-4 py-2 text-center bg-purple-100 text-purple-700 font-semibold">
                        {selectedValue?.toFixed
                          ? selectedValue.toFixed(3)
                          : selectedValue}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-2 w-40 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors">
            <FullscreenIcon className="text-gray-600 inline-block mr-2" />
            <button
              className="p-2 font-semibold"
              onClick={handleOpenDetailPrediksi}
            >
              Full Page
            </button>
          </div>
          <div className="flex items-start gap-2 pt-2">
            {/* Icon di pojok kiri atas */}
            <InfoIcon className="text-blue-500 mt-1" />

            {/* Teks paragraf */}
            <p className="text-justify">
              Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
              mencari nilai prediksi rating untuk{" "}
              <strong>
                {opsional === "User-Based" ? (
                  <>
                    User-{selectedIndex[0] + 1} dengan target Item-
                    {selectedIndex[1] + 1}
                  </>
                ) : (
                  <>
                    Item-{selectedIndex[0] + 1} dengan target User-
                    {selectedIndex[1] + 1} {""}
                  </>
                )}
              </strong>
              pada data toy dataset di atas.
            </p>
          </div>
          <div className="pl-2 pr-2 ml-2 mr-2">
            <OnlyDivider />
          </div>
          <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 m-2">
            Hasil prediksi {similarity} pada untuk{" "}
            {opsional === "User-Based" ? (
              <>
                User-{selectedIndex[0] + 1} dengan target Item-
                {selectedIndex[1] + 1}
              </>
            ) : (
              <>
                Item-{selectedIndex[0] + 1} dengan target User-
                {selectedIndex[1] + 1}
              </>
            )}{" "}
            adalah:{" "}
            <span className="bg-green-100 rounded-md p-1 ">
              {selectedValue.toFixed(3)}
            </span>
          </p>
        </div>

        {/* Perhitungan Manual */}
        <div className="bg-blue-100 p-2 m-2 rounded-md shadow-sm">
          <MathJaxContext options={mathjaxConfig}>
            <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
              <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left">
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

                <div className="w-full min-w-[200px]">
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
                <div className="w-full min-w-[200px]">
                  {selectedIndex ? (
                    <div>
                      <PredictionFormula
                        rowIndex={selectedIndex[0]}
                        colIndex={selectedIndex[1]}
                        similarity={similarity}
                        opsional={opsional}
                      />
                    </div>
                  ) : (
                    <p>No expression selected.</p>
                  )}
                </div>
              </div>
            </div>
          </MathJaxContext>
          <div className="w-full overflow-x-auto overflow-y-hidden  sm:overflow-x-visible mb-4">
            <MathJaxContext options={mathjaxConfig}>
              <div className="w-full min-w-[200px]">
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
            </MathJaxContext>
          </div>
        </div>
        <div className="p-2 m-2">
          <OnlyDivider />

          <DividerHeading text={"Grafik Prediksi Data Filter 2D"} />
        </div>
        <div className="bg-blue-100 p-2 m-2 rounded-md shadow-sm">
          {/* PLOT */}
          <div className="flex flex-col justify-center my-3">
            <ScatterPlotFilterData
              kValue={kValue}
              result={result}
              opsional={opsional}
              topSimilarities={topSimilarities}
              rowIndex={selectedIndex[0]}
              colIndex={selectedIndex[1]}
            />
          </div>
          {/* END PLOT */}
        </div>

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
