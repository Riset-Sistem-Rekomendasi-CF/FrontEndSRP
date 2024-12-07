import {
  getFormulaMeanCenteredIndex,
  getFormulaMeanCenteredValue,
} from "../Formula/FormulaMeanCentered";
import SwitchToggle from "../../../Toggle/SwitchToggle";
import React, { useState } from "react";
import LegendTable from "../../../tabelData/LegendTable";
import MathJaxComponent from "../../../../MathJaxComponent";
import Warm from "../../../Warm/Warm";

const ModalMeanCenteredMeasure = ({
  selectedIndex,
  selectedValue,
  dataOnly,
  result,
  opsional,
  close,
}) => {
  const [isNotation, setIsNotation] = useState(false);
  const dataModify = dataOnly;
  const currentValue = dataModify[selectedIndex[0]][selectedIndex[1]];

  const toggleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const MeanCenteredIndex = ({ rowIndex, colIndex }) => {
    const expression = getFormulaMeanCenteredIndex(
      rowIndex,
      colIndex,
      opsional
    );
    return <MathJaxComponent>{expression}</MathJaxComponent>;
  };

  const MeanCenteredValue = ({
    rowIndex,
    colIndex,
    data,
    result,
    selectedValue,
  }) => {
    const expression = getFormulaMeanCenteredValue(
      rowIndex,
      colIndex,
      data,
      result,
      opsional,
      selectedValue
    );
    return (
      <MathJaxComponent>
        {expression.formula}
        {expression.result}
      </MathJaxComponent>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto max-h-[80%] m-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
          Detail Menghitung <span className="italic">Mean-Centered</span> untuk
          setiap Data rating yang diketahui
        </h1>

        {/* Menampilkan rumus mean menggunakan MathJax */}
        <SwitchToggle
          changeToggle={toggleIsNotation}
          title={"Tampilkan Notasi"}
        />

        <div className="flex flex-col  sm:flex-row justify-center m-3 overflow-x-auto">
          {/* Tabel Data Rating */}
          <div className="overflow-x-auto w-full sm:w-auto">
            <h2 className="font-semibold text-lg">
              Data <i> Rating </i> (R)
            </h2>
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
                        index + 1
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
                        rowIndex + 1
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

          <div className="mt-4 sm:mt-0">
            <h2 className="font-semibold text-lg">Mean (μ)</h2>
            <table className="border border-black mt-4 ml-3 w-full sm:w-auto">
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
                      {index + 1}
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
          <LegendTable
            list={[
              {
                color: "bg-card_green_primary",
                description: (
                  <>
                    Menandakan Data{" "}
                    <span className="font-serif ml-1 mr-1">Mean</span>
                    <i className="mx-1"> Rating </i> yang akan dihitung
                  </>
                ),
              },
              {
                color: "bg-yellow-200",
                description: (
                  <>
                    Menandakan Data{" "}
                    <span className="font-serif mx-1">Mean</span>
                    yang akan dihitung
                  </>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <>
                    Menandakan Data <i className="mx-1"> Rating </i> yang tidak
                    diketahui
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
            {isNotation ? (
              <MeanCenteredIndex
                rowIndex={selectedIndex[0]}
                colIndex={selectedIndex[1]}
                opsional={opsional}
              />
            ) : (
              ""
            )}

            {!isNotation && selectedIndex ? (
              <MeanCenteredValue
                rowIndex={selectedIndex[0]}
                colIndex={selectedIndex[1]}
                data={dataModify}
                result={result}
                selectedValue={selectedValue}
              />
            ) : (
              <p>No expression selected.</p>
            )}
          </div>
        )}

        <p className="text-xl font-bold text-gray-700 mt-5 sm:text-md md:text-lg lg:text-xl xl:text-2xl">
          Hasil dari <span className="italic">Mean-Centered</span> adalah dari
          <span className="italic"> {opsional.split("-")[0]} </span>{" "}
          {selectedIndex[0] + 1} dan
          <span className="italic"> item {selectedIndex[1] + 1}</span> ={" "}
          {selectedValue.toFixed(2)}
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
