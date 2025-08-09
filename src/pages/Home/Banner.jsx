import React from 'react';
import { Link } from 'react-router';

const Banner = ({bannerImage}) => {
    return (
        
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
        
    );
};

export default Banner;