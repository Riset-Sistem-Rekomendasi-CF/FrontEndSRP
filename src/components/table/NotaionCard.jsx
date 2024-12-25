import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getInitialData } from "../../api/getDataSet";
import { transposeMatrix } from "../../helper/helper";
import SwitchToggle from "../Toggle/SwitchToggle";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

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
      <div className="flex flex-col mb-5 font-poppins">
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

        <div className="overflow-x-auto mt-4 mr-2">
          {" "}
          {/* Membuat tabel dapat digulir secara
                 horizontal */}
          <table className="w-full border border-collapse border-black text-center">
            <thead>
              <tr className="bg-blue-home text-white">
                {/* Kolom Pembatas: User */}
                <th className="relative px-4 py-2 border-r-2 border-black">
                  {" "}
                  {/* Border kanan untuk pemisah */}
                  <span className="absolute p-1 top-0 right-0 text-xs italic">
                    Item
                  </span>
                  <span className="absolute p-1 bottom-0 left-0 text-xs italic">
                    User
                  </span>
                  <div className="absolute top-0 left-0 w-[105%] h-full border-t border-black rotate-[19deg] origin-top-left"></div>
                </th>
                {Array.from({ length: item }, (_, index) => (
                  <th key={index} className="border border-black px-4 py-2">
                    {/* Conditional rendering for notation */}
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
                <tr key={rowIndex}>
                  <td className="border border-black px-4 py-2 w-20 bg-blue-200">
                    {/* Conditional rendering for notation */}
                    {!isNotation ? (
                      rowIndex + 1
                    ) : (
                      <span className="italic font-serif">
                        u<sub>{rowIndex + 1}</sub>
                      </span>
                    )}
                  </td>
                  {row.map((value, colIndex) => {
                    const indicatorCell = row.includes(6) ? "bg-" : "";
                    const cellClass =
                      value === 0
                        ? "border border-black px-4 py-2 text-center w-20 bg-red-200"
                        : "border border-black px-4 py-2 text-center w-20 hover:bg-card_green_primary cursor-pointer";

                    return (
                      <td
                        key={colIndex}
                        className={indicatorCell + cellClass}
                        onClick={() =>
                          handleCellClick(rowIndex, colIndex, value)
                        } // Handle cell click
                      >
                        {!isNotation ? (
                          value.toFixed ? (
                            value.toFixed(0)
                          ) : (
                            value
                          )
                        ) : (
                          <span className="italic font-serif">
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

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg font-poppins max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Detail Data <i> rating </i> r<sub className={"italic"}>ui</sub>
              </h2>
              <p className="mb-2 font-semibold text-md text-black">
                r
                <sub className={"italic"}>
                  {selectedData.user}
                  {selectedData.itemIndex + 1}
                </sub>{" "}
                = {selectedData.value}
              </p>
              <p className="my-2 font-medium text-md text-black">
                <i>Rating </i> dari <i> user</i>(u) {selectedData.user} untuk
                <i> item </i>(i) {selectedData.itemIndex + 1} adalah{" "}
                {selectedData.value}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold my-2">
            Informasi Matriks <i> Rating</i>
          </h3>
          <h3 className="text-md sm:text-lg font-semibold mb-2">
            Matriks <i> Rating </i> dibentuk berdasarkan data <i>Rating</i>.
          </h3>

          <div className="flex items-start justify-start space-x-6">
            {/* Right Column */}
            <div className="w-full space-y-2 text-start">
              <div className="flex flex-col sm:flex-row justify-between sm:space-x-6">
                {/* Kolom Kiri */}
                <div className="w-full sm:w-1/2 mx-1">
                  <p>
                    <span className="italic font-serif">I</span> :{" "}
                    {!isNotation
                      ? Array.from({ length: item }, (_, i) => i + 1).join(
                          " , "
                        )
                      : Array.from({ length: item }, (_, i) => i).map((i) => (
                          <span key={i} className="italic font-serif ml-1">
                            {i !== 0 ? "," : ""}i<sub>{+(i + 1)}</sub>
                          </span>
                        ))}
                  </p>
                  <h2 className="font-medium my-2">
                    Lihat Himpunan <i> Item </i> yang telah diberi{" "}
                    <i> Rating </i> oleh <i> User </i> u (
                    <span className="font-serif">
                      I<sub>u</sub>
                    </span>
                    )
                  </h2>
                  <select
                    value={selectedUser !== null ? selectedUser : ""}
                    onChange={handleUserChange}
                    className="border border-gray-400 rounded w-full h-10"
                  >
                    <option value="">Pilih User</option>
                    {Array.from({ length: user }, (_, index) => (
                      <option key={index} value={index}>{`User ${
                        index + 1
                      }`}</option>
                    ))}
                  </select>

                  {selectedUser !== null && (
                    <div>
                      <p>
                        <strong className="italic">
                          I<sub>{selectedUser + 1}</sub> :
                        </strong>
                        {"{" +
                          dataOnly[selectedUser]
                            .map((value, index) =>
                              value !== 0 ? index + 1 : null
                            )
                            .filter((index) => index !== null)
                            .join(", ") +
                          "}"}
                      </p>
                      <p>
                        <strong className="italic">
                          r<sub>{selectedUser + 1}*</sub> :
                        </strong>
                        {dataOnly[selectedUser]
                          .filter((value) => value !== 0)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Kolom Kanan */}
                <div className="w-full sm:w-1/2 mx-1 mt-6 sm:mt-0">
                  <p>
                    <span className="italic font-serif">U</span> :{" "}
                    {!isNotation
                      ? Array.from({ length: user }, (_, i) => i + 1).join(
                          " , "
                        )
                      : Array.from({ length: user }, (_, i) => i).map((i) => (
                          <span key={i} className="italic font-serif ml-1">
                            {i !== 0 ? "," : ""}u<sub>{+(i + 1)}</sub>
                          </span>
                        ))}
                  </p>

                  <h2 className="font-medium my-2">
                    Lihat Himpunan <i> User </i> yang telah memberi{" "}
                    <i> rating </i>
                    <i> item </i> i (
                    <span className="font-serif">
                      U<sub>i</sub>
                    </span>
                    )
                  </h2>
                  <select
                    value={selectedItem !== null ? selectedItem : ""}
                    onChange={handleItemChange}
                    className="border border-gray-400 rounded w-full h-10"
                  >
                    <option value="">Pilih Item</option>
                    {Array.from({ length: item }, (_, index) => (
                      <option key={index} value={index}>{`Item ${
                        index + 1
                      }`}</option>
                    ))}
                  </select>

                  {selectedItem !== null && (
                    <div>
                      <p>
                        <strong className="italic">
                          U<sub>{selectedItem + 1}</sub> :
                        </strong>
                        {"{" +
                          transposeMatrix(dataOnly)
                            [selectedItem].map((value, index) =>
                              value !== 0 ? index + 1 : null
                            )
                            .filter((index) => index !== null)
                            .join(", ") +
                          "}"}
                      </p>
                      <p>
                        <strong className="italic">
                          r<sub>*{selectedItem + 1}</sub> :
                        </strong>
                        {dataOnly
                          .map((row) => row[selectedItem])
                          .filter((value) => value !== 0)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export const NotationCard = ({ data, opsional, id }) => {
  const scrollToSectionNotion = (sectionIdNotaion) => {
    const element = document.getElementById(sectionIdNotaion);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="p-5 ">
      <div
        id={id}
        className="bg-white border-2 border-black shadow-md rounded-lg my-10 p-6 max-w-4xl mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
          Notasi dan Penjelasan
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          {/* Left Column */}
          <div className="w-full sm:w-1/2 space-y-2 font-poppins text-start">
            <p>
              <strong>
                <i>m</i>
              </strong>{" "}
              : Jumlah <span className="italic">user</span>
            </p>
            <p>
              <strong>
                <i>n</i>
              </strong>{" "}
              : Jumlah <span className="italic">item</span>
            </p>
            <p>
              <strong>
                <i>U</i>
              </strong>{" "}
              : Himpunan <span className="italic">user</span>
            </p>
            <p>
              <strong>
                <i>I</i>
              </strong>{" "}
              : Himpunan <span className="italic">item</span>
            </p>
            <p>
              <strong>
                <i>
                  I<sub>u</sub>
                </i>
              </strong>{" "}
              : Himpunan <span className="italic">item</span> yang telah diberi{" "}
              <i> rating </i> oleh <span className="italic">user</span>{" "}
              <em>u</em>
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-1/2 space-y-2 font-poppins text-start">
            <p>
              <strong>
                <i>
                  U<sub>i</sub>
                </i>
              </strong>{" "}
              : Himpunan <span className="italic">User</span> yang telah memberi{" "}
              <i> rating </i> <br /> <span className="italic">item</span>{" "}
              <em>i</em>
            </p>
            <p>
              <strong>
                <em>
                  R ∈ ℝ<sup> m×n</sup>
                </em>
              </strong>{" "}
              : Matriks yang berisi bilangan asli dengan panjang m dan lebar n
            </p>
            <p>
              <strong>
                r<sub>ui</sub>
              </strong>{" "}
              : <i> rating </i> <span className="italic"> user </span>
              <em> u</em> terhadap <span className="italic">item</span>{" "}
              <em>i</em>
            </p>
          </div>
        </div>

        {/* Dropdown Button */}
        <button
          className="mt-6 w-full bg-blue-home text-white px-4 py-3 rounded-lg flex justify-center items-center font-poppins font-semibold"
          onClick={toggleDropdown}
        >
          <FaChevronDown className="mr-2" />
          {isOpen
            ? "Sembunyikan Detail Matrik Rating"
            : "Tampilkan Detail Matrik Rating"}
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="mt-4 bg-yellow-secondary shadow rounded-lg p-4">
            {/* validasi jika data 0 */}
            {data && data.length > 0 ? (
              <TabelRatingData data={data} opsional={opsional} />
            ) : (
              <div className="font-poppins">
                <p className="text-center text-red-500 font-semibold">
                  Tidak ada data rating yang tersedia. Mohon masukkan data
                  terlebih dahulu.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => scrollToSectionNotion("data_ratingLatihan")}
                    className="text-md font-semibold animate-bounce mt-4 text-black rounded-lg hover:underline transition duration-300"
                  >
                    <KeyboardCapslockIcon className="mr-2" />
                    Masukan Data Rating
                  </button>
                </div>
              </div>
              // button untuk masuk ke form input data
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NotationCard;
