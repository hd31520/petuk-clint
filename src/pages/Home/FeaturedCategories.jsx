import React from 'react';
import { FaFire } from 'react-icons/fa';

const SpecialOffers = () => {
    const offers = [
        {
            id: 1,
            title: "Family Feast",
            description: "Get 20% off on orders above $50",
            code: "FAMILY20"
        },
        {
            id: 2,
            title: "Weekend Special",
            description: "Free dessert with every order on weekends",
            code: "SWEETWEEKEND"
        },
        {
            id: 3,
            title: "First Order",
            description: "15% off on your first order",
            code: "NEW15"
        }
    ];

    return (
        <div className="my-16 px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                Special Offers <FaFire className="inline text-orange-500" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map(offer => (
                    <div 
                        key={offer.id} 
                        className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold text-orange-600 mb-2">{offer.title}</h3>
                        <p className="text-gray-600 mb-4">{offer.description}</p>
                        <div className="bg-orange-100 px-3 py-2 rounded inline-block">
                            <span className="font-mono text-orange-700">Use code: {offer.code}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialOffers;