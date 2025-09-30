import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import {
  getDetailFormulaMeanCenterdIndex,
  getFormulaMeanCentered,
  getFormulaMeanCenteredIndex,
} from "../Formula/FormulaMeanCentered";

export const MeanCenteredIndex = ({
  rowIndex,
  colIndex,
  opsional,
  similarity,
  isNotation,
}) => {
  const expression = getFormulaMeanCenteredIndex(
    rowIndex,
    colIndex,
    opsional,
    similarity,
    isNotation
  );
  const getDetailFormulaindex = getDetailFormulaMeanCenterdIndex(
    rowIndex,
    colIndex,
    opsional,
    similarity,
    isNotation
  );

  // console.log("exp1", expression);
  return (
    <>
      <MathJaxComponent>{expression}</MathJaxComponent>
      {/* keterangan */}
      <div className="w-full mt-2 rounded-md overflow-x-auto">
        <FunctionMeasureDropdown DetailRumus={getDetailFormulaindex} />
      </div>
    </>
  );
};
