import { transposeMatrix } from "../../../../helper/helper";
import { sum } from "../../../../helper/Measure";
import MathJaxComponent from "../../../../MathJaxComponent";
import Warm from "../../../Warm/Warm";
import { FormulaSimilarityValue } from "../Formula/FormulaSimilarity";

export const SimilarityValue = ({
  rowIndex,
  colIndex,
  data,
  dataOnly,
  similarity,
  selectedMean,
  opsional,
  isNotation,
}) => {
  // FIX 1: The parent component `ModalSimilarity` already transposes `dataOnly` for item-based scenarios.
  // The original code incorrectly transposed it a second time. We now use it directly.
  const dataModify = dataOnly;

  const nonZeroIndexesRow = dataModify[rowIndex]
    .map((row, index) => (row !== 0 ? index : null))
    .filter((index) => index !== null);

  const nonZeroIndexesCol = dataModify[colIndex]
    .map((row, index) => (row !== 0 ? index : null))
    .filter((index) => index !== null);

  const intersection = nonZeroIndexesRow.filter((index) =>
    nonZeroIndexesCol.includes(index)
  );

  // FIX 2: Added a condition to transpose `data["mean-centered"]`
  // when using Pearson Correlation Coefficient with an item-based approach.
  // This ensures the calculation aligns with the transposed table data.
  const isItemBasedWithTranspose =
    opsional === "item-based" &&
    (similarity === "Adjusted Cosine" ||
      similarity === "Pearson Correlation Coefficient");

  const dataSimilarity =
    similarity !== "Cosine"
      ? similarity === "Bhattacharyya Coefficient"
        ? data["probability"]
        : isItemBasedWithTranspose
          ? transposeMatrix(data["mean-centered"])
          : data["mean-centered"]
      : dataModify;

  if (!dataSimilarity || dataSimilarity.length === 0) return null;

  const dataSimilarityRow =
    similarity === "Bhattacharyya Coefficient"
      ? data["probability"][rowIndex]
      : intersection.map((i) => dataSimilarity[rowIndex][i]);

  const dataSimilarityCol =
    similarity === "Bhattacharyya Coefficient"
      ? data["probability"][colIndex]
      : intersection.map((i) => dataSimilarity[colIndex][i]);

  const numeratorArrayMeasure =
    similarity !== "Bhattacharyya Coefficient"
      ? sum(
        dataSimilarityRow.map((val, idx) => {
          const colVal = dataSimilarityCol[idx];
          console.log(`numerator ${val.toFixed(2)}*${colVal.toFixed(2)} = ${Number(val.toFixed(2)) * Number(colVal.toFixed(2))}`);

          if (
            typeof val === "number" &&
            typeof colVal === "number" &&
            !isNaN(val) &&
            !isNaN(colVal)
          ) {
            return Number(val.toFixed(2)) * Number(colVal.toFixed(2));
          } else {
            console.warn(`❌ Invalid at index ${idx}:`, val, colVal);
            return 0; // safe fallback
          }
        })
      )
      : null;
  console.log(`numerator result = ${numeratorArrayMeasure.toFixed(2)}`);


  const denominatorArrayMeasure =
    similarity !== "Bhattacharyya Coefficient"
      ? Math.sqrt(sum((similarity !== "Cosine" ? dataSimilarityRow : dataOnly[rowIndex]).map((val, idx) => val ** 2))) *
      Math.sqrt(sum((similarity !== "Cosine" ? dataSimilarityCol : dataOnly[colIndex]).map((val, idx) => val ** 2)))
      : null;

  if (!dataSimilarityRow || !dataSimilarityCol) return null;

  const formula = FormulaSimilarityValue(
    dataOnly,
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
            ? 0
            : -10}{" "}
          agar tidak mempengaruhi proses prediksi
        </Warm>
      ) : (
        ""
      )}
    </>
  );
};
