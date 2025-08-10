import React from 'react';
import { FaSearch, FaUtensils, FaMotorcycle, FaSmile } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Browse Menu",
            description: "Explore our delicious food options",
            icon: <FaSearch className="text-3xl mb-4 text-orange-500" />
        },
        {
            id: 2,
            title: "Place Order",
            description: "Add items to your cart and checkout",
            icon: <FaUtensils className="text-3xl mb-4 text-orange-500" />
        },
        {
            id: 3,
            title: "Fast Delivery",
            description: "Get your food delivered quickly",
            icon: <FaMotorcycle className="text-3xl mb-4 text-orange-500" />
        },
        {
            id: 4,
            title: "Enjoy Food",
            description: "Savor every bite of your meal",
            icon: <FaSmile className="text-3xl mb-4 text-orange-500" />
        }
    ];

    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Getting your favorite food has never been easier. Just follow these simple steps!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="text-center">
                        <div className="relative">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                {step.icon}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-200"></div>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;