// Services.jsx
import React from 'react';
import { FaTruck, FaLeaf, FaConciergeBell } from 'react-icons/fa';

const Services = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Our Commitment to You</h2>
                <p className="text-xl text-gray-600 mb-12">
                    We're dedicated to making your dining experience exceptional.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-xl p-8">
                        <div className="flex justify-center mb-4">
                            <FaTruck className="text-5xl text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Fast & Free Delivery</h3>
                        <p className="text-gray-600">
                            Enjoy free and fast delivery on all orders over a minimum amount. Our delivery team ensures your food arrives hot and fresh.
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-8">
                        <div className="flex justify-center mb-4">
                            <FaLeaf className="text-5xl text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Locally Sourced Ingredients</h3>
                        <p className="text-gray-600">
                            We partner with local farms and suppliers to bring you the freshest, highest quality ingredients in every dish.
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-8">
                        <div className="flex justify-center mb-4">
                            <FaConciergeBell className="text-5xl text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">24/7 Customer Support</h3>
                        <p className="text-gray-600">
                            Our dedicated support team is available around the clock to help with any questions or issues you may have.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;