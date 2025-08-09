import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import bannerImage from '../../assets/banner.png';
import Banner from './Banner';
import TopFood from './TopFood';
import Choose from './Choose';
import Subscribe from './Subscribe';
import Testimonials from './Testimonials';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const [topFoods, setTopFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get('/top-food')
            .then(res => {
                const data = res.data;
                console.log(data)
                const sortedFoods = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
                setTopFoods(sortedFoods.slice(0, 8));
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch top foods:", error);
                setLoading(false);
                toast.error("Could not load top foods.");
            });
    }, [axiosPublic]);

    const handleSubscription = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (email) {
            toast.success('Thank you for subscribing!');
            e.target.reset();
        } else {
            toast.error('Please enter a valid email.');
        }
    }

    return (
        <div>
            <Banner bannerImage={bannerImage}></Banner>

            <TopFood loading={loading} topFoods={topFoods} ></TopFood>

            <Choose></Choose>
            <Testimonials></Testimonials>
            <Subscribe handleSubscription={handleSubscription}></Subscribe>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

        </div>
    );
};

export default Home;