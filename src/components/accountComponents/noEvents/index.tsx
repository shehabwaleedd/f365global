import React from 'react'
import { TransitionButton } from '../../transitionLink'
import styles from "./style.module.scss"

const NoEvents = () => {
    return (
        <section className={styles.noEventsFound}>
            <p>It looks like you don&apos;t have any events yet. Click the button below to create your first event.</p>
            <TransitionButton href="/account/events/createEvent" label="Create Event" />
        </section>)
}

export default NoEvents