import React, { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import Warm from "../Warm/Warm";
import { MeanCenteredIndex } from "../MathSimilarity/Measure/MeanCentered/MeanCenteredIndex";
import { MeanCenteredValue } from "../MathSimilarity/Measure/MeanCentered/MeanCenteredValue";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DividerHeading, OnlyDivider } from "../tabelData/DividerHeading";
import { transposeMatrix } from "../../helper/helper";

export default function DetailPerhitunganMeanCen() {
  const [stateData, setStateData] = useState(null);
  const [isNotation, setIsNotation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const saved = sessionStorage.getItem("meanCenteredDetail");
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
        <p>Memuat detail perhitungan Mean-Centered...</p>
      </div>
    );
  }

  const {
    selectedIndex,
    selectedValue,
    dataOnly,
    result,
    opsional,
    headers,
    columns,
    funnyMode,
    similarity,
  } = stateData;

  const toggleIsNotation = () => setIsNotation((prev) => !prev);
  const current = opsional.split("-")[0];
  const opposite = current === "user" ? "item" : "user";
  const shouldTranspose =
    (similarity === "Adjusted Cosine" && opsional !== "user-based") ||
    ((similarity === "Cosine" ||
      similarity === "Pearson Correlation Coefficient" ||
      similarity === "Bhattacharyya Coefficient") &&
      opsional === "item-based");

  const dataModify = shouldTranspose ? transposeMatrix(dataOnly) : dataOnly;

  const currentValue = dataOnly[selectedIndex[0]][selectedIndex[1]];

  const opsionalModify =
    opsional === "user-based" && similarity === "Adjusted Cosine"
      ? "item-based"
      : opsional;

  // Untuk Adjusted Cosine, mean-list-brother adalah mean per-item
  // Jadi isMeanUserBased harus false untuk Adjusted Cosine
  const isMeanUserBased =
    similarity === "Adjusted Cosine"
      ? false // Adjusted Cosine selalu menggunakan mean per-item
      : opsionalModify === "user-based";

  const isRatingHeader =
    opsional === "user-based"
      ? similarity === "Adjusted Cosine"
        ? "I/U"
        : "U/I"
      : "I/U";

  const isValidIndex =
    Array.isArray(selectedIndex) && selectedIndex.length === 2;

  const meanList =
    similarity === "Adjusted Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];
  // debug
  // console.log(opsional, similarity);
  // console.log("israting header", isRatingHeader);
  // console.log("opsional modify", opsionalModify);
  // console.log("meanllist", meanList);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 p-4 max-w-full bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 shadow-sm">
        Detail Perhitungan Mean-Centered Rating
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

      <div className="grid sm:grid-cols-2 gap-6 justify-center m-3">
        <div>
          <DividerHeading text={"Data Rating (R)"} />
          <div className="flex justify-center mt-4">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <th className="px-4 py-3 font-semibold border-r border-blue-400">
                      {isRatingHeader}
                    </th>
                    {dataModify[0].map((_, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 font-semibold border-r border-blue-400 last:border-r-0"
                      >
                        {!isNotation ? (
                          funnyMode ? (
                            headers[index]
                          ) : (
                            index + 1
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
                          : columns?.[rowIndex] || rowIndex + 1}
                      </td>
                      {row.map((value, colIndex) => {
                        const isSelected =
                          isValidIndex &&
                          ((similarity === "Adjusted Cosine" &&
                            ((opsional === "user-based" &&
                              rowIndex === selectedIndex[0] &&
                              colIndex === selectedIndex[1]) ||
                              (opsional === "item-based" &&
                                rowIndex === selectedIndex[1] &&
                                colIndex === selectedIndex[0]))) ||
                            (similarity !== "Adjusted Cosine" &&
                              ((opsional === "user-based" &&
                                rowIndex === selectedIndex[0] &&
                                colIndex === selectedIndex[1]) ||
                                (opsional === "item-based" &&
                                  rowIndex === selectedIndex[1] &&
                                  colIndex === selectedIndex[0]))));

                        return (
                          <td
                            key={`${rowIndex}-${colIndex}`}
                            className={`px-4 py-3 text-center transition-all duration-200 border-r border-gray-100 dark:border-gray-600 last:border-r-0 text-gray-800 dark:text-gray-200 ${
                              value === 0
                                ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                                : ""
                            } ${
                              isSelected
                                ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-medium"
                                : ""
                            }`}
                          >
                            {!isNotation ? (
                              value?.toFixed ? (
                                value.toFixed(2)
                              ) : (
                                value
                              )
                            ) : (
                              <span className="font-serif">
                                r
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
        </div>
        <div>
          <DividerHeading text={"Mean (μ)"} />
          <div className="flex justify-center mt-4">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <th className="px-4 py-3 italic font-semibold border-r border-blue-400">
                      {isMeanUserBased ? "U" : "I"}
                    </th>
                    <th className="px-4 py-3 italic font-serif font-semibold">
                      μ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meanList?.map((mean, index) => {
                    const label = !funnyMode
                      ? index + 1
                      : (isMeanUserBased ? columns : headers)?.[index] ??
                        index + 1;

                    const isSelected =
                      Array.isArray(selectedIndex) &&
                      selectedIndex.length === 2 &&
                      (shouldTranspose
                        ? selectedIndex[1] === index
                        : selectedIndex[0] === index);

                    return (
                      <tr
                        key={`mean-body-${index}`}
                        className={`transition-all duration-200 ${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-700"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                          {label}
                        </td>
                        <td
                          className={`px-4 py-3 text-center transition-all duration-200 text-gray-800 dark:text-gray-200 ${
                            isSelected
                              ? "bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-300 font-medium"
                              : ""
                          }`}
                        >
                          <span
                            className="text-center"
                            title={
                              isNotation
                                ? mean.toFixed
                                  ? mean.toFixed(0)
                                  : mean
                                : `µ${index + 1}`
                            }
                          >
                            {!isNotation ? (
                              mean.toFixed ? (
                                mean.toFixed(2)
                              ) : (
                                mean
                              )
                            ) : (
                              <span className="font-serif">
                                μ<sub>{index + 1}</sub>
                              </span>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <LegendTable
        list={[
          {
            color: "bg-card_green_primary",
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
                <p>Menandakan Data Mean yang akan dihitung</p>
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

      {/* Data yang Digunakan dalam Perhitungan */}
      <div className="mt-4">
        <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-start mt-4 overflow-x-auto">
          {/* Tabel Rating yang dipilih */}
          <div className="rounded-xl shadow-lg overflow-hidden h-fit">
            <table className="w-auto">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                    Rating Terpilih
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 text-sm">
                    r
                    <sub>
                      {selectedIndex[0] + 1}
                      {selectedIndex[1] + 1}
                    </sub>
                  </td>
                  <td className="px-4 py-2 text-center bg-green-100 text-green-700 font-semibold">
                    {currentValue?.toFixed
                      ? currentValue.toFixed(2)
                      : currentValue}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabel Mean yang digunakan */}
          <div className="rounded-xl shadow-lg overflow-hidden h-fit">
            <table className="w-auto">
              <thead>
                <tr className="bg-yellow-500 text-white">
                  <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                    Mean Terpilih
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 text-sm">
                    μ
                    <sub>
                      {(shouldTranspose ? selectedIndex[1] : selectedIndex[0]) +
                        1}
                    </sub>
                  </td>
                  <td className="px-4 py-2 text-center bg-yellow-100 text-yellow-700 font-semibold">
                    {meanList?.[
                      shouldTranspose ? selectedIndex[1] : selectedIndex[0]
                    ]?.toFixed(2) || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabel Hasil Mean-Centered */}
          <div className="rounded-xl shadow-lg overflow-hidden h-fit">
            <table className="w-auto">
              <thead>
                <tr className="bg-purple-500 text-white">
                  <th className="px-4 py-2 font-semibold text-sm" colSpan={2}>
                    Hasil Mean-Centered
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 dark:text-gray-200 border-r border-gray-200 text-sm">
                    s
                    <sub>
                      {selectedIndex[0] + 1}
                      {selectedIndex[1] + 1}
                    </sub>
                  </td>
                  <td className="px-4 py-2 text-center bg-purple-100 text-purple-700 font-semibold">
                    {selectedValue?.toFixed
                      ? selectedValue.toFixed(2)
                      : selectedValue}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2">
        {/* Icon di pojok kiri atas */}
        <InfoIcon className="text-blue-500 dark:text-blue-400 mt-1" />

        {/* Teks paragraf */}
        <p className="text-justify text-gray-800 dark:text-gray-200">
          Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
          mencari nilai mean-centered rating
          <strong>
            {" "}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1} terhadap{" "}
            {opposite}-{selectedIndex[1] + 1}
          </strong>{" "}
          pada data toy dataset di atas.
        </p>
      </div>
      <OnlyDivider />
      <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 dark:text-gray-200 m-2">
        Hasil dari Mean-Centered rating dari {opsional.split("-")[0]}-
        {selectedIndex[0] + 1} terhadap {opposite}-{selectedIndex[1] + 1} yaitu
        ={" "}
        <span className="bg-green-100 dark:bg-green-800 rounded-md p-1">
          {selectedValue.toFixed(2)}
        </span>
      </p>
      <div className="bg-blue-100 dark:bg-gray-800 p-2 m-2 rounded-md shadow-sm">
        {currentValue === 0 ? (
          <Warm>
            Catatan jika ada{" "}
            <span className="text-red-600">
              data <i> rating </i> adalah 0{" "}
            </span>{" "}
            akan menghasilkan <span className="text-red-600">nilai 0</span> atau
            diabaikan.
          </Warm>
        ) : (
          ""
        )}

        <MathJaxContext options={mathjaxConfig}>
          {currentValue !== 0 && (
            <div className="flex justify-center items-center flex-col px-2 sm:px-4">
              {selectedIndex && (
                <MeanCenteredIndex
                  rowIndex={selectedIndex[0]}
                  colIndex={selectedIndex[1]}
                  opsional={opsional}
                  similarity={similarity}
                  isNotation={isNotation}
                />
              )}

              {selectedIndex && (
                <MeanCenteredValue
                  rowIndex={selectedIndex[0]}
                  colIndex={selectedIndex[1]}
                  dataOnly={dataModify}
                  result={result}
                  opsional={opsional}
                  selectedValue={selectedValue}
                  similarity={similarity}
                  isNotation={isNotation}
                />
              )}
            </div>
          )}
        </MathJaxContext>
      </div>
    </div>
  );
}
