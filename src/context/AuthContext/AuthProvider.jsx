// src/providers/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // This hook is now called correctly.
import { useNavigate } from 'react-router'; // useNavigate is called here, within the router context.
import axios from 'axios'; // Add this import

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
    // useAxiosSecure is no longer called here to prevent circular dependency

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }
    const signInWithGitHub = () => {
        setLoading(true);
        return signInWithPopup(auth,githubProvider)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect( () =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            
            if(currentUser){
                // Save the user to the database if they don't exist
                const userInfo = {
                    email: currentUser.email,
                    name: currentUser.displayName,
                };
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log('User saved to database:', res.data);
                });

                // Get token and store client
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        
                        // Use a dedicated axios instance to fetch user role
                        const token = localStorage.getItem('access-token');
                        const secureAxios = axios.create({
                            baseURL: 'http://localhost:5000',
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
                        
                        secureAxios.get('/users/role')
                        .then(roleRes => {
                            setUserRole(roleRes.data.role);
                            setIsUserRoleLoading(false);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Failed to fetch user role:', error);
                            setIsUserRoleLoading(false);
                            setLoading(false);
                        });
                    }
                });
            }
            else{
                localStorage.removeItem('access-token');
                setUserRole(null);
                setIsUserRoleLoading(false);
                setLoading(false);
            }
        });
        return () =>{
            unSubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
        updateUserProfile,
        loading,
        user,
        userRole,
        isUserRoleLoading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        signInWithGitHub
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;