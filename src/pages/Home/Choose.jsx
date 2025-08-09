import React from 'react';

const Choose = () => {
    return (
         <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Why Choose Us?</h2>
                        <p className="text-lg mt-2 text-gray-600">We deliver an unforgettable culinary experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-6xl text-primary mb-4">🌿</div>
                            <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
                            <p>We source the finest local ingredients to ensure every dish is fresh, flavorful, and of the highest quality.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-6xl text-primary mb-4">🚚</div>
                            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                            <p>Our efficient delivery network ensures your food arrives hot and ready to enjoy, right at your doorstep.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-6xl text-primary mb-4">👩‍🍳</div>
                            <h3 className="text-xl font-bold mb-2">Expert Chefs</h3>
                            <p>Our passionate chefs bring years of experience and creativity to craft unique and delicious meals every day.</p>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Choose;