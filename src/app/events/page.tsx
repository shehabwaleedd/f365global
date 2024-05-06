import React from 'react';
import styles from "../../components/filterableEventList/style.module.scss";
import EventsClient from "./EventsClient"
export async function generateMetadata() {
    return {
        title: "Upcoming Events - F365 Movement",
        description: "Explore the latest events across the globe with F365 Global. From art exhibitions to tech conferences, find events that match your interests and connect with like-minded individuals.",
        url: `https://f365-global/events`,
        openGraph: {
            type: "website",
            title: "Upcoming Events - F365 Movement",
            description: "Join us to discover and participate in events that spark your interest. Whether it's for learning, networking, or just fun, find your next event with F365 Global.",
            url: `https://f365-global/events`,
            site_name: "F365 Global",
            images: '/assets/backgrounds/1.webp',
        },
        twitter: {
            handle: '@F365Global',
            title: "Discover & Join Events Worldwide | F365 Global",
            description: "Looking for events that inspire and entertain? Browse F365 Global's curated list of upcoming events and find your next adventure or learning opportunity.",
            cardType: 'summary_large_image',
            image: 'https://f365-global/static/images/events-twitter-card.jpg',
        },
    }
}

export default async function Events() {

    return (
        <main className={styles.events}>
            <EventsClient />
        </main>
    )
}
