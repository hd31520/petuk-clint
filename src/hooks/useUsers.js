// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import Swal from 'sweetalert2';

const useUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get('/users');
            setUsers(res.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err);
            setLoading(false);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Failed to fetch user data. You might not have the required permissions.',
            // });
        }
    };

    useEffect(() => {
        if (user) {
            fetchUsers();
        }
    }, [user, axiosSecure]);

    const refetch = () => fetchUsers();

    return { users, loading, error, refetch };
};

export default useUsers;