'use client'
import styles from './style.module.scss'
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useFormik, FormikHelpers, Formik, Form } from 'formik';
import * as Yup from 'yup';
import useWindowWidth from '@/hooks/useWindowWidth';
import common from "@/app/page.module.scss"
import CustomField from '@/app/account/events/components/CustomField';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().positive().integer().required('Age is required'),
    message: Yup.string().required('Message is required').min(25, 'Message is too short').max(1000, 'Message is too long'),
});

type FormValuesType = {
    name: string;
    email: string;
    message: string;
    gender: string;
    age: number;
}

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
];


export default function TellUsYourStory({ onClose }: { onClose: () => void; }) {
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth !== null && windowWidth < 768;
    const initialValues = {
        name: '',
        email: '',
        message: '',
        gender: '',
        age: 0,
    }

    const handleSubmit = async (values: FormValuesType, { setSubmitting, resetForm }: FormikHelpers<FormValuesType>) => {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', values, 'YOUR_USER_ID')
    }


    return (
        <motion.section className={`${styles.tellUsYourStory} ${common.bottomGlass}`} initial={{ y: "100vh" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", ease: [0.42, 0, 0.58, 1] }} exit={{ y: "100vh" }}>
            <div className={styles.tellUsYourStory__close}>
                <button onClick={onClose} className={styles.closeButton}>
                    <span>X</span>
                </button>
            </div>
            <h2>Tell Us Your Story</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
                className={styles.tellUsYourStory__form}
            >
                {({ values, setFieldValue, isSubmitting }) => (

                    <Form className={styles.tellUsYourStory__form}>
                        <div className={styles.tellUsYourStory__form__group}>
                            <CustomField name="name" label="Name" fieldType='input' />
                            <CustomField name="email" label="Email" fieldType='input' />
                        </div>
                        <div className={styles.tellUsYourStory__form__group}>
                            <CustomField name='gender' label='Gender' fieldType='select' options={genderOptions} />
                            <CustomField name='age' label='Age' fieldType='input' />
                        </div>
                        <CustomField name='message' label='Message' fieldType='textarea' />
                        <button className={common.submitButton} type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </Form>

                )}

            </Formik>

        </motion.section>
    );
}