import React, { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import { ArgMaxNeighbor } from "../MathSimilarity/Measure/Prediction/PredictionArgMax";
import { PredictionIndex } from "../MathSimilarity/Measure/Prediction/PredictionIndex";
import { PredictionValue } from "../MathSimilarity/Measure/Prediction/PredictionValue";
import { transposeMatrix } from "../../helper/helper";
import { DividerHeading, OnlyDivider } from "../tabelData/DividerHeading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ScatterPlotFilterData } from "../Graph/ScatterPlotFilter";
import { PredictionFormula } from "../MathSimilarity/Measure/Prediction/PredictionFormula";

export default function DetailPerhitunganPrediksi() {
  const [stateData, setStateData] = useState(null);
  const [isNotation, setIsNotation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const saved = sessionStorage.getItem("prediksiDetail");
    if (saved) {
      setStateData(JSON.parse(saved));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  if (!stateData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>Memuat detail perhitungan Prediksi...</p>
      </div>
    );
  }

  const {
    dataRating,
    opsional,
    similarity,
    topSimilarities,
    selectedValue,
    selectedIndex,
    data,
    result,
    kValue,
    headers,
    columns,
    funnyMode,
  } = stateData;

  const resultMean =
    similarity === "Adjusted Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];
  const resultMeanCentered =
    similarity === "Adjusted Cosine"
      ? transposeMatrix(result["mean-centered-brother"])
      : result["mean-centered"];

  const toggleIsNotation = () => setIsNotation((prev) => !prev);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="container mx-auto max-w-full p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 shadow-sm">
        <span>Detail Perhitungan Prediksi</span>
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => window.close()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
        >
          <ArrowBackIcon className="text-white" />
          Kembali
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <LightModeIcon className="text-yellow-400" />
          ) : (
            <DarkModeIcon className="text-gray-700" />
          )}
        </button>
      </div>

      <SwitchToggle
        title={"Tampilkan Notasi"}
        changeToggle={toggleIsNotation}
      />

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matrik Rating */}
          <div>
            <DividerHeading text={"Data Rating"} />
            <div className="flex justify-center mt-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <th className="px-4 py-3 font-semibold border-r border-blue-400">
                        {opsional === "item-based" ? "I" : "U"}
                      </th>
                      <th className="px-4 py-3 italic font-serif font-semibold">
                        r
                        <sub>
                          {opsional === "item-based"
                            ? `${
                                selectedIndex[
                                  opsional === "item-based" ? 1 : 0
                                ] + 1
                              }*`
                            : `*${
                                selectedIndex[
                                  opsional === "item-based" ? 1 : 0
                                ] + 1
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
                        <tr
                          key={rowIndex}
                          className={`transition-all duration-200 ${
                            rowIndex % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                            {!funnyMode
                              ? rowIndex + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  rowIndex
                                ]}
                          </td>
                          <td
                            className={`px-4 py-3 text-center transition-all duration-200 text-gray-800 dark:text-gray-200 ${
                              IsZero
                                ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                                : ""
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
            </div>
          </div>

          {/* Matriks Mean-Rating */}
          <div>
            <DividerHeading text={"Data Mean-Rating"} />
            <div className="flex justify-center mt-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <th className="px-4 py-3 italic font-semibold border-r border-blue-400">
                        U
                      </th>
                      <th className="px-4 py-3 italic font-semibold">μ</th>
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
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          } ${
                            isActiveUser
                              ? "!bg-green-100 dark:!bg-green-800"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                            {!funnyMode
                              ? index + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  index
                                ]}
                          </td>
                          <td
                            className={`px-4 py-3 text-center text-gray-800 dark:text-gray-200 ${
                              isActiveUser
                                ? "text-green-700 dark:text-green-300 font-medium"
                                : ""
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
            <DividerHeading text={"Data Mean-Centered"} />
            <div className="flex justify-center mt-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                                  opsional === "item-based" ? 0 : 1
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
                    {resultMeanCentered.map((row, rowIndex) => {
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
                            rowIndex % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                            {!funnyMode
                              ? rowIndex + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  rowIndex
                                ]}
                          </td>
                          <td
                            className={`px-4 py-3 text-center transition-all duration-200 text-gray-800 dark:text-gray-200 ${
                              IsZero
                                ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                                : ""
                            } ${
                              isTopSimilarity
                                ? "!bg-green-100 dark:!bg-green-800 text-green-700 dark:text-green-300 font-medium"
                                : ""
                            }`}
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
            </div>
          </div>

          {/* Nilai Similaritas */}
          {selectedIndex[opsional === "user-based" ? 0 : 1] <
          result["similarity"].length ? (
            <div>
              <DividerHeading text={"Data Similaritas"} />
              <div className="flex justify-center mt-4">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <th className="px-4 py-3 font-semibold border-r border-blue-400">
                          {opsional === "item-based" ? "I" : "U"}
                        </th>
                        <th className="px-4 py-3 italic font-serif font-semibold">
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
                          <tr
                            key={colIndex}
                            className={`transition-all duration-200 ${
                              colIndex % 2 === 0
                                ? "bg-white dark:bg-gray-800"
                                : "bg-gray-50 dark:bg-gray-700"
                            }`}
                          >
                            <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                              {!funnyMode
                                ? colIndex + 1
                                : (opsional === "user-based"
                                    ? columns
                                    : headers)[colIndex]}
                            </td>
                            <td
                              className={`px-4 py-3 text-center transition-all duration-200 text-gray-800 dark:text-gray-200 ${
                                isTopSimilarity
                                  ? "!bg-green-100 dark:!bg-green-800 text-green-700 dark:text-green-300 font-medium"
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
              </div>
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
                    Menandakan Data <i className="mx-1"> Rating </i> yang tidak
                    diketahui
                  </p>
                </>
              ),
            },
          ]}
        />
      </div>

      {/* Tabel Ringkasan Data yang Digunakan */}
      <div className="mt-4 px-2">
        <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
        <div className="flex flex-row gap-4 justify-center items-start mt-2 flex-wrap overflow-x-auto">
          {/* Tabel Mean User Aktif */}
          <div className="rounded-xl shadow-lg overflow-hidden h-fit">
            <table className="w-auto">
              <thead>
                <tr className="bg-yellow-500 dark:bg-yellow-600 text-white">
                  <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                    Mean {opsional === "user-based" ? "User" : "Item"} Aktif
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-2 bg-gray-100 dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 text-sm">
                    μ
                    <sub>
                      {selectedIndex[opsional === "user-based" ? 0 : 1] + 1}
                    </sub>
                  </td>
                  <td className="px-4 py-2 text-center bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 font-semibold">
                    {resultMean[
                      selectedIndex[opsional === "user-based" ? 0 : 1]
                    ]?.toFixed(2) || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabel Top-K Similaritas */}
          <div className="w-full lg:w-auto overflow-x-auto">
            <div className="inline-block min-w-full lg:min-w-0">
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-blue-500 dark:bg-blue-600 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={4}
                      >
                        Top-{kValue} Neighbor (Similaritas & Mean-Centered)
                      </th>
                    </tr>
                    <tr className="bg-blue-100 dark:bg-blue-800 text-xs">
                      <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200 border-r border-blue-200 dark:border-blue-600">
                        {opsional === "user-based" ? "User" : "Item"}
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200 border-r border-blue-200 dark:border-blue-600">
                        Similaritas
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200 border-r border-blue-200 dark:border-blue-600">
                        Mean-Centered
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200">
                        Sim × MC
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {topSimilarities.map((top, idx) => {
                      const mcValue =
                        opsional === "user-based"
                          ? resultMeanCentered[top.index]?.[selectedIndex[1]]
                          : resultMeanCentered[top.index]?.[selectedIndex[0]];
                      return (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          }
                        >
                          <td className="px-3 py-2 bg-gray-100 dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 text-sm">
                            {!funnyMode
                              ? top.index + 1
                              : (opsional === "user-based" ? columns : headers)[
                                  top.index
                                ]}
                          </td>
                          <td className="px-3 py-2 text-center bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium border-r border-blue-100 dark:border-blue-700">
                            {top.value?.toFixed
                              ? top.value.toFixed(4)
                              : top.value}
                          </td>
                          <td className="px-3 py-2 text-center bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium border-r border-green-100 dark:border-green-700">
                            {mcValue?.toFixed
                              ? mcValue.toFixed(2)
                              : mcValue || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-center bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium">
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
            </div>
          </div>

          {/* Tabel Hasil Prediksi */}
          <div className="rounded-xl shadow-lg overflow-hidden h-fit">
            <table className="w-auto">
              <thead>
                <tr className="bg-purple-500 dark:bg-purple-600 text-white">
                  <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                    Hasil Prediksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-2 bg-gray-100 dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 text-sm">
                    P
                    <sub>
                      {selectedIndex[0] + 1},{selectedIndex[1] + 1}
                    </sub>
                  </td>
                  <td className="px-4 py-2 text-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold">
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

      <div className="flex items-start gap-2 pt-2">
        {/* Icon di pojok kiri atas */}
        <InfoIcon className="text-blue-500 dark:text-blue-400 mt-1" />

        {/* Teks paragraf */}
        <p className="text-justify text-gray-800 dark:text-gray-200">
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
      <OnlyDivider />
      <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 dark:text-gray-200 m-2">
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
        <span className="bg-green-100 dark:bg-green-800 rounded-md p-1">
          {selectedValue.toFixed(3)}
        </span>
      </p>
      {/* Perhitungan Manual */}
      <div className="bg-blue-100 dark:bg-gray-800 p-2 m-2 rounded-md shadow-sm">
        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full overflow-x-auto overflow-y-hidden  sm:overflow-x-visible mb-4">
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

        <div className="w-full overflow-x-auto overflow-y-hidden  sm:overflow-x-visible mb-4">
          <MathJaxContext options={mathjaxConfig}>
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
          </MathJaxContext>
          <MathJaxContext options={mathjaxConfig}>
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
          </MathJaxContext>
        </div>
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
      <div className="bg-blue-100 dark:bg-gray-800 p-2 m-2 rounded-md shadow-sm">
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
      </div>
    </div>
  );
}
