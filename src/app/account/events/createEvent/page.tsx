'use client'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from "./page.module.scss"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';
import Textarea from './components/TextAreaInput';
import { CountrySelectInput, RegionSelectInput } from './components/CountrySelectOption';
import TimeSelectInput from './components/TimeSelectInput';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import ReactQuillField from './components/ReactQuillField';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const categories = ['Music', 'Art', 'Food', 'Sports', 'Tech', 'Business', 'Health', 'Fashion', 'Film', 'Science', 'Travel', 'Charity', 'Community', 'Family', 'Education', 'Auto', 'Hobbies', 'Other'];
const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, "Title is too short").max(50, "Title is too long"),
    description: Yup.string().required('Description is required').min(100, 'Description is too short, minumum 100 letters').max(4000, 'Description is too long, maximum 4000 letters'),
    dateOfEvent: Yup.date().required('Date is required').min(today, "Date can't be in the past"),
    timeOfEvent: Yup.object().shape({
        from: Yup.string().required('Start time is required'),
        to: Yup.string().required('End time is required'),
    }),
    location: Yup.string().oneOf(['online', 'offline'], 'Invalid location type').required('Location is required'),
    category: Yup.string().oneOf([...categories], 'Invalid category').required('Category is required'),
    link: Yup.string().min(10, 'Link is too short').max(100, 'Link is too long'),
    locationDetails: Yup.string().min(10, 'Location details is too short').max(500, 'Location details is too long'),
    googleMapLink: Yup.string().min(10, 'Google map link is too short').max(200, 'Google map link is too long'),
    country: Yup.string().min(2, 'Country is too short').max(50, 'Country is too long'),
    city: Yup.string().min(2, 'City is too short').max(50, 'City is too long'),
});

const ImageUploader = ({ mainImg, setMainImg }: { mainImg: File | null; setMainImg: (img: File) => void }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            setMainImg(image);
        }
    };

    return (
        <div className={styles.createEvent__container_content}>
            <label htmlFor="mainImg">Event&apos;s Main Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImg && (
                <Image
                    src={URL.createObjectURL(mainImg)}
                    alt="Event Main Image"
                    title='Event Main Image'
                    width={500}
                    height={500}
                />
            )}
        </div>
    );
};

const ReactQuillModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }], // Color and background color options
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

const ReactQuillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background' // Enable color and background formatting
];

const CreateEvent = () => {

    const router = useRouter();
    const [mainImg, setMainImg] = useState<File | string>('');
    const [submitError, setSubmitError] = useState('');
    const [eventLocationType, setEventLocationType] = useState('online'); // New state to manage event location type



    const labelVariants = {
        active: {
            backgroundColor: 'var(--title-color)',
            color: 'var(--opposite-color)',
            padding: '0.3rem 0.5rem',
            borderRadius: '2rem',
            transition: { ease: 'easeOut', duration: 0.3 },
            fontSize: "1rem",
        },
        normal: {
            backgroundColor: ' var(--dimmed-color)',
            color: 'var(--title-color)',
            padding: '0.3rem 0.5rem',
            borderRadius: '2rem',
            fontSize: "1rem",
            transition: { ease: 'easeOut', duration: 0.3 },
        },
    };
    const initialValues = {
        title: '',
        description: '',
        dateOfEvent: '',
        timeOfEvent: {
            from: '',
            to: '',
        },
        location: eventLocationType,
        locationDetails: '',
        link: '',
        category: '',
        googleMapLink: '',
        country: '',
        city: '',
        mainImg: null,

    }

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const formData = new FormData();
        if (mainImg) {
            formData.append('mainImg', mainImg);
        } else {
            console.error("No main image selected");
        }
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('dateOfEvent', values.dateOfEvent);
        formData.append('timeOfEvent[from]', values.timeOfEvent.from);
        formData.append('timeOfEvent[to]', values.timeOfEvent.to);
        formData.append('category', values.category);
        formData.append('location', values.location);
        if (values.googleMapLink) {
            formData.append('googleMapLink', values.googleMapLink);
        }

        formData.append('country', values.country);
        formData.append('city', values.city);

        if (eventLocationType === 'online') {
            formData.append('link', values.link);
        } else {
            formData.append('locationDetails', values.locationDetails);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`); // This will log each key-value pair in your FormData
        }


        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/event`, formData, {
                headers: {
                    token: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                router.push('/events');
            } else {
                throw new Error('Failed to create event');
            }
        } catch (error: any) {
            setSubmitError(error.response?.data.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className={styles.createEvent}>

            <section className={styles.createEvent__container}>
                <h1>Create Your Next Event</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
                        <Form>
                            <ImageUploader mainImg={mainImg as File | null} setMainImg={setMainImg} />
                            <div className={styles.group}>
                                <TextInput label="Event's Name" name="title" type="text" placeholder="Throwback awareness, She takes control - F365 X MG Motor Event" id="title"/>
                                <div className={styles.createEvent__container_content}>
                                    <label htmlFor="dateOfEvent">Event&apos;s Date</label>
                                    <input

                                        type="date"
                                        id="dateOfEvent"
                                        name="dateOfEvent"
                                        // event can't be in the past
                                        min={new Date().toISOString().split('T')[0]}
                                        value={values.dateOfEvent || ''}
                                        onChange={e => setFieldValue('dateOfEvent', e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className={styles.group}>
                                <TimeSelectInput label="Event's Starts" name="timeOfEvent.from" />
                                <TimeSelectInput label="Event's Ends" name="timeOfEvent.to" />
                            </div>
                            <div className={styles.group}>
                                <CountrySelectInput name="country" />
                                <RegionSelectInput countryFieldName="country" name="city" />
                                <SelectInput label="Event's Category" name="category" options={categories} placeholder="Select Category" id="category"/>
                            </div>

                            <div className={styles.createEvent__container_content}>
                                <label>Event&apos;s Location</label>
                                <div className={styles.createEvent__ontainer_content_radios}>
                                    <div>
                                        <input type="radio" id="online" name="eventType" value="online" checked={eventLocationType === 'online'} onChange={() => setEventLocationType('online')} />
                                        <motion.label
                                            htmlFor="online"
                                            variants={labelVariants}
                                            initial={false}
                                            animate={eventLocationType === 'online' ? 'active' : 'normal'}
                                        >
                                            Online
                                        </motion.label>
                                    </div>
                                    <div>
                                        <input type="radio" id="offline" name="eventType" value="offline" checked={eventLocationType === 'offline'} onChange={() => setEventLocationType('offline')} />
                                        <motion.label
                                            htmlFor="offline"
                                            variants={labelVariants}
                                            initial={false}
                                            animate={eventLocationType === 'offline' ? 'active' : 'normal'}
                                        >
                                            In-Person
                                        </motion.label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.group}>
                                <div className={styles.createEvent__container_content}>
                                    {eventLocationType === 'online' && (<TextInput label="Event Link" name="link" placeholder="https://www.eventbrite.com/e/your-event" id="Event Link"/>)}
                                    {eventLocationType === 'offline' && (<Textarea label="Event's Location Details" name="locationDetails" id="1234 Main St, City, State, 12345" />)}
                                </div>
                                <TextInput label="Event's Google Map Link (optional)" name="googleMapLink" placeholder="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14474.738833"id="googleMapLink" />
                            </div>
                            <ReactQuillField label="Tell us more about your event" name="description" value={values.description} onChange={setFieldValue} />
                            <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
                                {isSubmitting ? 'Creating Event...' : 'Create Event'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </main >
    )
}

export default CreateEvent
