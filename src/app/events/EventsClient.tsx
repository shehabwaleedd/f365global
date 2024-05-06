'use client'
import React from 'react'
import FilterableEventsList from '../../components/filterableEventList'
import { usePublishedEvents } from '../../lib/events/client/usePublishedEvents'
import EventsPageTitles from "./components/eventsPageTitles"

const Events = () => {
    const { events, loading } = usePublishedEvents();
    const asideContent = <EventsPageTitles />;
    return (
        <section>
            <FilterableEventsList
                events={events}
                asideContent={asideContent}
                loading={loading}
            />
        </section>
    )
}

export default Events