const OnlyTabel = ({ headers, columns, data }) => {
  return (
    <div className="overflow-x-auto w-full mt-5">
      <div className="rounded-xl overflow-hidden">
        <table className="min-w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-3 font-semibold border-r border-blue-400">
                U/I
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 font-semibold border-r border-blue-400 last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-colors duration-150 ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-4 py-3 text-center font-medium text-gray-700 bg-blue-100 border-r border-gray-200">
                  {columns[rowIndex]}
                </td>
                {row.map((cell, colIndex) => {
                  const isSparsity = cell === "?" || cell === "";
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 text-center border-r border-gray-100 last:border-r-0 transition-all duration-150 ${
                        isSparsity
                          ? "bg-red-100 text-red-600 font-medium"
                          : "hover:bg-green-50"
                      }`}
                    >
                      <span className={isSparsity ? "" : "text-gray-700"}>
                        {cell}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlyTabel;
