'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserType } from '@/types/common';

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
    data: UserType[];
}




export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

    const router = useRouter();

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setIsLoggedIn(false);
            setError('No token found');
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/authentication`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.message === "success") {
                setIsLoggedIn(true);
                fetchUserDetails(token);
            } else {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setError('Authentication failed');
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setError(error.message || 'Unknown authentication error');
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const fetchUserDetails = async (token: string) => {
        try {
            const response = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.data[0]);
            setLoading(false);
        }
        catch (error: any) {
            console.error('Failed to fetch user details:', error);
            setError(error.message || 'Failed to fetch user details');
            setLoading(false);
        }

    };



    const handleLoginSuccess = (token: string, userData: UserType) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
        router.push('/account');
    };

    const handleLoginSuccessForm = (token: string, userData: UserType) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        localStorage.setItem('userId', userData._id);
        setUser(userData);
        setIsLoggedIn(true);
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasAnimationShown');
        localStorage.removeItem('wishlist');
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
        setIsLoginOpen(true);
    }


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
    }), [user, isLoggedIn, loading, error, setIsLoggedIn, isLoginOpen]);
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
