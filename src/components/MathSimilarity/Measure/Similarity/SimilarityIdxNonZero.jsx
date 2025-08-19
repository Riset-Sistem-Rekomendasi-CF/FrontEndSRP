import { transposeMatrix } from "../../../../helper/helper";
import MathJaxComponent from "../../../../MathJaxComponent";
import { FormulaSimilarityNonZero } from "../Formula/FormulaSimilarity";

export const SimilarityIndexNonZero = ({
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
