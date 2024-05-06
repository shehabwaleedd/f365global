'use client'
import { useEffect } from "react";
import { animatePageIn } from "../animation/animatePageOut"
import { usePathname } from "next/navigation";
import styles from "./page.module.scss";


export default function Template({ children } : { children: React.ReactNode }) {
    const pathname = usePathname();

    // trigger the animation on route change
    useEffect(() => {
        animatePageIn();
    }, [pathname]);


    return (
        <div>
            <div id="banner" className={styles.banner}>
                <div className={styles.banner__content}>
                </div>
            </div>
            {children}
        </div>
    );
}
