'use client'
import React, { useState } from 'react'
import FilterableEventsList from '../../components/filterableEventList'
import { usePublishedEvents } from '../../lib/events/client/usePublishedEvents'
import EventsPageTitles from "./components/eventsPageTitles"
import styles from "./page.module.scss"

const Events = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { events, loading } = usePublishedEvents(currentPage);
    const asideContent = <EventsPageTitles />;

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };



    return (
        <section className={styles.evenetsPage}>
            <FilterableEventsList
                events={events}
                asideContent={asideContent}
                loading={loading}
            />

            <div className={styles.pagination}>
                <div className={styles.pagination_Btns}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </section>
    )
}

export default Events