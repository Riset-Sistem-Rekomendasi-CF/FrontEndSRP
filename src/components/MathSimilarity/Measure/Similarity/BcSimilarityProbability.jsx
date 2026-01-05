import React from "react";
import { DividerHeading } from "../../../tabelData/DividerHeading";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";

function getRatingProbibility(userRatings, maxRating = 5) {
  const frequency = Array(maxRating).fill(0);
  let total = 0;

  userRatings.forEach((rating) => {
    if (rating >= 1 && rating <= maxRating) {
      frequency[rating - 1]++;
      total++;
    }
  });

  const probabilities = frequency.map((count) =>
    total > 0 ? count / total : 0
  );

  return { frequency, probabilities, total };
}

export default function BcSimilarityProbibility({
  dataOnly,
  selectedIndex,
  opsional,
  isNotation,
  maxRating = 5,
}) {
  if (!dataOnly || !dataOnly.length || !selectedIndex?.length) return null;

  const filteredData =
    opsional === "user-based"
      ? selectedIndex.map((index) => ({
          index,
          ratings: dataOnly[index],
        }))
      : selectedIndex.map((index) => ({
          index,
          ratings: dataOnly.map((row) => row[index]),
        }));

  return (
    <>
      <DividerHeading text="Probabilitas" />
      <MathJaxContext options={mathjaxConfig}>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 text-gray-900">
          <h3 className="text-lg font-bold text-blue-700 mb-3">
            Penjelasan Untuk Mencari Probabilitas
          </h3>

          <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
            <MathJax className="text-base font-medium">
              {"\\(P(r_i) = \\frac{F(r_i)}{\\sum F(r_i)}\\)"}
            </MathJax>
            <p className="mt-2 text-sm text-gray-600">Keterangan:</p>
            <MathJax className="text-sm text-gray-600">
              {"\\(F(r_i)\\) = Jumlah rating dengan nilai \\(r_i\\)"}
            </MathJax>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {filteredData.map(({ ratings, index }) => {
              const { frequency, probabilities, total } = getRatingProbibility(
                ratings,
                maxRating
              );

              return (
                <div
                  key={index}
                  className="w-full bg-white rounded-xl shadow-md p-4"
                >
                  <h4 className="text-sm font-semibold text-blue-700 mb-2">
                    Contoh:
                  </h4>
                  <p className="text-sm mb-1 text-gray-600">
                    Data rating:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                      [{ratings.join(", ")}]
                    </code>
                  </p>
                  <p className="text-sm mb-3 text-gray-600">
                    Total rating:{" "}
                    <span className="font-semibold text-gray-700">{total}</span>
                  </p>

                  <div className="overflow-hidden rounded-xl shadow-sm">
                    <table className="w-full text-sm text-center">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                          <th colSpan={3} className="px-4 py-2 font-semibold">
                            {opsional === "user-based"
                              ? `User ${index + 1}`
                              : `Item ${index + 1}`}
                          </th>
                        </tr>
                        <tr className="bg-purple-100 text-purple-800">
                          <th className="px-3 py-2 font-medium border-r border-purple-200">
                            Rating
                          </th>
                          <th className="px-3 py-2 font-medium border-r border-purple-200">
                            Frekuensi
                          </th>
                          <th className="px-3 py-2 font-medium">
                            Probabilitas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {frequency.map((freq, idx) => (
                          <tr
                            key={idx}
                            className={`transition-all duration-200 ${
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="px-3 py-2 text-gray-700 border-r border-gray-100">
                              {idx + 1}
                            </td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-100">
                              {freq}
                            </td>
                            <td className="px-3 py-2 text-gray-600">
                              {total > 0 ? (
                                <span>
                                  <span className="text-gray-400">
                                    {freq}/{total} ={" "}
                                  </span>
                                  <span className="font-medium text-purple-600">
                                    {probabilities[idx].toFixed(3)}
                                  </span>
                                </span>
                              ) : (
                                "0"
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold">
                          <td className="px-3 py-2 border-r border-orange-300">
                            Total
                          </td>
                          <td className="px-3 py-2 border-r border-orange-300">
                            {total}
                          </td>
                          <td className="px-3 py-2">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MathJaxContext>
    </>
  );
}
