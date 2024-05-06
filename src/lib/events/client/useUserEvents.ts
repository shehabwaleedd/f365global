import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EventType } from '@/types/common';

export const useUserEvents = (userId: string) => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUserEvents = useCallback(async () => {
        if (!userId) return; // Prevent fetch if userId is not defined
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/getAllEventByOneUser/${userId}`, {
                headers: { token },
            });
            if (response.status === 200 && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                throw new Error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching user events:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserEvents();
    }, [fetchUserEvents]);

    const refreshEvents = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/getAllEventByOneUser/${userId}`, {
                headers: { token },
            });
            if (response.status === 200 && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching updated events:', error);
            alert('Failed to refresh events.');
        } finally {
            setLoading(false);
        }
    }, [userId]);


    return { events, loading, refreshEvents };
};
