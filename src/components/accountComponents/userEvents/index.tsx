'use client'
import React from 'react'
import { useUserEvents } from '@/lib/events/client/useUserEvents'
import DashboardEvents from '../../dashboardEvents'
import { useAuth } from '../../../context/AuthContext'


const UserEvents = () => {
    const { userId } = useAuth();
    const { events, loading, refreshEvents } = useUserEvents(userId ?? "");


    return (
        <DashboardEvents events={events} loading={loading} refreshEvents={refreshEvents} title="My Events" />
    );
}

export default UserEvents;
