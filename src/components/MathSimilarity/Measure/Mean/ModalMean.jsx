import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { useState } from "react";
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
  // console.log("modified data", modifiedData);

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
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative text-black"
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

        <div className="flex flex-col justify-center m-3">
          <div className="w-full">
            <DividerHeading text="Data Rating (R)" />

            <div className="overflow-x-auto w-full">
              <div className="rounded-xl shadow-lg inline-block min-w-full">
                <table className="mx-auto text-center w-full">
                  <thead>
                    <tr className="bg-blue-500 text-white">
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
                        <td className="px-4 py-3 w-14 bg-gray-100 font-medium text-gray-700 border-r border-gray-200">
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
                          const isSelected = selectedIndex.includes(
                            opsional === "user-based" ? rowIndex : colIndex
                          );

                          return (
                            <td
                              key={colIndex}
                              className={`px-4 py-3 text-center w-14 transition-all duration-200 border-r border-gray-100 last:border-r-0 ${
                                isZero ? "bg-red-100 text-red-600" : ""
                              } ${
                                isSelected
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
          {/* Tabel Ringkasan Data yang Digunakan */}
          <div className="mt-4">
            <DividerHeading text={"Data yang Digunakan dalam Perhitungan"} />
            <div className="flex flex-row gap-4 justify-center items-start mt-2 flex-wrap">
              {/* Tabel Rating yang digunakan */}
              <div className="rounded-xl shadow-lg overflow-hidden">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-green-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={
                          modifiedData[selectedIndex[0]]?.filter((v) => v !== 0)
                            .length + 1
                        }
                      >
                        Rating {capitalize(opsional.split("-")[0])}-
                        {selectedIndex[0] + 1} (Non-Zero)
                      </th>
                    </tr>
                    <tr className="bg-green-100">
                      <td className="px-3 py-1 text-xs font-medium text-gray-600 border-r border-green-200">
                        Item
                      </td>
                      {modifiedData[selectedIndex[0]]?.map(
                        (value, idx) =>
                          value !== 0 && (
                            <td
                              key={idx}
                              className="px-3 py-1 text-xs font-medium text-gray-600 border-r border-green-200 last:border-r-0"
                            >
                              {!isNotation ? (
                                !funnyMode ? (
                                  idx + 1
                                ) : (
                                  headers[idx]
                                )
                              ) : (
                                <span className="font-serif">
                                  i<sub>{idx + 1}</sub>
                                </span>
                              )}
                            </td>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-3 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        Rating
                      </td>
                      {modifiedData[selectedIndex[0]]?.map(
                        (value, idx) =>
                          value !== 0 && (
                            <td
                              key={idx}
                              className="px-3 py-2 text-center bg-green-50 text-green-700 font-semibold border-r border-green-100 last:border-r-0"
                            >
                              {value?.toFixed ? value.toFixed(0) : value}
                            </td>
                          )
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tabel Hasil Mean */}
              <div className="rounded-xl shadow-lg overflow-hidden h-fit">
                <table className="w-auto">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th
                        className="px-4 py-2 font-semibold text-sm"
                        colSpan={2}
                      >
                        Hasil Mean
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 bg-gray-100 font-medium text-gray-700 border-r border-gray-200 text-sm">
                        {!isNotation ? (
                          `μ${selectedIndex[0] + 1}`
                        ) : (
                          <span className="italic font-serif">
                            μ<sub>{selectedIndex[0] + 1}</sub>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center bg-purple-100 text-purple-700 font-semibold">
                        {selectedMean?.toFixed
                          ? selectedMean.toFixed(2)
                          : selectedMean}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
