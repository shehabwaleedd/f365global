'use client'

import React, { useState, useMemo } from 'react';
import styles from "./style.module.scss";
import Skeleton from "../../animation/skeleton"
import TwoColumns from '../twoColumns';
import { EventType } from '@/types/common';

const FilterableEventsList = ({ events, asideContent, loading } : { events: EventType[], asideContent: React.ReactNode, loading: boolean}) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const filteredEvents = useMemo(() => events.filter((event: EventType) =>
        (selectedCity ? event.city === selectedCity : true) &&
        (selectedCategory ? event.category === selectedCategory : true) &&
        (selectedType ? event.location === selectedType : true)
    ), [events, selectedCity, selectedCategory, selectedType]);

    const uniqueCities = useMemo(() => [...new Set<string>(events.map((event: EventType) => event.city))], [events]);
    const uniqueCategories = useMemo(() => [...new Set<string>(events.map((event: EventType) => event.category))], [events]);
    const uniqueTypes = useMemo(() => [...new Set<string>(events.map((event: EventType) => event.location))], [events]);


    return (
        <section className={styles.events__container}>
            <aside className={styles.events__container__left}>
                <div>{asideContent}</div>
                <div className={styles.events__container__left_filter}>
                    <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                        <option value="">All Cities</option>
                        {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}

                    </select>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="">All Categories</option>
                        {uniqueCategories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                    <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                        <option value="">All Types</option>
                        {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
            </aside>
            <div className={styles.events__container__right}>
                {loading ? (
                    <Skeleton />
                ) : (<TwoColumns data={filteredEvents} />)}
            </div>
        </section>
    );
};

export default FilterableEventsList;
