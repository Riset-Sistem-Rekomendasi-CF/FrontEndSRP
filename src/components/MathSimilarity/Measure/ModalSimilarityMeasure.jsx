import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import { isValidIndex, transposeMatrix } from "../../../helper/helper";
import { useState } from "react";
import SwitchToggle from "../../Toggle/SwitchToggle";
import LegendTable from "../../tabelData/LegendTable";
import CloseIcon from "@mui/icons-material/Close";
import { SimilarityIndex } from "./Similarity/SimilarityIndex";
import { SimilarityIndexNonZero } from "./Similarity/SimilarityIdxNonZero";
import { SimilarityValue } from "./Similarity/SimilarityValue";
import InfoIcon from "@mui/icons-material/Info";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DividerHeading, OnlyDivider } from "../../tabelData/DividerHeading";
import SimilarityTabelRating from "./Similarity/SimilarityTabelRating";
import BCSimilarityRating from "./Similarity/BcSimilarityRating";
import BcSimilarityWrapper from "./Similarity/BcSimilarityWrapper";

export default function ModalSimilarity({
  data,
  close,
  selectedIndex,
  selectedMean,
  dataOnly,
  similarity,
  opsional,
  headers,
  columns,
  funnyMode,
}) {
  const [isNotation, setIsNotation] = useState(false);

  const dataModify =
    similarity !== "Cosine"
      ? (
        opsional === "item-based"
          ? transposeMatrix(data["mean-centered"])
          : data["mean-centered"]
      )
      : dataOnly;

  let dataOnlyModify = opsional === "user-based" ? dataOnly : transposeMatrix(dataOnly);

  if (!dataModify || !dataModify.length) {
    return <div>Data tidak tersedia</div>;
  }

  // Tentukan jumlah kolom dan rows sesuai dataModify
  const numberOfColumnsCen = dataOnly[0]?.length || 0;

  // Saat transpose (Adjusted Cosine atau item-based), kolom = baris asli dan baris = kolom asli
  const colHeaders =
    similarity === "Adjusted Cosine" || opsional === "item-based"
      ? opsional === "user-based"
        ? columns // kalau user-based, setelah transpose kolom diambil dari columns (user)
        : headers // kalau item-based, setelah transpose kolom diambil dari headers (item)
      : opsional === "user-based"
        ? headers // bukan transpose, user-based pakai headers (item)
        : columns; // bukan transpose, item-based pakai columns (user)

  const rowHeaders =
    similarity === "Adjusted Cosine" || opsional === "item-based"
      ? opsional === "user-based"
        ? headers // setelah transpose, baris = headers (item)
        : columns // setelah transpose, baris = columns (user)
      : opsional === "user-based"
        ? columns // bukan transpose, baris = columns (user)
        : headers; // bukan transpose, baris = headers (item)

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const shouldShowTable =
    similarity === "Adjusted Cosine" ||
    similarity === "Pearson Correlation Coefficient" ||
    similarity === "Bhattacharyya Coefficient" ||
    similarity === "Cosine";

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // handle new windows
  const handleOpenDetailSimilarity = () => {
    const detailData = {
      data,
      close,
      selectedIndex,
      selectedMean,
      dataOnly,
      similarity,
      opsional,
      headers,
      columns,
      funnyMode,
    };

    // simpan ke sessionStorage
    sessionStorage.setItem("similarityDetail", JSON.stringify(detailData));

    // buka jendela baru
    setTimeout(() => {
      const newTab = window.open("/detail-similarity", "_blank");
      if (!newTab) {
        alert(
          "Silakan nonaktifkan pop-up blocker untuk membuka detail similarity."
        );
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg 
            w-full max-w-4xl 
            max-h-[90vh] overflow-y-auto mt-6 ml-4 mr-4 relative"
      >
        {/* Header / Title */}
        <div className="relative">
          <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold mb-4 bg-white p-4 pr-12 z-10 shadow-sm font-poppins">
            <span>Detail Perhitungan Fungsi Similaritas</span>
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
          changeToggle={handleIsNotation}
          title={"Tampilkan Notasi"}
        />
        {shouldShowTable && (
          <>
            <DividerHeading text="Data Rating (R)" />
            <SimilarityTabelRating
              dataOnly={dataOnly}
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

        {/* Tabel dengan Scroll Horizontal */}
        <div>
          {similarity !== "Bhattacharyya Coefficient" &&
            similarity !== "Cosine" && (
              <>
                <DividerHeading text={`Data Tabel Mean-Centered`} />
                <div className="overflow-x-auto mt-4">
                  <table className="border border-black mx-auto text-center w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">
                          {opsional === "user-based" ? "U/I" : "I/U"}
                        </th>
                        {Array.from(
                          { length: numberOfColumnsCen },
                          (_, index) => (
                            <th
                              key={index}
                              className="border border-black px-4 py-2"
                            >
                              {!isNotation ? (
                                !funnyMode ? (
                                  index + 1
                                ) : (
                                  colHeaders[index] || index + 1
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
                      {/* {dataModify.map((row, rowIndex) => ( */}
                      {dataOnly.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border border-black px-4 py-2 w-20 bg-gray-200">
                            {!isNotation ? (
                              !funnyMode ? (
                                rowIndex + 1
                              ) : (
                                rowHeaders[rowIndex] || rowIndex + 1
                              )
                            ) : (
                              <span className="font-serif">
                                u<sub>{rowIndex + 1}</sub>
                              </span>
                            )}
                          </td>
                          {row.map((value, colIndex) => {
                            // const IsZero =
                            //   dataOnlyModify[rowIndex][colIndex] === 0;
                            const IsZero =
                              dataOnly[rowIndex] &&
                                dataOnly[rowIndex][colIndex] !== undefined
                                ? dataOnly[rowIndex][colIndex] === 0
                                : true; // anggap kosong/merah jika tidak ada

                            const isIntersection =
                              opsional === "user-based"
                                ? isValidIndex(selectedIndex[0], dataOnly) &&
                                isValidIndex(selectedIndex[1], dataOnly) &&
                                (rowIndex === selectedIndex[0] ||
                                  rowIndex === selectedIndex[1]) &&
                                dataOnly[selectedIndex[0]][colIndex] !==
                                0 &&
                                dataOnly[selectedIndex[1]][colIndex] !==
                                0
                                : isValidIndex(selectedIndex[0], dataOnly) &&
                                isValidIndex(selectedIndex[1], dataOnly) &&
                                (colIndex === selectedIndex[0] ||
                                  colIndex === selectedIndex[1]) &&
                                dataOnly[rowIndex][selectedIndex[0]] !==
                                0 &&
                                dataOnly[rowIndex][selectedIndex[1]] !==
                                0;
                            // const isIntersection =
                            //   opsional === "user-based"
                            //     ? isValidIndex(selectedIndex[0], dataOnlyModify) &&
                            //     isValidIndex(selectedIndex[1], dataOnlyModify) &&
                            //     (rowIndex === selectedIndex[0] ||
                            //       rowIndex === selectedIndex[1]) &&
                            //     dataOnlyModify[selectedIndex[0]][colIndex] !==
                            //     0 &&
                            //     dataOnlyModify[selectedIndex[1]][colIndex] !==
                            //     0
                            //     : isValidIndex(selectedIndex[0], dataOnlyModify) &&
                            //     isValidIndex(selectedIndex[1], dataOnlyModify) &&
                            //     (rowIndex === selectedIndex[0] ||
                            //       rowIndex === selectedIndex[1]) &&
                            //     dataOnlyModify[selectedIndex[0]][colIndex] !==
                            //     0 &&
                            //     dataOnlyModify[selectedIndex[1]][colIndex] !==
                            //     0;

                            return (
                              <td
                                key={colIndex}
                                className={`border border-black px-4 py-2 text-center w-20 
                ${IsZero ? "bg-red-200" : ""} 
                ${!IsZero && isIntersection ? "bg-green-200" : ""}
              `}
                              >
                                {!isNotation ? (
                                  typeof value === "number" ? (
                                    data["mean-centered"][rowIndex][colIndex].toFixed(
                                      similarity !== "Cosine" &&
                                        similarity !==
                                        "Bhattacharyya Coefficient (BC)"
                                        ? 2
                                        : 0
                                    )
                                  ) : (
                                    "N/A"
                                  )
                                ) : (
                                  <span className="font-serif">
                                    {similarity !== "Cosine" &&
                                      similarity !== "Bhattacharyya Coefficient"
                                      ? "s"
                                      : "r"}
                                    <sub>
                                      {rowIndex + 1}
                                      {colIndex + 1}
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
                {/* Tabel Legend */}
                <LegendTable
                  list={[
                    {
                      color: "bg-green-200",
                      description: (
                        <>
                          <p>Menandakan data Rating yang akan dihitung</p>
                        </>
                      ),
                    },
                    {
                      color: "bg-red-200",
                      description: (
                        <>
                          <p>Menandakan data rating yang tidak diketahui</p>
                        </>
                      ),
                    },
                  ]}
                />
              </>
            )}
          <OnlyDivider />
          {similarity === "Bhattacharyya Coefficient" && <BCSimilarityRating />}
          {similarity === "Bhattacharyya Coefficient" && (
            <BcSimilarityWrapper
              dataOnly={dataOnly}
              selectedIndex={selectedIndex}
              opsional={opsional}
              isNotation={isNotation}
              similarity={similarity}
            />
          )}

          <div className="mt-2 w-40 bg-orange-300 rounded-md shadow-sm hover:bg-orange-500 transition-colors">
            <FullscreenIcon className="text-gray-600 inline-block mr-2" />
            <button
              className="p-2 font-semibold"
              onClick={handleOpenDetailSimilarity}
            >
              Full Page
            </button>
          </div>

          <div className="flex items-start gap-2 pt-2">
            {/* Icon di pojok kiri atas */}
            <InfoIcon className="text-blue-500 mt-1" />

            {/* Teks paragraf */}
            <p className="text-justify font-poppins">
              Scroll ke bawah untuk mengetahui detail perhitungan dari nilai similaritas
              <strong>
                {" "}
                {capitalize(opsional.split("-")[0])}-{selectedIndex[0] + 1}{" "}
                dengan {capitalize(opsional.split("-")[0])}-
                {selectedIndex[1] + 1}
              </strong>{" "}
            </p>
          </div>
          <OnlyDivider />
          <p className="text-base text-justify sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700 m-2 font-poppins">
            Hasil Similaritas antara {opsional.split("-")[0]}-
            {selectedIndex[0] + 1} {""}
            dengan {opsional.split("-")[0]}-{selectedIndex[1] + 1} ={" "}
            <span className="bg-green-100 rounded-md p-1 ">
              {typeof selectedMean === "number"
                ? selectedMean.toFixed(4)
                : "N/A"}
            </span>
          </p>
        </div>

        <div className="bg-blue-100 p-2 m-2 rounded-md shadow-sm">
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
                        dataOnly={dataOnlyModify}
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
                          dataOnly={dataOnlyModify}
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
                {selectedIndex && dataOnlyModify ? (
                  <>
                    <div>
                      <SimilarityValue
                        rowIndex={selectedIndex[0]}
                        colIndex={selectedIndex[1]}
                        data={data}
                        dataOnly={dataOnlyModify}
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
        {/* MathJax untuk rumus */}

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded font-poppins"
          onClick={close}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
