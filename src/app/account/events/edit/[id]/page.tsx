'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
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

const EditEvent = ({ params: { id } }: { params: { id: string; } }) => {
    const router = useRouter();
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [eventImagePreview, setEventImagePreview] = useState<string | null>(null);
    const [eventLocationType, setEventLocationType] = useState<string>('online');
    const [images, setImages] = useState<ImageFile[] | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const categories = ['Music', 'Art', 'Food', 'Sports', 'Tech', 'Business', 'Health', 'Fashion', 'Film', 'Science', 'Travel', 'Charity', 'Community', 'Family', 'Education', 'Auto', 'Hobbies', 'Other'];

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            const hour = i % 12 || 12; // Convert 0, 12, 24 to 12
            const amPm = i < 12 ? 'AM' : 'PM';
            options.push(`${hour.toString().padStart(2, '0')}:00 ${amPm}`);
        }
        return options;
    };
    const timeOptions = generateTimeOptions();

    const { event, loading } = useEventById(id);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setMainImg(file); // Update the mainImg state
            setEventImagePreview(URL.createObjectURL(file));
        }
    };


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

    const formik = useFormik({
        initialValues: {
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
        },

        validationSchema: Yup.object({
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

        }),
        onSubmit: async (values) => {
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
            formData.append('seoTitle', values.seoTitle);
            formData.append('seoDescription', values.seoDescription);
            formData.append('seoKeywords', values.seoKeywords);

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
            if (images) {
                images.forEach((image, index) => {
                    formData.append(`images`, image.file);
                });
            }


            try {
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
        },
        enableReinitialize: true,
    });


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
            <form onSubmit={formik.handleSubmit} className={styles.editEvent__form}>
                <div className={styles.editEvent__container_content}>
                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="mainImg">Event&apos;s Image</label>
                        <input
                            type="file"
                            id="mainImg"
                            name="mainImg"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {eventImagePreview && (
                            <Image src={eventImagePreview} alt="Event" width={700} height={700} />
                        )}
                    </div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>
                {formik.touched.title || formik.errors.title && <div>{formik.errors.title}</div>}
                <div className={styles.editEvent__container_content}>
                    <label htmlFor="seoTitle">SEO Title</label>
                    <input
                        type="text"
                        id="seoTitle"
                        name="seoTitle"
                        onChange={formik.handleChange}
                        value={formik.values.seoTitle}
                    />
                </div>
                {formik.touched.seoTitle || formik.errors.seoTitle && <div>{formik.errors.seoTitle}</div>}
                <div className={styles.editEvent__container_content}>
                    <label htmlFor="seoDescription">SEO Description</label>
                    <input
                        type="text"
                        id="seoDescription"
                        name="seoDescription"
                        onChange={formik.handleChange}
                        value={formik.values.seoDescription}
                    />
                </div>
                {formik.touched.seoDescription || formik.errors.seoDescription && <div>{formik.errors.seoDescription}</div>}
                <div className={styles.editEvent__container_content}>
                    <label htmlFor="seoKeywords">SEO Keywords</label>
                    <input
                        type="text"
                        id="seoKeywords"
                        name="seoKeywords"
                        onChange={formik.handleChange}
                        value={formik.values.seoKeywords}
                    />
                </div>
                {formik.touched.seoKeywords || formik.errors.seoKeywords && <div>{formik.errors.seoKeywords}</div>}
                <div className={styles.group}>
                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="dateOfEvent">Event&apos;s Date</label>
                        <input
                            type="date"
                            id="dateOfEvent"
                            name="dateOfEvent"
                            min={new Date().toISOString().split('T')[0]}
                            onChange={formik.handleChange}
                            value={formik.values.dateOfEvent}
                            onBlur={formik.handleBlur}
                        />
                    </div>


                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="timeOfEvent.from">Event&apos;s Starts</label>
                        <select
                            id="timeOfEvent.from"
                            name="timeOfEvent.from"
                            onChange={formik.handleChange}
                            value={formik.values.timeOfEvent.from}>
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="timeOfEvent.to">Event&apos;s Ends</label>
                        <select
                            id="timeOfEvent.to"
                            name="timeOfEvent.to"
                            onChange={formik.handleChange}
                            value={formik.values.timeOfEvent.to}
                        >
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="country">Event&apos;s Country</label>
                        <CountryDropdown
                            id="country"
                            name="country"
                            priorityOptions={
                                ['AE', 'GB', 'CA', 'AU', 'DE',
                                    'EG', 'FR', 'ES', 'NL', 'BR',
                                    'PT', 'MX', 'IN', 'CN', 'JP',
                                    'RU', 'IT', 'SE', 'NO', 'DK',
                                    'FI', 'BE', 'CH', 'AT', 'IE',
                                    'SG', 'ZA', 'NZ', 'AR', 'CL',
                                    'CO', 'PE', 'VE', 'EC', 'UY',
                                ]
                            }
                            value={formik.values.country}
                            onChange={(val) => formik.setFieldValue('country', val)}
                        />
                    </div>


                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="city">Event&apos;s City</label>
                        <RegionDropdown
                            id="city"
                            name="city"
                            country={formik.values.country}
                            value={formik.values.city}
                            onChange={(val) => formik.setFieldValue('city', val)}
                        />
                    </div>




                    <div className={styles.editEvent__container_content}>
                        <label htmlFor="category">Event&apos;s Category</label>
                        <select
                            id="category"
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>

                {formik.touched.country || formik.errors.country && <div className={styles.error}>{formik.errors.country}</div>}
                {formik.touched.city || formik.errors.city && <div className={styles.error}>{formik.errors.city}</div>}
                {formik.touched.category || formik.errors.category && <div className={styles.error}>{formik.errors.category}</div>}

                <div className={styles.editEvent__container_content}>
                    <label>Event&apos;s Location</label>
                    <div className={styles.editEvent__ontainer_content_radios}>
                        <div>
                            <input type="radio" id="online" name="eventType" value="online" checked={eventLocationType === 'online'} onChange={() => setEventLocationType('online')} />
                            <motion.label
                                htmlFor="online"
                                variants={labelVariants}
                                initial={false}
                                animate={eventLocationType === 'online' ? 'active' : 'normal'}
                                style={{ fontSize: "1.2rem" }}
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
                                style={{ fontSize: "1.2rem" }}
                            >
                                In-Person
                            </motion.label>
                        </div>
                    </div>
                    {eventLocationType === 'online' && (
                        <>
                            <div>
                                <label htmlFor="link">Event&apos;s Link:</label>
                                <input
                                    id="link"
                                    name="link"
                                    type="text"
                                    onChange={formik.handleChange}
                                    placeholder="https://www.eventbrite.com/e/your-event"
                                    value={formik.values.link}
                                />
                            </div>
                            {formik.touched.link || formik.errors.link && <div>{formik.errors.link}</div>}
                        </>
                    )}

                    {eventLocationType === 'offline' && (
                        <>
                            <div>
                                <label htmlFor="locationDetails">Event Location Details:</label>
                                <input
                                    id="locationDetails"
                                    name="locationDetails"
                                    type="text"
                                    onChange={formik.handleChange}
                                    placeholder="1234 Main St, City, State, 12345"
                                    value={formik.values.locationDetails}
                                />
                            </div>
                            {formik.touched.locationDetails || formik.errors.locationDetails && <div>{formik.errors.locationDetails}</div>}
                        </>
                    )}
                </div>

                <div className={styles.editEvent__container_content}>
                    <label htmlFor="googleMapLink">Event&apos;s Google Map Link <span>(optional)</span></label>
                    <input
                        id="googleMapLink"
                        name="googleMapLink"
                        type="text"
                        onChange={formik.handleChange}
                        placeholder="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14474.738833"
                        value={formik.values.googleMapLink}
                    />
                </div>
                {formik.touched.googleMapLink && <div>{formik.errors.googleMapLink}</div>}

                <div className={styles.editEvent__container_content}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <input type="file" multiple onChange={handleImagesChange} accept="image/*" />
                {imagePreviews && <div className={styles.wrap}>
                    {imagePreviews.map((preview, index) => (
                        <Image key={index} src={preview} alt={`Image ${index}`} width={250} height={220} />
                    ))}
                </div>}
                {formik.touched.description || formik.errors.description && <div>{formik.errors.description}</div>}
                <div className={styles.editEvent__container_content}>
                    <button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? 'Updating...' : 'Update'}</button>
                </div>
                {Object.keys(formik.errors).length > 0 && (
                    <div className={styles.errors}>
                        <h4>Form Validation Errors:</h4>
                        <ul>
                            {Object.entries(formik.errors).map(([key, value]) => (
                                <li key={key}>{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>

        </main>
    );
};

export default EditEvent;
