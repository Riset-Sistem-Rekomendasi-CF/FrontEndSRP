import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaMeanValue } from "../Formula/FormulaMean";

export const MeanRatingExpressionsValues = ({
  opsional,
  data,
  selectedIndex,
  isNotation,
  selectedMean,
}) => {
  const dataMean = data[selectedIndex];
  const nonZeroIndices = dataMean
    .map((val, idx) => (val !== 0 ? idx + 1 : null))
    .filter((idx) => idx !== null);

  const ValueData = dataMean.filter((val) => val !== 0);

  const meanExpressionsValues = getFormulaMeanValue(
    opsional,
    isNotation,
    nonZeroIndices,
    ValueData,
    selectedIndex,
    selectedMean
  );
  // // console.log(meanExpressionsValues);
  // console.log("Data Mean:", dataMean);
  // console.log("ValueData:", ValueData);
  // console.log("MeanExpressionsValues:", meanExpressionsValues);

  return (
    <>
      <div className="leading-relaxed">
        <MathJaxComponent>{meanExpressionsValues.formula}</MathJaxComponent>

        <MathJaxComponent>
          {meanExpressionsValues.process_formal}
        </MathJaxComponent>

        <MathJaxComponent>{meanExpressionsValues.result}</MathJaxComponent>
      </div>
    </>
  );
};
