import React from 'react';
import { Link } from 'react-router';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiUsersThreeLight } from 'react-icons/pi';
import { MdWork } from 'react-icons/md';
import { BiFoodMenu, BiTask } from 'react-icons/bi';
import { FaUsers, FaUserCog } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';


const DynamicSidebar = () => {
    const { userRole, isUserRoleLoading } = useAuth();

    if (isUserRoleLoading) {
        return <div className="bg-base-200 w-64 min-h-screen p-4 shadow-lg flex items-center justify-center">
            <span className="loading loading-spinner text-primary"></span>
        </div>;
    }

    // Customer links are the default
    let sidebarLinks = [
        <li key="customer-dashboard">
            <Link to="/dashboard" className="text-lg">
                <LuLayoutDashboard className="h-5 w-5" />
                Dashboard Summary
            </Link>
        </li>,
        <li key="my-orders">
            <Link to="/myorder" className="text-lg">
                <BiFoodMenu className="h-5 w-5" />
                My Orders
            </Link>
        </li>,
        <li key="my-foods">
            <Link to="/myfoods" className="text-lg">
                <BiFoodMenu className="h-5 w-5" />
                My Foods
            </Link>
        </li>,
    ];

    if (userRole === 'admin') {
        sidebarLinks = [
            <li key="admin-dashboard">
                <Link to="/dashboard" className="text-lg">
                    <LuLayoutDashboard className="h-5 w-5" />
                    Dashboard Summary
                </Link>
            </li>,
            <li key="user-management">
                <Link to="/dashboard/user-management" className="text-lg">
                    <PiUsersThreeLight className="h-5 w-5" />
                    User Management
                </Link>
            </li>,
            <li key="worker-page">
                <Link to="/dashboard/worker-page" className="text-lg">
                    <MdWork className="h-5 w-5" />
                    Worker Page
                </Link>
            </li>,
        ];
    } else if (userRole === 'manager') {
        sidebarLinks = [
            <li key="manager-dashboard">
                <Link to="/dashboard" className="text-lg">
                    <LuLayoutDashboard className="h-5 w-5" />
                    Dashboard Summary
                </Link>
            </li>,
            <li key="worker-page">
                <Link to="/dashboard/worker-page" className="text-lg">
                    <MdWork className="h-5 w-5" />
                    Worker Page
                </Link>
            </li>,
        ];
    } else if (userRole === 'employee' || userRole === 'care taker') {
        sidebarLinks = [
            <li key="employee-dashboard">
                <Link to="/dashboard" className="text-lg">
                    <LuLayoutDashboard className="h-5 w-5" />
                    Dashboard Summary
                </Link>
            </li>,
            <li key="my-orders">
                <Link to="/myorder" className="text-lg">
                    <BiFoodMenu className="h-5 w-5" />
                    My Orders
                </Link>
            </li>,
        ];
    }

    return (
        <div className="bg-base-200 w-64 min-h-screen p-4 shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
            <ul className="menu gap-2 text-base-content">
                {sidebarLinks}
            </ul>
        </div>
    );
};

export default DynamicSidebar;