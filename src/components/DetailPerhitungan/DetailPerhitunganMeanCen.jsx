import React, { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import {
  getFormulaMeanCenteredIndex,
  getFormulaMeanCenteredValue,
} from "../MathSimilarity/Measure/Formula/FormulaMeanCentered";
import MathJaxComponent from "../../MathJaxComponent";
import LegendTable from "../tabelData/LegendTable";
import Warm from "../Warm/Warm";
import { MeanCenteredIndex } from "../MathSimilarity/Measure/MeanCentered/MeanCenteredIndex";
import { MeanCenteredValue } from "../MathSimilarity/Measure/MeanCentered/MeanCenteredValue";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";

export default function DetailPerhitunganMeanCen() {
  const [stateData, setStateData] = useState(null);
  const [isNotation, setIsNotation] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("meanCenteredDetail");
    if (saved) {
      setStateData(JSON.parse(saved));
    }
  }, []);

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
  } = stateData;

  const toggleIsNotation = () => setIsNotation((prev) => !prev);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const current = opsional.split("-")[0];
  const opposite = current === "user" ? "item" : "user";
  const dataModify = dataOnly;
  const currentValue = dataModify[selectedIndex[0]][selectedIndex[1]];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 shadow-sm">
        Detail Perhitungan Mean-Centered Rating
      </h2>

      <SwitchToggle
        changeToggle={toggleIsNotation}
        title={"Tampilkan Notasi"}
      />

      <div className="grid sm:grid-cols-2 gap-6 justify-center m-3">
        <div className="overflow-x-auto my-4">
          <h3 className="font-semibold text-lg text-center">Data Rating (R)</h3>
          <table className="border border-black mx-auto mt-4 text-center w-full max-w-3xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2">U/I</th>
                {dataOnly[0].map((_, index) => (
                  <th key={index} className="border border-black px-4 py-2">
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
              {dataOnly.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-black bg-gray-100 px-4 py-2">
                    {!isNotation ? (
                      funnyMode ? (
                        columns[rowIndex]
                      ) : (
                        rowIndex + 1
                      )
                    ) : (
                      <span className="font-serif">
                        u<sub>{rowIndex + 1}</sub>
                      </span>
                    )}
                  </td>
                  {row.map((value, colIndex) => {
                    const isSelected =
                      selectedIndex[0] === rowIndex &&
                      selectedIndex[1] === colIndex;
                    const cellClass = `border px-4 py-2 ${
                      value === 0 ? "bg-red-200" : ""
                    } ${isSelected ? "bg-card_green_primary" : ""}`;
                    return (
                      <td key={colIndex} className={cellClass}>
                        {!isNotation ? (
                          value
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
        <div className="overflow-x-auto my-4">
          <h2 className="font-semibold text-lg text-center">Mean (μ)</h2>
          <table className="border border-black mx-auto mt-4 text-center w-full max-w-3xl">
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
                      : (opsional === "user-based" ? columns : headers)[index]}
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

      <LegendTable
        list={[
          {
            color: "bg-card_green_primary",
            description: "Data rating yang dihitung",
          },
          { color: "bg-yellow-200", description: "Mean yang dihitung" },
          { color: "bg-red-200", description: "Data rating kosong (0)" },
        ]}
      />

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
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-3xl text-center">
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
          </div>
        )}
      </MathJaxContext>

      <div className="mt-4 text-center text-gray-800">
        <p className="text-lg">
          Hasil dari{" "}
          <span className="italic font-semibold">Mean-Centered rating</span>{" "}
          dari{" "}
          <span className="italic font-semibold">
            {current}-{selectedIndex[0] + 1}
          </span>{" "}
          terhadap{" "}
          <span className="italic font-semibold">
            {opposite}-{selectedIndex[1] + 1}
          </span>{" "}
          adalah:
        </p>
        <p className="text-2xl font-bold mt-2">{selectedValue.toFixed(2)}</p>
      </div>
    </div>
  );
}
