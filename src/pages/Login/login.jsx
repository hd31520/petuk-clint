// src/pages/Login/Login.jsx

import Lottie from 'lottie-react';
import lotielogin from '../../assets/lottie/login.json';
import { useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { signInUser, signInWithGoogle, signInWithGitHub, } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
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

        signInUser(email, password)
            .then(result => {
                console.log('User signed in:', result.user);
                toast.success('Successfully logged in!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error('Sign-in error:', error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log('Google sign-in success:', result.user);
                toast.success('Successfully logged in with Google!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error('Google sign-in error:', error);
                toast.error(error.message);
            });
    };

    const handleGitHubSignIn = () => {
        signInWithGitHub()
            .then(result => {
                console.log('GitHub sign-in success:', result.user);
                toast.success('Successfully logged in with GitHub!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error('GitHub sign-in error:', error);
                toast.error(error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen py-12">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <Lottie animationData={lotielogin} loop={true} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" className="input input-bordered" placeholder="Email" required />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" className="input input-bordered" placeholder="Password" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" >
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className="divider">OR</div>

                        <div className="form-control">
                            <button onClick={handleGoogleSignIn}className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="m153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                        <div className="form-control mt-4">
                            <button onClick={handleGitHubSignIn}className="btn bg-black text-white border-black">
                                <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                                Login with GitHub
                            </button>
                        </div>

                        <p className="mt-4 text-center">
                            Don't have an account?{' '}
                            <Link to="/register" className="link link-primary">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;