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
        <div className="overflow-x-auto">
          <DividerHeading text={"Data Rating (R)"} />
          <table className="border border-black dark:border-gray-600 mx-auto mt-4 text-center w-full max-w-3xl">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                  {" "}
                  {isRatingHeader}
                </th>
                {dataModify[0].map((_, index) => (
                  <th
                    key={index}
                    className="border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100"
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
                <tr key={rowIndex}>
                  <td className="border border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-gray-100">
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

                    const cellClass = `border border-black dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100 ${
                      value === 0 ? "bg-red-200 dark:bg-red-900" : ""
                    } ${
                      isSelected
                        ? "bg-card_green_primary dark:bg-green-800"
                        : ""
                    }`;
                    return (
                      <td key={`${rowIndex}-${colIndex}`} className={cellClass}>
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
        <div className="overflow-x-auto">
          <DividerHeading text={"Mean (μ)"} />
          <table className="border border-black dark:border-gray-600 mx-auto mt-4 text-center w-full max-w-3xl">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-black dark:border-gray-600 px-4 py-2 w-10 italic text-gray-800 dark:text-gray-100">
                  {isMeanUserBased ? "U" : "I"}
                </th>
                <th className="border border-black dark:border-gray-600 italic px-4 py-2 w-14 font-serif text-gray-800 dark:text-gray-100">
                  μ
                </th>
              </tr>
            </thead>
            <tbody>
              {meanList?.map((mean, index) => {
                const label = !funnyMode
                  ? index + 1
                  : (isMeanUserBased ? columns : headers)?.[index] ?? index + 1;

                const isSelected =
                  Array.isArray(selectedIndex) &&
                  selectedIndex.length === 2 &&
                  (shouldTranspose
                    ? selectedIndex[1] === index
                    : selectedIndex[0] === index);

                return (
                  <tr key={`mean-body-${index}`}>
                    <td className="border border-black dark:border-gray-600 px-4 py-2 w-14 text-gray-800 dark:text-gray-100">
                      {label}
                    </td>
                    <td
                      className={`border border-black dark:border-gray-600 px-4 py-2 w-20 text-center text-gray-800 dark:text-gray-100
                                     ${
                                       isSelected
                                         ? "bg-yellow-200 dark:bg-yellow-700"
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
