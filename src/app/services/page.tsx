import React from 'react';
import styles from "./page.module.scss"
import Image from 'next/image';
import ServicesUpper from "./components/servicesUpper"
import { services } from '../../components/servicesData';
import CTA from '@/animation/CTA';

export function generateMetadata() {
    return {
        title: 'F365 Services',
        description: 'We are a creative agency in Dubai with a focus on wellness and community. We are not just developing solutions; we are designing a healthier, more connected world.',
        url: 'https://f365-global.com/services',
        type: 'website',
        siteName: 'F365',
        keywords: [
            "F365",
            "F365 Global",
            "F365 Dubai",
            "F365 Community",
            "F365 Wellness",
            "Web Development",
            "Web Design Dubai",
            "Web Studio In Dubai",
            "SEO",
            "Digital Marketing",
            "Graphic Design Dubai",
            "Social Media Marketing",
            "Content Creation",
            "Content Marketing",
            "Wellness",
        ],
        openGraph: {
            title: 'Services',
            description: 'We are a creative agency in Dubai with a focus on wellness and community. We are not just developing solutions; we are designing a healthier, more connected world.',
            images: '/assets/backgrounds/1.webp',
            url: 'https://f365-global.com/services',
            type: 'website',
        },
        robots: "index, follow",
        language: "en",
        favicon: {
            ico: "/favicon.ico",
            webp: "/favicon.webp",
            png: "/favicon.png",
        },
        manifest: "/manifest.json",
    }
}

const Services = () => {

    return (
        <main className={styles.services}>
            <ServicesUpper />
            <section className={styles.services__container}>
                {services.map((service, index) => {
                    return (
                        <div key={index} className={styles.services__container__content}>
                            <div className={styles.services__container__content_left}>
                                <div className={styles.services__container__content_left_upper}>
                                    <h2>
                                        {service.title}
                                    </h2>
                                    <p>
                                        {service.serviceDescription[0]}
                                    </p>
                                </div>
                                <div className={styles.services__container__content_left_middle}>
                                    <CTA label="Explore More" href={service.link} backgroundColor='#5bd891'/>
                                </div>
                            </div>
                            <div className={styles.services__container__content_right}>
                                <Image
                                    src={service.img}
                                    alt="service"
                                    width={1100}
                                    height={1100}
                                />
                                <ul>
                                    {service.services.map((service, index) => (
                                        <li key={index}>
                                            {service.slice(0, 8)}..
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </section>
        </main>
    )
}

export default Services