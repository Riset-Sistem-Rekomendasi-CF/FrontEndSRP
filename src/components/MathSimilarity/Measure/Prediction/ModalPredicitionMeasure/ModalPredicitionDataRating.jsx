import { DividerHeading } from "../../../../tabelData/DividerHeading";

export const ModalPredicitionDataRating = (
  data = [],
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
        <DividerHeading text={"Data Rating"} />
        <table className="border border-black mt-4 mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">
                {opsional === "item-based" ? "I" : "U"}
              </th>
              <th className="border border-black px-4 py-2 italic font-serif">
                r
                <sub>
                  {opsional === "item-based"
                    ? `${selectedIndex[opsional === "item-based" ? 1 : 0] + 1}*`
                    : `*${
                        selectedIndex[opsional === "item-based" ? 1 : 0] + 1
                      }`}
                </sub>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const IsZero =
                opsional === "item-based"
                  ? data[rowIndex][selectedIndex[0]] === 0
                  : data[rowIndex][selectedIndex[1]] === 0;
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
                    }`}
                  >
                    {!isNotation ? (
                      row[
                        selectedIndex[opsional === "item-based" ? 0 : 1]
                      ]?.toFixed(1)
                    ) : (
                      <span className="italic font-serif">
                        r
                        <sub>
                          {opsional === "user-based"
                            ? `${rowIndex + 1}${selectedIndex[0] + 1}`
                            : `${selectedIndex[1] + 1}${rowIndex + 1}`}
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
