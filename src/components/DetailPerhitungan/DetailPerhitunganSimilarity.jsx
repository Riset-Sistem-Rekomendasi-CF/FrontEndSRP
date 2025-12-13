import React, { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import { SimilarityIndex } from "../MathSimilarity/Measure/Similarity/SimilarityIndex";
import { SimilarityIndexNonZero } from "../MathSimilarity/Measure/Similarity/SimilarityIdxNonZero";
import { SimilarityValue } from "../MathSimilarity/Measure/Similarity/SimilarityValue";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DividerHeading, OnlyDivider } from "../tabelData/DividerHeading";
import SimilarityTabelRating from "../MathSimilarity/Measure/Similarity/SimilarityTabelRating";
import { transposeMatrix } from "../../helper/helper";
import BCSimilarityRating from "../MathSimilarity/Measure/Similarity/BcSimilarityRating";
import BcSimilarityWrapper from "../MathSimilarity/Measure/Similarity/BcSimilarityWrapper";

export default function DetailPerhitunganSimilarity() {
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
    const saved = sessionStorage.getItem("similarityDetail");
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
        <p>Memuat detail perhitungan Similarity...</p>
      </div>
    );
  }

  const {
    data,
    selectedIndex,
    selectedMean,
    dataOnly,
    similarity,
    opsional,
    headers,
    columns,
    funnyMode,
  } = stateData;

  const toggleIsNotation = () => setIsNotation((prev) => !prev);
  const current = opsional.split("-")[0];
  const shouldShowTable =
    similarity === "Adjusted Cosine" ||
    similarity === "Pearson Correlation Coefficient" ||
    similarity === "Bhattacharyya Coefficient" ||
    similarity === "Cosine";
  // mean-centered

  const dataModify =
    similarity !== "Cosine"
      ? opsional === "item-based"
        ? transposeMatrix(data["mean-centered"])
        : data["mean-centered"]
      : dataOnly;

  let dataOnlyModify = dataOnly;
  if (opsional === "item-based") {
    dataOnlyModify = transposeMatrix(dataOnly);
  }

  console.log("datamodify", dataModify);

  const onlyDataModify =
    opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly;

  const numberOfColumnsCen = dataModify[0]?.length || 0;
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const colHeaders =
    similarity === "Adjusted Cosine" || opsional === "item-based"
      ? opsional === "user-based"
        ? columns
        : headers
      : opsional === "user-based"
      ? headers
      : columns;
  const rowHeaders =
    similarity === "Adjusted Cosine" || opsional === "item-based"
      ? opsional === "user-based"
        ? headers // setelah transpose, baris = headers (item)
        : columns // setelah transpose, baris = columns (user)
      : opsional === "user-based"
      ? columns // bukan transpose, baris = columns (user)
      : headers; // bukan transpose, baris = headers (item)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 p-4 max-w-full bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 shadow-sm">
        <span>Detail Perhitungan Fungsi Similaritas</span>
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
        changeToggle={toggleIsNotation}
        title={"Tampilkan Notasi"}
      />
      {shouldShowTable && (
        <>
          <DividerHeading text={`Data Rating (R)`} />
          <SimilarityTabelRating
            dataOnly={onlyDataModify}
            headers={headers}
            columns={columns}
            opsional={opsional}
            isNotation={isNotation}
            funnyMode={funnyMode}
            selectedIndex={selectedIndex}
            similarity={similarity}
          />
        </>
      )}
      <div>
        {similarity !== "Bhattacharyya Coefficient" &&
          similarity !== "Cosine" && (
            <>
              <DividerHeading text={`Data Tabel Mean-Centered`} />
              <div className="flex justify-center mt-4">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <th className="px-4 py-3 font-semibold border-r border-blue-400">
                          {opsional === "user-based" ? "U/I" : "I/U"}
                        </th>
                        {Array.from(
                          { length: numberOfColumnsCen },
                          (_, index) => (
                            <th
                              key={index}
                              className="px-4 py-3 font-semibold border-r border-blue-400 last:border-r-0"
                            >
                              {!isNotation ? (
                                !funnyMode ? (
                                  index + 1
                                ) : (
                                  colHeaders[index] || index + 1
                                )
                              ) : (
                                <span className="font-serif">
                                  i<sub>{index + 1}</sub>
                                </span>
                              )}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {dataModify.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`transition-all duration-200 ${
                            rowIndex % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                            {!isNotation ? (
                              !funnyMode ? (
                                rowIndex + 1
                              ) : (
                                rowHeaders[rowIndex] || rowIndex + 1
                              )
                            ) : (
                              <span className="font-serif">
                                u<sub>{rowIndex + 1}</sub>
                              </span>
                            )}
                          </td>
                          {row.map((value, colIndex) => {
                            const IsZero =
                              dataOnlyModify[rowIndex] &&
                              dataOnlyModify[rowIndex][colIndex] !== undefined
                                ? dataOnlyModify[rowIndex][colIndex] === 0
                                : true;

                            const isValidIndex = (index) => {
                              return (
                                index >= 0 && index < dataOnlyModify.length
                              );
                            };

                            const isIntersection =
                              opsional === "user-based"
                                ? isValidIndex(selectedIndex[0]) &&
                                  isValidIndex(selectedIndex[1]) &&
                                  (rowIndex === selectedIndex[0] ||
                                    rowIndex === selectedIndex[1]) &&
                                  dataOnlyModify[selectedIndex[0]][colIndex] !==
                                    0 &&
                                  dataOnlyModify[selectedIndex[1]][colIndex] !==
                                    0
                                : isValidIndex(selectedIndex[0]) &&
                                  isValidIndex(selectedIndex[1]) &&
                                  (rowIndex === selectedIndex[0] ||
                                    rowIndex === selectedIndex[1]) &&
                                  dataOnlyModify[selectedIndex[0]][colIndex] !==
                                    0 &&
                                  dataOnlyModify[selectedIndex[1]][colIndex] !==
                                    0;

                            return (
                              <td
                                key={colIndex}
                                className={`px-4 py-3 text-center transition-all duration-200 border-r border-gray-100 dark:border-gray-600 last:border-r-0 text-gray-800 dark:text-gray-200
                                  ${
                                    IsZero
                                      ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                                      : ""
                                  } 
                                  ${
                                    !IsZero && isIntersection
                                      ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-medium"
                                      : ""
                                  }
                                `}
                              >
                                {!isNotation ? (
                                  value.toFixed(
                                    similarity !== "Cosine" &&
                                      similarity !==
                                        "Bhattacharyya Coefficient (BC)"
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
                </div>
              </div>
              {/* Tabel Legend */}
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
                    color: "bg-red-200",
                    description: (
                      <>
                        <p>Menandakan Data Rating yang tidak diketahui</p>
                      </>
                    ),
                  },
                ]}
              />
            </>
          )}

        {/* Tabel Ringkasan Data yang Digunakan */}
        <div className="mt-4">
          <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-start mt-2 overflow-x-auto">
            {/* Tabel Data Irisan */}
            <div className="w-full lg:w-auto overflow-x-auto">
              <div className="inline-block min-w-full lg:min-w-0">
                <div className="rounded-xl shadow-lg overflow-hidden">
                  <table className="w-auto">
                    <thead>
                      <tr className="bg-green-500 dark:bg-green-600 text-white">
                        <th
                          className="px-4 py-2 font-semibold text-sm"
                          colSpan={3}
                        >
                          Data Irisan (
                          {opsional === "user-based" ? "Item" : "User"} yang
                          sama-sama dirating)
                        </th>
                      </tr>
                      <tr className="bg-green-100 dark:bg-green-800 text-xs">
                        <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200 border-r border-green-200 dark:border-green-600">
                          {opsional === "user-based" ? "Item" : "User"}
                        </td>
                        <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200 border-r border-green-200 dark:border-green-600">
                          {capitalize(opsional.split("-")[0])}-
                          {selectedIndex[0] + 1}
                        </td>
                        <td className="px-3 py-1 font-medium text-gray-600 dark:text-gray-200">
                          {capitalize(opsional.split("-")[0])}-
                          {selectedIndex[1] + 1}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const intersectionData = [];
                        if (opsional === "user-based") {
                          dataOnly[0]?.forEach((_, colIdx) => {
                            if (
                              dataOnly[selectedIndex[0]]?.[colIdx] !== 0 &&
                              dataOnly[selectedIndex[1]]?.[colIdx] !== 0
                            ) {
                              intersectionData.push({
                                idx: colIdx,
                                val1:
                                  similarity !== "Cosine" &&
                                  similarity !== "Bhattacharyya Coefficient"
                                    ? data["mean-centered"]?.[
                                        selectedIndex[0]
                                      ]?.[colIdx]
                                    : dataOnly[selectedIndex[0]]?.[colIdx],
                                val2:
                                  similarity !== "Cosine" &&
                                  similarity !== "Bhattacharyya Coefficient"
                                    ? data["mean-centered"]?.[
                                        selectedIndex[1]
                                      ]?.[colIdx]
                                    : dataOnly[selectedIndex[1]]?.[colIdx],
                              });
                            }
                          });
                        } else {
                          dataOnly?.forEach((row, rowIdx) => {
                            if (
                              row[selectedIndex[0]] !== 0 &&
                              row[selectedIndex[1]] !== 0
                            ) {
                              intersectionData.push({
                                idx: rowIdx,
                                val1:
                                  similarity !== "Cosine" &&
                                  similarity !== "Bhattacharyya Coefficient"
                                    ? data["mean-centered"]?.[rowIdx]?.[
                                        selectedIndex[0]
                                      ]
                                    : dataOnly[rowIdx]?.[selectedIndex[0]],
                                val2:
                                  similarity !== "Cosine" &&
                                  similarity !== "Bhattacharyya Coefficient"
                                    ? data["mean-centered"]?.[rowIdx]?.[
                                        selectedIndex[1]
                                      ]
                                    : dataOnly[rowIdx]?.[selectedIndex[1]],
                              });
                            }
                          });
                        }
                        return intersectionData.length > 0 ? (
                          intersectionData.map((item, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0
                                  ? "bg-white dark:bg-gray-800"
                                  : "bg-gray-50 dark:bg-gray-700"
                              }
                            >
                              <td className="px-3 py-2 bg-gray-100 dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 text-sm">
                                {!funnyMode
                                  ? item.idx + 1
                                  : (opsional === "user-based"
                                      ? headers
                                      : columns)?.[item.idx] || item.idx + 1}
                              </td>
                              <td className="px-3 py-2 text-center bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium border-r border-green-100 dark:border-green-700">
                                {item.val1?.toFixed
                                  ? item.val1.toFixed(2)
                                  : item.val1}
                              </td>
                              <td className="px-3 py-2 text-center bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
                                {item.val2?.toFixed
                                  ? item.val2.toFixed(2)
                                  : item.val2}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                            >
                              Tidak ada irisan
                            </td>
                          </tr>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabel Hasil Similaritas */}
            <div className="rounded-xl shadow-lg overflow-hidden h-fit">
              <table className="w-auto">
                <thead>
                  <tr className="bg-purple-500 dark:bg-purple-600 text-white">
                    <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                      Hasil Similaritas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-2 bg-gray-100 dark:bg-gray-700 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 text-sm">
                      Sim({selectedIndex[0] + 1}, {selectedIndex[1] + 1})
                    </td>
                    <td className="px-4 py-2 text-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold">
                      {typeof selectedMean === "number"
                        ? selectedMean.toFixed(4)
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <OnlyDivider />
        {similarity === "Bhattacharyya Coefficient" && <BCSimilarityRating />}
        {similarity === "Bhattacharyya Coefficient" && (
          <BcSimilarityWrapper
            dataOnly={dataOnly}
            selectedIndex={selectedIndex}
            opsional={opsional}
            isNotation={isNotation}
            similarity={similarity}
          />
        )}
      </div>
      <div className="flex items-start gap-2 pt-2">
        {/* Icon di pojok kiri atas */}
        <InfoIcon className="text-blue-500 dark:text-blue-400 mt-1" />

        {/* Teks paragraf */}
        <p className="text-justify text-gray-800 dark:text-gray-200">
          Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
          mencari nilai simialaritas
          <strong>
            {" "}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1} dengan{" "}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[1] + 1}
          </strong>{" "}
          pada data toy dataset di atas.
        </p>
      </div>
      <OnlyDivider />
      <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 dark:text-gray-200 m-2">
        Hasil Similaritas antara {opsional.split("-")[0]}-{selectedIndex[0] + 1}{" "}
        {""}
        dengan {opsional.split("-")[0]}-{selectedIndex[1] + 1} ={" "}
        <span className="bg-green-100 dark:bg-green-800 rounded-md p-1">
          {selectedMean.toFixed(4)}
        </span>
      </p>
      <div className="bg-blue-100 dark:bg-gray-800 p-4 m-2 mt-4 rounded-md shadow-sm">
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
                      dataOnly={dataOnlyModify}
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
      </div>
    </div>
  );
}
