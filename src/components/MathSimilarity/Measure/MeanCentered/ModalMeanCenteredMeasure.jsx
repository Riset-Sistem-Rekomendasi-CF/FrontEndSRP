import SwitchToggle from "../../../Toggle/SwitchToggle";
import React, { useState } from "react";
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
      "Bhattacharyya Coefficient") &&
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

  const opsionalModify =
    opsional === "user-based"
      ? similarity === "Adjusted Cosine"
        ? "item-based"
        : "user-based"
      : opsional;

  const isMeanUserBased =
    (similarity === "Adjusted Cosine" && opsional === "item-based") ||
    opsional === "user-based";

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
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative"
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
          <div className="flex flex-row flex-wrap w-full overflow-x-auto">
            {/* Tabel Data Rating */}
            <div className="overflow-auto sm:overflow-visible flex-1 mr-2">
              <DividerHeading text={"Data Rating (R)"} />
              <table className="border border-black mt-4 mr-3 mx-auto w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">
                      {/* if user-based ajusted cosine  */}
                      {isRatingHeader}
                    </th>
                    {Array.from(
                      { length: dataModify[0].length },
                      (_, index) => (
                        <th
                          key={index}
                          className="border border-black px-4 py-2 w-14"
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
                  {/* {dataModify.map((row, rowIndex) => ( */}
                  {dataModify.map((row, rowIndex) => (
                    <tr key={rowIndex + "-data-body"}>
                      <td className="border border-black px-4 py-2 w-14 bg-gray-200">
                        {!funnyMode
                          ? rowIndex + 1
                          : columns?.[rowIndex] || rowIndex + 1}
                      </td>
                      {row.map((value, colIndex) => {
                        const isSelected =
                          isValidIndex &&
                          // Adjusted Cosine
                          ((similarity === "Adjusted Cosine" &&
                            ((opsional === "user-based" &&
                              rowIndex === selectedIndex[0] &&
                              colIndex === selectedIndex[1]) ||
                              (opsional === "item-based" &&
                                rowIndex === selectedIndex[1] &&
                                colIndex === selectedIndex[0]))) ||
                            // Selain Adjusted Cosine
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
                            className={`border border-black px-4 py-2 text-center w-14 ${
                              value === 0 ? "bg-red-200" : ""
                            } ${isSelected ? "bg-card_green_primary" : ""}`}
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

            <div className="mt-4 sm:mt-0 ml-4">
              <DividerHeading text={"Mean (μ)"} />
              <table className="border border-black mt-4 w-full sm:w-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2 w-10 italic">
                      {isMeanUserBased ? "U" : "I"}
                    </th>
                    <th className="border border-black italic px-4 py-2 w-14 font-serif">
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
                      <tr key={`mean-body-${index}`}>
                        <td className="border border-black px-4 py-2 w-14">
                          {label}
                        </td>
                        <td
                          className={`border border-black px-4 py-2 w-20 text-center ${
                            isSelected ? "bg-yellow-200" : ""
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
