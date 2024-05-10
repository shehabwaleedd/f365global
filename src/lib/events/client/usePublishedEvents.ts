import axios from 'axios';
import { useEffect, useState } from 'react';
import { isAfter } from 'date-fns';
import { EventType } from '@/types/common';

export const usePublishedEvents = (page: number) => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0); 

    const sortAndFilterEvents = (events: EventType[]) => {
        const currentDate = new Date();
        const upcomingSuperAdminEvents = events.filter(event =>
            isAfter(new Date(event.dateOfEvent), currentDate) && event.createdBy.role === 'superAdmin'
        );
        const upcomingOtherEvents = events.filter(event =>
            isAfter(new Date(event.dateOfEvent), currentDate) && event.createdBy.role !== 'superAdmin'
        );
        const pastEvents = events.filter(event =>
            !isAfter(new Date(event.dateOfEvent), currentDate)
        );

        return [...upcomingSuperAdminEvents, ...upcomingOtherEvents, ...pastEvents];
    };

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event?page=${page}`);
            const publishedEvents = response.data.data.result.filter((event: EventType) => event.status === "published");
            const sortedAndFilteredEvents = sortAndFilterEvents(publishedEvents);
            setEvents(sortedAndFilteredEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [page]);



    return { events, loading, fetchEvents, setLoading };
}

