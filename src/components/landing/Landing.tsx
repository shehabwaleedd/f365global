'use client'
import React, { useState, useRef } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import Magnetic from '../../animation/Magnetic'
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import Calendly from '../calendly';
import Image from "next/image"
import { AnimatedH1 } from "../../animation/animatedH1";
import TellUsYourStory from '../tellStory';
import RoundedButton from '../../animation/RoundedButton';
import useWindowWidth from '@/hooks/useWindowWidth'
const Landing = () => {
    const windowWidth = useWindowWidth()
    const [becomePartner, setBecomePartner] = useState(false)
    const handleBecomePartner = () => {
        setBecomePartner(!becomePartner)
    }
    const [tellUsYourStory, setTellUsYourStory] = useState(false)
    const handleTellUsYourStory = () => {
        setTellUsYourStory(!tellUsYourStory)
    }


    let steps = 0;
    let currentIndex = 0;
    let nbOfImages = 0;
    let maxNumberOfImages = 5;
    const refs = [...Array(11)].map(() => React.createRef());

    const manageMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, movementX, movementY } = e;

        steps += Math.abs(movementX) + Math.abs(movementY);

        if (steps >= currentIndex * 150) {
            moveImage(clientX, clientY);

            if (nbOfImages == maxNumberOfImages) {
                removeImage();
            }
        }

        if (currentIndex == refs.length) {
            currentIndex = 0;
            steps = -150;
        }
    }

    const moveImage = (x: number, y: number) => {
        const currentImage = refs[currentIndex].current as HTMLDivElement; 
        currentImage.style.left = x + "px";
        currentImage.style.top = y + "px";
        currentImage.style.display = "block";
        currentIndex++;
        nbOfImages++;
        setZIndex()
    }

    const setZIndex = () => {
        const images = getCurrentImages();
        for (let i = 0; i < images.length; i++) {
            const image = images[i] as HTMLDivElement;
            image.style.zIndex = i.toString();
        }
    }

    const removeImage = () => {
        const images = getCurrentImages();
        (images[0] as HTMLDivElement).style.display = "none";
        nbOfImages--;
    }

    const getCurrentImages = () => {
        let images = []
        let indexOfFirst = currentIndex - nbOfImages;
        for (let i = indexOfFirst; i < currentIndex; i++) {
            let targetIndex = i;
            if (targetIndex < 0) targetIndex += refs.length
            images.push(refs[targetIndex].current);
        }
        return images;
    }

    return (
        <>
            <section className={styles.landing} style={{}} onMouseMove={(e) => { manageMouseMove(e) }}>

                <div className={styles.landing__left}>
                    <div className={styles.landing__left_content}>
                        <div className={styles.landing__left_content_upper}>
                            {windowWidth && windowWidth < 1156 ? (
                                <>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('A Creative Agency')}
                                    </motion.div>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('In Dubai, Focusing On')}
                                    </motion.div>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('Community & Wellness')}
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('A Creative Agency In Dubai')}
                                    </motion.div>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('Focusing On Community')}
                                    </motion.div>
                                    <motion.div className={styles.landing__left_content_upper_content} >
                                        {AnimatedH1('& Wellness')}
                                    </motion.div>
                                </>

                            )}
                        </div>
                        {
                            refs.map((ref: any, index: number) => (
                                <Image key={index} onClick={() => { console.log(refs) }} ref={ref} src={`/images/${index}.webp`} alt='sdasd' width={500} height={500} className={styles.abImg} />
                            ))
                        }
                        <div className={styles.landing__left_content_bottom}>
                            {windowWidth && windowWidth > 1200 ? (
                                <p>
                                    We are a creative agency in Dubai, specializing in wellness and  career coaching <br /> for young influencers and entrepreneurs. We offer a range <br /> of services to help you achieve your goals.
                                </p>
                            ) : (
                                <p>
                                    We are a creative agency in Dubai, specializing in wellness and career coaching for young influencers and entrepreneurs. We offer a range of services to help you achieve your goals.
                                </p>
                            )}
                            <div className={styles.landing__left_content_bottom_right}>
                                <div className={styles.magnetic}>
                                    <Magnetic>
                                        <Link href="" onClick={handleBecomePartner} style={{ backgroundColor: "var(--accent-color)", border: "1px solid var(--title-color)" }}>
                                            <span style={{ color: "var(--title-color)" }}>
                                                Free 1:1 Consultation
                                                <FaArrowRight style={{ color: "var(--title-color)" }} />
                                            </span>
                                        </Link>
                                    </Magnetic>
                                </div>
                                <div className={styles.magnetic}>
                                    <RoundedButton>
                                        <Link href="" onClick={handleTellUsYourStory} style={{ border: "1px solid var(--title-color)" }}>
                                            <span style={{ color: "var(--title-color)" }}>
                                                Tell Us Your Story
                                                <FaArrowRight style={{ color: "var(--title-color)" }} />
                                            </span>
                                        </Link>
                                    </RoundedButton>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Image src="/mainImage.webp" alt="F365 Movement" width={windowWidth && windowWidth > 1200 ? 1800 : 500} height={windowWidth && windowWidth > 1200 ? 800 : 500} priority={true} />
            </section>
            <AnimatePresence mode='wait'>
                {becomePartner && <Calendly onClose={handleBecomePartner} />}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {tellUsYourStory && <TellUsYourStory onClose={handleTellUsYourStory} />}
            </AnimatePresence>
        </>
    )
}

export default Landing