'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { UserType } from '@/types/common';
import axios from 'axios';
interface AuthContextType {
    user: UserType | null;
    error: string;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    userId: string | null;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    handleLoginSuccess: (token: string, userData: UserType) => void;
    handleLogout: () => void;
    isLoginOpen: boolean;
    setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoginOpenClick: () => void;
    handleLoginSuccessForm: (token: string, userData: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
interface AuthProviderProps {
    children: ReactNode;
}

interface UserResponse {
    data: UserType;
}




export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const token = Cookies.get("token")
    const router = useRouter();

    const fetchUser = async () => { 
        setLoading(true);
        try {
            const response = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                headers: {
                    token
                }
            });
            setUser(response.data.data);
        } catch (error) {
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    }


    const authCheck = () => {
        if (token) {
            setIsLoggedIn(true);
            fetchUser();
        } else {
            setIsLoggedIn(false);

        }
    }

    useEffect(() => {
        authCheck();
    }, [token]);

    const handleLoginSuccess = (token: string, userData: UserType) => {
        Cookies.set('token', token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000)});   
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
        console.log('User Data:', userData);

        router.push('/account');
    };

    const handleLoginSuccessForm = (token: string, userData: UserType) => {
        Cookies.set('token', token, { expires: new Date(new Date().getTime() + 30 * 60 * 1000)});   
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        console.log('User Data:', userData);
        setIsLoggedIn(true);
    };

    const clearLocalStorage = () => {
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasAnimationShown');
    };

    const handleLogout = () => {

        const resetAuthStates = () => {
            setUser(null);
            setIsLoggedIn(false);
        };
        clearLocalStorage();
        resetAuthStates();
        router.push('/login');
    };

    const handleLoginOpenClick = () => {
        setIsLoginOpen(prevState => !prevState); 
        console.log('Login Status:', isLoginOpen); 
    }

    useEffect(() => {
        console.log('Login Open Updated:', isLoginOpen);
    }, [isLoginOpen]);


    const authValue: AuthContextType = useMemo(() => ({
        user,
        setUser,
        userId,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        handleLoginSuccess,
        handleLogout,
        error,
        isLoginOpen,
        setIsLoginOpen,
        handleLoginOpenClick,
        handleLoginSuccessForm
    }), [user, isLoggedIn]);
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
