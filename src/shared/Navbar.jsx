import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';
import icon from '../assets/petuk.png'
import { AuthContext } from '../context/AuthContext/AuthContext';
import useCart from '../hooks/useCart';


const Navbar = () => {
    const [cart ] = useCart()
    const [theme, setTheme] = useState('light');
    const { user, signOutUser } = use(AuthContext);
 const data = cart?.items || [];
    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'light';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };


    const logOutUser = () => {
        signOutUser()
            .then(() => {
                console.log('User signed out successfully');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };


    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allfood">All Foods</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>

            {
                user ?
                    <>
                        <li><NavLink to="/cart">Cart <sup className='font-bold'>{data?.length}</sup> </NavLink></li>
                         
                    </>
                    : <li><NavLink to="/login">Login</NavLink></li>
            }

        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link className='h-16 w-16'><img src={icon} alt="" /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <button onClick={toggleTheme} className="btn btn-outline">
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={user?.photoURL}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100?text=U'; }}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm flex flex-col gap-2 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                           
                            <li><Link to='/myorder'>My Order</Link></li>
                            <li><Link to='/myfoods'>My Foods</Link></li>
                            <li><NavLink to='/food/add' className="justify-between">AddFood</NavLink></li>
                            <li className='flex justify-center items-center'><a onClick={logOutUser} >Logout</a></li>
                        </ul>
                    </div> : ""
                }
            </div>
        </div>
    );
};

export default Navbar;
