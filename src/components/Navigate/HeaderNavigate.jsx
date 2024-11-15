import React from "react";

const HeaderNavigate = ({ children }) => {
    return (
        <section className="max-w-full mx-auto text-center mb-5 pb-5">
            <div className="relative flex flex-col items-center justify-start">
                {/* Menambahkan padding, dan membuat elemen responsif */}
                <div className="absolute top-0 left-0 right-0 flex justify-center gap-4 p-4">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default HeaderNavigate;

