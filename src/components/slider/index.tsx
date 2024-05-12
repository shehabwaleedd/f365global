'use client'
import styles from './index.module.scss'
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaAsterisk } from "react-icons/fa";


export default function Slider() {
    const containerRef = useRef(null)
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    const [direction, setDirection] = useState(1);
    const directionRef = useRef(1);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const sliderr = containerRef.current;


        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: self => {
                    directionRef.current = self.getVelocity() < 0 ? -1 : 1;
                }
            },
            x: "-500px",
        })
        requestAnimationFrame(animate);
    }, [])

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        }
        else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, { xPercent: xPercent })
        gsap.set(secondText.current, { xPercent: xPercent })
        requestAnimationFrame(animate);
        xPercent += 0.1 * directionRef.current;
    }
    return (
        <div className={styles.sliderContainer} ref={containerRef}>
            <div ref={slider} className={styles.slider}>
                <p ref={firstText}>F365 GLOBAL </p>
                <p ref={secondText}>F365 GLOBAL </p>
            </div>
        </div>
    )
}