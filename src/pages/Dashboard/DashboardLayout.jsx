import React from 'react';
import DynamicSidebar from './components/DynamicSidebar';

import { Outlet } from 'react-router'; 

const DashboardLayout = () => {
    return (
        <div className="flex bg-base-100 min-h-screen">
            <DynamicSidebar />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;