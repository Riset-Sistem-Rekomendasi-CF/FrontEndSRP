import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import {
  FormulaSimilarityIndex,
  getFormulaSimilarityDetail,
} from "../Formula/FormulaSimilarity";

export const SimilarityIndex = ({
  rowIndex,
  colIndex,
  similarity,
  opsional,
  isNotation,
}) => {
  const expression = FormulaSimilarityIndex(
    rowIndex,
    colIndex,
    opsional,
    similarity,
    isNotation
  );

  const getFormulaDetail = getFormulaSimilarityDetail(
    rowIndex,
    colIndex,
    similarity,
    opsional
  );

  return (
    <>
      <MathJaxComponent>{expression}</MathJaxComponent>
      <div className="w-full mt-2 rounded-md overflow-x-auto">
        <FunctionMeasureDropdown DetailRumus={getFormulaDetail} />
      </div>
    </>
  );
};
