import { DividerHeading } from "../../../../tabelData/DividerHeading";

export const ModalPredicitionMeanCentered = (
  resultMeanCentered = [],
  data,
  selectedIndex,
  opsional,
  isNotation,
  funnyMode,
  headers,
  columns,
  topSimilarities
) => {
  return (
    <>
      <div>
        <DividerHeading text={"Mean-Centered"} />
        <table className="border border-black mt-4 mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">
                {
                  opsional
                    .replace("-", " ")
                    .toLowerCase()
                    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
                    .split(" ")[0]
                }
              </th>
              <th className="border border-black px-4 py-2 italic font-serif">
                S
                <sub>
                  {opsional === "item-based"
                    ? `${selectedIndex[opsional === "item-based" ? 0 : 1] + 1}*`
                    : `*${
                        selectedIndex[opsional === "item-based" ? 0 : 1] + 1
                      }`}
                </sub>
              </th>
            </tr>
          </thead>
          <tbody>
            {resultMeanCentered.map((row, rowIndex) => {
              const IsZero =
                opsional === "item-based"
                  ? data[rowIndex][selectedIndex[0]] === 0
                  : data[rowIndex][selectedIndex[1]] === 0;
              const isTopSimilarity = topSimilarities.some(
                (top) => top.index === rowIndex && !IsZero
              );
              return (
                <tr key={rowIndex}>
                  <td className="border border-black px-4 py-2 bg-gray-200">
                    {!funnyMode
                      ? rowIndex + 1
                      : (opsional === "user-based" ? columns : headers)[
                          rowIndex
                        ]}
                  </td>
                  <td
                    className={`border border-black px-4 py-2 text-center ${
                      IsZero ? "bg-red-200" : ""
                    } ${isTopSimilarity ? "bg-green-200" : ""}`}
                  >
                    {!isNotation ? (
                      row[
                        selectedIndex[opsional === "item-based" ? 0 : 1]
                      ]?.toFixed(2) || "N/A"
                    ) : (
                      <span className="italic font-serif">
                        S
                        <sub>
                          {opsional === "item-based"
                            ? `${
                                selectedIndex[
                                  opsional === "item-based" ? 0 : 1
                                ] + 1
                              }${rowIndex + 1}`
                            : `${rowIndex + 1}${
                                selectedIndex[
                                  opsional === "item-based" ? 0 : 1
                                ] + 1
                              }`}
                        </sub>
                      </span>
                    )}
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
