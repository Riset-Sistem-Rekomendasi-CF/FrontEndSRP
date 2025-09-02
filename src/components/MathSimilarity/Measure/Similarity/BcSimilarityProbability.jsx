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
      <MathJaxContext config={mathjaxConfig}>
        <div className="bg-yellow-100 rounded-md shadow-md border border-gray-400 p-4 text-gray-900">
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            Penjelasan Untuk Mencari Probabilitas
          </h3>

          <div className="mb-4">
            <MathJax className="text-base font-medium">
              {"$$P(r_i) = \\frac{F(r_i)}{\\sum F(r_i)}$$"}
            </MathJax>
            <p className="mt-1 text-sm">Keterangan:</p>
            <MathJax className="text-sm">
              {"$$F(r_i) = \\text{Jumlah rating dengan nilai } r_i$$"}
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
                  className="w-full bg-white rounded-lg shadow-sm border border-gray-300 p-3 border-collapse"
                >
                  <h4 className="text-sm font-semibold text-blue-700 mb-1">
                    Contoh:
                  </h4>
                  <p className="text-sm mb-1">
                    Data rating:{" "}
                    <code className="text-gray-700">
                      [{ratings.join(", ")}]
                    </code>
                  </p>
                  <p className="text-sm mb-2">Total rating: {total}</p>

                  <table className="w-full text-sm border border-black text-center">
                    <thead className="bg-gray-200 font-semibold">
                      <tr>
                        <th colSpan={3} className="border-b border-black py-1">
                          {opsional === "user-based"
                            ? `User ${index + 1}`
                            : `Item ${index + 1}`}
                        </th>
                      </tr>
                      <tr>
                        <th className="border border-black px-2 py-1">
                          Rating
                        </th>
                        <th className="border border-black px-2 py-1">
                          Frekuensi
                        </th>
                        <th className="border border-black px-2 py-1">
                          Probabilitas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {frequency.map((freq, idx) => (
                        <tr key={idx}>
                          <td className="border border-black px-2 py-1">
                            {idx + 1}
                          </td>
                          <td className="border border-black px-2 py-1">
                            {freq}
                          </td>
                          <td className="border border-black px-2 py-1">
                            {total > 0
                              ? `${freq} / ${total} = ${probabilities[
                                  idx
                                ].toFixed(3)}`
                              : "0"}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-orange-300 font-semibold">
                        <td className="border border-black px-2 py-1">Total</td>
                        <td className="border border-black px-2 py-1">
                          {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </MathJaxContext>
    </>
  );
}
