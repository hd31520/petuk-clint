// src/hooks/useDashboardData.js
// This custom hook fetches and processes all the data needed for the dashboard.
import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useDashboardData = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axiosSecure.get(`/checkout/${user.email}`)
                .then(res => {
                    const fetchedOrders = res.data || [];
                    setOrders(fetchedOrders);

                    // Calculate summary metrics from the fetched data
                    const spent = fetchedOrders.reduce((sum, order) => {
                        const orderTotal = order.items.reduce((itemSum, item) => {
                            return itemSum + (Number(item.quantity) * Number(item.price));
                        }, 0);
                        return sum + orderTotal;
                    }, 0);

                    setTotalSpent(spent);
                    setTotalOrders(fetchedOrders.length);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching dashboard data:', err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    return { orders, totalSpent, totalOrders, loading };
};

export default useDashboardData;