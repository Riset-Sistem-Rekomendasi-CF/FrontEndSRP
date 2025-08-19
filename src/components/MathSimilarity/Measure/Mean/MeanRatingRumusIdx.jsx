import React from "react";
import { getFormulaMean, getFormulaMeanIndex } from "../Formula/FormulaMean";
import MathJaxComponent from "../../../../MathJaxComponent";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";

export const MeanRatingRumusIdx = ({ opsional, data, selectedIndex }) => {
  const meanRumusIdx = getFormulaMeanIndex(opsional, data, selectedIndex);
  const meanFormula = getFormulaMean(opsional);

  return (
    <>
      <MathJaxComponent>{meanRumusIdx}</MathJaxComponent>
      <h1 className="text-start font-semibold text-lg md:text-xl lg:text-2xl mt-2 md:mt-4">
        Keterangan :
      </h1>

      <div className="w-full mt-2 border border-gray-300 rounded-md overflow-x-auto">
        <div className="grid grid-cols-1 divide-y divide-gray-300">
          {meanFormula.formula_detail.map((item, idx) => (
            <div key={idx} className="px-4 py-3 sm:py-4">
              <MathJaxComponent>{item}</MathJaxComponent>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
