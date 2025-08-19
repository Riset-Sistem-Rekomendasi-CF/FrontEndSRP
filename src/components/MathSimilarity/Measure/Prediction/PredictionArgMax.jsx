import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaArgMax } from "../Formula/FormulaPrediction";

export const ArgMaxNeighbor = ({
  rowIndex,
  colIndex,
  opsional,
  similarity,
  topSimilarity,
  kValue,
}) => {
  const expression = getFormulaArgMax(
    rowIndex,
    colIndex,
    opsional,
    similarity,
    topSimilarity,
    kValue
  );
  return <MathJaxComponent>{expression}</MathJaxComponent>;
};
