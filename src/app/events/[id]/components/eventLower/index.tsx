'use client'
import React from 'react'
import styles from '../../page.module.scss'
import { BsCalendar4Week } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";
import RenderEventStatus from '../renderEventStatus';
import { EventType } from '@/types/common';

interface EvenetLowerType {
    event: EventType | null,
    formattedDate: string,
    user: any,
    hasParticipated: boolean,
    setHasParticipated: any,
    isLoggedIn: boolean
}
const EventLower: React.FC<EvenetLowerType> = ({ event, formattedDate, user, hasParticipated, setHasParticipated, isLoggedIn}) => {
    return (
        <section className={styles.event__lower}>
            <h1> {event?.title} </h1>
            <div className={styles.event__lower__container}>
                <div className={styles.event__lower__container_details}>
                    <div className={styles.event__lower__container_details_row}>
                        <BsCalendar4Week />
                        <div className={styles.event__lower__container_details_row_column}>
                            <h3>{formattedDate}</h3>
                            <p> <span>{event?.timeOfEvent?.from} - {event?.timeOfEvent?.to}</span></p>
                        </div>
                    </div>
                    <div className={styles.event__lower__container_details_row}>
                        <div>
                            {event?.location === "offline" ? <IoLocationOutline /> : <BsCameraVideo />}
                        </div>
                        <div className={styles.event__lower__container_details_row_column}>
                            <h3>{event?.location === "offline" ? "In-Person" : "Online"}</h3>
                            {isLoggedIn ? (
                                hasParticipated ? (
                                    <p>{event?.location === "offline" ? `Address: ${event?.address}` : `Event Link: ${event?.link}`}</p>
                                ) : (
                                    <p>{event?.location === "offline" ? "Participate to get the address" : "Participate to get the link"}</p>
                                )
                            ) : (
                                <p>Please log in {event?.location === "offline" ? "and register to get the address" : "and participate to get the link"}</p>
                            )}
                        </div>

                    </div>
                    <div className={styles.event__lower__container_details_row}>
                        <IoTicketOutline />
                        <div className={styles.event__lower__container_details_row_column}>
                            <h3>Free</h3>
                            <p>Members Only</p>
                        </div>
                    </div>

                </div>
                <div className={styles.event__lower__container_right}>
                    {!event ? <div>Loading... </div> : <RenderEventStatus event={event} user={user} setHasParticipated={setHasParticipated} hasParticipated={hasParticipated} isLoggedIn={isLoggedIn} />}
                </div>
            </div>
        </section>
    )
}

export default EventLower