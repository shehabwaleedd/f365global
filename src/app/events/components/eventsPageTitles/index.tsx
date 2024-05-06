'use client'
import React from 'react'
import { getChars } from '../../../../animation/animatedHeaders/getChars';
import styles from "../../../../components/filterableEventList/style.module.scss";
const index = () => {
    return (
        <div>
            <div className={styles.services_upper_titles}>
                {getChars('Explore All Our')}
            </div>
            <div className={styles.services_upper_titles}>
                {getChars('Events That')}
            </div>
            <div className={styles.services_upper_titles_accent}>
                {getChars('Interests you')}
            </div>
        </div>
    )
}

export default index