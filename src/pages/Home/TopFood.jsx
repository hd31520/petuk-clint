import React from 'react';
import FoodCarder from '../../shared/FoodCarder';
import { Link } from 'react-router';

const TopFood = ({loading, topFoods} ) => {
    return (
        <section className="py-12 lg:py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Our Top Selling Foods</h2>
                        <p className="text-lg mt-2 text-gray-600">Loved by our customers, crafted with passion by our chefs.</p>
                    </div>

                    {loading  ? (
                        <div className="text-center py-10">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
                            {topFoods.map(food => (
                               
                                <FoodCarder key={food._id} food={food} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/allfood" className="btn btn-secondary btn-wide">
                            See All Foods
                        </Link>
                    </div>
                </div>
            </section>
    );
};

export default TopFood;