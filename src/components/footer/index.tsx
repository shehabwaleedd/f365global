
'use client'

import React from 'react'
import styles from "./style.module.scss"
import { usePathname } from 'next/navigation';
import useWindowWidth from '@/hooks/useWindowWidth';


const Index = () => {

    const router = usePathname();
    const isAccountPage = router === '/account';
    const windowWidth = useWindowWidth();

    return (
        <footer className={styles.footer} style={{ display: isAccountPage ? 'none' : 'block' }}>

            <div className={styles.footer__footer}>
                <div className={styles.footer__footer_logoz}>
                    <h2>f365 Movement</h2>
                </div>
                <div className={styles.footer__upper}>
                    <div className={styles.footer__upper_lower}>
                        {windowWidth && windowWidth > 996 ? (
                            <ul>
                                <li>
                                    <a href="https://www.instagram.com/f365movement/" target='_blank' rel="noreferrer">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/f365movement" target='_blank' rel="noreferrer">
                                        Facebook
                                    </a>
                                </li>
                                <div>
                                    <p> F365 Global LLC |  <a href="tel:+971508028407"> +971 50 802 8407</a></p>
                                    <p> HD36B, In5 Tech - Dubai Internet City </p>
                                    <p><a href="mailto:hello@f365global.com"> hello@f365global.com</a></p>

                                </div>
                                <li>
                                    <a href="https://www.linkedin.com/f365movement" target='_blank' rel="noreferrer">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com/f365movement" target='_blank' rel="noreferrer">
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            <>
                                <div className={styles.footer__upper_lower_mobile}>
                                    <a href="https://www.instagram.com/f365movement/" target='_blank' rel="noreferrer">
                                        Instagram
                                    </a>
                                    <a href="https://www.facebook.com/f365movement" target='_blank' rel="noreferrer">
                                        Facebook
                                    </a>
                                    <a href="https://www.linkedin.com/f365movement" target='_blank' rel="noreferrer">
                                        LinkedIn
                                    </a>
                                    <a href="https://www.twitter.com/f365movement" target='_blank' rel="noreferrer">
                                        Twitter
                                    </a>
                                </div>
                                <ul>
                                    <li>
                                        <p> F365 Global LLC |  <a href="tel:+971508028407">+971 50 802 8407</a></p>
                                        <p> HD36B, In5 Tech - Dubai Internet City </p>
                                        <p><a href="mailto:hello@f365global.com">hello@f365global.com</a></p>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.footer__footer_lower}>
                    <ul>
                        <li>
                            2024 F365. All rights reserved
                        </li>
                        <li>
                            Co-produced with <a href="https://cairo-studio.com" style={{ borderBottom: "1px solid #57F287" }} target='_blank' rel="follow"> Cairo Studio.</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Index