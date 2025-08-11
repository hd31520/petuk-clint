import React from 'react';

const RecentOrdersTable = ({ orders }) => {
    // We only want to show the most recent 3 orders
    const recentOrders = orders.slice(0, 3);

    return (
        <div className="bg-base-100 shadow-lg rounded-lg mb-12">
            <h3 className="text-2xl font-bold p-6 border-b border-base-200">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">#</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Food Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Quantity</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Amount</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, i) => (
                            order.items.map((item, j) => (
                                <tr key={`${order._id}-${j}`} className="border-b border-base-200 hover:bg-base-200">
                                    <td className="py-4 px-4 text-sm">{i + 1}</td>
                                    <td className="py-4 px-4 font-bold">{item.foodName}</td>
                                    <td className="py-4 px-4">{item.quantity}</td>
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
        </div>
    );
};

export default RecentOrdersTable;