import React, { useState } from 'react';

import TuneIcon from '@mui/icons-material/Tune';
import PercentIcon from "@mui/icons-material/Percent";
import { Input } from '@headlessui/react';

export function Form_createTbl() {
    const [panjang, setPanjang] = useState(0);
    const [lebar, setLebar] = useState(0);
    const [sparsity, setSparsity] = useState(0);

    // Function to generate a random number between min and max
    const GenerateRandomTableSize = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to handle random generation of dimensions
    const handleRandomGenerate = (e) => {
        e.preventDefault();
        setPanjang(GenerateRandomTableSize(1, 25));
        setLebar(GenerateRandomTableSize(1, 25));
        setSparsity(GenerateRandomTableSize(1, 100));
    };

    // Function to handle input changes
    const handleChangePanjang = (e) => {
        setPanjang(e.target.value);
    };

    const handleChangeLebar = (e) => {
        setLebar(e.target.value);
    };
    const handleSetSparsity = (e) => {
        setSparsity(e.target.value);
    };


    return (
        <div className="max-w-2xl mx-auto py-10">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
                {/* Kolom Kiri */}
                <div className="flex flex-col">
                    <label htmlFor="input1" className="mb-5 text-2xl text-start font-poppins font-semibold text-gray-900">User:</label>
                    <div className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                        <Input
                            id="input1"
                            name="input1"
                            type="number"
                            placeholder="Masukkan Panjang Matrix"
                            value={panjang}
                            className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                            onChange={handleChangePanjang}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="input2" className="mb-5 text-2xl text-start font-poppins font-semibold text-gray-900">Item:</label>
                    <div className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                        <input
                            id="input2"
                            name="input2"
                            type="number"
                            value={lebar}
                            placeholder="Masukkan Lebar Matrix"
                            className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                            onChange={handleChangeLebar}
                        />
                    </div>
                </div>

                {/* Tombol Random Size */}
                <div className="flex flex-col mt-12 justify-center items-center">
                    <button type="button" onClick={handleRandomGenerate}
                        className="bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">
                        <TuneIcon className="mr-2" />
                        Generate Random
                    </button>
                </div>
            </form>



            {/* Sparsity Section */}
            <div className='flex flex-col items-center mt-5'>
                <div className='flex flex-row items-center'>
                    <div className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>2</div>
                    <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Sparsity</h1>
                </div>

                <div className='max-w-2xl flex flex-row items-center'>
                    <form className='flex items-center'>
                        <div className="outline outline-1 inline-flex justify-center items-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-md font-poppins font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <input
                                id="sparsity"
                                name="sparsity"
                                type="number"
                                value={sparsity}
                                placeholder="sparsity..."
                                className="w-24 border-none bg-transparent focus:outline-none text-gray-900"
                                onChange={handleSetSparsity}
                            />
                            <div className="flex items-center">
                                <PercentIcon className="h-5 text-gray-500" />
                            </div>
                        </div>
                        <button type="button" onClick={handleRandomGenerate}
                            className="w-30 ml-5 bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">
                            <TuneIcon className="mr-2" />
                            Generate Random
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
