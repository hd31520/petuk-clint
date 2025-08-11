
// src/pages/Dashboard/UserManagement.jsx
import React from 'react';
import useUsers from '../../hooks/useUsers';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserShield, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
    const { users, loading, refetch } = useUsers();
    const axiosSecure = useAxiosSecure();

    const handleMakeAdmin = async (id, name) => {
        Swal.fire({
            title: `Are you sure you want to make ${name} an admin?`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make admin!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/role/${id}`, { role: 'admin' });
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Updated!',
                            `${name} is now an admin.`,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Error making user admin:', error);
                    Swal.fire('Error!', 'Failed to update user role.', 'error');
                }
            }
        });
    };

    const handleDeleteUser = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            `${name} has been deleted.`,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire('Error!', 'Failed to delete user.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center py-20 flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="bg-base-100 text-base-content p-8 flex-1">
            <h2 className="text-4xl font-bold mb-8">User Management</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">#</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Email</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Role</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b border-base-200 hover:bg-base-200">
                                <td className="py-4 px-4 text-sm">{index + 1}</td>
                                <td className="py-4 px-4 font-bold">{user.name}</td>
                                <td className="py-4 px-4">{user.email}</td>
                                <td className="py-4 px-4 font-semibold text-primary">{user.role}</td>
                                <td className="py-4 px-4">
                                    {user.role !== 'admin' && (
                                        <button onClick={() => handleMakeAdmin(user._id, user.name)} className="btn btn-sm btn-ghost text-lg text-secondary tooltip" data-tip="Make Admin">
                                            <FaUserShield />
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteUser(user._id, user.name)} className="btn btn-sm btn-ghost text-lg text-error tooltip" data-tip="Delete User">
                                        <FaTrash />
                                    </button>
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