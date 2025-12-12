import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaPredictionIndex } from "../Formula/FormulaPrediction";

export const PredictionIndex = ({
  rowIndex,
  colIndex,
  similarity,
  opsional,
}) => {
  const expression = getFormulaPredictionIndex(
    rowIndex,
    colIndex,
    similarity,
    opsional
  );
  return <MathJaxComponent>{expression}</MathJaxComponent>;
};
