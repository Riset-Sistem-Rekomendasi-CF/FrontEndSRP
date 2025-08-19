import MathJaxComponent from "../../../../MathJaxComponent";
import { getFormulaMeanExpression } from "../Formula/FormulaMean";

export const MeanRatingIndexExp = ({
  opsional,
  data,
  selectedIndex,
  isNotation,
}) => {
  const dataMean = data[selectedIndex];

  const nonZeroIndices = dataMean
    .map((val, idx) => (val !== 0 ? idx + 1 : null))
    .filter((idx) => idx !== null);
  const ValueData = dataMean.filter((val) => val !== 0);
  const meanIndexExp = getFormulaMeanExpression(
    opsional,
    isNotation,
    nonZeroIndices,
    ValueData,
    selectedIndex
  );

  return (
    <>
      <div className="pt-4">
        <MathJaxComponent>{meanIndexExp}</MathJaxComponent>
      </div>
    </>
  );
};
