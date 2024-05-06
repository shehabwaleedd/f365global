import React from 'react'
import styles from './style.module.scss'
import Marquee from 'react-fast-marquee';

const Announcment = () => {
    return (
        <Marquee className={styles.marquee} gradient={false} speed={50} pauseOnHover={true}>
            <div className={styles.marquee_content}>
                <h3> Exclusive Content and Deals for F365 Members </h3>
            </div>
        </Marquee>
    )
}

export default Announcment
