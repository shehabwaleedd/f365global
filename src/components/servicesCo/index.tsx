'use client'
import React, { useRef } from 'react';
import styles from "./style.module.scss";
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import useWindowWidth from '../../hooks/useWindowWidth';
import CTA from '../../animation/CTA';
import { services } from '../servicesData';
import AnimatedText from '../../animation/animatedText/AnimatedText';


interface Service {
    img: string,
    title: string,
    year?: string,
    homePageDesc: string,
    services: string[],
    serviceTitle: string
}

interface ServiceItemProps {
    service: Service,
    index: number
}


const ServiceItem = ({ service, index } : { service: Service, index: number}) => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth !== null && windowWidth < 768;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ['10vh', '-5vh']);
    const xLeft = useTransform(scrollYProgress, [0, 1], ['10vw', '-5vw']);
    const xRight = useTransform(scrollYProgress, [0, 1], ['-10vw', '5vw']);

    return (
        <motion.div className={`${styles.ourProjects__bottom_container} ${index % 2 !== 0 ? styles.reverse : ''}`} key={index} ref={ref}>
            <motion.div className={styles.ourProjects__bottom_container_image} style={{ 
                x: !isMobile ? index % 2 !== 0 ? xLeft : xRight : 0,
                alignContent: isMobile ? "center" : index % 2 !== 0 ? "left" : "right" }}>
                <Image src={service.img} width={800} height={800} alt={service.title} placeholder='blur' blurDataURL={service.img} />
            </motion.div>
            <motion.div className={styles.ourProjects__bottom_container_btns} style={{ y: !isMobile ? y : 0, alignItems: "flex-start" }}>
                <span>{service.year}</span>
                <AnimatedText data={{ title: service.title, speed: 0.8}}/>
                <div className={styles.ourProjects__bottom_container_btns_lower} style={{ alignItems: "flex-start" }}>
                    <p style={{ textAlign: "left" }}>{service.homePageDesc}</p>
                    <ul style={{ justifyContent: "flex-start" }}>
                        {service.services.slice(0, 4).map((service, index) => (
                            <li key={index}>
                                <div>{service}</div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.group}>
                        <CTA href={`/services/${service.serviceTitle}`} label="Read More" />
                        <CTA href="/contact" label="Contact Us" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}


const ServicesHomePage = () => {

    return (
        <section className={styles.ourProjects} >
            <div className={styles.ourProjects__upper}>
                <AnimatedText data={{ title: 'Our Services', speed: 0.8 }} />
            </div>
            <div className={styles.ourProjects__bottom}>
                {services.map((service, index) => (
                    <ServiceItem service={service} index={index} key={index} />
                ))}
            </div>
        </section>
    );
}

export default ServicesHomePage;
