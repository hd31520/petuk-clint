import React from 'react';
import { Link } from 'react-router';

const FoodCard = ({ food }) => {
    const { _id, foodName, foodImage, foodCategory, price } = food;

    return (
        <div className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <figure className="px-10 pt-10">
                <img src={foodImage[0]} alt={`Image of ${foodName}`} className="rounded-xl h-48 w-full object-cover" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{foodName}</h2>
                <p className="badge badge-outline">{foodCategory}</p>
                <p className="text-lg font-semibold">${price.toFixed(2)}</p>
                <div className="card-actions mt-4">
                    <Link to={`/foods/${_id}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;