import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;