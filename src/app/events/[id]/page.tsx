'use server'

import React from 'react'
import EventComponent from './components'
import { getEventById } from '@/lib/events/server/getEventById';
import getBase64 from '../../../lib/getLocalBase64';



export async function generateMetadata({ params } : { params: { id: string }}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${params.id}`);
    if (!res.ok) throw new Error('Failed to fetch event');

    const jsonResponse = await res.json();
    const cleanDescription = jsonResponse.data.description.replace(/<[^>]*>/g, '').slice(0, 150);

    return {
        title: jsonResponse.data.title,
        description: cleanDescription,
        url: `https://f365-global/events/${params.id}`,
        image: jsonResponse.data.mainImg,
        openGraph: {
            type: "website",
            title: jsonResponse.data.title,
            description: cleanDescription,
            images: jsonResponse.data.mainImg,
            url: `https://f365-global/events/${params.id}`,
            site_name: "F365 Global",
        },
        twitter: {
            title: jsonResponse.data.title,
            description: cleanDescription,
            images: jsonResponse.data.mainImg,
            cardType: 'summary_large_image',
        },
    }
}

export default async function EventPage({ params } : { params: { id: string }}) {

    const event = await getEventById(params.id);
    const base64 = await getBase64(event.data.mainImg.url);
    return (
        <>
            <EventComponent params={params}
                base64={base64 ?? ''}
            />
        </>
    )
}

