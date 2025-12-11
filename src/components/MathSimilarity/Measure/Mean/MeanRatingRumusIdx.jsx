
import {
  getDetailFormulaMeanIndex,
  getFormulaMeanIndex,
} from "../Formula/FormulaMean";
import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";

export const MeanRatingRumusIdx = ({ opsional, data, selectedIndex }) => {
  const meanRumusIdx = getFormulaMeanIndex(opsional, data, selectedIndex);
  const modalMeanIndexFormula = getDetailFormulaMeanIndex(
    opsional,
    selectedIndex
  );

  return (
    <>
      <MathJaxComponent>{meanRumusIdx}</MathJaxComponent>
      <div className="w-full mt-2 rounded-md overflow-x-auto">
        <FunctionMeasureDropdown DetailRumus={modalMeanIndexFormula} />
      </div>
    </>
  );
};
