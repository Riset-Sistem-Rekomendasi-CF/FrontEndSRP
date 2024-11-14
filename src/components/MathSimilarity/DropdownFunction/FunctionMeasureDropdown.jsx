import React, { useState } from 'react';
import { MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import MathJaxComponent from "../../../MathJaxComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';





export function FunctionMeasureDropdown({ DetailRumus }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='px-10'>
            <button
                onClick={toggleDropdown}
                className='flex items-center text-start font-semibold font-poppins text-red-500 mt-4 focus:outline-none'>
                Keterangan
                {isOpen ? <ExpandLessIcon className="ml-2" /> : <ExpandMoreIcon className="ml-2" />}
            </button>
            {isOpen && (
                <div className='flex justify-start items-start flex-col px-0 font-normal font-poppins mt-2'>
                    {DetailRumus.map((math, index) => (
                        <MathJaxComponent key={index}>{math}</MathJaxComponent>
                    ))}
                </div>
            )}
        </div>
    );
}
