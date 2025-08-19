import MathJaxComponent from "../../../../MathJaxComponent";
import {
  getFormulaPrediction,
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

  const prediksiFormula = getFormulaPrediction(similarity, opsional);

  return (
    <>
      <div>
        <h1 className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
          Keterangan :
        </h1>
        <div className="w-full mt-2 border border-gray-300 rounded-md overflow-x-auto mb-2">
          <div className="grid grid-cols-1 divide-y divide-gray-300">
            {prediksiFormula.detail_formula.map((item, idx) => (
              <div key={idx} className="px-4 py-3 sm:py-4">
                <MathJaxComponent>{item}</MathJaxComponent>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-2">
          <MathJaxComponent>{expression.formula}</MathJaxComponent>
        </div>
        <div className="pb-2">
          <MathJaxComponent>{expression.proses_formula}</MathJaxComponent>
        </div>
        <MathJaxComponent>{expression.result}</MathJaxComponent>
      </div>
    </>
  );
};
