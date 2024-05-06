import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { TransitionLink } from '../transitionLink';

const AccountHeaderNavbar = () => {
    const { user, handleLogout } = useAuth(); 
    const router = usePathname();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    useEffect(() => {
        setProfileOpen(false);
    }, [router]);

    const toggleProfileOpen = () => setProfileOpen(prev => !prev);
    const avatarUrl = user?.avatar ? user.avatar.url : "/user.png";

    return (
        <div className={styles.accountHeader}>
            <div className={styles.accountHeader__avatar} onClick={toggleProfileOpen}>
                <Image src={avatarUrl} alt="User's Avatar" width={40} height={40} />
            </div>
            <AnimatePresence>
                {profileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={styles.accountHeader__profile}>
                        <div className={styles.accountHeader__profile_upper}>
                            <h3>{user?.name}</h3>
                            <p>{user?.email}</p>
                        </div>
                        <div className={styles.accountHeader__profile_lower}>
                            <TransitionLink href="/account" label="Profile" />
                            <button onClick={handleLogout} style={{ color: "red" }}>
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccountHeaderNavbar;
