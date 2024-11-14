import React from "react";

const HeaderNavigate = ({ children }) => {
    return (
        <section className="max-w-2xl mx-auto text-center mb-5 pb-5">
            <div className="relative flex flex-col items-center justify-start">
                <div className="absolute top-0 left-0 right-0 flex justify-center space-x-4 p-4 flex-wrap md:flex-nowrap">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default HeaderNavigate;
