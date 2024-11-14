import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton } from '@headlessui/react'

const DropdownSimilarityMeasure = ({ onChange }) => {

    const [selectSimiliarty, setSelectSimiliarity] = useState('Pilih Fungsi Similaritas')

    const handleChange = (method) => {
        setSelectSimiliarity(method)
        onChange(method)
    }

    return (
        <FormControl>
            <Menu as="div" className="relative  inline-block text-left ">
                <div>
                    <MenuButton
                        className=" outline outline-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-sm font-semibold font-poppins text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-yellow-50">
                        {selectSimiliarty}
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                </div>

                <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('Pearson Correlation Coefficient (PCC)')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Pearson Correlation Coefficient (PCC)
                                </button>
                            )}

                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('Vector Cosine')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Vector Cosine
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('Adjusted Vector Cosine')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Adjusted Vector Cosine
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('Bhattacharyya Coefficient Similarity (BC)')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Bhattacharyya Coefficient Similarity (BC)
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </FormControl>
    )
}

export default DropdownSimilarityMeasure