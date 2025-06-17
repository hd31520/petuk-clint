import React from 'react';

const Subscribe = ({handleSubscription}) => {
    return (
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
    );
};

export default Subscribe;