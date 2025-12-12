const LegendTable = ({ list }) => {
  return (
    <div className="mt-4 text-left">
      <details className="w-full">
        <summary className="font-bold cursor-pointer font-poppins">
          Keterangan Tabel
        </summary>
        <ul className="flex flex-col gap-3 mt-2 font-poppins">
          {list.map((val, index) => (
            <li key={index} className="flex items-start justify-start ">
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
