

import React from 'react'
import ServicesTitle from './components'
import { services } from '../../../components/servicesData';


export function generateMetadata({ params }) {
    const service = services.find(service => service.serviceTitle === params.title);
    return {
        title: `F365 Movement - ${service.title}`,
        description: service.seo,
        url: `https://f365-global.com/services/${service.serviceTitle}`,
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
            title: service.title,
            description: service.seo,
            images: service.img,
            url: `https://f365-global.com/services/${service.serviceTitle}`,
            type: 'website',
        },
        twitter: [
            {
                card: "summary_large_image",
                site: "@f365global",
                title: service.title,
                description: service.seo,
                image: service.img,
                url: `https://f365-global.com/services/${service.serviceTitle}`,
            }
        ],
        robots: "index, follow",
        language: "en",
        favicon: {
            ico: "/favicon.ico",
            webp: "/favicon.webp",
            png: "/favicon.png",
        },
    }
}

const ServiceTitle = () => {

    return (
        <ServicesTitle />
    )
}

export default ServiceTitle