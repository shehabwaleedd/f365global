'use client'
import React from 'react';
import { translate } from '../../components/navbar/anim';
import { motion } from "framer-motion"
import styles from "./style.module.scss"

export const AnimatedH1 = (word) => {
    return word.split("").map((char, i) => (
        <div className={styles.getChars} key={char + i}>
            <motion.h1
                custom={[i * 0.02, (word.length - i) * 0.01]}
                variants={translate}
                initial="initial"
                animate="enter"
                exit="exit">
                {char === " " ? "\u00A0" : char}
            </motion.h1>
        </div>
    ));
};
