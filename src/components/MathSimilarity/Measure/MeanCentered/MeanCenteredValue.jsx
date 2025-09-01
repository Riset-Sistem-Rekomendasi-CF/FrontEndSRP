import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaMeanCenteredValue } from "../Formula/FormulaMeanCentered";

export const MeanCenteredValue = ({
  rowIndex,
  colIndex,
  data,
  result,
  opsional,
  selectedValue,
}) => {
  const expression = getFormulaMeanCenteredValue(
    rowIndex,
    colIndex,
    data,
    result,
    opsional,
    selectedValue
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
