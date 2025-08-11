import React from 'react';
import { Link } from 'react-router';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiUsersThreeLight } from 'react-icons/pi';
import { MdWork } from 'react-icons/md'; // Replaced TfiAgenda with MdWork

const Sidebar = () => {
    return (
        <div className="bg-base-200 w-64 min-h-screen p-4 shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
            <ul className="menu gap-2 text-base-content">
                <li>
                    <Link to="/dashboard" className="text-lg">
                        <LuLayoutDashboard className="h-5 w-5" />
                        Summary
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/user-management" className="text-lg">
                        <PiUsersThreeLight className="h-5 w-5" />
                        User Management
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/worker-page" className="text-lg">
                        <MdWork className="h-5 w-5" />
                        Worker Page
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;