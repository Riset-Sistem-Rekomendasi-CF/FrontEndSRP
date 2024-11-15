import React, { useState, useEffect } from 'react';

const CollaborativeFiltering = () => {
    const [activeTab, setActiveTab] = useState('user-based'); // Mengatur tab aktif: user-based atau item-based

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev === 'user-based' ? 'item-based' : 'user-based'));
        }, 6000); // Ganti tab setiap 6 detik
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-4xl mx-auto text-center py-10 px-4">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-10">Collaborative Filtering</h1>

            <div className="tabs mb-6">
                <button
                    onClick={() => setActiveTab('user-based')}
                    className={`tab-btn ${activeTab === 'user-based' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    User-Based
                </button>
                <button
                    onClick={() => setActiveTab('item-based')}
                    className={`tab-btn ${activeTab === 'item-based' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Item-Based
                </button>
            </div>

            <div className="animation-container">
                {activeTab === 'user-based' && <UserBasedAnimation />}
                {activeTab === 'item-based' && <ItemBasedAnimation />}
            </div>
        </section>
    );
};

const UserBasedAnimation = () => {
    return (
        <div className="relative w-full h-60 bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-16 h-16 bg-green-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-full animate-ping"></div>

            <div className="absolute top-1/3 left-1/3 transform -translate-y-1/2 text-lg text-gray-700">
                <p>User A and User B share similar preferences and get similar recommendations.</p>
            </div>
        </div>
    );
};

const ItemBasedAnimation = () => {
    return (
        <div className="relative w-full h-60 bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 w-16 h-16 bg-yellow-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-32 transform -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-54 transform -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-full animate-bounce"></div>

            <div className="absolute top-1/3 left-1/3 transform -translate-y-1/2 text-lg text-gray-700">
                <p>Items that are similar to each other are recommended based on user behavior.</p>
            </div>
        </div>
    );
};

export default CollaborativeFiltering;
