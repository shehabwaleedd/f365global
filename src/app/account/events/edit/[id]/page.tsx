'use client'

import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomField from '../../components/CustomField';
import CheckboxGroupFieldArray from '../../components/ChecboxGroupFieldArray';
import axios from 'axios';
import styles from "./page.module.scss"
import Image from 'next/image';
import { useEventById } from '@/lib/events/client/useEventById';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { motion } from 'framer-motion';
import Loading from '../../../../../animation/loading/Loading';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'sonner';
import { ImageFile } from '@/types/common';
import ReactQuillField from '../../components/ReactQuillField';

const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
        const hour = i % 12 || 12; // Convert 0, 12, 24 to 12
        const amPm = i < 12 ? 'AM' : 'PM';
        options.push(`${hour.toString().padStart(2, '0')}:00 ${amPm}`);
    }
    return options;
};
const categories = ['Music', 'Art', 'Food', 'Sports', 'Tech', 'Business', 'Health', 'Fashion', 'Film', 'Science', 'Travel', 'Charity', 'Community', 'Family', 'Education', 'Auto', 'Hobbies', 'Other'];


const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, "Title is too short").max(150, "Title is too long"),
    description: Yup.string().required('Description is required').min(100, 'Description is too long, minumum 100 letters').max(4000, 'Description is too long, maximum 4000 letters'),
    dateOfEvent: Yup.date().required('Date is required').min(new Date(), "Date can't be in the past"),
    timeOfEvent: Yup.object().shape({
        from: Yup.string().required('Start time is required'),
        to: Yup.string().required('End time is required'),
    }),
    location: Yup.string().oneOf(['online', 'offline'], 'Invalid location type').required('Location is required'),
    category: Yup.string().oneOf([...categories], 'Invalid category').required('Category is required'),
    link: Yup.string().min(10, 'Link is too short').max(100, 'Link is too long'),
    locationDetails: Yup.string().min(10, 'Location details is too short').max(500, 'Location details is too long'),
    googleMapLink: Yup.string().min(10, 'Google map link is too short').max(1000, 'Google map link is too long'),
    country: Yup.string().min(2, 'Country is too short').max(50, 'Country is too long'),
    city: Yup.string().min(2, 'City is too short').max(50, 'City is too long'),
    seoTitle: Yup.string().min(10, 'SEO title is too short').max(70, 'SEO title is too long'),
    seoDescription: Yup.string().min(10, 'SEO description is too short').max(150, 'SEO description is too long'),
    seoKeywords: Yup.string().min(10, 'SEO keywords is too short').max(150, 'SEO keywords is too long'),
});
const EditEvent = ({ params: { id } }: { params: { id: string; } }) => {
    const router = useRouter();
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [eventImagePreview, setEventImagePreview] = useState<string | null>(null);
    const [eventLocationType, setEventLocationType] = useState<string>('online');
    const [images, setImages] = useState<ImageFile[] | null>(null);
    const { event, loading } = useEventById(id);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const timeOptions = generateTimeOptions();


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setMainImg(file); // Update the mainImg state
            setEventImagePreview(URL.createObjectURL(file));
        }
    };


    const initialValues = {
        title: event?.title || '',
        description: event?.description || '',
        dateOfEvent: event?.dateOfEvent || '',
        timeOfEvent: {
            from: event?.timeOfEvent?.from || '',
            to: event?.timeOfEvent?.to || '',
        },
        location: event?.location || '',
        locationDetails: event?.locationDetails || '',
        link: event?.link || '',
        category: event?.category || '',
        country: event?.country || '',
        city: event?.city || '',
        googleMapLink: event?.googleMapLink || '',
        seoTitle: event?.seoTitle || '',
        seoDescription: event?.seoDescription || '',
        seoKeywords: event?.seoKeywords || '',
    }




    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const imageFiles: ImageFile[] = filesArray.map(file => ({ file }));
            setImages(imageFiles);
            setImagePreviews(filesArray.map(file => URL.createObjectURL(file)));
        }
    };


    useEffect(() => {
        if (!loading && event) {
            setEventImagePreview(event.mainImg?.url || "");
            setEventLocationType(event.location);
            setImagePreviews(event.images.map(img => img.url));

        }
    }, [event, loading]);


    const labelVariants = {
        active: {
            backgroundColor: 'var(--title-color)',
            color: 'var(--container-color)',
            padding: '0.3rem 0.5rem',
            borderRadius: '2rem',
            transition: { ease: 'easeOut', duration: 0.3 },
        },
        normal: {
            backgroundColor: 'var(--background-color)',
            color: 'var(--title-color)',
            padding: '0.3rem 0.5rem',
            borderRadius: '2rem',
        },
    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('timeOfEvent[from]', values.timeOfEvent.from);
            formData.append('timeOfEvent[to]', values.timeOfEvent.to);
            formData.append('location', values.location);
            formData.append('category', values.category);
            formData.append('country', values.country);
            formData.append('city', values.city);
            formData.append('googleMapLink', values.googleMapLink);
            formData.append('seoTitle', values.seoTitle);
            formData.append('seoDescription', values.seoDescription);
            values.seoKeywords.forEach((keyword: string) => formData.append('seoKeywords', keyword));

            if (eventLocationType === 'online') {
                formData.append('link', values.link);
            } else {
                formData.append('locationDetails', values.locationDetails);
            }

            if (mainImg) {
                formData.append('mainImg', mainImg);
            }
            if (images) {
                images.forEach((image, index) => {
                    formData.append(`images`, image.file);
                })
            }
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${id}`,
                formData, {
                headers: {
                    token: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success('Event updated successfully');
                router.push('/account');
            } else {
                toast.error('Failed to update event');
            }
        } catch (error: any) {
            toast.error(error.response ? error.response.data.err : 'Failed to update event');
        }

        setSubmitting(false);
    }


    if (loading) {
        return <Loading height={100} />;
    }



    return (
        <main className={styles.editEvent}>
            <section className={styles.upper}>
                <Link href="/account">
                    <IoArrowBack />
                    <span>Back to Account</span>
                </Link>
                <h1>Edit your event</h1>
            </section>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize>
                {({ values, isSubmitting, setFieldValue }) => (
                    <section>
                        <Form>
                            <div className={styles.group}>
                                <CustomField name="title" label='title' fieldType="input" />
                                <CustomField name="seoTitle" label='SEO Title' fieldType="input" />
                            </div>
                            <div className={styles.group}>
                                <ReactQuillField name="description" label='Description' value={values.description} onChange={setFieldValue}
                                />
                                <CustomField name="seoDescription" label='SEO Description' fieldType="textarea" />
                            </div>
                            
                        </Form>
                    </section>
                )}
            </Formik>

        </main>
    );
};

export default EditEvent;
