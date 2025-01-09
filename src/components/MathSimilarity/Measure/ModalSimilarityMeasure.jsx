import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import {
  FormulaSimilarityIndex,
  FormulaSimilarityNonZero,
  FormulaSimilarityValue,
} from "./Formula/FormulaSimilarity";
import { transposeMatrix } from "../../../helper/helper";
import { useState } from "react";
import SwitchToggle from "../../Toggle/SwitchToggle";
import MathJaxComponent from "../../../MathJaxComponent";
import LegendTable from "../../tabelData/LegendTable";
import Warm from "../../Warm/Warm";
import { sum } from "../../../helper/Measure";
import CloseIcon from "@mui/icons-material/Close";

const SimilarityIndex = ({
  rowIndex,
  colIndex,
  similarity,
  opsional,
  isNotation,
}) => {
  const expression = FormulaSimilarityIndex(
    rowIndex,
    colIndex,
    opsional,
    similarity,
    isNotation
  );

  return (
    <>
      <MathJaxComponent>
        {/* {getFormulaSimilarity(similarity, opsional).formula} */}
        {expression}
      </MathJaxComponent>
    </>
  );
};

const SimilarityValue = ({
  rowIndex,
  colIndex,
  data,
  dataOnly,
  similarity,
  selectedMean,
  opsional,
  isNotation,
}) => {
  const dataModify =
    similarity === "Adjusted Cosine"
      ? opsional === "item-based"
        ? transposeMatrix(dataOnly)
        : dataOnly
      : opsional === "item-based"
      ? transposeMatrix(dataOnly)
      : dataOnly;

  const nonZeroIndexesRow = dataModify[rowIndex]
    .map((row, index) => (row !== 0 ? index : null))
    .filter((index) => index !== null);

  const nonZeroIndexesCol = dataModify[colIndex]
    .map((row, index) => (row !== 0 ? index : null))
    .filter((index) => index !== null);

  const intersection = nonZeroIndexesRow.filter((index) =>
    nonZeroIndexesCol.includes(index)
  );

  const dataSimilarity =
    similarity !== "Cosine"
      ? similarity === "Bhattacharyya Coefficient"
        ? data["probability"]
        : similarity === "Adjusted Cosine"
        ? transposeMatrix(data["mean-centered"])
        : data["mean-centered"]
      : dataModify;

  if (!dataSimilarity || dataSimilarity.length === 0) return null;

  const dataSimilarityRow =
    similarity === "Bhattacharyya Coefficient"
      ? data["probability"][rowIndex]
      : intersection.map((i) =>
          similarity === "Adjusted Cosine"
            ? opsional === "item-based"
              ? dataSimilarity[i][rowIndex]
              : dataSimilarity[rowIndex][i]
            : dataSimilarity[rowIndex][i]
        );

  const dataSimilarityCol =
    similarity === "Bhattacharyya Coefficient"
      ? data["probability"][colIndex]
      : intersection.map((i) =>
          similarity === "Adjusted Cosine"
            ? opsional === "item-based"
              ? dataSimilarity[i][colIndex]
              : dataSimilarity[colIndex][i]
            : dataSimilarity[colIndex][i]
        );

  const numeratorArrayMeasure =
    similarity !== "Bhattacharyya Coefficient"
      ? sum(
          dataSimilarityRow.map(
            (val, idx) => val.toFixed(2) * dataSimilarityCol[idx].toFixed(2)
          )
        )
      : null;
  const denominatorArrayMeasure =
    similarity !== "Bhattacharyya Coefficient"
      ? Math.sqrt(sum(dataSimilarityRow.map((val, idx) => val ** 2))) *
        Math.sqrt(sum(dataSimilarityCol.map((val, idx) => val ** 2)))
      : null;

  if (!dataSimilarityRow || !dataSimilarityCol) return null;

  const formula = FormulaSimilarityValue(
    rowIndex,
    colIndex,
    dataSimilarityRow,
    dataSimilarityCol,
    intersection,
    selectedMean,
    similarity,
    opsional,
    isNotation,
    denominatorArrayMeasure,
    numeratorArrayMeasure
  );

  // console.log(formula, result_formula);

  return (
    <>
      <MathJaxComponent>{formula.formula}</MathJaxComponent>
      {similarity !== "Bhattacharyya Coefficient" &&
      (dataSimilarityCol.length !== 0 || dataSimilarityRow.length !== 0) ? (
        <MathJaxComponent>{formula.process_formula}</MathJaxComponent>
      ) : null}
      <MathJaxComponent>{formula.result_formula}</MathJaxComponent>
      {(intersection.length === 0 || numeratorArrayMeasure === 0) &&
      (numeratorArrayMeasure !== null || denominatorArrayMeasure !== null) ? (
        <Warm>
          {intersection.length === 0 &&
          !(
            similarity === "Bhattacharyya Coefficient" ||
            similarity === "Vector Cosine"
          ) ? (
            <>Jika tidak ada index untuk dihitung</>
          ) : denominatorArrayMeasure === 0 ? (
            <>Jika penyebut menghasilkan 0 </>
          ) : (
            ""
          )}{" "}
          maka, nilai Similaritas akan diisi dengan{" "}
          {similarity === "Bhattacharyya Coefficient" ||
          similarity === "Vector Cosine"
            ? `0`
            : `-10`}{" "}
          agar tidak mempengaruhi proses prediksi
        </Warm>
      ) : (
        ""
      )}
    </>
  );
};

