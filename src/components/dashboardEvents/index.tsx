import React from 'react'
import { motion } from 'framer-motion'
import styles from "./style.module.scss"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Loading from '../../animation/loading/Loading'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { EventType } from '@/types/common'
import { toast } from 'sonner'

const DashboardEvents = ({ events, loading, title, refreshEvents }: {
    events: EventType[];
    loading: boolean;
    title: string;
    refreshEvents: () => void;
}) => {
    const router = useRouter();
    const { user } = useAuth();
    const handleEditClick = (eventId: string) => {
        router.push(`/account/events/edit/${eventId}`);
    };




    const handleDeleteClick = async (eventId: string) => {
        const isConfirm = confirm("Are you sure you want to delete this event?");
        if (isConfirm) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });

                if (response.status === 200) {
                    toast.success("Event deleted successfully. Refresh to see changes");

                } else {
                    throw new Error("Failed to delete event.");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                toast.error("There was a problem deleting the event, please try again later.");
            }
        }
    };

    // changing event.status to approved 
    const handlePublishClick = async (eventId: string) => {
        const isConfirmed = window.confirm("Are you sure you want to publish this event?");
        if (isConfirmed) {
            try {
                // Prepare the data to update the event status to "published"
                const data = { status: "published" };
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/changeState/${eventId}`, data, {
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                });

                // Check if the request was successful
                if (response.status === 200) {
                    toast.success("Event published successfully. Refresh to see changes");

                } else {
                    throw new Error("Failed to publish event.");
                }
            } catch (error) {
                console.error("Error publishing event:", error);
                toast.error("There was a problem publishing the event, please try again later.");
            }
        }
    };

    const handleDisplayedClick = async (eventId: string, toDisplay: boolean) => {

        const isConfirmed = window.confirm(toDisplay ? "Are you sure you want to hide this event from home page?" : "Are you sure you want to display this event in home page?");
        if (isConfirmed) {
            try {
                // Prepare the data to update the event status to "published"
                const data = { isDisplayed: !toDisplay };
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`, data, {
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Check if the request was successful
                if (response.status === 200) {
                    toast.success("Event display status changed successfully. Refresh to see changes");
                } else {
                    throw new Error("Failed to change event display status.");
                }
            } catch (error) {
                console.error("Error changing event display status:", error);
                toast.error("There was a problem changing the event display status, please try again later.");
            }
        }
    };


    if (loading) {
        return <Loading height={100} />
    }




    return (
        <motion.section className={styles.userEvents} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {title && <h1>{title}</h1>}
            <div className={styles.userEvents__container}>
                {events.map((event, index) => (
                    <div key={index} className={styles.userEvents__container_card}>
                        <div className={styles.userEvents__container_card_top}>
                            <Image src={event.mainImg?.url ?? "/noimage.png"} alt={event.title} width={500} height={500} quality={100} />
                            <div className={styles.userEvents__container_card_top_bottom}>
                                <div className={styles.userEvents__container_card_top_bottom_upper}>
                                    <>
                                        {["superAdmin", "admin"].includes(user?.role ?? "") ? (
                                            <div className={styles.userEvents__container_card_top_bottom_upper_top}>
                                                <button onClick={() => handlePublishClick(event._id)} style={{ cursor: "pointer" }}>
                                                    <span style={{ backgroundColor: event.status === "published" ? "#8BBD8B" : "var(--background-color)", color: "#1b1b1b", border: "2px solid #1b1b1b", outline: "1px solid var(--container-color)" }}>
                                                        {event.status === "published" ? "Approved" : "Pending"}
                                                    </span>
                                                </button>

                                                <button onClick={() => handleDisplayedClick(event._id, event.isDisplayed)} style={{ cursor: "pointer" }}>
                                                    <span style={{ backgroundColor: event.isDisplayed ? "#8BBD8B" : "var(--background-color)", color: "#1b1b1b", border: "2px solid #1b1b1b", outline: "1px solid var(--container-color)" }}>
                                                        {event.isDisplayed ? "Displayed" : "Not Displayed"}
                                                    </span>
                                                </button>

                                            </div>
                                        ) : (
                                            <span style={{ backgroundColor: event.status === "published" ? "#8BBD8B" : "var(--background-color)", color: "#1b1b1b", border: "2px solid #1b1b1b", outline: "1px solid var(--container-color)" }}>
                                                {event.status === "published" ? "Approved" : "Pending"}
                                            </span>
                                        )}
                                    </>
                                </div>
                                <div className={styles.userEvents__container_card_top_bottom_lower}>
                                    <button onClick={() => handleEditClick(event._id)}>
                                        <span style={{ backgroundColor: "#2e2e2e", color: "var(--container-color)" }}>
                                            Edit
                                        </span>
                                    </button>

                                    <button onClick={() => handleDeleteClick(event._id)}>
                                        <span style={{ backgroundColor: "#ef6363" }}>
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userEvents__container_card_bottom}>
                            <div className={styles.userEvents__container_card_bottom_top}>
                                <div>
                                    <h2>{event.title.slice(0, 20)}...</h2>
                                </div>
                            </div>
                            <p>
                                {event.description.replace(/<[^>]*>/g, '').slice(0, 150)}...
                            </p>
                            <div className={styles.userEvents__container_card_bottom_lower}>
                                <p>{event.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}

export default DashboardEvents