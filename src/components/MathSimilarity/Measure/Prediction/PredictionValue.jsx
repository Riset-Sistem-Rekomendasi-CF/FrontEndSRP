import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import {
  getFormualDetailIndex,
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
  // console.log(expression);

  const getFormulaDetail = getFormualDetailIndex(
    rowIndex,
    colIndex,
    opsional,
    similarity
  );

  return (
    <>
      <div className="w-full mt-2 rounded-md overflow-x-auto overflow-y-hidden">
        <FunctionMeasureDropdown DetailRumus={getFormulaDetail} />
      </div>

      <MathJaxComponent>{expression.formula}</MathJaxComponent>

      <MathJaxComponent>{expression.proses_formula}</MathJaxComponent>

      <MathJaxComponent>{expression.result}</MathJaxComponent>
    </>
  );
};
