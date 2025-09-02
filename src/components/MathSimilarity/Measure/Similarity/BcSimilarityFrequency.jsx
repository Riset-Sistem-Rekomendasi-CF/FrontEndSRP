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
      <div className="bg-green-200 rounded-sm shadow-md border border-black p-2">
        <div className="flex flex-wrap gap-4 justify-around items-start mb-2">
          {filteredData.map(({ index, ratings }) => {
            const { frequency, total } = getRatingFrequencies(ratings);

            return (
              <div
                key={index}
                className="border border-gray-400 rounded-md bg-white shadow-sm"
              >
                <table className="text-sm border border-black w-40 text-center">
                  <thead className="bg-gray-200 font-semibold">
                    <tr>
                      <th colSpan={2} className="border-b border-black">
                        {opsional === "user-based"
                          ? `User ${index + 1}`
                          : `Item ${index + 1}`}
                      </th>
                    </tr>
                    <tr>
                      <th className="border-r border-black">
                        {isNotation ? "rᵢ" : "Rating"}
                      </th>
                      <th>Frekuensi</th>
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
                      </tr>
                    ))}
                    <tr className="bg-orange-300 font-semibold">
                      <td className="border border-black px-2 py-1">Total</td>
                      <td className="border border-black px-2 py-1">{total}</td>
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
