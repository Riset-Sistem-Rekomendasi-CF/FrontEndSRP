import React from "react";
import { DividerHeading } from "../../../tabelData/DividerHeading";

function getRatingFrequencies(ratings = [], maxRating = 5) {
  const frequency = Array(maxRating).fill(0);
  let total = 0;

  ratings.forEach((rating) => {
    if (typeof rating === "number" && rating >= 1 && rating <= maxRating) {
      frequency[rating - 1]++;
      total++;
    }
  });

  return { frequency, total };
}

export default function BcSimilarityFrequency({
  dataOnly = [],
  selectedIndex = [],
  opsional = "user-based",
  isNotation = false,
}) {
  // Validasi data awal
  if (
    !Array.isArray(dataOnly) ||
    dataOnly.length === 0 ||
    !Array.isArray(selectedIndex) ||
    selectedIndex.length < 2
  )
    return <div className="text-red-600">Data tidak tersedia</div>;

  // Filter data untuk user-based atau item-based
  const filteredData =
    opsional === "user-based"
      ? selectedIndex.map((index) => ({
          index,
          ratings: dataOnly?.[index] || [],
        }))
      : selectedIndex.map((index) => ({
          index,
          ratings: dataOnly
            .map((row) => row?.[index])
            .filter((v) => v !== undefined),
        }));

  return (
    <>
      <DividerHeading text="Frekuensi" />
      <div className="bg-green-500 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 justify-center items-start">
          {filteredData.map(({ index, ratings }) => {
            const { frequency, total } = getRatingFrequencies(ratings);

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md bg-white"
              >
                <table className="text-sm w-44 text-center">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th colSpan={2} className="px-4 py-2 font-semibold">
                        {opsional === "user-based"
                          ? `User ${index + 1}`
                          : `Item ${index + 1}`}
                      </th>
                    </tr>
                    <tr className="bg-green-100 text-green-800">
                      <th className="px-3 py-2 font-medium border-r border-green-200">
                        {isNotation ? "rᵢ" : "Rating"}
                      </th>
                      <th className="px-3 py-2 font-medium">Frekuensi</th>
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
                        <td className="px-3 py-2 text-gray-600">{freq}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-500 text-white font-semibold">
                      <td className="px-3 py-2 border-r border-orange-300">
                        Total
                      </td>
                      <td className="px-3 py-2">{total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
