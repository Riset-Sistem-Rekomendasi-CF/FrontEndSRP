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
