import { MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import mathjaxConfig from "../../mathjax-config";
import { MeanRatingRumusIdx } from "../MathSimilarity/Measure/Mean/MeanRatingRumusIdx";
import { MeanRatingIndexExp } from "../MathSimilarity/Measure/Mean/MeanRatingIndexExp";
import { MeanRatingExpressionsValues } from "../MathSimilarity/Measure/Mean/MeanRatingExpressionsValues";
import { dataModify } from "../MathSimilarity/Measure/Mean/dataModify";
import { DividerHeading, OnlyDivider } from "../tabelData/DividerHeading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DetailPerhitunganMean() {
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
    const saved = sessionStorage.getItem("meanDetailData");
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
        <p>Memuat detail perhitungan...</p>
      </div>
    );
  }

  const {
    opsional,
    data,
    selectedIndex,
    selectedMean,
    headers,
    columns,
    funnyMode,
  } = stateData;

  // Pastikan selectedIndex selalu array supaya .includes bisa dipakai dengan aman
  const selIdx = Array.isArray(selectedIndex) ? selectedIndex : [selectedIndex];

  // Fallback jika ada properti penting yang masih hilang
  const similarity = stateData.similarity; // kalau ada, atau undefined

  // Cek data minimal
  if (!data || !opsional) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>
          Error: Data tidak lengkap. Pastikan navigasi dilakukan melalui halaman
          sebelumnya.
        </p>
      </div>
    );
  }

  const modifiedData = dataModify(data, similarity, opsional);
  const toggleIsNotation = () => setIsNotation((prev) => !prev);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="mx-auto p-8 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header / Title */}

      <h2 className="text-xl md:text-2xl font-semibold mb-4 p-4 shadow-sm text-center text-gray-800 dark:text-gray-100">
        <span>
          Detail Perhitungan Mean nilai Rating {""}
          <span className="italic mr-1">(μ)</span>
          {opsional.split("-")[0]} ke-{Number(selIdx[0]) + 1}
        </span>
      </h2>
      <div className="max-w-full p-4 mx-auto">
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
        <div className="flex flex-col justify-center m-3 overflow-x-auto">
          <div className="overflow-x-auto">
            <DividerHeading text="Data Rating (R)" />
            <div className="flex justify-center mt-4">
              <div className="overflow-hidden rounded-xl">
                <table className="text-xs sm:text-sm md:text-base lg:text-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <th className="px-4 py-3 font-semibold border-r border-blue-400">
                        U/I
                      </th>
                      {Array.from(
                        { length: modifiedData[0].length },
                        (_, index) => (
                          <th
                            key={index}
                            className="px-4 py-3 font-semibold border-r border-blue-400 last:border-r-0"
                          >
                            {!isNotation ? (
                              !funnyMode ? (
                                index + 1
                              ) : (
                                headers[index]
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
                    {modifiedData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`transition-all duration-200 ${
                          rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-200 bg-gray-100">
                          {!isNotation ? (
                            !funnyMode ? (
                              rowIndex + 1
                            ) : (
                              columns[rowIndex]
                            )
                          ) : (
                            <span className="font-serif">
                              u<sub>{rowIndex + 1}</sub>
                            </span>
                          )}
                        </td>
                        {row.map((value, colIndex) => {
                          const isZero = value === 0;
                          const isSelected = selIdx.includes(
                            opsional === "user-based" ? rowIndex : colIndex
                          );

                          return (
                            <td
                              key={colIndex}
                              className={`px-4 py-3 text-center transition-all duration-200 border-r border-gray-100 last:border-r-0 ${
                                isZero ? "bg-red-100 text-red-600" : ""
                              } ${
                                isSelected && !isZero
                                  ? "bg-green-100 text-green-700 font-medium"
                                  : ""
                              }`}
                              title={
                                isNotation
                                  ? value.toFixed
                                    ? value.toFixed(0)
                                    : value
                                  : `r${colIndex + 1}${rowIndex + 1}`
                              }
                            >
                              {!isNotation ? (
                                value.toFixed ? (
                                  value.toFixed(0)
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

          <LegendTable
            list={[
              {
                color: "bg-green-200",
                description: <p>Menandakan Data Rating yang akan dihitung</p>,
              },
              {
                color: "bg-red-200",
                description: <p>Menandakan Data Rating yang tidak diketahui</p>,
              },
            ]}
          />

          {/* Data yang Digunakan dalam Perhitungan */}
          <div className="mt-4">
            <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-start mt-4 overflow-x-auto">
              {/* Tabel Rating yang digunakan */}
              <div className="rounded-xl overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-green-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Rating {capitalize(opsional.split("-")[0])}-
                        {selIdx[0] + 1}
                      </th>
                    </tr>
                    <tr className="bg-green-100 text-xs">
                      <td className="px-3 py-1 font-medium text-gray-600 border-r border-green-200">
                        {opsional === "user-based" ? "Item" : "User"}
                      </td>
                      <td className="px-3 py-1 font-medium text-gray-600">
                        Rating
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {modifiedData[selIdx[0]]?.map(
                      (value, idx) =>
                        value !== 0 && (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-3 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                              {!funnyMode
                                ? idx + 1
                                : (opsional === "user-based"
                                    ? headers
                                    : columns)[idx]}
                            </td>
                            <td className="px-3 py-2 text-center bg-green-50 text-green-700 font-medium">
                              {value}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tabel Hasil Mean */}
              <div className="rounded-xl overflow-hidden h-fit">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Hasil Mean Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        μ<sub>{selIdx[0] + 1}</sub>
                      </td>
                      <td className="px-4 py-2 text-center bg-purple-100 text-purple-700 font-semibold">
                        {selectedMean.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        Jumlah Rating
                      </td>
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        {modifiedData[selIdx[0]]?.filter((v) => v !== 0).length}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        Total Rating
                      </td>
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        {modifiedData[selIdx[0]]
                          ?.filter((v) => v !== 0)
                          .reduce((a, b) => a + b, 0)}
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
              mencari nilai mean rating dari {""}
              <strong>
                {capitalize(opsional.split("-")[0])} ke-{selectedIndex[0] + 1}{" "}
                {""}
              </strong>
              pada data toy dataset di atas.
            </p>
          </div>
        </div>
        <OnlyDivider />{" "}
        <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 dark:text-gray-200 m-2">
          Hasil Mean Rating {capitalize(opsional.split("-")[0])} pada {""}
          {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1} yaitu ={" "}
          <span className="bg-green-100 dark:bg-green-800 rounded-md p-1">
            {selectedMean.toFixed(2)}
          </span>
        </p>
        <div className="bg-blue-100 dark:bg-gray-800 m-2 rounded-md shadow-sm">
          <MathJaxContext options={mathjaxConfig}>
            <div className="text-[0.75rem] sm:text-sm md:text-base flex justify-center items-center flex-col px-4 sm:px-10">
              <MeanRatingRumusIdx
                opsional={opsional}
                data={data}
                selectedIndex={selIdx}
              />
              <div className="text-center">
                <MeanRatingIndexExp
                  opsional={opsional}
                  data={data}
                  selectedIndex={selIdx}
                  isNotation={isNotation}
                />
              </div>
              <div className="text-center">
                <MeanRatingExpressionsValues
                  opsional={opsional}
                  data={data}
                  selectedIndex={selIdx}
                  isNotation={isNotation}
                  selectedMean={selectedMean}
                />
              </div>
            </div>
          </MathJaxContext>
        </div>
      </div>
    </div>
  );
}
