import { DividerHeading } from "../../../../tabelData/DividerHeading";

export const ModalPredicitionMeanRating = (
  resultMean = [],
  selectedIndex,
  opsional,
  isNotation,
  funnyMode,
  headers,
  columns
) => {
  return (
    <>
      <div>
        <DividerHeading text={"Mean-Rating"} />
        <table className="border border-black mt-4 mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2 italic">U</th>
              <th className="border border-black italic px-4 py-2 ">μ</th>
            </tr>
          </thead>
          <tbody>
            {resultMean.map((mean, index) => {
              const isActiveUser =
                index === selectedIndex[opsional === "user-based" ? 0 : 1];
              return (
                <tr key={index} className={isActiveUser ? "bg-green-200" : ""}>
                  <td className="border border-black px-4 py-2">
                    {!funnyMode
                      ? index + 1
                      : (opsional === "user-based" ? columns : headers)[index]}
                  </td>
                  <td className="border border-black px-4 py-2">
                    <div className="text-center">
                      {!isNotation ? (
                        mean.toFixed(2)
                      ) : (
                        <span className="italic font-serif">
                          μ<sub>{index + 1}</sub>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
