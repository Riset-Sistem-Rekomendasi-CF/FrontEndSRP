import MathJaxComponent from "../../../../MathJaxComponent";
import {
  getFormulaPredictionValue,
} from "../Formula/FormulaPrediction";

export const PredictionValue = ({
  rowIndex,
  colIndex,
  similarValues,
  result,
  dataRating,
  similarity,
  opsional,
  isNotation,
  selectedValue,
}) => {
  const expression = getFormulaPredictionValue(
    rowIndex,
    colIndex,
    similarValues,
    result,
    dataRating,
    similarity,
    opsional,
    isNotation,
    selectedValue
  );

  return (
    <>
      <MathJaxComponent>{expression.formula}</MathJaxComponent>

      <MathJaxComponent>{expression.proses_formula}</MathJaxComponent>

      <MathJaxComponent>{expression.result}</MathJaxComponent>
    </>
  );
};
