import React, { useState } from 'react';

const PartialTable = () => {
    // Example 10x10 dataset
    const data = Array.from({ length: 10 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => `Item ${i + 1},${j + 1}`)
    );

    // State to toggle between showing full and partial data
    const [showFull, setShowFull] = useState(false);

    // Function to toggle data view
    const toggleView = () => {
        setShowFull(prev => !prev);
    };

    // Function to render the table (either full or partial)
    const renderTable = () => {
        const rowsToRender = showFull ? data : data.slice(0, 7); // Show only 7 rows initially
        return rowsToRender.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.slice(0, 7).map((cell, colIndex) => (
                    <td key={colIndex} className="border px-4 py-2 text-center">
                        {cell}
                    </td>
                ))}
                {rowIndex === 6 && !showFull && (
                    <td colSpan={3} className="border px-4 py-2 text-center">
                        ...
                    </td>
                )}
            </tr>
        ));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Column 1</th>
                    <th className="border px-4 py-2">Column 2</th>
                    <th className="border px-4 py-2">Column 3</th>
                    <th className="border px-4 py-2">Column 4</th>
                    <th className="border px-4 py-2">Column 5</th>
                    <th className="border px-4 py-2">Column 6</th>
                    <th className="border px-4 py-2">Column 7</th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </table>

            {/* Button to toggle between partial and full table */}
            <div className="mt-4 text-center">
                <button
                    onClick={toggleView}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {showFull ? 'Show Less' : 'Show More'}
                </button>
            </div>
        </div>
    );
};

export default PartialTable;
