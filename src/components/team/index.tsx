'use client'
import React, { useState, useRef } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import useWindowWidth from '../../hooks/useWindowWidth'

const Team = () => {

    const windowWidth = useWindowWidth();

    const teamData = [
        {
            img: "/assets/team/1.webp",
            name: "John Doe",
            position: "Managing Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/2.webp",
            name: "Jane Doe",
            position: "Motion Graphics Designer",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",


        },
        {
            img: "/assets/team/3.webp",
            name: "John Doe",
            position: "Copywriter",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/4.webp",
            name: "Jane Doe",
            position: "Managing Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/5.webp",
            name: "John Doe",
            position: "Head of Design & Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/6.webp",
            name: "Jane Doe",
            position: "Creative Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/7.webp",
            name: "Jane Doe",
            position: "Creative Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",

            email: "john.doe@example.com",

        },
        {
            img: "/assets/team/8.webp",
            name: "Jane Doe",
            position: "Creative Partner",
            biref: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam possimus iusto molestiae ut quibusdam, omnis harum modi vitae eaque vel aspernatur labore et maxime quis deserunt. Illo repellat officiis consequatur commodi distinctio atque aliquam illum, quos praesentium sapiente optio quo,",
            email: "john.doe@example.com",

        },
    ]

    const halfIndex = Math.ceil(teamData.length / 2);
    const leftColumnData = teamData.slice(0, halfIndex);
    const rightColumnData = teamData.slice(halfIndex);

    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);




    // Scroll animations for the left column
    const { scrollYProgress: leftScrollYProgress } = useScroll({
        target: leftColumnRef,
        offset: ["start end", "end start"],
    });
    const leftColumnTranslateY = useTransform(leftScrollYProgress, [0, 1], ["-5%", "15%"]);

    // Scroll animations for the right column
    const { scrollYProgress: rightScrollYProgress } = useScroll({
        target: rightColumnRef,
        offset: ["start end", "end start"],
    });
    const rightColumnTranslateY = useTransform(rightScrollYProgress, [0, 1], ["25%", "-5%"]);


    return (
        <section className={styles.team}>
            <div className={styles.team__container}>
                <div className={styles.team__container__left}>
                    <h3>The people <br /> behind <br /> <span>F365</span></h3>

                </div>
                <div className={styles.team__container__right}>
                    <div className={styles.team__container__right__content}>
                        {windowWidth && windowWidth > 768 ? (
                            <>
                                <Column translateY={windowWidth > 1268 ? leftColumnTranslateY : 0} ref={windowWidth > 1268 ? leftColumnRef : null}>
                                    {leftColumnData.map((item, index) => (
                                        <TeamMember key={index} {...item}
                                        />
                                    ))}
                                </Column>
                                <Column translateY={windowWidth > 1268 ? rightColumnTranslateY : 0} ref={windowWidth > 1268 ? rightColumnRef : null}>
                                    {rightColumnData.map((item, index) => (
                                        <TeamMember key={index} {...item}
                                        />
                                    ))}
                                </Column>
                            </>
                        ) : (
                            <motion.div drag="x" dragConstraints={{ left: -750, right: 750 }} className={styles.team__container__right__content_drag}>
                                {teamData.map((item, index) => (
                                    <TeamMember key={index} {...item}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team


const Column = ({ children, translateY, ref }: { children: React.ReactNode; translateY: any; ref: any; }) => (
    <motion.div className={styles.team__container__right__content__column} style={{ translateY }} ref={ref}>
        {children}
    </motion.div>
);

const TeamMember = ({ img, name, position, biref, email }: { img: string; name: string; position: string; biref: string; email: string; }) => {
    // Individual hover state for each TeamMember component
    const [hovered, setHovered] = React.useState(false);

    const handleEmailClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent any parent handler from being executed
        window.location.href = `mailto:${email}`;
    };

    const hoverAnimation = {
        opacity: hovered ? 1 : 0,
        transition: { duration: 0.5 },
    };

    const imageFilterAnimation = {
        filter: hovered ? 'brightness(50%)' : 'brightness(100%)',
        transition: { duration: 0.5 },
    };

    return (
        <motion.div
            className={styles.team__container__right__content__item}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div className={styles.team__container__right__content__item_upper}>
                <Image src={img} alt={name} width={800} height={800}
                    style={imageFilterAnimation}
                />
                <motion.div className={styles.team__container__right__content__item_upper_content}>
                    <div className={styles.svgs}>
                        <div onClick={handleEmailClick}>
                            <MdOutlineAlternateEmail />
                        </div>
                        <FiPlusCircle />
                    </div>
                    <motion.div className={styles.brief} animate={hoverAnimation}>
                        <p>{biref}</p>
                    </motion.div>
                </motion.div>
            </motion.div>
            <div className={styles.team__container__right__content__item__details}>
                <h4>{name}</h4>
                <p>{position}</p>
            </div>
        </motion.div>
    );
};