import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import FoodCarder from '../../shared/FoodCarder';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllFoods = () => {
    const axiosPublic = useAxiosPublic();
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosPublic.get('/top-food')
            .then(res => setFoods(res.data))
            .catch(error => {
                console.error("Failed to fetch foods:", error);
                toast.error("Could not load the food items.");
            })
            .finally(() => setLoading(false));
    }, [axiosPublic]);

    useEffect(() => {
        const results = foods.filter(food =>
            food?.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(results);
    }, [searchTerm, foods]);

    return (
        // Use DaisyUI's bg-base-100 and text-base-content for theme adaptability
        <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center py-20"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop')"
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">All Our Foods</h1>
                    <p className="mt-4 text-lg">Find your next favorite dish from our collection.</p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Search Box */}
                <div className="mb-10 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search for a food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={loading}
                        // Use DaisyUI classes for theming
                        className="w-full max-w-lg px-4 py-2 border border-base-300
                                   rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                                   bg-base-200 text-base-content
                                   placeholder:text-gray-500
                                   transition-colors duration-300"
                    />
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-base-content">Loading foods...</p>
                    </div>
                ) : (
                    <>
                        {/* Food Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredFoods.map((food) => (
                                <FoodCarder key={food._id} food={food} />
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredFoods.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-xl text-base-content">No food items found.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AllFoods;
