'use client'
import React, { useRef } from 'react'
import styles from './style.module.scss'
import Card from '../Card'
import { motion, useTransform, useScroll } from 'framer-motion';
import useWindowWidth from '../../hooks/useWindowWidth';

const TwoColumns = ({ data } : { data: any[]} ) => {
    const windowWidth = useWindowWidth();
    const isLargeScreen = windowWidth !== null && windowWidth > 1268;
    const halfIndex = Math.ceil(data.length / 2);
    const leftColumnData = data.slice(0, halfIndex);
    const rightColumnData = data.slice(halfIndex);
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const leftColumnTranslateY = useTransformAnimation(leftColumnRef, isLargeScreen, ["0%", "15%"]);
    const rightColumnTranslateY = useTransformAnimation(rightColumnRef, isLargeScreen, ["0%", "-5%"]);

    return (
        <section className={styles.team}>
            <div className={styles.team__container__right__content}>
                <Column translateY={isLargeScreen ? leftColumnTranslateY : 0} ref={isLargeScreen ? leftColumnRef : null} >
                    {leftColumnData.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </Column>
                <Column translateY={isLargeScreen ? rightColumnTranslateY : 0} ref={isLargeScreen ? rightColumnRef : null}>
                    {rightColumnData.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </Column>
            </div>
        </section>
    );
}

type ColumnProps = {
    translateY: any;
    children: React.ReactNode;
    ref: React.RefObject<HTMLDivElement>;
};

const Column = React.forwardRef(({ translateY, children, ref }: ColumnProps) => (
    <motion.div ref={ref} style={{ translateY }} className={styles.team__container__right__content__column}>
        {children}
    </motion.div>
));

Column.displayName = 'Column';

function useTransformAnimation(ref: React.RefObject<HTMLDivElement>, isLargeScreen: boolean, outputRange: string[]) {
    const { scrollYProgress } = useScroll({
        target: isLargeScreen ? ref : undefined,
        offset: ["start end", "end start"],
    });
    return useTransform(scrollYProgress, [0, 1], outputRange);
}
export default TwoColumns
