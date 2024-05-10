'use client'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from "../unified.module.scss"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import Textarea from '../components/TextAreaInput';
import { ImageFile } from '@/types/common';
import { CountrySelectInput, RegionSelectInput } from '../components/CountrySelectOption';
import TimeSelectInput from '../components/TimeSelectInput';
import ReactQuillField from '../components/ReactQuillField';
import ImagesUploader from '../components/ImagesUploader';
import { Toaster, toast } from 'sonner';
import CheckboxGroupFieldArray from '../components/ChecboxGroupFieldArray';
import { keywordOptions } from '../presets';
import CustomField from '../components/CustomField';
const categories = ['Music', 'Art', 'Food', 'Sports', 'Tech', 'Business', 'Health', 'Fashion', 'Film', 'Science', 'Travel', 'Charity', 'Community', 'Family', 'Education', 'Auto', 'Hobbies', 'Other'];
const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, "Title is too short").max(50, "Title is too long"),
    description: Yup.string().required('Description is required').min(100, 'Description is too short, minumum 100 letters').max(4000, 'Description is too long, maximum 4000 letters'),
    dateOfEvent: Yup.date(),
    timeOfEvent: Yup.object().shape({
        from: Yup.string(),
        to: Yup.string(),
    }),
    location: Yup.string().oneOf(['online', 'offline'], 'Invalid location type'),
    category: Yup.string().oneOf([...categories], 'Invalid category'),
    link: Yup.string().min(10, 'Link is too short').max(100, 'Link is too long'),
    locationDetails: Yup.string().min(10, 'Location details is too short').max(500, 'Location details is too long'),
    googleMapLink: Yup.string(),
    country: Yup.string().min(2, 'Country is too short').max(50, 'Country is too long'),
    city: Yup.string().min(2, 'City is too short').max(50, 'City is too long'),
    seoTitle: Yup.string().min(10, 'SEO Title is too short').max(50, 'SEO Title is too long'),
    seoDescription: Yup.string().min(10, 'SEO Description is too short').max(50, 'SEO Description is too long'),
    seoKeywords: Yup.string().min(10, 'SEO Keywords is too short').max(50, 'SEO Keywords is too long'),
});


const generateTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        const time = `${i < 10 ? `0${i}` : i}:00`;
        times.push(time);
    }
    return times;
}



const ImageUploader = ({ mainImg, setMainImg, label }: { mainImg: File | null; setMainImg: (img: File) => void, label: string }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            setMainImg(image);
        }
    };

    return (
        <div className={styles.createEvent__container_content}>
            <label htmlFor="mainImg">{label} Image</label>
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

const CreateEvent = () => {

    const router = useRouter();
    const [mainImg, setMainImg] = useState<File | string>('');
    const [submitError, setSubmitError] = useState('');
    const [eventLocationType, setEventLocationType] = useState('online'); // New state to manage event location type
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [seoImage, setSeoImage] = useState<File | null>(null);


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
        images: [],
        seoTitle: '',
        seoDescription: '',
        seoKeywords: [],

    }

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const formData = new FormData();
        if (mainImg) {
            formData.append('mainImg', mainImg);
        } else {
            console.error("No main image selected");
        }

        if (seoImage) {
            formData.append('seoImage', seoImage);
        }
        if (uploadedImages.length > 0) {
            uploadedImages.forEach((image, index) => {
                formData.append(`images`, image.file);
            });
        }

        formData.append('title', values.title);
        formData.append('seoTitle', values.seoTitle);
        formData.append('seoDescription', values.seoDescription);
        formData.append('description', values.description);
        formData.append('dateOfEvent', values.dateOfEvent);
        formData.append('timeOfEvent[from]', values.timeOfEvent.from);
        formData.append('timeOfEvent[to]', values.timeOfEvent.to);
        formData.append('category', values.category);
        formData.append('location', values.location);
        
        if (values.googleMapLink) {
            formData.append('googleMapLink', values.googleMapLink);
        }
        
        values.seoKeywords.forEach((keyword: string) => formData.append('seoKeywords', keyword));
        formData.append('country', values.country);
        formData.append('city', values.city);

        if (eventLocationType === 'online') {
            formData.append('link', values.link);
        } else {
            formData.append('locationDetails', values.locationDetails);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`); 
        }


        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/event`, formData, {
                headers: {
                    token: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Event created successfully');
                router.push('/events');
            } else {
                toast.error('Failed to create event');
                throw new Error('Failed to create event');

            }
        } catch (error: any) {
            console.error('Failed to create event:', error);
            setSubmitError(error.response?.data.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className={styles.unifiedInputComponent}>
            <Toaster />
            <section className={styles.unifiedInputComponent__container}>
                <h1>Create Your Next Event</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}>
                    {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
                        <Form className={styles.unifiedInputComponent__container_form}>
                            <div className={styles.groupCheckboxes}>
                                <CustomField name="title" label="Event's Title" fieldType="input" />
                                <CustomField name="dateOfEvent" label="Event's Date" fieldType="date" />
                            </div>
                            <div className={styles.groupCheckboxes}>
                                <ImageUploader mainImg={mainImg as File | null} setMainImg={setMainImg} label="Event's Main" />
                                <ImageUploader mainImg={seoImage} setMainImg={setSeoImage} label="SEO Image" />

                            </div>
                            <div className={styles.checkboxField}>
                                <div className={styles.groupCheckboxes}>
                                    <CustomField name="seoTitle" label="SEO Title" fieldType="input" />
                                    <CustomField name="seoDescription" label="SEO Description" fieldType="input" />
                                </div>
                                <CheckboxGroupFieldArray name='seoKeywords' options={keywordOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.seoKeywords ?? []} />
                            </div>


                            <div className={styles.groupCheckboxes}>
                                <CustomField name="timeOfEvent.from" label="Event's Start Time" fieldType="select" options={generateTimes().map((time) => ({ value: time, label: time }))}/>
                                <CustomField name="timeOfEvent.to" label="Event's End Time" fieldType="select" options={generateTimes().map((time) => ({ value: time, label: time }))} />
                            </div>
                            <div className={styles.groupCheckboxes}>
                                <CountrySelectInput name="country" />
                                <RegionSelectInput countryFieldName="country" name="city" />
                                <CustomField name="category" label="Event's Category" fieldType="select" options={categories.map((cat) => ({ value: cat, label: cat }))} />
                            </div>




                            <div className={styles.pricingField}>
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
                                {eventLocationType === 'online' && (<TextInput label="Event Link" name="link" placeholder="https://www.eventbrite.com/e/your-event" id="Event Link" />)}
                                {eventLocationType === 'offline' && (<Textarea label="Event's Location Details" name="locationDetails" id="1234 Main St, City, State, 12345" />)}
                            </div>
                            <div className={styles.pricingField}>
                                <CustomField name="googleMapLink" label="Google Map Link" fieldType="input" />
                                <ReactQuillField label="Tell us more about your event" name="description" value={values.description} onChange={setFieldValue} />
                            </div>
                            <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating Event...' : 'Create Event'}
                            </button>
                            {submitError && <div className={styles.error}>{submitError}</div>}
                        </Form>
                    )}
                </Formik>
            </section>
        </main >
    )
}

export default CreateEvent
