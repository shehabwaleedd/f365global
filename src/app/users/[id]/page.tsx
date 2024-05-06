import React from 'react';
import styles from "../../../components/filterableEventList/style.module.scss";
import FilterableEventsList from '../../../components/filterableEventList';
import { getUserEvents } from '@/lib/events/server/getUserEvents';
import Image from "next/image"
import { EventType } from '@/types/common';
import getBase64 from '@/lib/getLocalBase64';

export async function generateMetadata({ params, searchParams }: { params: { id: string }; searchParams: { fetchParam1: string; fetchParam2: string; }; }) {
    const title = `${searchParams.fetchParam1} on F365: Explore Events, Interests & Connect`;
    const description = `Dive into ${searchParams.fetchParam1}'s world on F365. Discover events, share interests, and connect with a vibrant community. Click to explore more!`;
    const image = searchParams.fetchParam2;
    const url = `https://f365-global.com/users/${params.id}`;
    const ogTitle = title;
    const ogDescription = description;
    const twitterTitle = title;
    const twitterDescription = description;
    const twitterImage = image;

    return {
        title,
        description,
        image,
        url,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: image,
            url: url,

        },
        twitter: {
            title: twitterTitle,
            description: twitterDescription,
            images: twitterImage,
        },
        structuredData: {
            "@context": "http://schema.org",
            "@type": "Person",
            "name": searchParams.fetchParam1,
            "url": url,
            "image": image,
        }
    };
}


export default async function UserPortal({ params, searchParams }: { params: { id: string }; searchParams: { fetchParam1: string; fetchParam2: string; }; }) {

    const userEvents = getUserEvents(params.id);
    const eventsData = await userEvents
    const publishedEvents = eventsData.data.filter((event: EventType) => event.status === "published");

    const asideContent = (
        <div>
            <div>
                <Image src={searchParams.fetchParam2} alt={searchParams.fetchParam1} width={500} height={500} title={searchParams.fetchParam1} />
            </div>
            <div>
                <h3>{searchParams.fetchParam1}&apos;s Profile</h3>
            </div>
        </div>
    );

        

    return (
        <main className={styles.events} style={{ paddingBottom: publishedEvents.length > 0 ? "40vh" : "3rem" }}>
            <FilterableEventsList
                events={publishedEvents}
                asideContent={asideContent}
                loading={false}
            />
        </main>
    );
};


