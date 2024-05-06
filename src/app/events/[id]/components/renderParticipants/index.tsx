'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../page.module.scss'
import { EventParticipants, EventType } from '@/types/common';

const RenderParticipants = ({ event } : { event: EventType | null}) => {
    const [participants, setParticipants] = useState<EventParticipants[]>([]);

    useEffect(() => {
        if (event?.EventParticipants) {
            setParticipants(event.EventParticipants);
        }
    }, [event?.EventParticipants]);



    if (participants.length > 0) {
        return event?.EventParticipants.map((participant, index) => (
            <div key={index} className={styles.event__bottom_participants_container_img}>
                <Image src={participant.avatar?.url || "/noimage.png"} alt={participant?.name || "Participant in the event"} title={participant?.name || "Participant in the event"} width={100} height={100} />
            </div>
        ));
    } else {
        return <div><h2>No participants yet</h2></div>;
    }
};

export default RenderParticipants