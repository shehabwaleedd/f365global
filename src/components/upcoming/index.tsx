import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import styles from './style.module.scss'
import useAllEvents from '../../lib/events/client/useAllEvents';;
import Image from 'next/image';
import CTA from '../../animation/CTA';
import AnimatedText from '../../animation/animatedText/AnimatedText';
SwiperCore.use([Navigation, Pagination]);



const Upcoming = () => {
    const swiperRefs = useRef<SwiperCore[]>([]);

    const { events } = useAllEvents();
    return (
        <section className={styles.upcoming}>
            <div className={styles.upcoming__upper}>
                <AnimatedText data={{ title: 'Upcoming Events', speed: 0.8 }} />
            </div>
            <Swiper
                slidesPerView={"auto"}
                modules={[Navigation]}
                onSwiper={(swiper) => { swiperRefs.current.push(swiper) }}
                breakpoints={{
                    380: {
                        slidesPerView: 1,
                        spaceBetween: -10,
                    },
                    680: {
                        slidesPerView: 2,
                        spaceBetween: -10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: -10,

                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: -10,

                    },
                    1888: {
                        slidesPerView: 3,
                        spaceBetween: -10,

                    }
                }}
                className={styles.upcoming__container}>
                {events.map((event: any, index: number) => (
                    <SwiperSlide key={index} className={styles.upcoming__container__slide}>
                        <Image
                            src={event.mainImg.url || '/noimage.png'} alt={event.title || "Main Event's Image/Poster"} width={1920} height={1080} quality={100}
                            priority
                            title={event.title || "Main Event's Image/Poster"}
                            placeholder='blur'
                            blurDataURL={event.mainImg.url}
                        />
                        <div className={styles.upcoming__container__slide_content}>
                            <h2>{event.title}</h2>
                            <p>{event.description.replace(/<[^>]*>/g, '').slice(0, 100)}...</p>
                            <CTA href={`/events/${event._id}`} label="View Event" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Upcoming