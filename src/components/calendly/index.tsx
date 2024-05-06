import styles from './style.module.scss'
import { motion } from 'framer-motion';

export default function Calendly({ onClose } : { onClose:() => void }) {
    return (
        <motion.section className={styles.modalBackground} initial={{ y: "100vh" }} animate={{  y: 0 }} transition={{ duration: 1, type: "spring", ease: [0.42, 0, 0.58, 1] }} exit={{  y: "100vh" }}>
            <div className={styles.modalContainer}>
                <button onClick={onClose} className={styles.closeButton}><span>X</span></button>
                <iframe
                    title='Calendly Window'
                    src="https://calendly.com/asma-sami2021"
                    width="100%"
                    height="100%"
                ></iframe>
            </div>
        </motion.section>
    );
}