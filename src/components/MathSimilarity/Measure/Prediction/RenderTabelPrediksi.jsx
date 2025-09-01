import { memo, useState } from "react";
import { AllSimilaritas, getInitialData } from "../../../../api/getDataSet";
import Spinner from "../../../Navigate/Spinner";
import ModalPredictionMeasure from "./ModalPredictionMeasure";

export const RenderTabelPrediksi = memo(
  ({
    kValue,
    opsional,
    similarity,
    topSimilarities,
    dataRating,
    handleMeanClick,
    headers,
    columns,
    funnyMode,
    showModal,
    selectedIndex,
    dataModify,
    closeModal,
    selectedValue,
  }) => {
    const numericK = Number(kValue) || 2;
    const initialData = getInitialData(
      dataRating,
      opsional,
      !isNaN(numericK) ? numericK : 2
    );

    const [dataOnly] = useState(initialData.data);
    const [data] = useState(initialData);
    const { result } = AllSimilaritas(data, similarity);

    if (!result || !result["prediction"]) {
      return <Spinner />;
    }
    console.log("K yang digunakan:", kValue); // Harusnya bukan 2 kalau sudah submit

    return (
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full">
          <table className="border border-black mt-4 text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px]">
                  U/I
                </th>
                {Array.from(
                  { length: result["prediction"][0].length },
                  (_, index) => (
                    <th
                      key={index}
                      className="border border-black px-4 py-2 text-xs sm:text-sm"
                    >
                      {!funnyMode ? index + 1 : headers[index]}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {result["prediction"].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-black px-4 py-2 bg-blue-200 text-xs sm:text-sm">
                    {!funnyMode ? rowIndex + 1 : columns[rowIndex]}
                  </td>
                  {row.map((value, colIndex) => {
                    const IsZero = dataOnly[rowIndex][colIndex] === 0;
                    return (
                      <td
                        key={colIndex}
                        className={`border border-black px-4 py-2 text-center text-xs sm:text-sm ${
                          IsZero
                            ? "bg-red-200 cursor-pointer hover:bg-card_green_primary"
                            : ""
                        }`}
                        onClick={
                          IsZero
                            ? () => handleMeanClick(value, rowIndex, colIndex)
                            : undefined
                        }
                      >
                        {value.toFixed(3)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal &&
          selectedIndex[1] !== null &&
          selectedIndex[0] !== null && (
            <ModalPredictionMeasure
              kValue={kValue}
              opsional={opsional}
              similarity={similarity}
              topSimilarities={topSimilarities}
              selectedIndex={selectedIndex}
              data={dataModify}
              dataRating={dataRating}
              result={result}
              close={closeModal}
              selectedValue={selectedValue}
              headers={headers}
              columns={columns}
              funnyMode={funnyMode}
            />
          )}
      </div>
    );
  }
);
