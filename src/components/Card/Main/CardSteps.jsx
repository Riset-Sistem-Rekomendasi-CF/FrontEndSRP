import React from 'react';
function CardSteps({ heading, description, icon }) {
    return (
        <div className="bg-white border-2 border-gray-300 rounded-xl shadow-lg p-6 m-4 sm:max-w-xs md:max-w-sm lg:max-w-md w-full">
            <div className="flex items-center mb-4">
                <div className="text-3xl text-blue-500 mr-4">
                    {icon}
                </div>
                <h2 className="text-lg text-start sm:text-xl lg:text-2xl font-semibold text-gray-900">{heading}</h2> {/* Heading Responsif */}
            </div>
            <p className="text-sm text-justify sm:text-base lg:text-lg text-gray-600 ">{description}</p> {/* Description Responsif */}
        </div>
    );
}

export default CardSteps;

