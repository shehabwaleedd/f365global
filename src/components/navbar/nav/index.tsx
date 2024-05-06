import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { width } from '../anim';
import Body from './Body';
import Footer from './Footer';
import { useAuth } from '../../../context/AuthContext';

export default function Index({ setNavOpen } : { setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;}) {

  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Events",
      href: "/events",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ]
  const { isLoggedIn } = useAuth();


  if (isLoggedIn) {
    links.push({
      title: "Create Event",
      href: "/account/events/createEvent",
    });
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={width}
      className={styles.nav}>

      <div className={styles.wrapper}>
        <button className={styles.hamburger} onClick={() => setNavOpen(false)}>
          X
        </button>
        <div className={styles.container}>
          <Body links={links} />
          <Footer />
        </div>
      </div>
    </motion.div >
  )
}