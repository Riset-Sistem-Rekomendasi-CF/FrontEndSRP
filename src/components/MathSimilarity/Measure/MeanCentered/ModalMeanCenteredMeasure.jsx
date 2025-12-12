import SwitchToggle from "../../../Toggle/SwitchToggle";
import { useState } from "react";
import LegendTable from "../../../tabelData/LegendTable";
import Warm from "../../../Warm/Warm";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { MeanCenteredIndex } from "./MeanCenteredIndex";
import { MeanCenteredValue } from "./MeanCenteredValue";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DividerHeading, OnlyDivider } from "../../../tabelData/DividerHeading";
import { transposeMatrix } from "../../../../helper/helper";

const ModalMeanCenteredMeasure = ({
  selectedIndex,
  selectedValue,
  dataOnly,
  result,
  opsional,
  close,
  headers,
  columns,
  funnyMode,
  similarity,
}) => {
  const [isNotation, setIsNotation] = useState(false);
  const shouldTranspose =
    (similarity === "Adjusted Cosine" && opsional !== "user-based") ||
    ((similarity === "Cosine" ||
      similarity === "Pearson Correlation Coefficient" ||
      similarity === "Bhattacharyya Coefficient") &&
      opsional === "item-based");

  const dataModify = shouldTranspose ? transposeMatrix(dataOnly) : dataOnly;

  // Safety check untuk selectedIndex
  const isValidIndex =
    Array.isArray(selectedIndex) && selectedIndex.length === 2;

  const currentValue = dataOnly[selectedIndex[0]][selectedIndex[1]];
  // const currentValue = dataModify[selectedIndex[0]][selectedIndex[1]];

  const toggleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  // helper untuk heading tabel rating

  const isRatingHeader =
    similarity === "Adjusted Cosine"
      ? opsional === "user-based"
        ? "U/I"
        : "I/U"
      : opsional === "user-based"
      ? "U/I"
      : "I/U";

  // debug
  // console.log("current value", currentValue);
  // console.log("value selectedIndex [0]", selectedIndex[0]);
  // console.log("value selectedIndex [1]", selectedIndex[1]);
  // console.log("isRatingHeader", isRatingHeader);
  // console.log(opsional, similarity);
  // console.log("Should Transpose?", shouldTranspose);
  // console.log("Data Modify:", dataModify);
  // console.log("Mean List:", result["mean-list"]);

  // mean-list check
  const meanList =
    similarity === "Adjusted Cosine"
      ? result["mean-list-brother"]
      : result["mean-list"];

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const current = opsional.split("-")[0]; // "user" atau "item"
  const opposite = current === "user" ? "item" : "user";

  // Untuk Adjusted Cosine, mean-list-brother adalah mean per-item
  // Jadi isMeanUserBased harus false untuk Adjusted Cosine
  const isMeanUserBased =
    similarity === "Adjusted Cosine"
      ? false // Adjusted Cosine selalu menggunakan mean per-item
      : opsional === "user-based";

  const handleOpenDetailMeanCentered = () => {
    const detailData = {
      selectedIndex,
      selectedValue,
      dataOnly,
      result,
      opsional,
      close,
      headers,
      columns,
      funnyMode,
      similarity,
    };

    // simpan ke sessionStorage
    sessionStorage.setItem("meanCenteredDetail", JSON.stringify(detailData));

    // buka halaman detail
    setTimeout(() => {
      const newTab = window.open("/detail-mean-centered", "_blank");
      if (!newTab) {
        alert(
          "Pastikan pop-up tidak diblokir untuk membuka halaman detail perhitugan."
        );
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}

      <div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg 
            w-full max-w-4xl 
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative text-black"
      >
        {/* Header / Title */}
        <div className="relative">
          <h2 className="font-poppins text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm">
            <span>Detail Perhitungan Mean-Centered Rating</span>
          </h2>
          <button
            onClick={close}
            className="absolute top-1 right-2 text-lg text-gray-600 hover:text-gray-800 focus:outline-none bg-red-200 px-2 py-1 rounded-full z-20"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Menampilkan rumus mean menggunakan MathJax */}
        <SwitchToggle
          changeToggle={toggleIsNotation}
          title={"Tampilkan Notasi"}
        />
        <div className="w-full flex flex-col">
          <div className="flex flex-row gap-4">
            {/* Tabel Data Rating - bisa scroll horizontal */}
            <div className="flex-1 min-w-0">
              <DividerHeading text={"Data Rating (R)"} />
              <div className="overflow-x-auto w-full">
                <div className="rounded-xl shadow-lg inline-block min-w-full ">
                  <table className="mx-auto w-full">
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-3 font-semibold border-r border-blue-400">
                          {isRatingHeader}
                        </th>
                        {Array.from(
                          { length: dataModify[0].length },
                          (_, index) => (
                            <th
                              key={index}
                              className="px-4 py-3 w-14 font-semibold border-r border-blue-400 last:border-r-0"
                            >
                              {!funnyMode ? (
                                <>{index + 1}</>
                              ) : (
                                headers?.[index] || index + 1
                              )}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {dataModify.map((row, rowIndex) => (
                        <tr
                          key={rowIndex + "-data-body"}
                          className={`transition-all duration-200 ${
                            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 w-14 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
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
                                className={`px-4 py-3 text-center w-14 transition-all duration-200 border-r border-gray-100 last:border-r-0 ${
                                  value === 0 ? "bg-red-100 text-red-600" : ""
                                } ${
                                  isSelected
                                    ? "bg-green-100 text-green-700 font-medium"
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
                                  <>
                                    <span className="italic font-serif">
                                      r
                                      <sub>
                                        {rowIndex + 1}
                                        {colIndex + 1}
                                      </sub>
                                    </span>
                                  </>
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

            {/* Tabel Mean - fixed width, tidak perlu scroll */}
            <div className="flex-shrink-0 w-auto">
              <DividerHeading text={"Mean (μ)"} />
              <div className="rounded-xl shadow-lg">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-4 py-3 w-10 italic font-semibold border-r border-blue-400">
                        {isMeanUserBased ? "U" : "I"}
                      </th>
                      <th className="px-4 py-3 w-14 font-serif italic font-semibold">
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
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 w-14 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
                            {label}
                          </td>
                          <td
                            className={`px-4 py-3 w-20 text-center transition-all duration-200 ${
                              isSelected
                                ? "bg-yellow-100 text-yellow-700 font-medium"
                                : ""
                            }`}
                          >
                            <span
                              className="text-center"
                              title={
                                isNotation
                                  ? mean?.toFixed
                                    ? mean.toFixed(0)
                                    : mean
                                  : `μ${index + 1}`
                              }
                            >
                              {!isNotation ? (
                                mean?.toFixed ? (
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

          {/* Tabel Ringkasan Data yang Digunakan */}
          <div className="mt-4">
            <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
            <div className="flex flex-row gap-4 justify-center mt-2">
              {/* Tabel Rating yang dipilih */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-green-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Rating Terpilih
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        {!isNotation ? (
                          `r${selectedIndex[0] + 1}${selectedIndex[1] + 1}`
                        ) : (
                          <span className="italic font-serif">
                            r
                            <sub>
                              {selectedIndex[0] + 1}
                              {selectedIndex[1] + 1}
                            </sub>
                          </span>
                        )}
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
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-yellow-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Mean Terpilih
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        {!isNotation ? (
                          `μ${
                            (shouldTranspose
                              ? selectedIndex[1]
                              : selectedIndex[0]) + 1
                          }`
                        ) : (
                          <span className="italic font-serif">
                            μ
                            <sub>
                              {(shouldTranspose
                                ? selectedIndex[1]
                                : selectedIndex[0]) + 1}
                            </sub>
                          </span>
                        )}
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
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Hasil Mean-Centered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        {!isNotation ? (
                          `s${selectedIndex[0] + 1}${selectedIndex[1] + 1}`
                        ) : (
                          <span className="italic font-serif">
                            s
                            <sub>
                              {selectedIndex[0] + 1}
                              {selectedIndex[1] + 1}
                            </sub>
                          </span>
                        )}
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

          <div>
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
          </div>
          <div className="mt-2 w-40 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors">
            <FullscreenIcon className="text-gray-600 inline mr-2" />
            <button
              className="p-2  font-semibold font-poppins"
              onClick={handleOpenDetailMeanCentered}
            >
              Full Page
            </button>
          </div>
          <div className="flex items-start gap-2 pt-2">
            {/* Icon di pojok kiri atas */}
            <InfoIcon className="text-blue-500 mt-1" />

            {/* Teks paragraf */}
            <p className="text-justify font-poppins">
              Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
              mencari nilai mean-centered rating
              <strong>
                {" "}
                {similarity === "Adjusted Cosine" && opsional !== "user-based"
                  ? `Item-${selectedIndex[1] + 1} terhadap User-${
                      selectedIndex[0] + 1
                    }` // <-- Logika dibalik di sini
                  : `${capitalize(opsional.split("-")[0])}-${
                      selectedIndex[0] + 1
                    } terhadap ${opposite}-${selectedIndex[1] + 1}`}
              </strong>{" "}
              pada data toy dataset di atas.
            </p>
          </div>
          <OnlyDivider />
          <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 m-2 font-poppins">
            Hasil dari Mean-Centered rating dari{" "}
            {similarity === "Adjusted Cosine" && opsional !== "user-based"
              ? `Item-${selectedIndex[1] + 1} terhadap User-${
                  selectedIndex[0] + 1
                }`
              : `${capitalize(opsional.split("-")[0])}-${
                  selectedIndex[0] + 1
                } terhadap ${opposite}-${selectedIndex[1] + 1}`}{" "}
            yaitu ={" "}
            <span className="bg-green-100 rounded-md p-1 ">
              {selectedValue.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="bg-blue-100 p-2 m-2 rounded-md shadow-sm">
          {currentValue === 0 ? (
            <Warm>
              Catatan jika ada{" "}
              <span className="text-red-600">
                data <i> rating </i> adalah 0{" "}
              </span>{" "}
              akan menghasilkan <span className="text-red-600">nilai 0</span>{" "}
              atau diabaikan.
            </Warm>
          ) : (
            ""
          )}

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
                  // dataOnly={dataOnly}
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
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-sm font-poppins"
          onClick={close} // Menutup modal saat tombol ditekan
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ModalMeanCenteredMeasure;
