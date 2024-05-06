'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import {  EventType } from '@/types/common';

export const useEventById = (id: string) => {
    const [event, setEvent] = useState<EventType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/event/${id}`,
                    {
                        headers: { token: localStorage.getItem("token") },
                    }
                );
                if (response.status === 200) {
                    setEvent(response.data.data);
                } else {
                    throw new Error("Failed to fetch event");
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, []);

    return { event, loading, error };
}