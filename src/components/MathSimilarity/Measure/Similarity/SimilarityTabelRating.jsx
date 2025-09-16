import React from "react";
import { OnlyDivider } from "../../../tabelData/DividerHeading";
import FeedbackIcon from "@mui/icons-material/Feedback";

export default function SimilarityTabelRating({
  dataOnly,
  isNotation,
  funnyMode,
  headers,
  columns,
  selectedIndex,
  opsional,
  similarity,
}) {
  if (!dataOnly || !dataOnly.length) return null;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="border border-black mx-auto text-center w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">
                {opsional === "user-based" ? "U/I" : "I/U"}
              </th>
              {dataOnly[0].map((_, index) => (
                <th key={index} className="border border-black px-4 py-2">
                  {!isNotation ? (
                    !funnyMode ? (
                      index + 1
                    ) : (
                      headers[index]
                    )
                  ) : (
                    <span className="font-serif">
                      i<sub>{index + 1}</sub>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataOnly.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-black px-4 py-2 w-14 bg-gray-200">
                  {!isNotation ? (
                    !funnyMode ? (
                      rowIndex + 1
                    ) : (
                      columns[rowIndex]
                    )
                  ) : (
                    <span className="font-serif">
                      u<sub>{rowIndex + 1}</sub>
                    </span>
                  )}
                </td>
                {row.map((value, colIndex) => {
                  const isZero = value === 0;

                  const isMatchingPair =
                    opsional === "user-based"
                      ? rowIndex === selectedIndex[0] ||
                        rowIndex === selectedIndex[1]
                      : rowIndex === selectedIndex[0] ||
                        rowIndex === selectedIndex[1];

                  const isBothNotZero = (() => {
                    if (opsional === "user-based") {
                      const userA = selectedIndex[0];
                      const userB = selectedIndex[1];
                      return (
                        dataOnly[userA][colIndex] !== 0 &&
                        dataOnly[userB][colIndex] !== 0
                      );
                    } else {
                      const itemA = selectedIndex[0];
                      const itemB = selectedIndex[1];
                      return (
                        dataOnly[itemA][colIndex] !== 0 &&
                        dataOnly[itemB][colIndex] !== 0
                      );
                    }
                  })();

                  // 💡 Logika irisan tergantung similarity
                  const isIrisan =
                    similarity === "Bhattacharyya Coefficient"
                      ? isMatchingPair && !isZero
                      : isMatchingPair && isBothNotZero;

                  const bgColor = isZero
                    ? "bg-red-200"
                    : isIrisan
                    ? "bg-green-200"
                    : "bg-gray-50 opacity-50";

                  const cellClass = `border border-black px-4 py-2 text-center w-14 ${bgColor}`;

                  return (
                    <td
                      key={colIndex}
                      className={cellClass}
                      title={
                        isNotation
                          ? value?.toFixed?.(0) ?? value
                          : `r${colIndex + 1}${rowIndex + 1}`
                      }
                    >
                      {!isNotation ? (
                        value?.toFixed ? (
                          value.toFixed(0)
                        ) : (
                          value
                        )
                      ) : (
                        <span className="font-serif">
                          r
                          <sub>
                            {colIndex + 1}
                            {rowIndex + 1}
                          </sub>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-purple-100 text-sm text-gray-700 rounded shadow-sm  font-medium font-poppins">
        <p>
          <strong className="text-gray-800">Hijau (Irisan):</strong> Data rating
          yang dipakai dalam perhitungan similarity. Irisan adalah sel yang
          dimiliki oleh kedua {opsional.startsWith("user") ? "user" : "item"}{" "}
          dan memiliki rating yang diketahui (≠ 0).
        </p>
        <p>
          <strong className="text-red-600">Merah:</strong> Menandakan rating
          yang tidak diketahui atau bernilai nol.
        </p>
        <OnlyDivider />
        <p>
          <FeedbackIcon className="inline mb-1 text-blue-500 font-semibold" />{" "}
          <span className="text-blue-500">
            Sel lainnya ditampilkan lebih pudar agar memudahkan fokus ke irisan
            yang dihitung.
          </span>
        </p>
      </div>
    </div>
  );
}
