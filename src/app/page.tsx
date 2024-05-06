'use client';
import { useEffect, useState, useLayoutEffect } from "react";
import Landing from "../components/landing/Landing";
import styles from "./page.module.scss";
import Brief from "../components/brief/Brief";
import LogoMarquee from '../components/logoMarquee/LogoMarquee';
import TwoGrids from "../components/twoGrids"
import Testimonials from '../components/testimonials';
import useWindowWidth from '../hooks/useWindowWidth';
import { useAuth } from "../context/AuthContext";
import Opening from "../animation/opening/Opening";
import Upcoming from "../components/upcoming";
import ServicesCo from "../components/servicesCo"
import { gsap } from "gsap";

export default function Home() {
  // const { hasAnimationShown, setHasAnimationShown } = useAuth();
  // const [renderOpening, setRenderOpening] = useState(false);
  // const [timeline, setTimeline] = useState(null);

  // useEffect(() => {
  //   if (!hasAnimationShown && !sessionStorage.getItem("hasAnimationShown")) {
  //     setRenderOpening(true);
  //   }
  // }, [hasAnimationShown])


  // useLayoutEffect(() => {
  //   const context = gsap.context(() => {
  //     const tl = gsap.timeline();

  //     setTimeline(tl);
  //   });
  // }, []);



  const windowWidth = useWindowWidth();
  return (
    <>
      {/* {renderOpening && <Opening setHasAnimationShown={setHasAnimationShown} timeline={timeline}/> } */}
        <main className={styles.main}>
          <Landing windowWidth={windowWidth || 0} />
          <TwoGrids h2="Empowering Wellness and Innovation Through Digital Excellence." h3="(Our Mission)" h32="Blending Health Empowerment with Cutting-edge Digital Solutions." phrase1="At F365, we bridge the gap between wellness empowerment and digital innovation. Our mission extends beyond fostering a supportive community; we also equip wellness brands with the web development, graphic design, and marketing tools they need to thrive in the digital landscape. Our approach ensures that every touchpoint resonates with health, empowerment, and professional excellence." phrase2="The digital age demands a seamless integration of brand values with online presence. F365 is at the forefront of this evolution, offering a unique blend of health empowerment and digital services. From crafting visually stunning designs to developing robust web solutions and strategic marketing, we empower wellness brands to connect deeply with their audience, inspire positive change, and achieve sustainable growth in the digital ecosystem."  windowWidth={windowWidth || 0} />
          <Upcoming />
          <ServicesCo />
          {/* <Events windowWidth={windowWidth} /> */}
          <Brief  />
          <Testimonials />
          <LogoMarquee direction="left" />
        </main>
    </>
  );
}
