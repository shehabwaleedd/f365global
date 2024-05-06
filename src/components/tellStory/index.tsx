'use client'
import styles from './style.module.scss'
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().positive().integer().required('Age is required'),
    message: Yup.string().required('Message is required').min(25, 'Message is too short').max(1000, 'Message is too long'),
});

type FormValuesType = {
    name: string;
    email:string
}



export default function TellUsYourStory({ onClose } : { onClose: () => void;}) {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            gender: '',
            age: '',
            message: '',
        },
        validationSchema,
        onSubmit: (values: FormValuesType, { setSubmitting, resetForm }: { setSubmitting: boolean, resetForm: () => void }) => {
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', values, 'YOUR_USER_ID')
                .then((result) => {
                    console.log(result.text);
                    // Handle successful submission here
                }, (error) => {
                    console.log(error.text);
                    // Handle errors here
                })
                .finally(() => {
                    setSubmitting = false;
                    resetForm();
                });
        },
    });

    return (
        <motion.section className={styles.tellUsYourStory} initial={{ y: "100vh" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", ease: [0.42, 0, 0.58, 1] }} exit={{ y: "100vh" }}>
            <div className={styles.tellUsYourStory__close}>
                <button onClick={onClose} className={styles.closeButton}>
                    <span>X</span>
                </button>
            </div>
            <h2>Tell Us Your Story</h2>
            <form onSubmit={formik.handleSubmit} className={styles.tellUsYourStory__form}>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Your Name"
                />
                {formik.touched.name && formik.errors.name ? <div className={styles.tellUsYourStory__error}>{formik.errors.name}</div> : null}

                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Your Email"
                />
                {formik.touched.email && formik.errors.email ? <div className={styles.tellUsYourStory__error}>{formik.errors.email}</div> : null}

                <select
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                >
                    <option value="" label="Select a gender" />
                    <option value="female" label="Female" />
                    <option value="male" label="Male" />
                    <option value="other" label="Other" />
                </select>
                {formik.touched.gender && formik.errors.gender ? <div className={styles.tellUsYourStory__error}>{formik.errors.gender}</div> : null}

                <input
                    type="number"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    placeholder="Your Age"
                />
                {formik.touched.age && formik.errors.age ? <div className={styles.tellUsYourStory__error}>{formik.errors.age}</div> : null}

                <textarea
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    placeholder="Your Message/Story"
                />
                {formik.touched.message && formik.errors.message ? <div className={styles.tellUsYourStory__error}>{formik.errors.message}</div> : null}

                <button type="submit" className={styles.story__btn} disabled={formik.isSubmitting}>{formik.isSubmitting ? "Submitting..." : "Submit"}</button>
            </form>

        </motion.section>
    );
}