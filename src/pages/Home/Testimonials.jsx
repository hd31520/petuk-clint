import React from 'react';


const Testimonials = () => {
    const testimonials = [
        { name: "Sarah L.", quote: "Absolutely the best Italian food I've had outside of Italy. The pasta was divine!", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "John D.", quote: "The ambiance is perfect for a date night. Great service and even better food. The steak was cooked to perfection.", avatar: "https://i.pravatar.cc/150?img=3" },
        { name: "Emily C.", quote: "A hidden gem! Every dish we tried was a burst of flavor. We will definitely be back with friends.", avatar: "https://i.pravatar.cc/150?img=5" }
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-10">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={t.avatar} alt={t.name}/>
                                </div>
                            </div>
                            <p className="italic my-4">"{t.quote}"</p>
                            <h3 className="card-title">{t.name}</h3>
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Testimonials;