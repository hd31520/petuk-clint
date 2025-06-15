// src/pages/Register/Register.jsx

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/lottie/register.json';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // --- Password Validation ---
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

     
        createUser(email, password)
            .then(result => {
                console.log('User created:', result.user);
               
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success('Registration successful!');
                        navigate('/');
                    })
                    .catch(profileError => {
                        console.error('Profile update error:', profileError);
                        toast.error(profileError.message);
                    });
            })
            .catch(error => {
                console.error('Registration error:', error);
                toast.error(error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen py-12">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Register Now!</h1>
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name="name" type="text" className="input input-bordered" placeholder="Your Name" required />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" className="input input-bordered" placeholder="Email" required />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input name="photoURL" type="text" className="input input-bordered" placeholder="Photo URL" required />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" className="input input-bordered" placeholder="Password" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="link link-primary">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;