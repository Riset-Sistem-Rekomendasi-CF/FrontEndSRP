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
              <div className="overflow-x-auto mt-4 ">
                <table className="border border-black dark:border-gray-600 mx-auto text-center w-full">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                        {opsional === "user-based" ? "U/I" : "I/U"}
                      </th>
                      {Array.from(
                        { length: numberOfColumnsCen },
                        (_, index) => (
                          <th
                            key={index}
                            className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100"
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
                      <tr key={rowIndex}>
                        <td className="border border-black dark:border-gray-600 px-4 py-2 w-20 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
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
                              : true; // anggap kosong/merah jika tidak ada

                          const isValidIndex = (index) => {
                            return index >= 0 && index < dataOnlyModify.length;
                          };

                          const isIntersection =
                            opsional === "user-based"
                              ? isValidIndex(selectedIndex[0]) &&
                                isValidIndex(selectedIndex[1]) &&
                                (rowIndex === selectedIndex[0] ||
                                  rowIndex === selectedIndex[1]) &&
                                dataOnlyModify[selectedIndex[0]][colIndex] !==
                                  0 &&
                                dataOnlyModify[selectedIndex[1]][colIndex] !== 0
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
                              className={`border border-black dark:border-gray-600 px-4 py-2 text-center w-20 text-gray-800 dark:text-gray-100
            ${IsZero ? "bg-red-200 dark:bg-red-900" : ""} 
            ${!IsZero && isIntersection ? "bg-green-200 dark:bg-green-800" : ""}
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
              </div>
            </>
          )}
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
