'use client'
import React from 'react'
import styles from "../../page.module.scss";
import { getChars } from "../../../../animation/animatedHeaders/getChars"

const index = () => {
    return (
        <section className={styles.contact_upper}>
            <div className={styles.contact_upper_titles}>
                {getChars('Lets')}
            </div>
            <div className={styles.contact_upper_titles}>
                {getChars('Transform')}
            </div>
            <div className={styles.contact_upper_titles_accent}>
                {getChars('Your Brand')}
            </div>
            <div className={styles.contact_upper_lower}>
                <p>
                    Looking to transform your brand? <br />
                </p>
                <span>
                    At F365, we&apos;re committed to crafting standout digital experiences through web development, graphic design, and digital marketing. We focus on the details and user experience to elevate your brand.<br />
                </span>
            </div>
        </section>
    )
}

export default index