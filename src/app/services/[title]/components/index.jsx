'use client'
import React from 'react'
import styles from "../page.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { services } from '../../../../components/servicesData'
import WorkedWith from '../../../../components/workedWith/WorkedWith';
import { usePathname } from 'next/navigation';
import CTA from "../../../../animation/CTA"


const ServicesTitle = () => {
    const serviceTitle = usePathname().split('/services/')[1];
    const foundService = services.find(service => service.serviceTitle === serviceTitle);

    if (!foundService) {
        return (
            <div className="notFound">
                <h1>Not Found</h1>
                <Link href="/services">Back To Services</Link>
            </div>
        )
    }

    return (
        <main className={styles.servicesSections}>
            <h1>{foundService.title}</h1>
            <section className={styles.services__container_upper}>
                <p>{foundService.underTitle[0]} <br /> {foundService.underTitle[1]}</p>
                <div className={styles.servicesSpans}>
                    <h2>{foundService.upperDescription}</h2>
                    {foundService.serviceDescription.map((service, index) => {
                        return (
                            <p key={index}>{service}</p>
                        )
                    })}
                </div>
            </section>
            <div className={styles.servicesMedia}>
                {foundService.img && <Image src={foundService.img} alt={foundService.serviceTitle} title={foundService.serviceTitle} height={1000} width={1000} />}
            </div>
            <div className={styles.services__bottom}>
                <div className={styles.services__bottom_container}>
                    <div className={styles.seboco__left}>
                        <div className={styles.services__bottom_container_left}>
                            <h2>Services </h2>
                            <p>{foundService.services_page[0].description}</p>
                        </div>
                        <CTA label="Get Quote" href="/contact" />
                    </div>
                    <div className={styles.seboco__right}>
                        <div className={styles.services__bottom_container_right}>
                            {foundService.services_page[0]?.content.map(({ title, options }, index) => (
                                <div key={index} className={styles.services__bottom_container_right_section}>
                                    <div className={styles.upper}>
                                        <h2>{title}</h2>
                                    </div>
                                    <div className={styles.lower}>
                                        {options.map((option, index) => (
                                            <p key={index}>{option}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.services__bottom}>
                <div className={styles.services__bottom_container}>
                    <div className={styles.seboco__left}>
                        <div className={styles.services__bottom_container_left}>
                            <h2>Process </h2>
                            <p>{foundService.process[0].description}</p>
                        </div>
                    </div>
                    <div className={styles.seboco__right}>
                        <WorkedWith Data={foundService.process[0].content} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ServicesTitle