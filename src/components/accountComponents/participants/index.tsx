'use client'
import React from 'react'
import styles from "./style.module.scss"
import { useUserEvents } from '../../../lib/events/client/useUserEvents'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'
import NoEvents from '../noEvents'

const Participants = () => {
    const { user } = useAuth();
    const { events, loading } = useUserEvents(user?._id ?? '');
    const eventsWithMultipleParticipants = events?.filter(event => event?.EventParticipants?.length >= 1);
    const eventsIsEmpty = events.length === 0;


    if (loading) {
        return <div>Loading...</div>; // or any loading spinner you have
    }

    if (eventsIsEmpty) {
        return <NoEvents />;
    }

    return (
        <section className={styles.participants}>
            <h1>Participants by Event</h1>
            {eventsWithMultipleParticipants.map((event) => (
                <div key={event._id} className={styles.participants__container}>
                    <h2>{event.title}</h2>
                    <p>Number of Participants: {event.EventParticipants.length}</p>
                    <ul>
                        {event.EventParticipants.map((participant) => (
                            <li key={participant._id} >
                                <Link href={`/users/${participant._id}?fetchParam1=${participant.name}&fetchParam2=${participant.avatar.url}`}>
                                    <Image src={participant.avatar.url} alt={participant.name} width={50} height={50} />
                                    <p>{participant.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}

export default Participants