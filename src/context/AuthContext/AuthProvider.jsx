import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axiosInstance from '../../hooks/axiosInstance';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
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
        return signInWithPopup(githubProvider)
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
            setLoading(false);
          if(currentUser){
            //   get token and store client
            const userInfo = {email: currentUser.email}
            axiosInstance.post('/jwt', userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                    setLoading(false);
                }

            })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false);
            }
        })
        return () =>{
            unSubscribe();
        }
    }, [])

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