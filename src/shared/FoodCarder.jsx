import React from 'react';
import { Link } from 'react-router';

const FoodCarder = ({food}) => {
    return (
        
            <div  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <img
                                        src={food.foodImage && food.foodImage[0]}
                                        alt={food.foodName}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-2 md:p-6">
                                        <h2 className="text-2xl font-bold text-gray-800">{food.foodName}</h2>
                                        <p className="text-gray-600 mt-1">{food.foodCategory}</p>
                                        <div className="flex justify-between items-center mt-4">
                                            <p className="text-xl font-semibold text-green-600">${food.price ? food.price.toFixed(2) : '0.00'}</p>
                                            <p className="text-sm font-medium text-gray-500">Sold: {food.purchaseCount || 0}</p>
                                        </div>
                                        <div className="mt-2 md:mt-6">
                                            <Link
                                                to={`/foods/${food._id}`}
                                                className="block w-full text-center bg-green-600 text-white font-bold py-2 px-2 md:px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                                            >
                                                See Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
        
    );
};

export default FoodCarder;