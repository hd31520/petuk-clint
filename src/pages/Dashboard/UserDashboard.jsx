// src/pages/Dashboard/UserDashboard.js
import React from 'react';
import useDashboardData from '../../hooks/useDashboardData';
import SummaryCards from './components/SummaryCards';
import RecentOrdersTable from './components/RecentOrdersTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// A new component to display the order history chart
const UserOrderChart = ({ orders }) => {
    // Process the orders data to get a count of orders per month
    const monthlyOrderCount = orders.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt);
        const month = orderDate.toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    // Convert the object to an array for recharts
    const chartData = Object.keys(monthlyOrderCount).map(month => ({
        month: month,
        orders: monthlyOrderCount[month]
    }));

    return (
        <div className="bg-base-100 shadow-lg rounded-lg p-6 my-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Orders by Month</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" name="Number of Orders" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


const UserDashboard = () => {
    const { orders, totalSpent, totalOrders, loading } = useDashboardData();
    let itemCounter = 0;

    if (loading) {
        return (
            <div className="text-center py-20 flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 text-base-content p-8 flex-1">
            <h2 className="text-4xl font-bold mb-12">Dashboard Summary</h2>
            {orders.length === 0 ? (
                <p className="text-center text-lg">You have no orders yet.</p>
            ) : (
                <>
                    <SummaryCards totalOrders={totalOrders} totalSpent={totalSpent} />
                    <RecentOrdersTable orders={orders} />
                    
                    {/* Add the new chart component here */}
                    <UserOrderChart orders={orders} />

                    {/* All Orders History Table */}
                    <h3 className="text-2xl font-bold text-center mb-6">All Orders History</h3>
                    <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg">
                        <table className="table w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">#</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Quantity</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Image</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Amount</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    order.items.map((item, j) => {
                                        itemCounter++;
                                        return (
                                            <tr key={`${order._id}-${j}`} className="border-b border-base-200 hover:bg-base-200">
                                                <td className="py-4 px-4 text-sm">{itemCounter}</td>
                                                <td className="py-4 px-4 font-bold">{item.foodName}</td>
                                                <td className="py-4 px-4">{item.quantity}</td>
                                                <td className="py-4 px-4">
                                                    <img
                                                        className="h-16 w-16 object-cover rounded-md"
                                                        src={item.foodImage?.[0]}
                                                        alt={item.foodName}
                                                    />
                                                </td>
                                                <td className="py-4 px-4 font-semibold text-success">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4 text-success font-semibold">
                                                    {order.status}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;
