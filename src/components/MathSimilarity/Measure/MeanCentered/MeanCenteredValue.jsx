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
      <div className="pb-2 pt-2">
        <MathJaxComponent>{fullFormula}</MathJaxComponent>
      </div>
      <div>
        <MathJaxComponent>{fullResult}</MathJaxComponent>
      </div>
    </>
  );
};
