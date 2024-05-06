'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './nav/index';
import { FiMenu } from "react-icons/fi";
import styles from './style.module.scss'
import ScrollAnimation from '../../animation/progressScrollBar/ScrollAnimation';
import AccountHeaderNavbar from '../accountHeaderNavbar';
import { useAuth } from '../../context/AuthContext';
import { usePathname } from 'next/navigation';
import { TransitionLink, TransitionLogo, TransitionH4 } from '../transitionLink';
import LoginForm from '../loginForm/loginForm';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const { isLoggedIn, isLoginOpen, setIsLoginOpen, handleLoginOpenClick } = useAuth();
    const router = usePathname();
    const toggleNavOpen = useCallback(() => {
        setNavOpen(prevNavOpen => !prevNavOpen);
    }, []);

    useEffect(() => {
        setNavOpen(false);
    }, [router])

    return (
        <>
            <motion.nav className={styles.navbar}>
                <div className={styles.navbar__logo}>
                    <TransitionLogo href="/" label="F365" />
                </div>
                <div className={styles.navbar__links}>
                    <div>
                        <ul>
                            <li>
                                <TransitionLink href="/events" label="events" />
                            </li>
                            <li>
                                <TransitionLink href="/services" label="services" />
                            </li>
                            <li>
                                <TransitionLink href="/about" label="about" />
                            </li>
                            <li>
                                <TransitionLink href="/contact" label="contact" />
                            </li>
                            {!isLoggedIn ? (
                                <li>
                                    <div className={styles.navbar__links_user_btn}>
                                        <h4 onClick={handleLoginOpenClick} style={{ cursor: 'pointer' }}> Become A Member</h4>
                                    </div>
                                </li>
                            ) : (
                                <>
                                    <li><TransitionH4 href="/account/events/createEvent" label="Create Event" /></li>
                                    <AccountHeaderNavbar />
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div className={styles.menu}>
                    {isLoggedIn ? (
                        <ul>
                            <li>
                                <TransitionLink href="/account" label="Account" />
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <button onClick={handleLoginOpenClick} style={{ cursor: 'pointer' }}>member?</button>
                            </li>
                        </ul>
                    )}
                    <button onClick={toggleNavOpen} aria-label="Toggle Menu"><FiMenu style={{ fontSize: "2rem", position: "relative", right: "0.5rem", color: "var(--title-color)" }} /></button>
                </div>
                <AnimatePresence mode='wait'>
                    {navOpen && <Nav setNavOpen={setNavOpen}/>}
                </AnimatePresence>
                <ScrollAnimation />
            </motion.nav>
            <AnimatePresence mode="wait">
                {isLoginOpen && <LoginForm setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />}
            </AnimatePresence>
        </>
    )
}

export default Navbar