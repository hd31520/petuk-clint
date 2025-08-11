import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaShoppingBag, FaFire } from 'react-icons/fa';

const FoodCarder = ({ food }) => {
    return (
        // Use DaisyUI's theme-agnostic classes for background and borders
        <div className="card bg-base-100 shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-base-200">
            <div className="relative">
                <img
                    src={food.foodImage && food.foodImage[0]}
                    alt={food.foodName}
                    className="w-full h-48 object-cover"
                />
                {food.isPopular && (
                    <div className="absolute top-2 right-2 badge badge-warning text-xs font-bold">
                        <FaFire className="mr-1" /> Popular
                    </div>
                )}
            </div>
            
            <div className="card-body p-4 md:p-6">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-base-content">
                        {food.foodName}
                    </h2>
                    {food.rating && (
                        <div className="badge badge-lg badge-outline text-amber-500">
                            <FaStar className="mr-1" /> {food.rating.toFixed(1)}
                        </div>
                    )}
                </div>
                
                <p className="text-sm text-base-content mt-2">
                    {food.foodCategory}
                </p>
                
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold text-success">
                        ${food.price ? food.price.toFixed(2) : '0.00'}
                    </p>
                    <p className="text-sm font-medium text-base-content flex items-center">
                        <FaShoppingBag className="mr-1" /> {food.purchaseCount || 0}
                    </p>
                </div>
                
                <div className="mt-4">
                    <Link
                        to={`/foods/${food._id}`}
                        className="btn btn-primary block flex justify-center it "
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCarder;
