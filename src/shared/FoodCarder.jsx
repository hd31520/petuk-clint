import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaShoppingBag, FaFire } from 'react-icons/fa';

const FoodCarder = ({ food }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200 dark:border-gray-700">
            <div className="relative">
                <img
                    src={food.foodImage && food.foodImage[0]}
                    alt={food.foodName}
                    className="w-full h-48 object-cover"
                />
                {food.isPopular && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <FaFire className="mr-1" /> Popular
                    </div>
                )}
            </div>
            
            <div className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {food.foodName}
                    </h2>
                    {food.rating && (
                        <span className="flex items-center bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2 py-1 rounded text-sm">
                            <FaStar className="mr-1 text-amber-500 dark:text-amber-300" /> {food.rating.toFixed(1)}
                        </span>
                    )}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {food.foodCategory}
                </p>
                
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        ${food.price ? food.price.toFixed(2) : '0.00'}
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                        <FaShoppingBag className="mr-1" /> {food.purchaseCount || 0}
                    </p>
                </div>
                
                <div className="mt-4">
                    <Link
                        to={`/foods/${food._id}`}
                        className="block w-full text-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCarder;