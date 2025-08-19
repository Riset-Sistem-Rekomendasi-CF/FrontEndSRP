import MathJaxComponent from "../../../../MathJaxComponent";
import {
  getFormulaMeanCentered,
  getFormulaMeanCenteredIndex,
} from "../Formula/FormulaMeanCentered";

export const MeanCenteredIndex = ({ rowIndex, colIndex, opsional }) => {
  const expression = getFormulaMeanCenteredIndex(rowIndex, colIndex, opsional);
  const meanCenterdFormula = getFormulaMeanCentered(opsional);
  // console.log("exp1", expression);
  return (
    <>
      <div className="pb-2">
        <MathJaxComponent>{expression}</MathJaxComponent>
      </div>
      <h1 className="text-start font-semibold text-lg md:text-xl lg:text-2xl mt-2 md:mt-4">
        Keterangan :
      </h1>
      {/* keterangan */}
      <div className="w-full mt-2 border border-gray-300 rounded-md overflow-x-auto">
        <div className="grid grid-cols-1 divide-y divide-gray-300">
          {meanCenterdFormula.detail_formula.map((item, idx) => (
            <div key={idx} className="px-4 py-3 sm:py-4">
              <MathJaxComponent>{item}</MathJaxComponent>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
