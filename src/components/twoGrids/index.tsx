'use client'
import React from 'react'
import styles from './style.module.scss'
import { GoArrowRight } from "react-icons/go";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useWindowWidth from '@/hooks/useWindowWidth';

interface TwoGridsType {
    h2: string;
    h3: string;
    h32: string;
    phrase1: string;
    phrase2: string;
}

const TwoGrids: React.FC<TwoGridsType> = ({ h2, h3, h32, phrase1, phrase2 }) => {
    const windowWidth = useWindowWidth();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <section className={styles.twoGrids}>
            <div className={styles.twoGrids_container}>
                <div className={styles.twoGrids_container__left}>
                    <GoArrowRight style={{ color: "var(--title-color)" }} />
                </div>
                <div className={styles.twoGrids_container__right}>
                    <div className={styles.twoGrids_container__right_upper_header}>
                        <h3>{h2}</h3>
                    </div>
                    <div className={styles.twoGrids_container__right_lower_header_right}>
                        <h4>{h32}</h4>
                        <div className={styles.twoGrids_container__right_lower_header_right_lower}>
                            <span>{phrase1}</span>
                            {windowWidth && windowWidth > 1255 && <span>{phrase2}</span>}
                        </div>
                        {!isHomePage && <Link href="/about">
                            More About Us
                        </Link>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TwoGrids