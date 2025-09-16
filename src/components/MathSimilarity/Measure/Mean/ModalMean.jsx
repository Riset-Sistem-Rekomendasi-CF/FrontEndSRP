import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import React, { useState } from "react";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import LegendTable from "../../../tabelData/LegendTable";
import CloseIcon from "@mui/icons-material/Close";
import { MeanRatingRumusIdx } from "./MeanRatingRumusIdx";
import { MeanRatingIndexExp } from "./MeanRatingIndexExp";
import { MeanRatingExpressionsValues } from "./MeanRatingExpressionsValues";
import { dataModify } from "./dataModify";
import InfoIcon from "@mui/icons-material/Info";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DividerHeading, OnlyDivider } from "../../../tabelData/DividerHeading";

export default function ModalMean({
  opsional,
  data,
  similarity,
  selectedIndex,
  selectedMean,
  close,
  headers,
  columns,
  funnyMode,
}) {
  const [isNotation, setIsNotation] = useState(false);

  // data modify
  const modifiedData = dataModify(data, similarity, opsional);
  console.log("modified data", modifiedData);

  const toggleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const handleOpenDetailMean = () => {
    const detailData = {
      opsional,
      data: modifiedData,
      selectedIndex,
      selectedMean,
      headers,
      columns,
      funnyMode,
    };

    // Simpan ke sessionStorage
    sessionStorage.setItem("meanDetailData", JSON.stringify(detailData));

    // Tunda buka tab baru 100ms supaya data siap
    setTimeout(() => {
      const newTab = window.open("/detail-mean-rating", "_blank");
      if (!newTab) {
        alert("Pop-up diblokir! Izinkan pop-up di browser Anda.");
      }
    }, 100);
  };

  // helper untuk uppercase
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start sm:items-center pt-6 sm:pt-0 z-50 overflow-y-auto">
      {/* Modal Content */}
      <div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg 
            w-full max-w-4xl 
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative"
      >
        {/* Header / Title */}
        <div className="relative">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm font-poppins">
            <span>
              Detail Perhitungan Mean nilai Rating {""}
              <span className="italic mr-1">(μ)</span>
              {opsional.split("-")[0]} {""}ke-{Number(selectedIndex) + 1}
            </span>
          </h2>
          <button
            onClick={close}
            className="absolute top-1 right-2 text-lg text-gray-600 hover:text-gray-800 focus:outline-none bg-red-200 px-2 py-1 rounded-full z-20"
            aria-label="Tutup"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <SwitchToggle
          changeToggle={toggleIsNotation}
          title={"Tampilkan Notasi"}
        />

        <div className="flex flex-col justify-center m-3 overflow-x-auto">
          <div className="overflow-x-auto">
            <DividerHeading text="Data Rating (R)" />

            <table className="border border-black mt-4 mx-auto text-center w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-4 py-2">U/I</th>
                  {Array.from(
                    { length: modifiedData[0].length },
                    (_, index) => (
                      <th key={index} className="border border-black px-4 py-2">
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
                  <tr key={rowIndex}>
                    <td className="border border-black px-4 py-2 w-14 bg-gray-200">
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
                      const cellClass =
                        value === 0
                          ? "border border-black px-4 py-2 text-center w-14 bg-red-200"
                          : "border border-black px-4 py-2 text-center w-14";
                      const indicator = selectedIndex.includes(
                        opsional === "user-based" ? rowIndex : colIndex
                      )
                        ? "bg-green-200"
                        : "";

                      return (
                        <td
                          key={colIndex}
                          className={`${indicator} ${cellClass}`}
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
                    <p>
                      Menandakan item yang belum diberikan oleh user tersebut
                    </p>
                  </>
                ),
              },
            ]}
          />
          <div className="mt-2 w-40 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors ">
            <FullscreenIcon className="text-gray-600 inline-block mr-2" />
            <button
              className="p-2 font-semibold font-poppins"
              onClick={handleOpenDetailMean}
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
              mencari nilai mean rating dari {""}
              <strong>
                {capitalize(opsional.split("-")[0])} ke-{selectedIndex[0] + 1}{" "}
                {""}
              </strong>
              pada data toy dataset di atas.
            </p>
          </div>
          <OnlyDivider />
          <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 m-2 font-poppins">
            Hasil Mean Rating {capitalize(opsional.split("-")[0])} pada {""}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1} yaitu ={" "}
            <span className="bg-green-100 rounded-md p-1 ">
              {selectedMean.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Menampilkan rumus mean menggunakan MathJax */}
        <div className="bg-blue-100 m-2 rounded-md shadow-sm">
          <MathJaxContext options={mathjaxConfig}>
            <div className="text-[0.75rem] sm:text-sm md:text-base flex justify-center items-center flex-col px-2 sm:px-4">
              {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
              {
                <MeanRatingRumusIdx
                  opsional={opsional}
                  data={data}
                  selectedIndex={selectedIndex}
                />
              }

              {
                <div className="text-center">
                  <MeanRatingIndexExp
                    opsional={opsional}
                    data={data}
                    selectedIndex={selectedIndex}
                    isNotation={isNotation}
                  />
                </div>
              }

              {
                <div className="text-center">
                  <MeanRatingExpressionsValues
                    opsional={opsional}
                    data={data}
                    selectedIndex={selectedIndex}
                    isNotation={isNotation}
                    selectedMean={selectedMean}
                  />
                </div>
              }
            </div>
          </MathJaxContext>
        </div>

        {/* Menampilkan perhitungan manual */}

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-sm font-poppins"
          onClick={close} // Menutup modal saat tombol ditekan
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
