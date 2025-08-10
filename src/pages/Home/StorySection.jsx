import React from 'react';
import { FaLeaf, FaHeart, FaAward, FaUtensils } from 'react-icons/fa';

const StorySection = () => {
    const stories = [
        {
            id: 1,
            icon: <FaLeaf />,
            title: "Our Beginning",
            description: "Founded in 2010 with a passion for authentic flavors",
            year: "2010"
        },
        {
            id: 2,
            icon: <FaHeart />,
            title: "First Expansion",
            description: "Opened our second location due to popular demand",
            year: "2014"
        },
        {
            id: 3,
            icon: <FaAward />,
            title: "Award Winning",
            description: "Received 'Best Local Restaurant' three years running",
            year: "2018"
        },
        {
            id: 4,
            icon: <FaUtensils />,
            title: "Today",
            description: "Serving thousands of happy customers monthly",
            year: "Present"
        }
    ];

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-base-100">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                        Our Journey
                    </h2>
                    <p className="text-lg text-base-content opacity-70 max-w-2xl mx-auto">
                        From humble beginnings to becoming your favorite dining spot
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline bar */}
                    <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-base-content opacity-20 transform -translate-x-1/2"></div>

                    <div className="space-y-12 md:space-y-0">
                        {stories.map((story, index) => (
                            <div 
                                key={story.id} 
                                className={`relative flex justify-center flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 text-primary mb-4 text-2xl">
                                        {story.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-base-content mb-2">
                                        {story.title}
                                    </h3>
                                    <p className="text-base-content opacity-70 mb-3">
                                        {story.description}
                                    </p>
                                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-content rounded-full text-sm font-medium">
                                        {story.year}
                                    </span>
                                </div>

                                {/* Timeline dot */}
                                <div className="hidden md:block absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 border-[3px] border-base-100"></div>

                                <div className="md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;