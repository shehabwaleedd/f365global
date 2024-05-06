'use client'
import React, { useState } from 'react'
import styles from '../../page.module.scss'
import { isPast, formatDistanceToNow } from 'date-fns';
import Link from 'next/link'
import Magnetic from '../../../../../animation/Magnetic';
import axios from 'axios';
import Image from 'next/image';
import CTA from '../../../../../animation/CTA';
import { useAuth } from '@/context/AuthContext';
import RoundedButton from '@/animation/RoundedButton';
import { EventType, UserType } from '@/types/common';

interface RenderEventStatusType {
    isLoggedIn: boolean,
    event: EventType,
    user: UserType,
    hasParticipated: boolean,
    setHasParticipated: any

}
const RenderEventStatus: React.FC<RenderEventStatusType> = ({ isLoggedIn, event, user, hasParticipated, setHasParticipated }) => {
    const { isLoginOpen, setIsLoginOpen } = useAuth();

    const joinEvent = async (eventId: string) => {
        const token = localStorage.getItem('token');
        if (!user) {
            alert("Please login to join the event.");
            return;
        }
        if (!token) {
            alert("No token found. Please log in again.");
            return;
        }
        const isConfirm = confirm("Are you sure you want to join this event?");
        if (isConfirm && !hasParticipated) { // Check if user has already participated
            try {
                console.log("Attempting to join event", eventId); // Debug log
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/joinWithEvent/${eventId}`, {}, {
                    headers: { token }
                });

                console.log('Response:', response); // Debug log
                if (response.status === 200) {
                    alert("Successfully joined the event!");
                    setHasParticipated(true);
                } else {
                    console.log('Failed to join event with status:', response.status); // Debug log
                    throw new Error('Failed to join the event');
                }
            } catch (error) {
                console.error('Error joining the event:', error);
                alert("Failed to join the event. Please try again later.");
            }
        }
    };

    const handleLoginOpenClick = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    if (!event?.dateOfEvent || isNaN(Date.parse(event.dateOfEvent))) {
        return <p>Invalid event date.</p>;
    }
    const startDate = new Date(event?.dateOfEvent);

    if (isPast(startDate)) {
        return (
            <div className={styles.event__lower__container_right_content}>
                <h3>Event has ended</h3>
                <p>View more updates and events in {event.createdBy?.name}&apos;s portal</p>
                <CTA label={`${event.createdBy?.name}'s Portal`} href={`/users/${event.createdBy?._id}?fetchParam1=${event.createdBy?.name}&fetchParam2=${event.createdBy?.avatar?.url}`} />
            </div>
        );
    } else {
        const timeToEvent = formatDistanceToNow(startDate, { addSuffix: true });
        return (
            <div className={styles.event__lower__container_right_content}>
                {event?.createdBy && (
                    <div className={styles.event__lower__container_right_content_createdBy}>
                        <Image src={event?.createdBy?.avatar?.url || "/user.png"} alt={event?.createdBy?.name || "Create By User's Image"} width={100} height={100} title={event?.createdBy?.name || "Create By User's Image"} />
                        <h3>With <Link href={`/users/${event.createdBy?._id}?fetchParam1=${event.createdBy?.name}&fetchParam2=${event.createdBy?.avatar?.url}`}>{event.createdBy?.name}</Link></h3>
                    </div>
                )}
                <h3>Event starts {timeToEvent}</h3>
                <p>
                    {isLoggedIn ? " Don't miss out, participate in the event and get the most out of it." : "Login to register and participate"}
                </p>
                {isLoggedIn ? (
                    <div className={styles.magn_btn}>
                        <Magnetic>
                            <button
                                className={styles.event__lower__container_right_content_button}
                                onClick={() => joinEvent(event._id)}
                                disabled={hasParticipated}
                            >
                                {hasParticipated ? "Participated" : "Participate"}
                            </button>
                        </Magnetic>
                    </div>
                ) : (
                    <RoundedButton>
                        <button onClick={handleLoginOpenClick} className={styles.loginBtn}><p>Login</p></button>
                    </RoundedButton>
                )}
            </div>
        );
    }
};
export default RenderEventStatus