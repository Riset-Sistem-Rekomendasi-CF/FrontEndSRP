import React from "react";

const OnlyTabel = ({ headers, columns, data }) => {
  return (
    <div className="overflow-x-auto w-full mt-5">
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2 bg-blue-home text-white">
              U/I
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-black px-4 py-2 bg-blue-home text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-black px-4 py-2 text-center bg-blue-200">
                {columns[rowIndex]}
              </td>
              {row.map((cell, colIndex) => {
                const cellClass =
                  cell === "?" || cell === ""
                    ? "border border-black px-4 py-2 text-center bg-red-300"
                    : "border border-black px-4 py-2 text-center bg-white";
                return (
                  <td key={colIndex} className={cellClass}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlyTabel;
