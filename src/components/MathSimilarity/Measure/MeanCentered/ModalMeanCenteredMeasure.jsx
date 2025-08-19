import {
  getFormulaMeanCentered,
  getFormulaMeanCenteredIndex,
  getFormulaMeanCenteredValue,
} from "../Formula/FormulaMeanCentered";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import React, { useState } from "react";
import LegendTable from "../../../tabelData/LegendTable";
import MathJaxComponent from "../../../../MathJaxComponent";
import Warm from "../../../Warm/Warm";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { MeanCenteredIndex } from "./MeanCenteredIndex";
import { MeanCenteredValue } from "./MeanCenteredValue";

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
}) => {
  const [isNotation, setIsNotation] = useState(false);
  const dataModify = dataOnly;
  const currentValue = dataModify[selectedIndex[0]][selectedIndex[1]];

  const toggleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  // console.log("selectedIndex:", selectedIndex);
  // console.log("selectedValue:", selectedValue);

  // helper untuk uppercase
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const current = opsional.split("-")[0]; // "user" atau "item"
  const opposite = current === "user" ? "item" : "user";

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
    };

    // simpan ke sessionStorage
    sessionStorage.setItem("meanCenteredDetail", JSON.stringify(detailData));

    // buka halaman detail
    setTimeout(() => {
      const newTab = window.open("/detail-mean-centered", "_blank");
      if (!newTab) {
        alert(
          "Pastikan pop-up tidak diblokir untuk membuka halaman detail perhitungan."
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
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm">
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

        <div className="flex flex-col  sm:flex-row justify-center m-3 overflow-x-auto">
          {/* Tabel Data Rating */}
          <div className="overflow-x-auto w-full sm:w-auto">
            <h2 className="font-semibold text-lg">Data Rating (R)</h2>
            <table className="border border-black mt-4 mr-3 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-4 py-2">U/I</th>
                  {Array.from({ length: dataModify[0].length }, (_, index) => (
                    <th
                      key={index}
                      className="border border-black px-4 py-2 w-14"
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
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataModify.map((row, rowIndex) => (
                  <tr key={rowIndex + "data-body"}>
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
                      const isSelected =
                        opsional === "item-based"
                          ? selectedIndex[1] === colIndex &&
                            selectedIndex[0] === rowIndex
                          : selectedIndex[0] === rowIndex &&
                            selectedIndex[1] === colIndex;
                      const cellClass =
                        value === 0
                          ? "border border-black px-4 py-2 text-center w-14 bg-red-200"
                          : "border border-black px-4 py-2 text-center w-14";
                      return (
                        <td
                          key={rowIndex + "-" + colIndex}
                          className={`${cellClass} ${
                            isSelected ? "bg-card_green_primary" : ""
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

          <div className="mt-4 sm:mt-0 ml-4">
            <h2 className="font-semibold text-lg">Mean (μ)</h2>
            <table className="border border-black mt-4 w-full sm:w-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-4 py-2 w-10 italic">
                    {opsional === "user-based" ? "U" : "I"}
                  </th>
                  <th className="border border-black italic px-4 py-2 w-14 font-serif">
                    μ
                  </th>
                </tr>
              </thead>
              <tbody>
                {result["mean-list"].map((mean, index) => (
                  <tr key={index + "mean-body"}>
                    <td className="border border-black px-4 py-2 w-14">
                      {!funnyMode
                        ? index + 1
                        : (opsional === "user-based" ? columns : headers)[
                            index
                          ]}
                    </td>
                    <td
                      className={`border border-black px-4 py-2 w-20 text-center
                                     ${
                                       selectedIndex[
                                         opsional === "user-based" ? 0 : 1
                                       ] === index
                                         ? "bg-yellow-200"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button
            className="p-2 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors  font-semibold"
            onClick={handleOpenDetailMeanCentered}
          >
            Detail Mean-Centered {capitalize(opsional.split("-")[0])}
          </button>
        </div>
        <div className="flex items-start gap-2 pt-2">
          {/* Icon di pojok kiri atas */}
          <InfoIcon className="text-blue-500 mt-1" />

          {/* Teks paragraf */}
          <p className="text-justify">
            Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
            mencari nilai <i>mean-centered rating</i>
            <strong>
              {" "}
              <i>
                {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1}
              </i>{" "}
              antara{" "}
              <i>
                {opposite}-{selectedIndex[1] + 1}
              </i>
            </strong>{" "}
            pada data <i>toy dataset</i> di atas.
          </p>
        </div>

        <div>
          <LegendTable
            list={[
              {
                color: "bg-card_green_primary",
                description: (
                  <>
                    <p>
                      Menandakan Data{" "}
                      <span className="font-serif ml-1 mr-1">Mean</span>
                      <i className="mx-1"> Rating </i> yang akan dihitung
                    </p>
                  </>
                ),
              },
              {
                color: "bg-yellow-200",
                description: (
                  <>
                    <p>
                      Menandakan Data{" "}
                      <span className="font-serif mx-1">Mean</span>
                      yang akan dihitung
                    </p>
                  </>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <>
                    <p>
                      Menandakan Data <i className="mx-1"> Rating </i> yang
                      tidak diketahui
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>

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

        {currentValue !== 0 && (
          <div className="flex justify-center items-center flex-col px-10">
            {!isNotation && selectedIndex && (
              <MeanCenteredIndex
                rowIndex={selectedIndex[0]}
                colIndex={selectedIndex[1]}
                opsional={opsional}
              />
            )}

            {!isNotation && selectedIndex && (
              <MeanCenteredValue
                rowIndex={selectedIndex[0]}
                colIndex={selectedIndex[1]}
                data={dataModify}
                result={result}
                opsional={opsional}
                selectedValue={selectedValue}
              />
            )}
          </div>
        )}

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-700 mt-5">
          Hasil dari <span className="italic">Mean-Centered rating</span> dari
          <span className="italic">
            {" "}
            {opsional.split("-")[0]}-{selectedIndex[0] + 1}
          </span>{" "}
          antara
          <span className="italic">
            {" "}
            <i>
              {opposite}-{selectedIndex[1] + 1}
            </i>
          </span>{" "}
          yaitu = {selectedValue.toFixed(2)}
        </p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={close} // Menutup modal saat tombol ditekan
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ModalMeanCenteredMeasure;
