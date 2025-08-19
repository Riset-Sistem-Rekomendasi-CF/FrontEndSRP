import MathJaxComponent from "../../../../MathJaxComponent";
import {
  FormulaSimilarityIndex,
  getFormulaSimilarity,
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

  const similarityFormula = getFormulaSimilarity(similarity, opsional);

  return (
    <>
      <div className="pb-2">
        <MathJaxComponent>
          {/* {getFormulaSimilarity(similarity, opsional).formula} */}
          {expression}
        </MathJaxComponent>
        <h1 className="text-center font-semibold text-lg md:text-xl lg:text-2xl mt-2 md:mt-4">
          Keterangan :
        </h1>
        <div className="w-full mt-2 border border-gray-300 rounded-md overflow-x-auto">
          <div className="grid grid-cols-1 divide-y divide-gray-300">
            {similarityFormula.detail_formula.map((item, idx) => (
              <div key={idx} className="px-4 py-3 sm:py-4">
                <MathJaxComponent>{item}</MathJaxComponent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
