import React from "react";

export default function BCSimilarityRating() {
  const ratings = [
    { value: 1, ratingDesc: 1 },
    { value: 2, ratingDesc: 2 },
    { value: 3, ratingDesc: 3 },
    { value: 4, ratingDesc: 4 },
    { value: 5, ratingDesc: 5 },
  ];

  return (
    <div className="mt-6 border border-gray-400 rounded-md p-4 bg-gray-50 shadow-sm w-full max-w-sm mx-auto">
      <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">
        Daftar Skor Rating
      </h3>
      <table className="w-full text-center border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-1 py-2">Nilai Rating</th>
            <th className="border border-gray-300 px-1 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map(({ value, ratingDesc }) => (
            <tr key={value}>
              <td className="border border-gray-300 px-1 py-2 font-bold">
                {value}
              </td>
              <td className="border border-gray-300 px-1 py-2">{ratingDesc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
