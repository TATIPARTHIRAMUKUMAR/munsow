import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoDataPage = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/practice");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-20 rounded-2xl">
                <div className="text-center">
                    <p className="text-3xl font-extrabold mb-4">No Data on this Page for Now</p>
                    <button onClick={handleNavigation} className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-yellow-400">
                        Go to Practice Interviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoDataPage;
