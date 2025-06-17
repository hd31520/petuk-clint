import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';
import FoodCarder from '../../shared/FoodCarder';

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/top-food')
            .then(res => {
                setFoods(res.data);
            })
            .catch(error => {
                console.error("Failed to fetch foods:", error);
                toast.error("Could not load the food items.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const results = foods.filter(food =>
            food && food.foodName && food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(results);
    }, [searchTerm, foods]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <section
                className="relative bg-cover bg-center py-20"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold">All Our Foods</h1>
                    <p className="mt-4 text-lg">Find your next favorite dish from our collection.</p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-10 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search for a food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 text-green-600 focus:ring-green-500"
                        disabled={loading}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-600">Loading foods...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredFoods.map((food) => (<FoodCarder key={food._id} food={food}></FoodCarder>
                                
                            ))}
                        </div>

                        {filteredFoods.length === 0 && !loading && (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-500">No food items found.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AllFoods;