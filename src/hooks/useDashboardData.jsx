// src/hooks/useDashboardData.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import your actual AuthContext
import useAxiosSecure from './useAxiosSecure'; // Import your actual custom hook

const useDashboardData = () => {
    // NOTE: These are mock implementations for demonstration.
    // Replace with your actual hooks from your project.
    const useAuth = () => ({ user: { email: 'john.doe@example.com' } });
    const useAxiosSecure = () => axios.create({ baseURL: 'https://petuk-server-five.vercel.app' });

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosSecure.get(`/checkout/${user.email}`);
                const fetchedOrders = response.data;
                setOrders(fetchedOrders);
                setTotalOrders(fetchedOrders.length);

                // Calculate total spent
                const spent = fetchedOrders.reduce((acc, order) => {
                    const orderTotal = order.items.reduce((itemAcc, item) => itemAcc + (item.price * item.quantity), 0);
                    return acc + orderTotal;
                }, 0);
                setTotalSpent(spent);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, axiosSecure]);

    return { orders, totalSpent, totalOrders, loading };
};

export default useDashboardData;
