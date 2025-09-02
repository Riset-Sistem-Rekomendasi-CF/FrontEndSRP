import { DividerHeading } from "../../../../tabelData/DividerHeading";

export const ModalPreidictionSimilaritas = (
  similarityData,
  selectedIndex,
  opsional,
  isNotation,
  funnyMode,
  headers,
  columns,
  topSimilarities,
  result
) => {
  if (!similarityData || !similarityData.length)
    return <p>No similarity data available.</p>;

  return (
    <>
      <div>
        <DividerHeading text={"Similaritas"} />
        <table className="border border-black mt-4 mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">
                {opsional === "item-based" ? "I" : "U"}
              </th>
              <th className="border border-black px-4 py-2 italic font-serif">
                Sim
                <sub>{`${
                  selectedIndex[opsional === "item-based" ? 0 : 1] + 1
                }*`}</sub>
              </th>
            </tr>
          </thead>
          <tbody>
            {result["similarity"].map((row, colIndex) => {
              const isTopSimilarity = topSimilarities.some(
                (top) => top.index === colIndex
              );
              return (
                <tr key={colIndex}>
                  <td className="border border-black px-4 py-2 bg-gray-200">
                    {!funnyMode
                      ? colIndex + 1
                      : (opsional === "user-based" ? columns : headers)[
                          colIndex
                        ]}
                  </td>
                  <td
                    className={`border border-black px-4 py-2 text-center ${
                      isTopSimilarity ? "bg-green-200" : ""
                    }`}
                  >
                    {!isNotation ? (
                      row[
                        selectedIndex[opsional === "user-based" ? 0 : 1]
                      ]?.toFixed(4) || "N/A"
                    ) : (
                      <span className="italic font-serif">
                        Sim
                        <sub>
                          {opsional === "item-based"
                            ? `${
                                selectedIndex[
                                  opsional === "item-based" ? 0 : 1
                                ] + 1
                              }${colIndex + 1}`
                            : `${colIndex + 1}${
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
