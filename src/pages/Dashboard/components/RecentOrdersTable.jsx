// src/pages/Dashboard/components/RecentOrdersTable.js
import React from 'react';

const RecentOrdersTable = ({ orders }) => {
    // Flatten all items from the orders and sort by creation date descending
    const allItems = orders.flatMap(order => order.items.map(item => ({ ...item, orderDate: order.createdAt })));
    const recentItems = allItems.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).slice(0, 5);

    if (recentItems.length === 0) {
        return <p className="text-center text-lg mt-8">No recent orders to display.</p>;
    }
    
    return (
        <div className="bg-base-100 shadow-lg rounded-lg p-6 my-8">
            <h3 className="text-2xl font-bold mb-6">Your Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Food Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Quantity</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Image</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentItems.map((item, index) => (
                            <tr key={index} className="border-b border-base-200 hover:bg-base-200">
                                <td className="py-4 px-4 font-bold">{item.foodName}</td>
                                <td className="py-4 px-4">{item.quantity}</td>
                                <td className="py-4 px-4">
                                    <img className="h-16 w-16 object-cover rounded-md" src={item.foodImage?.[0]} alt={item.foodName} />
                                </td>
                                <td className="py-4 px-4 font-semibold text-success">${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
