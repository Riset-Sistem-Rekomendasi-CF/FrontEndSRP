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

      <div className="overflow-x-auto  mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matrik Rating */}
          <div>
            <DividerHeading text={"Data Rating"} />
            <table className="border border-black dark:border-gray-600 mt-4 mx-auto text-center w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                    {opsional === "item-based" ? "I" : "U"}
                  </th>
                  <th className="border border-black dark:border-gray-600 px-4 py-2 italic font-serif text-gray-800 dark:text-gray-100">
                    r
                    <sub>
                      {opsional === "item-based"
                        ? `${
                            selectedIndex[opsional === "item-based" ? 1 : 0] + 1
                          }*`
                        : `*${
                            selectedIndex[opsional === "item-based" ? 1 : 0] + 1
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
                      <td className="border border-black dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                        {!funnyMode
                          ? rowIndex + 1
                          : (opsional === "user-based" ? columns : headers)[
                              rowIndex
                            ]}
                      </td>
                      <td
                        className={`border border-black dark:border-gray-600 px-4 py-2 text-center text-gray-800 dark:text-gray-100 ${
                          IsZero ? "bg-red-200 dark:bg-red-900" : ""
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
            <DividerHeading text={"Data Mean-Rating"} />
            <table className="border border-black dark:border-gray-600 mt-4 mx-auto text-center w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-black dark:border-gray-600 px-4 py-2 italic text-gray-800 dark:text-gray-100">
                    U
                  </th>
                  <th className="border border-black dark:border-gray-600 italic px-4 py-2 text-gray-800 dark:text-gray-100">
                    μ
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultMean.map((mean, index) => {
                  const isActiveUser =
                    index === selectedIndex[opsional === "user-based" ? 0 : 1];
                  return (
                    <tr
                      key={index}
                      className={
                        isActiveUser ? "bg-green-200 dark:bg-green-800" : ""
                      }
                    >
                      <td className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                        {!funnyMode
                          ? index + 1
                          : (opsional === "user-based" ? columns : headers)[
                              index
                            ]}
                      </td>
                      <td className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
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
            <DividerHeading text={"Data Mean-Centered"} />
            <table className="border border-black dark:border-gray-600 mt-4 mx-auto text-center w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                    {
                      opsional
                        .replace("-", " ")
                        .toLowerCase()
                        .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
                        .split(" ")[0]
                    }
                  </th>
                  <th className="border border-black dark:border-gray-600 px-4 py-2 italic font-serif text-gray-800 dark:text-gray-100">
                    S
                    <sub>
                      {opsional === "item-based"
                        ? `${
                            selectedIndex[opsional === "item-based" ? 0 : 1] + 1
                          }*`
                        : `*${
                            selectedIndex[opsional === "item-based" ? 0 : 1] + 1
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
                      <td className="border border-black dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                        {!funnyMode
                          ? rowIndex + 1
                          : (opsional === "user-based" ? columns : headers)[
                              rowIndex
                            ]}
                      </td>
                      <td
                        className={`border border-black dark:border-gray-600 px-4 py-2 text-center text-gray-800 dark:text-gray-100 ${
                          IsZero ? "bg-red-200 dark:bg-red-900" : ""
                        } ${
                          isTopSimilarity
                            ? "bg-green-200 dark:bg-green-800"
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

          {/* Nilai Similaritas */}
          {selectedIndex[opsional === "user-based" ? 0 : 1] <
          result["similarity"].length ? (
            <div>
              <DividerHeading text={"Data Similaritas"} />
              <table className="border border-black dark:border-gray-600 mt-4 mx-auto text-center w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                      {opsional === "item-based" ? "I" : "U"}
                    </th>
                    <th className="border border-black dark:border-gray-600 px-4 py-2 italic font-serif text-gray-800 dark:text-gray-100">
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
                        <td className="border border-black dark:border-gray-600 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                          {!funnyMode
                            ? colIndex + 1
                            : (opsional === "user-based" ? columns : headers)[
                                colIndex
                              ]}
                        </td>
                        <td
                          className={`border border-black dark:border-gray-600 px-4 py-2 text-center text-gray-800 dark:text-gray-100 ${
                            isTopSimilarity
                              ? "bg-green-200 dark:bg-green-800"
                              : ""
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
