import React from 'react';

const SummaryCards = ({ totalOrders, totalSpent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Total Orders Card */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title text-2xl">Total Orders</h3>
                    <p className="text-4xl font-bold text-primary">{totalOrders}</p>
                </div>
            </div>
            {/* Total Spent Card */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title text-2xl">Total Spent</h3>
                    <p className="text-4xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;