'use client'
import React from 'react'
import styles from "../../page.module.scss"
import { getChars } from '../../../../animation/animatedHeaders/getChars'

const index = () => {
    return (
        <section className={styles.about_top}>
            <div className={styles.about_top_titles}>
                {getChars('A Creative')}
            </div>
            <div className={styles.about_top_titles_accent}>
                {getChars('Agency Uniting')}
            </div>
            <div className={styles.about_top_titles}>
                {getChars('Wellness With Tech')}
            </div>
            <div className={styles.about_top_lower}>
                <p>
                    Bridging the gap between health empowerment and digital creativity, F365 pioneers wellness through cutting-edge technology. We&apos;re not just developing solutions; we&apos;re designing a healthier, more connected world.
                </p>
            </div>
        </section>
    )
}

export default index