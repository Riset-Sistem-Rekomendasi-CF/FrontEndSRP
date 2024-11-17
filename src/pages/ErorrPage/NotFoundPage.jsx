import React from "react"
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center font-poppinst">
            <h1 className="text-9xl font-extrabold text-red-500 mb-6">404</h1>
            <p className="text-lg font-semibold text-gray-700 mb-6">Oops! Halaman yang Anda cari tidak
                ditemukan.</p>
            <Link
                to="/"
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
            >
                Kembali ke Home
            </Link>
        </div>
    )
}

export default NotFoundPage;
