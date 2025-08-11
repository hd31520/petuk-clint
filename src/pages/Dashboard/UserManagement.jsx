// src/pages/Dashboard/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserShield, FaUserTie, FaUser, FaBriefcase, FaConciergeBell } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Using SweetAlert for a nicer user experience

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    // Fetch all users from the backend
    useEffect(() => {
        setLoading(true);
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    // Handle updating a user's role
    const handleUpdateRole = (user, newRole) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to change ${user.name}'s role to ${newRole}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, change role!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: 'Success!',
                                text: `${user.name}'s role has been updated to ${newRole}.`,
                                icon: 'success'
                            });
                            // Update the user list in the state
                            const updatedUsers = users.map(u => 
                                u._id === user._id ? { ...u, role: newRole } : u
                            );
                            setUsers(updatedUsers);
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to update user role.', 'error');
                        console.error('Failed to update role:', error);
                    });
            }
        });
    };

    // Handle deleting a user
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${user.name}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                `${user.name} has been deleted.`,
                                'success'
                            );
                            // Update the user list in the state
                            const remainingUsers = users.filter(u => u._id !== user._id);
                            setUsers(remainingUsers);
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to delete user.', 'error');
                        console.error('Failed to delete user:', error);
                    });
            }
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner text-primary"></span>
        </div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">User Management</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
                <table className="table w-full">
                    <thead className="bg-primary text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td className="font-medium text-gray-700">{user.name}</td>
                                <td className="text-gray-500">{user.email}</td>
                                <td>
                                    <span className={`badge text-white font-bold p-3 rounded-full ${user.role === 'admin' ? 'bg-red-500' : user.role === 'manager' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        {/* Dropdown for role change */}
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-primary">Change Role</div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><button onClick={() => handleUpdateRole(user, 'admin')} className="text-lg">Admin</button></li>
                                                <li><button onClick={() => handleUpdateRole(user, 'manager')} className="text-lg">Manager</button></li>
                                                <li><button onClick={() => handleUpdateRole(user, 'employee')} className="text-lg">Employee</button></li>
                                                <li><button onClick={() => handleUpdateRole(user, 'care taker')} className="text-lg">Caretaker</button></li>
                                                <li><button onClick={() => handleUpdateRole(user, 'customer')} className="text-lg">Customer</button></li>
                                            </ul>
                                        </div>
                                        {/* Delete button */}
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-sm btn-error text-white">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;