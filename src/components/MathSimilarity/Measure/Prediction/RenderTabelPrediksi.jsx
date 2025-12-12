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
    // console.log("K yang digunakan:", kValue); // Harusnya bukan 2 kalau sudah submit

    return (
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full rounded-xl shadow-lg">
          <table className="text-xs sm:text-sm md:text-base lg:text-lg min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="px-4 py-3 text-xs sm:text-sm md:text-base w-1/6 min-w-[80px] font-semibold border-r border-blue-400">
                  U/I
                </th>
                {Array.from(
                  { length: result["prediction"][0].length },
                  (_, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-xs sm:text-sm font-semibold border-r border-blue-400 last:border-r-0"
                    >
                      {!funnyMode ? index + 1 : headers[index]}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {result["prediction"].map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-all duration-200 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium border-r border-gray-200">
                    {!funnyMode ? rowIndex + 1 : columns[rowIndex]}
                  </td>
                  {row.map((value, colIndex) => {
                    const IsZero = dataOnly[rowIndex][colIndex] === 0;
                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-3 text-center text-xs sm:text-sm transition-all duration-200 border-r border-gray-100 last:border-r-0 ${
                          IsZero
                            ? "bg-red-100 text-red-600 cursor-pointer hover:bg-green-100 hover:scale-105 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={
                          IsZero
                            ? () => handleMeanClick(value, rowIndex, colIndex)
                            : undefined
                        }
                      >
                        <span className={IsZero ? "hover:text-blue-600" : ""}>
                          {value.toFixed(3)}
                        </span>
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
