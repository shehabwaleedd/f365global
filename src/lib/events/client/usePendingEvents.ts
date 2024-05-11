import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios'
import { EventType } from '@/types/common';
import { toast } from 'sonner';

export const usePendingEvents = () => {
    const [pendingEvents, setPendingEvents] = useState<EventType[]>([])
    const [loading, setLoading] = useState<boolean>(false);

    const getPendingEvents = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event`, {
                    headers: { token },
                });
                const filteredEvents = response.data.data.result.filter((event: EventType) => event.status === "pending");
                setPendingEvents(filteredEvents);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
    }, []);

    const refreshEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event`, {
                headers: { token: localStorage.getItem("token") },
            });
            if (response.status === 200) {
                const filteredEvents = response.data.data.result.filter((event: EventType) => event.status === "pending");
                setPendingEvents(filteredEvents);
                toast.success("Events refreshed successfully.");
            }
        } catch (error) {
            console.error("Error fetching updated events:", error);
            toast.error("Failed to refresh events.");
        }
    };

    useEffect(() => {
        getPendingEvents();
    }, [getPendingEvents]);

    // Ensure to return the filtered pending events and the function to fetch them
    return { pendingEvents, loading, refreshEvents };
}

