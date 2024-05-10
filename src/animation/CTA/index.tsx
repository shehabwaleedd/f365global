'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";
import { TransitionLink } from '../../components/transitionLink';
const CTA = ({ label, href, backgroundColor }: { label: string; href: string; backgroundColor: string }) => {

  const circle = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;
  
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")
  }, [])


  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeline.current?.tweenFromTo('enter', 'exit'); // Use optional chaining to access the timeline methods
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300)
  }

  return (
    <Magnetic>
      <div className={styles.roundedButton} style={{ overflow: "hidden" }} onMouseEnter={() => { manageMouseEnter() }} onMouseLeave={() => { manageMouseLeave() }}>
        <Link href={`${href}`}>
          <TransitionLink href={`${href}`} label={label} />
        </Link>
        <FaArrowRight style={{ color: "var(--title-color)" }} />
        <div ref={circle} className={styles.circle} style={{ backgroundColor }}></div>
      </div>
    </Magnetic>
  )
}


export default CTA