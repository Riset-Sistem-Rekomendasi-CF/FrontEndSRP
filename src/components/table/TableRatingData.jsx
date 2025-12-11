import { useState } from "react";
import { getInitialData } from "../../api/getDataSet";
import { OnlyDivider } from "../tabelData/DividerHeading";
import { transposeMatrix } from "../../helper/helper";
import SwitchToggle from "../Toggle/SwitchToggle";

export const TabelRatingData = ({ data, opsional }) => {
  const initialData = getInitialData(data, opsional);
  const [dataOnly] = useState(initialData.data);

  const [showModal, setShowModal] = useState(false);
  const [isNotation, setIsNotation] = useState(false);

  const [selectedData, setSelectedData] = useState({
    user: null,
    itemIndex: null,
    value: null,
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState([selectedUser, selectedItem])

  const user = dataOnly.length; // Number of items (rows)
  const item = dataOnly.length > 0 ? dataOnly[0].length : 0; // Number of users (columns)

  const handleCellClick = (rowIndex, colIndex, value) => {
    setSelectedData({ user: rowIndex + 1, itemIndex: colIndex, value });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedData({ user: null, itemIndex: null, value: null });
  };

  const handleIsNotation = () => {
    setIsNotation(!isNotation);
  };

  const handleUserChange = (e) => {
    const userIndex = e.target.value ? parseInt(e.target.value) : null;
    setSelectedUser(userIndex);
  };

  const handleItemChange = (e) => {
    const itemIndex = e.target.value ? parseInt(e.target.value) : null;
    setSelectedItem(itemIndex);
  };

  return (
    dataOnly.length !== 0 && (
      <div className="flex flex-col mb-5 font-poppins text-black">
        {/* Left Column */}

        <em>
          R ∈ ℝ
          <sup>
            {" "}
            {user}×{item}
          </sup>{" "}
          ,{" "}
          <span className="italic font-serif">
            m = {user} , n = {item}
          </span>
        </em>
        <SwitchToggle
          title={"Tampilkan Notasi"}
          changeToggle={handleIsNotation}
        />

        <div className="flex justify-center mt-4">
          <div className="overflow-x-auto rounded-xl ">
            <table className="text-xs sm:text-sm md:text-base lg:text-lg text-black border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {/* Kolom Pembatas: User/Item */}
                  <th className="relative px-4 py-3 min-w-[60px] border-r border-blue-400">
                    <span className="absolute p-1 top-0 right-0 text-[10px] sm:text-xs italic font-normal">
                      Item
                    </span>
                    <span className="absolute p-1 bottom-0 left-0 text-[10px] sm:text-xs italic font-normal">
                      User
                    </span>
                    <div className="absolute top-0 left-0 w-[105%] h-full border-t border-white/50 rotate-[22deg] origin-top-left"></div>
                  </th>
                  {Array.from({ length: item }, (_, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 font-semibold border-r border-blue-400 last:border-r-0"
                    >
                      {!isNotation ? (
                        index + 1
                      ) : (
                        <span className="italic font-serif">
                          i<sub>{index + 1}</sub>
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataOnly.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`transition-all duration-200 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-200 bg-blue-200">
                      {!isNotation ? (
                        rowIndex + 1
                      ) : (
                        <span className="italic font-serif">
                          u<sub>{rowIndex + 1}</sub>
                        </span>
                      )}
                    </td>
                    {row.map((value, colIndex) => {
                      const cellClass =
                        value === 0
                          ? "px-4 py-3 text-center min-w-[50px] bg-red-100 text-red-600 font-medium border-r border-gray-100 last:border-r-0"
                          : "px-4 py-3 text-center min-w-[50px] hover:bg-green-100 hover:scale-105 cursor-pointer transition-all duration-200 border-r border-gray-100 last:border-r-0";

                      return (
                        <td
                          key={colIndex}
                          className={cellClass}
                          onClick={() =>
                            handleCellClick(rowIndex, colIndex, value)
                          }
                        >
                          {!isNotation ? (
                            <span
                              className={`font-medium ${
                                value === 0
                                  ? "text-red-500"
                                  : "text-black hover:text-blue-800"
                              }`}
                            >
                              {value.toFixed ? value.toFixed(0) : value}
                            </span>
                          ) : (
                            <span className="italic font-serif text-blue-600">
                              r
                              <sub>
                                {rowIndex + 1}
                                {colIndex + 1}
                              </sub>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl font-poppins max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl transform transition-all duration-300 scale-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">r</span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Detail Data Rating r<sub className="italic">ui</sub>
                </h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <p className="font-semibold text-lg text-blue-700">
                  r
                  <sub className="italic">
                    {selectedData.user}
                    {selectedData.itemIndex + 1}
                  </sub>{" "}
                  ={" "}
                  <span className="text-blue-900 text-xl">
                    {selectedData.value}
                  </span>
                </p>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Rating dari{" "}
                <span className="font-semibold text-blue-600">
                  User {selectedData.user}
                </span>{" "}
                untuk{" "}
                <span className="font-semibold text-green-600">
                  Item {selectedData.itemIndex + 1}
                </span>{" "}
                adalah{" "}
                <span className="font-bold text-blue-700">
                  {selectedData.value}
                </span>
              </p>
              <button
                className="mt-5 w-full bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
        <div className="mt-6">
          <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-md">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Informasi Matriks Rating
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Matriks Rating dibentuk berdasarkan data Rating.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Kolom Kiri - Item */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="bg-blue-100 rounded-lg p-3 mb-4">
                  <span className="italic font-serif font-semibold text-blue-700">
                    I
                  </span>
                  <span className="text-gray-600"> : </span>
                  <span className="text-gray-800">
                    {!isNotation
                      ? Array.from({ length: item }, (_, i) => i + 1).join(
                          " , "
                        )
                      : Array.from({ length: item }, (_, i) => i).map((i) => (
                          <span
                            key={i}
                            className="italic font-serif ml-1 text-blue-600"
                          >
                            {i !== 0 ? "," : ""}i<sub>{+(i + 1)}</sub>
                          </span>
                        ))}
                  </span>
                </div>

                <h2 className="font-medium text-sm sm:text-base mb-3 text-gray-700">
                  Lihat Himpunan item yang telah diberi Rating oleh user u (
                  <span className="font-serif text-blue-600">
                    I<sub>u</sub>
                  </span>
                  )
                </h2>
                <select
                  value={selectedUser !== null ? selectedUser : ""}
                  onChange={handleUserChange}
                  className="w-full h-11 px-3 border border-gray-200 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  <option value="">Pilih User</option>
                  {Array.from({ length: user }, (_, index) => (
                    <option key={index} value={index}>{`User ${
                      index + 1
                    }`}</option>
                  ))}
                </select>

                {selectedUser !== null && (
                  <div className="mt-3 p-3 bg-blue-200 rounded-lg border border-blue-100">
                    <p className="text-gray-700">
                      <strong className="italic text-blue-600">
                        I<sub>{selectedUser + 1}</sub> :
                      </strong>{" "}
                      <span className="font-medium">
                        {"{" +
                          dataOnly[selectedUser]
                            .map((value, index) =>
                              value !== 0 ? index + 1 : null
                            )
                            .filter((index) => index !== null)
                            .join(", ") +
                          "}"}
                      </span>
                    </p>
                    <OnlyDivider />
                    <p className="text-gray-700">
                      <strong className="italic text-blue-600">
                        r<sub>{selectedUser + 1}*</sub> :
                      </strong>{" "}
                      <span className="font-medium">
                        {dataOnly[selectedUser]
                          .filter((value) => value !== 0)
                          .join(", ")}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Kolom Kanan - User */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="bg-green-100 rounded-lg p-3 mb-4">
                  <span className="italic font-serif font-semibold text-green-700">
                    U
                  </span>
                  <span className="text-gray-600"> : </span>
                  <span className="text-gray-800">
                    {!isNotation
                      ? Array.from({ length: user }, (_, i) => i + 1).join(
                          " , "
                        )
                      : Array.from({ length: user }, (_, i) => i).map((i) => (
                          <span
                            key={i}
                            className="italic font-serif ml-1 text-green-600"
                          >
                            {i !== 0 ? "," : ""}u<sub>{+(i + 1)}</sub>
                          </span>
                        ))}
                  </span>
                </div>

                <h2 className="font-medium text-sm sm:text-base mb-3 text-gray-700">
                  Lihat Himpunan User yang telah memberi rating item i (
                  <span className="font-serif text-green-600">
                    U<sub>i</sub>
                  </span>
                  )
                </h2>
                <select
                  value={selectedItem !== null ? selectedItem : ""}
                  onChange={handleItemChange}
                  className="w-full h-11 px-3 border border-gray-200 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                >
                  <option value="">Pilih Item</option>
                  {Array.from({ length: item }, (_, index) => (
                    <option key={index} value={index}>{`Item ${
                      index + 1
                    }`}</option>
                  ))}
                </select>

                {selectedItem !== null && (
                  <div className="mt-3 p-3 bg-green-200 rounded-lg border border-green-100">
                    <p className="text-gray-700">
                      <strong className="italic text-green-600">
                        U<sub>{selectedItem + 1}</sub> :
                      </strong>{" "}
                      <span className="font-medium">
                        {"{" +
                          transposeMatrix(dataOnly)
                            [selectedItem].map((value, index) =>
                              value !== 0 ? index + 1 : null
                            )
                            .filter((index) => index !== null)
                            .join(", ") +
                          "}"}
                      </span>
                    </p>
                    <OnlyDivider />
                    <p className="text-gray-700">
                      <strong className="italic text-green-600">
                        r<sub>*{selectedItem + 1}</sub> :
                      </strong>{" "}
                      <span className="font-medium">
                        {dataOnly
                          .map((row) => row[selectedItem])
                          .filter((value) => value !== 0)
                          .join(", ")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
