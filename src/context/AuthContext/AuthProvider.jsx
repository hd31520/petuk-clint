import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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
                        setLoading(false);
                    }
                });
            }
            else{
                localStorage.removeItem('access-token');
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
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        signInWithGitHub
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
