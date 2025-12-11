
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import {
  getFormualDetailIndex,
} from "../Formula/FormulaPrediction";

export const PredictionFormula = ({
  rowIndex,
  colIndex,
  similarity,
  opsional,
}) => {
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
    </>
  );
};
