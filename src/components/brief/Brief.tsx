'use client'
import React, { useRef } from 'react';
import styles from './style.module.scss'
import Image from 'next/image';
import CTA from '../../animation/CTA';
import { useScroll, motion, useTransform } from 'framer-motion';

const Brief = () => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['30% end', '80% end'],
    });

    const width = useTransform(scrollYProgress, [0, 1], ['50vw', '95vw']);

    return (
        <section className={styles.story} ref={container}>

            <div className={styles.story__content}>
                <div className={styles.story__content__left}>
                    <h2><span>/</span> Our Story</h2>
                    <p> Jounery of f365 </p>
                </div>
                <div className={styles.story__content__right}>
                    <p>
                        F365, founded in 2023 by Asma Sami and Nihal Sami, is a pioneering wellness community dedicated to supporting women&apos;s health, personal development, and career progression. Incubated by in5 Dubai, an initiative of the Dubai Government, F365 empowers women through innovative programs and resources, fostering a vibrant environment for growth and success in all aspects of life.
                    </p>
                    <CTA label="More About Our Story" href="/about" />
                </div>
            </div>
            <motion.div className={styles.story__imageWrapper} style={{ width: width }}>
                <Image
                    src="/mainImage1.webp"
                    alt="F365 Global"
                    width={1920}
                    height={1080}
                    quality={100}
                    priority
                    title="F365 Global"
                    objectFit="cover"
                    placeholder='blur'
                    blurDataURL="/mainImage1.webp"
                    className={styles.story__image}
                />
            </motion.div>
        </section>
    )
}

export default Brief