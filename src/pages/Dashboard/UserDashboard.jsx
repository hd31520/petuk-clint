import React from 'react';

import useDashboardData from '../../hooks/useDashboardData';
import RecentOrdersTable from './components/RecentOrdersTable';
import SummaryCards from './components/SummaryCards';

const UserDashboard = () => {
    const { orders, totalSpent, totalOrders, loading } = useDashboardData();

    if (loading) {
        return <div className="text-center py-20 flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
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
                                {orders.map((order, i) => (
                                    order.items.map((item, j) => (
                                        <tr key={`${order._id}-${j}`} className="border-b border-base-200 hover:bg-base-200">
                                            <td className="py-4 px-4 text-sm">{i + 1}</td>
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
                                    ))
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