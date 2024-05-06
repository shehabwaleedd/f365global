'use client'
import React from 'react'
import styles from "../../page.module.scss";
import { getChars } from "../../../../animation/animatedHeaders/getChars";


const index = () => {
    return (
        <section className={styles.services_upper}>
            <div className={styles.services_upper_titles}>
                {getChars('Wellness with')}
            </div>
            <div className={styles.services_upper_titles}>
                {getChars('Creative Digital')}
            </div>
            <div className={styles.services_upper_titles_accent}>
                {getChars('Touch')}
            </div>
            <p>At the intersection of digital mastery and community wellness, we harness the power of cutting-edge technology to foster connections, promote health, and create engaging experiences for wellness communities worldwide. Our commitment to digital excellence shines through in every project, ensuring your wellness brand stands out in the digital landscape.</p>
        </section>
    )
}

export default index