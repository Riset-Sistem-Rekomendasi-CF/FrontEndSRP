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

  const getNonZeroIndexes = (vector) =>
    vector
      .map((val, index) => (val !== 0 ? index + 1 : null)) // 1-based index
      .filter((index) => index !== null);

  const vector1 =
    opsional === "item-based"
      ? dataModify.map((row) => row[rowIndex]) // Ambil kolom sebagai array
      : dataModify[rowIndex]; // Ambil baris langsung

  const vector2 =
    opsional === "item-based"
      ? dataModify.map((row) => row[colIndex])
      : dataModify[colIndex];

  const nonZeroIndexesCol1 = getNonZeroIndexes(vector1);
  const nonZeroIndexesCol2 = getNonZeroIndexes(vector2);

  // Cari irisan antara keduanya
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
