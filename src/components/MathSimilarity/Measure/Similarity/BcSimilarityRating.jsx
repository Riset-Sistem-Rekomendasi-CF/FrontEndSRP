import React from "react";
import { bcRatings } from "../../../../data";

export default function BCSimilarityRating() {
  const ratings = bcRatings;

  return (
    <div className="mt-6 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 w-full max-w-sm mx-auto">
      <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">
        Daftar Skor Rating
      </h3>
      <div className="overflow-hidden rounded-xl shadow-md">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <th className="px-4 py-3 font-semibold border-r border-blue-400">
                Nilai Rating
              </th>
              <th className="px-4 py-3 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map(({ value, ratingDesc }, index) => (
              <tr
                key={value}
                className={`transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-4 py-3 font-bold text-gray-700 border-r border-gray-100">
                  {value}
                </td>
                <td className="px-4 py-3 text-gray-600">{ratingDesc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
