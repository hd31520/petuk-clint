import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

import bannerImage from '../../assets/banner.png';
import FoodCard from '../../shared/FoodCard';
import axiosInstance from '../../hooks/axiosInstance';


const Home = () => {
    const [topFoods, setTopFoods] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    axiosInstance.get('/top-food')
      .then(res => {
        const data = res.data;
        const sortedFoods = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sortedFoods.slice(0, 6));
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch top foods:", error);
        setLoading(false);
        toast.error("Could not load top foods.");
      });
  }, []);

    const handleSubscription = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email) {
            toast.success('Thank you for subscribing!');
            e.target.reset();
        } else {
            toast.error('Please enter a valid email.');
        }
    }

    return (
        <div>
            <section className="hero min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold leading-tight">Discover Deliciousness</h1>
                        <p className="mb-5">
                            From savory classics to exotic new flavors, find the perfect meal to satisfy your cravings. Freshly prepared, delivered fast.
                        </p>
                        <Link to="/allfood" className="btn btn-primary">
                            Explore All Foods
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Our Top Selling Foods</h2>
                        <p className="text-lg mt-2 text-gray-600">Loved by our customers, crafted with passion by our chefs.</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {topFoods.map(food => (
                                <FoodCard key={food._id} food={food} />
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

            <section className="py-12 lg:py-20 bg-neutral text-neutral-content">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
                        <div className="lg:w-1/2 lg:pr-10">
                             <h2 className="text-3xl font-bold">Don't Miss Out!</h2>
                             <p className="mt-2 text-lg">Subscribe to our newsletter to get the latest updates, exclusive offers, and a 10% discount on your next order.</p>
                        </div>
                        <div className="lg:w-1/2 mt-8 lg:mt-0">
                            <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-2 justify-center w-full max-w-md mx-auto">
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full text-base-content" 
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;