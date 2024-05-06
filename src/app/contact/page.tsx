import React from 'react'
import styles from "./page.module.scss"
import Link from 'next/link'
import ServicesHomePage from '../../components/servicesCo'
import ContactUpper from "./components/contactUpper"


export function generateMetadata() {
    return {
        title: 'F365 Movement - Contact',
        description: 'We are a creative agency in Dubai with a focus on wellness and community. We are not just developing solutions; we are designing a healthier, more connected world.',
        image: '/assets/backgrounds/1.webp',
        url: 'https://f365-global.com/contact',
        type: 'website',
        siteName: 'F365',
        keywords: [
            "F365",
            "F365 Global",
            "F365 Dubai",
            "F365 Community",
            "F365 Wellness",
            "Web Development",
            "Web Design",
            "SEO",
            "Digital Marketing",
            "Graphic Design",
            "Social Media Marketing",
            "Content Creation",
            "Content Marketing",
            "Wellness",
        ],
        openGraph: {
            title: 'Contact',
            description: 'We are a creative agency in Dubai with a focus on wellness and community. We are not just developing solutions; we are designing a healthier, more connected world.',
            image: '/assets/backgrounds/1.webp',
            url: 'https://f365-global.com/contact',
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


const Contact = () => {

    return (
        <main className={styles.contact}>
            <ContactUpper />
            <div className={styles.contact_lower}>
                <div className={styles.contact_lower_content}>
                    <p>(Events inquiry)</p>
                    <Link href="mailto:business@f365-global.com" target="_blank" rel="noopener noreferrer">
                        events@f365<br />-global.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(New business)</p>
                    <Link href="mailto:business@f365-global.com" target="_blank" rel="noopener noreferrer">
                        business@f365-global.com
                    </Link>
                </div>
                <div className={styles.contact_lower_content}>
                    <p>(Phone number)</p>
                    <Link href="tel:+971 50 123 4567" target="_blank" rel="noopener noreferrer">
                        +971 50 123 4567
                    </Link>
                </div>
            </div>
            <ServicesHomePage />
        </main>
    )
}

export default Contact