// src/pages/Dashboard/components/SummaryCards.js
import React from 'react';
import { FaDollarSign, FaListAlt } from 'react-icons/fa';

const SummaryCards = ({ totalOrders, totalSpent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card bg-primary text-primary-content shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-xl flex items-center gap-2"><FaListAlt /> Total Orders</h2>
                    <p className="text-4xl font-bold">{totalOrders}</p>
                    <p className="text-sm">Across all time</p>
                </div>
            </div>
            <div className="card bg-secondary text-secondary-content shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-xl flex items-center gap-2"><FaDollarSign /> Total Spent</h2>
                    <p className="text-4xl font-bold">${totalSpent.toFixed(2)}</p>
                    <p className="text-sm">Across all orders</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
