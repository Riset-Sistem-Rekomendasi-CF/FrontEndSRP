import { MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import mathjaxConfig from "../../mathjax-config";
import { MeanRatingRumusIdx } from "../MathSimilarity/Measure/Mean/MeanRatingRumusIdx";
import { MeanRatingIndexExp } from "../MathSimilarity/Measure/Mean/MeanRatingIndexExp";
import { MeanRatingExpressionsValues } from "../MathSimilarity/Measure/Mean/MeanRatingExpressionsValues";
import { dataModify } from "../MathSimilarity/Measure/Mean/dataModify";

export default function DetailPerhitunganMean() {
  const navigate = useNavigate();

  const [stateData, setStateData] = useState(null);
  const [isNotation, setIsNotation] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("meanDetailData");
    if (saved) {
      setStateData(JSON.parse(saved));
      // Jangan hapus data di sini supaya bisa reload detail tanpa kehilangan data
      // sessionStorage.removeItem("meanDetailData");
    }
  }, []);

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

  // handle back to modal
  const handleBack = () => {
    navigate(-1);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const current = opsional.split("-")[0]; // "user" atau "item"
  const opposite = current === "user" ? "item" : "user";

  return (
    <div className="container mx-auto p-8">
      {/* Header / Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 p-4 shadow-sm text-center">
        <span>
          Detail Perhitungan Mean nilai <i>Rating</i>{" "}
          <span className="italic mr-1">(μ)</span>
          <i>{opsional.split("-")[0]}</i> ke-{Number(selIdx[0]) + 1}
        </span>
      </h2>

      <div className="max-w-4xl mx-auto">
        <SwitchToggle
          changeToggle={toggleIsNotation}
          title={"Tampilkan Notasi"}
        />

        <div className="flex flex-col justify-center m-3 overflow-x-auto">
          <div className="overflow-x-auto">
            <h2 className="font-semibold text-lg text-center">
              Data <i> Rating </i> (R)
            </h2>
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
                      const indicator = selIdx.includes(
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
                  <p>
                    Menandakan Data <i> Rating </i> yang akan dihitung
                  </p>
                ),
              },
              {
                color: "bg-red-200",
                description: (
                  <p>
                    Menandakan Data <i> Rating </i> yang tidak diketahui
                  </p>
                ),
              },
            ]}
          />
        </div>

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

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-700 mt-5 text-center">
          Hasil <i>mean</i> nilai
          <i> rating </i> dari
          <span className="italic">
            {" "}
            {capitalize(opsional.split("-")[0])}-{selIdx[0] + 1} adalah
          </span>{" "}
          = {selectedMean.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
