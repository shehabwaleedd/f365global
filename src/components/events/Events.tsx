'use client';
import styles from './page.module.scss'
import Link from 'next/link';
import { useRef } from 'react';
import { useDisplayedEvents } from '../../lib/events/client/useDisplayedEvents';
import Loading from '../../animation/loading/Loading';
import TwoColumns from '../twoColumns';
import { Suspense } from 'react';
import CTA from "../../animation/CTA";
const Events = () => {
    const { events } = useDisplayedEvents();
    const container = useRef(null);
    
    return (
        <section ref={container} className={styles.events}>
            <div className={styles.events_left}>
                <h2><span>/</span> Our Recent Events</h2>
                <p>
                    join us for <br /> our upcoming <br /> <span style={{color: "var(--accent-color)"}}>exclusive events.</span>
                </p>
                <CTA label="Explore All Events" href="/events" backgroundColor='var(--accent-color)'/>
            </div>
            <div className={styles.events_right}>
                <Suspense fallback={<Loading height={100} />}>
                    <TwoColumns data={events} />
                </Suspense>
            </div>
        </section>
    )
}

export default Events