
'use client'
import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import styles from './style.module.scss'
import { logos } from '../logos';
const LogoMarquee = ({ direction } : { direction: "left" | "right"}) => {
    return (
        <section className={styles.logo_marquee}>
            
            <Marquee autoFill={true} speed={40} direction={direction}>
                {logos.map((item, index) => (
                    <div key={index} className={styles.logo_marquee_content}>
                        <Image src={item.img} alt="logo"
                            width={200}
                            height={200}
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    )
}

export default LogoMarquee