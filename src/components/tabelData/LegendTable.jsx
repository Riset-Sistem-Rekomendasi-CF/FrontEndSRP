const LegendTable = ({ list }) => {
    return (
        <div className="mt-4 text-left">
            <details className="w-full">
                <summary className="font-bold cursor-pointer">Keterangan</summary>
                <ul className="flex flex-col gap-3 mt-2">
                    {list.map((val, index) => (
                        <li key={index} className="flex items-center justify-center">
                            <span
                                className={`w-5 h-5 ${val.color} border border-1 border-black mr-2`}
                            ></span>
                            {val.description}
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
};

export default LegendTable;
