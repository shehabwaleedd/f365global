'use client'

import React, { useState, useEffect, } from 'react'
import styles from "../page.module.scss"
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import RenderParticipants from './renderParticipants';
import EventLower from './eventLower';
import { useEventById } from '@/lib/events/client/useEventById';
import ShareDropdown from './shareEvent';
import RoundedButton from '../../../../animation/RoundedButton';
import { useAuth } from '@/context/AuthContext';
export default function EventComponent({ params, base64 } : { params: { id: string }, base64: string}) {
    const { event, loading, error } = useEventById(params.id);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [hasParticipated, setHasParticipated] = useState(false);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (user && event?.EventParticipants?.some(participant => participant._id === user._id)) {
            setHasParticipated(true);
        } else {
            setHasParticipated(false);
        }
    }, [event?.EventParticipants, user]);


    let formattedDate = '';
    try {
        formattedDate = event?.dateOfEvent ? format(parseISO(event?.dateOfEvent), 'd MMMM') : '';
    } catch (error) {
        console.error('Error parsing date:', error);
        formattedDate = 'Invalid date';
    }

    const cleanGoogleMapLink = (googleMapLink: string) => {
        let cleanedLink = googleMapLink.replace(/style="border:0;"\s?/g, '');
        return cleanedLink;
    };


    if (loading) {
        return (
            <div className={styles.event}>
                <Image
                    src={base64} alt="Loading Image" width={1920} height={1080} quality={100}
                    priority
                    title="Loading Image"
                    placeholder='blur'
                    blurDataURL={base64}
                />
                <h1>Loading...</h1>
            </div>
        )
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : 'Unknown error occurred';
        return (
            <div className={styles.event}>
                <Image
                    src={base64} alt="Error Image" width={1920} height={1080} quality={100}
                    priority
                    title="Error Image"
                    placeholder='blur'
                    blurDataURL={base64}
                />
                <h1>Error: {errorMessage}</h1>
            </div>
        )
    }


    const content = (
        <main className={styles.event}>
            <section className={styles.event__upper}>
                <Image
                    src={event?.mainImg?.url || '/noimage.png'} alt={event?.title || "Main Event's Image/Poster"} width={1920} height={1080} quality={100}
                    priority
                    title={event?.title || "Main Event's Image/Poster"}
                    placeholder='blur'
                    blurDataURL={base64}
                />
            </section>
            <EventLower event={event || null} formattedDate={formattedDate} user={user} hasParticipated={hasParticipated} setHasParticipated={setHasParticipated} isLoggedIn={isLoggedIn} />
            <section className={styles.event__bottom}>
                <h2>Event Details</h2>

                <div dangerouslySetInnerHTML={{ __html: event?.description ?? '' }} />
                <div className={styles.event__bottom_lineBreaker}>

                    <div className={styles.event__bottom_lineBreaker_line}></div>
                </div>
                <div className={styles.event__bottom_participants}>
                    <div className={styles.event__bottom_participants_top}>
                        <div>
                            <h2>{event?.EventParticipants?.length} Participants</h2>
                        </div>
                    </div>
                    <div className={styles.event__bottom_participants_container}>
                        <RenderParticipants event={event || null} />
                        <RoundedButton>
                            <button onClick={() => setShowShareOptions(!showShareOptions)}><p>Spread the word</p></button>
                        </RoundedButton>
                    </div>
                </div>
                {event?.googleMapLink && hasParticipated && (
                    <div className={styles.event__bottom_map}>
                        <h2>Location</h2>
                        <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanGoogleMapLink(event.googleMapLink) }} />
                    </div>
                )}
            </section>
            {showShareOptions && <ShareDropdown event={event} setShowShareOptions={setShowShareOptions} />}
        </main>
    )


    return content
}

