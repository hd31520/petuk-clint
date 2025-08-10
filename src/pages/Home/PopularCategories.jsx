import React from 'react';
import { GiChickenOven, GiNoodles, GiSandwich, GiSushis, GiBarbecue, GiFruitBowl } from 'react-icons/gi';

const PopularCategories = () => {
    const categories = [
        { id: 1, name: 'Chicken', icon: <GiChickenOven />, count: 45 },
        { id: 2, name: 'Pasta', icon: <GiNoodles />, count: 32 },
        { id: 3, name: 'Burgers', icon: <GiSandwich />, count: 28 },
        { id: 4, name: 'Sushi', icon: <GiSushis />, count: 18 },
        { id: 5, name: 'BBQ', icon: <GiBarbecue />, count: 22 },
        { id: 6, name: 'Salads', icon: <GiFruitBowl />, count: 15 }
    ];

    return (
        <section className="py-12 px-4 md:px-8 lg:px-16 bg-base-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-base-content mb-8">
                    Popular Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map(category => (
                        <div 
                            key={category.id} 
                            className="bg-base-200 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center border border-base-300"
                        >
                            <div className="text-accent text-3xl flex justify-center mb-3">
                                {category.icon}
                            </div>
                            <h3 className="font-semibold text-base-content">
                                {category.name}
                            </h3>
                            <p className="text-base-content opacity-70 text-sm mt-1">
                                {category.count} items
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;