import React, { useEffect, useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import LegendTable from "../tabelData/LegendTable";
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import { SimilarityIndex } from "../MathSimilarity/Measure/Similarity/SimilarityIndex";
import { SimilarityIndexNonZero } from "../MathSimilarity/Measure/Similarity/SimilarityIdxNonZero";
import { SimilarityValue } from "../MathSimilarity/Measure/Similarity/SimilarityValue";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { DividerHeading, OnlyDivider } from "../tabelData/DividerHeading";
import SimilarityTabelRating from "../MathSimilarity/Measure/Similarity/SimilarityTabelRating";
import { transposeMatrix } from "../../helper/helper";

export default function DetailPerhitunganSimilarity() {
  const [stateData, setStateData] = useState(null);
  const [isNotation, setIsNotation] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("similarityDetail");
    if (saved) {
      setStateData(JSON.parse(saved));
    }
  }, []);

  if (!stateData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>Memuat detail perhitungan Similarity...</p>
      </div>
    );
  }

  const {
    data,
    selectedIndex,
    selectedMean,
    dataOnly,
    similarity,
    opsional,
    headers,
    columns,
    funnyMode,
  } = stateData;

  const toggleIsNotation = () => setIsNotation((prev) => !prev);
  const current = opsional.split("-")[0];
  const shouldShowTable =
    similarity === "Adjusted Cosine" ||
    similarity === "Pearson Correlation Coefficient" ||
    similarity === "Bhattacharyya Coefficient" ||
    similarity === "Cosine";
  // mean-centered
  const dataModify = similarity !== "Cosine" ? data["mean-centered"] : dataOnly;
  const onlyDataModify =
    opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly;

  const numberOfColumnsCen = dataOnly[0].length;
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 p-4 max-w-full ">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 shadow-sm">
        <span>Detail Perhitungan Fungsi Similaritas</span>
      </h2>
      <div>
        <button
          onClick={() => window.close()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
        >
          <ArrowBackIcon className="text-white" />
          Kembali
        </button>
      </div>

      <SwitchToggle
        changeToggle={toggleIsNotation}
        title={"Tampilkan Notasi"}
      />
      {shouldShowTable && (
        <>
          <DividerHeading text={`Data Rating (R)`} />
          <SimilarityTabelRating
            dataOnly={onlyDataModify}
            headers={headers}
            columns={columns}
            opsional={opsional}
            isNotation={isNotation}
            funnyMode={funnyMode}
            selectedIndex={selectedIndex}
            similarity={similarity}
          />
        </>
      )}

      <DividerHeading text={`Data Tabel Mean-Centered`} />
      <div className="overflow-x-auto mt-4 ">
        <table className="border border-black mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">
                {opsional === "user-based" ? "U/I" : "I/U"}
              </th>
              {Array.from({ length: numberOfColumnsCen }, (_, index) => (
                <th key={index} className="border border-black px-4 py-2">
                  {!isNotation ? (
                    !funnyMode ? (
                      index + 1
                    ) : (
                      (opsional === "user-based" ? columns : headers)[index]
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
                <td className="border border-black px-4 py-2 w-20 bg-gray-200">
                  {!isNotation ? (
                    !funnyMode ? (
                      rowIndex + 1
                    ) : (
                      (opsional === "user-based" ? columns : headers)[rowIndex]
                    )
                  ) : (
                    <span className="font-serif">
                      u<sub>{rowIndex + 1}</sub>
                    </span>
                  )}
                </td>
                {row.map((value, colIndex) => {
                  const IsZero = dataOnly[rowIndex][colIndex] === 0;
                  return (
                    <td
                      key={colIndex}
                      className={`border border-black px-4 py-2 text-center w-20 
                    ${IsZero ? "bg-red-200" : ""} 
                    ${
                      !IsZero &&
                      selectedIndex.includes(
                        opsional === "item-based" ? colIndex : rowIndex
                      )
                        ? "bg-green-200"
                        : ""
                    }`}
                    >
                      {!isNotation ? (
                        value.toFixed(
                          similarity !== "Cosine" &&
                            similarity !== "Bhattacharyya Coefficient (BC)"
                            ? 2
                            : 0
                        )
                      ) : (
                        <span className="font-serif">
                          {`${
                            similarity !== "Cosine" &&
                            similarity !== "Bhattacharyya Coefficient"
                              ? "s"
                              : "r"
                          }`}
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
        {/* Tabel Legend */}
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
                  <p>Menandakan Data Rating yang tidak diketahui</p>
                </>
              ),
            },
          ]}
        />
      </div>
      <div className="flex items-start gap-2 pt-2">
        {/* Icon di pojok kiri atas */}
        <InfoIcon className="text-blue-500 mt-1" />

        {/* Teks paragraf */}
        <p className="text-justify">
          Untuk mempermudah pemahaman bisa dilihat detail perhitungan untuk
          mencari nilai simialaritas
          <strong>
            {" "}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1} dengan{" "}
            {capitalize(opsional.split("-")[0])}-{selectedIndex[1] + 1}
          </strong>{" "}
          pada data toy dataset di atas.
        </p>
      </div>
      <OnlyDivider />
      <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 m-2">
        Hasil Similaritas antara {opsional.split("-")[0]}-{selectedIndex[0] + 1}{" "}
        {""}
        dengan {opsional.split("-")[0]}-{selectedIndex[1] + 1} ={" "}
        <span className="bg-green-100 rounded-md p-1 ">
          {selectedMean.toFixed(4)}
        </span>
      </p>
      <div className="bg-blue-100 p-4 m-2 mt-4 rounded-md shadow-sm">
        {/* MathJax untuk rumus */}
        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left">
              {selectedIndex ? (
                <>
                  {/* RUMUS */}
                  <div className="w-full min-w-[200px]">
                    <SimilarityIndex
                      rowIndex={selectedIndex[0]}
                      colIndex={selectedIndex[1]}
                      dataOnly={dataOnly}
                      opsional={opsional}
                      isNotation={isNotation}
                      similarity={similarity}
                    />
                  </div>
                  {/* END RUMUS */}
                  {/* IRISAN */}
                  {similarity !== "Bhattacharyya Coefficient" ? (
                    <div className="w-full min-w-[200px]">
                      <SimilarityIndexNonZero
                        rowIndex={selectedIndex[0]}
                        colIndex={selectedIndex[1]}
                        similarity={similarity}
                        opsional={opsional}
                        dataOnly={dataOnly}
                        isNotation={isNotation}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p>No expression selected.</p>
              )}
              {/* END IRISAN */}
            </div>
          </div>
        </MathJaxContext>

        <MathJaxContext options={mathjaxConfig}>
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-x-visible">
            <div className="text-[0.75rem] sm:text-sm md:text-base leading-[1.4] mb-4 text-center sm:text-left">
              {/* DETAIL PERHITUNGAN */}
              {selectedIndex && dataOnly ? (
                <>
                  <div>
                    <SimilarityValue
                      rowIndex={selectedIndex[0]}
                      colIndex={selectedIndex[1]}
                      data={data}
                      dataOnly={dataOnly}
                      similarity={similarity}
                      selectedMean={selectedMean}
                      opsional={opsional}
                      isNotation={isNotation}
                    />
                  </div>
                </>
              ) : (
                <p>No expression selected.</p>
              )}
              {/* END DETAIL PERHITUNGAN */}
            </div>
          </div>
        </MathJaxContext>
      </div>
    </div>
  );
}
