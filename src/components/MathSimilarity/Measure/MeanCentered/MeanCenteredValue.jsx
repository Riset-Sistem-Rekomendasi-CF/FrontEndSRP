import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaMeanCenteredValue } from "../Formula/FormulaMeanCentered";

export const MeanCenteredValue = ({
  rowIndex,
  colIndex,
  dataOnly,
  result,
  opsional,
  selectedValue,
  isNotation,
}) => {
  const expression = getFormulaMeanCenteredValue(
    rowIndex,
    colIndex,
    dataOnly,
    result,
    opsional,
    selectedValue,
    isNotation
  );

  const fullFormula = `${expression.formula}`;
  const fullResult = `${expression.result}`;
  // console.log("Rendering MathJax:", fullFormula);

  return (
    <>
      <MathJaxComponent>{fullFormula}</MathJaxComponent>

      <MathJaxComponent>{fullResult}</MathJaxComponent>
    </>
  );
};
