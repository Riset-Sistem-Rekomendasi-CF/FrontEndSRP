
import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { getInitialData } from '../../api/getDataSet';
import { Input } from '@headlessui/react';
import { makeArrayIndex, transposeMatrix } from '../../helper/helper';
import SwitchToggle from '../Toggle/SwitchToggle';

export const TabelRatingData = ({ data, opsional }) => {
    const initialData = getInitialData(data, opsional);
    const [dataOnly] = useState(initialData.data);


    const [showModal, setShowModal] = useState(false);
    const [isNotation, setIsNotation] = useState(false)

    const [selectedData, setSelectedData] = useState({ user: null, itemIndex: null, value: null });

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState([selectedUser, selectedItem]);

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
        setIsNotation(!isNotation)
    }

    const handleUserChange = (e) => {
        const userIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedUser(userIndex)
    };

    const handleItemChange = (e) => {
        const itemIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedItem(itemIndex)
    };



    return (
        <div className='flex flex-col mb-5 font-poppins'>
            {/* Left Column */}

            <em>R ∈ ℝ<sup> {user}×{item}</sup> , <span className='italic font-serif'>m = {user} , n = {item}</span></em>
            <SwitchToggle
                title={"Tampilkan Notasi"}
                changeToggle={handleIsNotation}
            />


            <table className="w-[100%] h-[100%] border border-collapse border-black mt-4 mr-3 text-center overflow-auto">
                <thead>
                    <tr className="bg-card_blue_primary text-white">
                        <th className="relative px-4 py-2">
                            <span className="absolute p-1 top-0 right-0 text-xs italic">Item</span>
                            <span className="absolute p-1 bottom-0 left-0 text-xs italic">User</span>
                            <div className="absolute top-0 left-0 w-[105%] h-full border-t border-black rotate-[19deg] origin-top-left"></div>
                        </th>
                        {Array.from({ length: item }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">
                                {!isNotation ? (index + 1) : <span className='italic font-serif'>i<sub>{index + 1}</sub></span>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataOnly.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 w-20 bg-gray-200">{!isNotation ? (rowIndex + 1) : (<><span className='italic font-serif'>u<sub>{rowIndex + 1}</sub></span></>)}</td>
                            {row.map((value, colIndex) => {
                                const indicatorCell = row.includes(6) ? "bg-" : ""
                                const cellClass = value === 0
                                    ? 'border border-black px-4 py-2 text-center w-20 bg-red-200'
                                    : 'border border-black px-4 py-2 text-center w-20 hover:bg-card_green_primary cursor-pointer';

                                return (
                                    <td
                                        key={colIndex}
                                        className={indicatorCell + cellClass}
                                        onClick={() => handleCellClick(rowIndex, colIndex, value)} // Handle cell click
                                    >
                                        {!isNotation ? (value.toFixed ? value.toFixed(0) : value)
                                            : <span className='italic font-serif'>r<sub>{rowIndex + 1}{colIndex + 1}</sub></span>
                                        }
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg font-poppins">
                        <h2 className="text-lg font-semibold mb-4">Detail Data Rating r<sub className={'italic'}>ui</sub></h2>
                        <p className='mb-2 font-semibold text-md text-black'>
                            r<sub className={'italic'}>{selectedData.user}{selectedData.itemIndex + 1}</sub> = {selectedData.value}
                        </p>
                        <p className='my-2 font-medium text-md text-black'>
                            Rating dari user(u) {selectedData.user} untuk item(i) {selectedData.itemIndex + 1} adalah {selectedData.value}
                        </p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                            Tutup
                        </button>
                    </div>
                </div>
            )}
            <div>
                <h3 className="text-lg font-semibold my-2">Informasi Matriks Rating</h3>
                <h3 className="text-md font-semibold mb-2">Matriks rating dibentuk berdasarkan data rating.</h3>

                <div className="flex items-start justify-start space-x-6">

                    {/* Right Column */}
                    <div className="w-full space-y-2 text-start ">
                        <div className="flex justify-between ">
                            <div className="w-1/2 mx-1">
                                <p><span className='italic font-serif'>I</span> : {!isNotation ? Array.from({ length: item }, (_, i) => i + 1).join(" , ") : Array.from({ length: item }, (_, i) => i).map(i => <span className='italic font-serif ml-1'>{i !== 0 ? "," : ""}i<sub>{+ (i + 1)}</sub></span>)}</p>
                                <h2 className='font-medium my-2'> Lihat Himpunan Item yang telah diberi rating oleh user u (<span className='font-serif'>I<sub>u</sub></span>)</h2>
                                <select value={selectedUser !== null ? selectedUser : ''} onChange={handleUserChange}
                                    className="border border-gray-400 rounded w-full">
                                    <option value="">Pilih User</option>
                                    {Array.from({ length: user }, (_, index) => (
                                        <option key={index} value={index}>{`User ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedUser !== null && (
                                    <div>
                                        <p>
                                            <strong className="italic">I<sub>{selectedUser + 1}</sub> : </strong>
                                            {'{' +
                                                dataOnly[selectedUser]
                                                    .map((value, index) => value !== 0 ? index + 1 : null)
                                                    .filter(index => index !== null)
                                                    .join(', ') +
                                                '}'}
                                        </p>
                                        <p>
                                            <strong className="italic">r<sub>{selectedUser + 1}*</sub> :
                                            </strong> {dataOnly[selectedUser]
                                                .filter(value => value !== 0) // Filter out values that are 0
                                                .join(', ')
                                            }
                                        </p>

                                    </div>

                                )}
                            </div>

                            <div className="w-1/2 mx-1">
                                <p><span className='italic font-serif'>U</span> : {!isNotation ? Array.from({ length: user }, (_, i) => i + 1).join(" , ") : Array.from({ length: user }, (_, i) => i).map(i => <span className='italic font-serif ml-1'>{i !== 0 ? "," : ""}u<sub>{+ (i + 1)}</sub></span>)}</p>

                                <h2 className='font-medium my-2'>Lihat Himpunan User yang telah memberi rating item i (<span className='font-serif'>U<sub>i</sub></span>)</h2>
                                <select value={selectedItem !== null ? selectedItem : ''} onChange={handleItemChange}
                                    className="border border-gray-400 rounded w-full">
                                    <option value="">Pilih Item</option>
                                    {Array.from({ length: item }, (_, index) => (
                                        <option key={index} value={index}>{`Item ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedItem !== null && (
                                    <div>
                                        <p>
                                            <strong className="italic">U<sub>{selectedItem + 1} </sub> : </strong>
                                            {'{' +
                                                transposeMatrix(dataOnly)[selectedItem]
                                                    .map((value, index) => value !== 0 ? index + 1 : null)
                                                    .filter(index => index !== null)
                                                    .join(', ') +
                                                '}'}
                                        </p>
                                        <p>
                                            <strong className="italic">r<sub>*{selectedItem + 1} </sub> : </strong>
                                            {dataOnly
                                                .map(row => row[selectedItem])
                                                .filter(value => value !== 0) // Filter out the values that are 0
                                                .join(', ')
                                            }
                                        </p>
                                    </div>

                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


export const NotationCard = ({ data, opsional }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="bg-white shadow-md rounded-lg my-10 p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-5 text-center underline underline-offset-8 decoration-4 decoration-card_blue_primary">Notasi dan Penjelasan</h2>
            <div className="flex space-x-6">
                {/* Left Column */}
                <div className="w-1/2 space-y-2 font-poppins text-start">
                    <p><strong><i>m</i></strong> : Jumlah <span className="italic">user</span></p>
                    <p><strong><i>n</i></strong> : Jumlah <span className="italic">item</span></p>
                    <p><strong><i>U</i></strong> : Himpunan <span className="italic">user</span></p>
                    <p><strong><i>I</i></strong> : Himpunan <span className="italic">item</span></p>
                    <p><strong><i>I<sub>u</sub></i></strong> : Himpunan <span className="italic">item</span> yang telah diberi
                        rating oleh <span className="italic">user</span> <em>u</em></p>
                </div>

                {/* Right Column */}
                <div className="w-1/2 space-y-2 font-poppins text-start">
                    <p><strong><i>U<sub>i</sub></i></strong> : Himpunan <span className="italic">User</span> yang telah memberi
                        rating <br /> <span className="italic">item</span> <em>i</em></p>
                    <p><strong><em>R ∈ ℝ<sup> m×n</sup></em></strong> : Matriks yang berisi bilangan asli dengan panjang m dan lebar n
                    </p>
                    <p><strong>r<sub>ui</sub></strong> : rating <span className="italic">user</span>
                        <em> u</em> terhadap <span className="italic">item</span> <em>i</em></p>
                </div>
            </div>

            {/* Dropdown Button */}
            <button
                className="mt-6 w-full bg-card_blue_primary text-white px-4 py-3 rounded-lg flex justify-center items-center font-poppins font-semibold"
                onClick={toggleDropdown}
            >
                <FaChevronDown className="mr-2 " />
                {isOpen ? 'Sembunyikan Detail Matriks Rating ' : 'Tampilkan Detail Matriks Rating'}
            </button>

            {/* Dropdown Card */}
            {isOpen && (
                <div className="mt-4 bg-gray-100 shadow rounded-lg p-4">
                    <TabelRatingData data={data} opsional={opsional} />
                </div>
            )}
        </div>

    );
};

export default NotationCard