const SimilarityIndexNonZero = ({
  rowIndex,
  colIndex,
  dataOnly,
  similarity,
  opsional,
  isNotation,
}) => {
  const dataModify =
    opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly;

  // Ambil indeks non-zero dari kolom colIndex
  const nonZeroIndexesCol1 = dataModify[rowIndex]
    .map((row, index) => {
      return row !== 0 ? index + 1 : null;
    })
    .filter((index) => index !== null); // +1 untuk 1-based indexing

  // Ambil indeks non-zero dari kolom rowIndex (yang dipakai sebagai perbandingan)

  const nonZeroIndexesCol2 = dataModify[colIndex]
    .map((row, index) => (row !== 0 ? index + 1 : null))
    .filter((index) => index !== null);

  // Cari intersection antara kedua kolom
  const intersection = nonZeroIndexesCol1.filter((index) =>
    nonZeroIndexesCol2.includes(index)
  );

  const { FormulaWithValue, FormulaWithoutValue } = FormulaSimilarityNonZero(
    rowIndex,
    colIndex,
    similarity,
    opsional,
    nonZeroIndexesCol1,
    nonZeroIndexesCol2,
    intersection
  );

  return (
    <>
      <MathJaxComponent>
        {!isNotation ? FormulaWithValue : FormulaWithoutValue}
      </MathJaxComponent>
    </>
  );
};

const ModalSimilarity = ({
  data,
  close,
  selectedIndex,
  selectedMean,
  dataOnly,
  similarity,
  opsional,
}) => {
  const dataModify =
    similarity !== "Cosine" && similarity !== "Bhattacharyya Coefficient"
      ? similarity === "Adjusted Cosine" || opsional === "item-based"
        ? transposeMatrix(data["mean-centered"])
        : data["mean-centered"]
      : dataOnly;

  const [isNotation, setIsNotation] = useState(false);

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const numberOfColumnsCen = dataOnly[0].length;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-h-[80%] overflow-y-auto m-6 relative">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sticky top-0 bg-white p-2 z-10 shadow-sm">
          Detail Perhitungan Fungsi Similaritas
          {/* Tombol close di luar modal */}
          <button
            onClick={close}
            className="absolute top-1 right-3 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none bg-red-200 px-2 py-1 rounded-full z-10"
          >
            <CloseIcon className="text-md" />
          </button>
        </h2>

        <SwitchToggle
          changeToggle={handleIsNotation}
          title={"Tampilkan Notasi"}
        />

        <h2 className="font-semibold text-md mt-4">
          Data <span className="italic">Mean-Centered</span> Yang Dipilih Selain
          0
        </h2>

        {/* Tabel dengan Scroll Horizontal */}
        <div className="overflow-x-auto mt-4">
          <table className="border border-black mx-auto text-center w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2">U/I</th>
                {Array.from({ length: numberOfColumnsCen }, (_, index) => (
                  <th key={index} className="border border-black px-4 py-2">
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
                <tr key={rowIndex}>
                  <td className="border border-black px-4 py-2 w-20 bg-gray-200">
                    {!isNotation ? (
                      rowIndex + 1
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
                    <p>
                      Menandakan Data <i className="mx-1"> Rating </i> yang akan
                      dihitung
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

        {/* MathJax untuk rumus */}
        <MathJaxContext options={mathjaxConfig}>
          <div className="overflow-x-auto mt-6 flex justify-center items-center flex-col px-4 sm:px-10">
            {selectedIndex ? (
              <>
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
          </div>
        </MathJaxContext>

        <MathJaxContext options={mathjaxConfig}>
          <div className="overflow-x-auto mt-6 flex justify-center items-center flex-col px-4 sm:px-10">
            {selectedIndex && dataOnly ? (
              <>
                <div className="w-full min-w-[200px]">
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
          </div>
        </MathJaxContext>

        <p className="text-xl font-bold text-gray-700 mt-5 sm:text-md md:text-lg lg:text-xl xl:text-2xl">
          Hasil Similaritas antara{" "}
          <span className="italic">
            {opsional.split("-")[0]} {selectedIndex[0] + 1} dan user{" "}
            {selectedIndex[1] + 1} = {selectedMean.toFixed(4)}
          </span>
        </p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={close}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ModalSimilarity;
