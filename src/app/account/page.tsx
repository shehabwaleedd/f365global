'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import styles from './page.module.scss'
import { useAuth } from '../../context/AuthContext'
import PersonalInfo from '../../components/accountComponents/personalInfo'
import ChangePassword from "../../components/accountComponents/changePassword"
import { AnimatePresence } from 'framer-motion'
import UserEvents from '../../components/accountComponents/userEvents'
import Loading from '../../animation/loading/Loading'
import SuperAdminView from '../../components/accountViews/superAdmin'
import AdminView from '../../components/accountViews/admin'
import UserView from '../../components/accountViews/user'
import Participants from '../../components/accountComponents/participants'
import AllUsers from '../../components/accountComponents/allUsers'
import PendingEvents from '../../components/accountComponents/pendingEvents'
import AllEvents from '../../components/accountComponents/allEvents'
import ForgotPassword from '../../components/accountComponents/forgetPassword'
import CreateEvent from './events/createEvent/page'

const Account = () => {
    const { user, loading, error, setUser, handleLogout, isLoggedIn } = useAuth();
    const [activeSection, setActiveSection] = useState<string>('');


    const handleOpen = (sectionName: string) => () => {
        setActiveSection(sectionName);
    };



    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem('token');
        const { avatar } = user || {};
        const formData = new FormData();
        if (avatar) formData.append('avatar', avatar.url);
        if (event?.currentTarget?.files) {
            formData.append('avatar', event.currentTarget.files[0]);
        }


        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });
            console.log(response.data);
            setUser(response.data.data.user);
        }
        catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Loading height={100} />;
    if (typeof error === 'string') return <div>Error: {error}</div>;
    if (!user || !isLoggedIn) return <div>loading...</div>




    return (
        <main className={styles.account}>
            <div className={styles.account__upper}>
                <h1>Account</h1>
                <button onClick={handleLogout}>
                    <span>
                        Logout
                    </span>
                </button>
            </div>
            <div className={styles.account__lower}>
                <div className={styles.account__lower_left}>
                    <div className={styles.account__lower_left_upper}>
                        <div className={styles.account_lower_left_upper_top}>
                            <Image src={user.avatar ? user.avatar.url : '/user.png'} alt="user" width={300} height={300} quality={100} priority={true} />
                        </div>

                        <div className={styles.account_lower_left_upper_middle}>
                            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleAvatarChange} />
                            <label htmlFor="avatar">Change Profile Picture</label>
                        </div>
                        <div className={styles.account_lower_left_upper_bottom}>
                            <h2>{user.name}</h2>
                        </div>
                    </div>
                    <div className={styles.account__lower_left_lower}>
                        {user.role === 'superAdmin' ? <SuperAdminView handleOpen={handleOpen} /> : user.role === 'admin' ? <AdminView handleOpen={handleOpen} /> : <UserView handleOpen={handleOpen} />}
                    </div>
                </div>

                <div className={styles.account__lower_right}>

                    <AnimatePresence mode='wait'>
                        {activeSection === 'personalInfo' && <PersonalInfo user={user} />}
                        {activeSection === 'changePassword' && <ChangePassword />}
                        {activeSection === 'userEvents' && <UserEvents />}
                        {activeSection === 'createEvent' && <CreateEvent />}
                        {activeSection === 'participants' && <Participants />}
                        {activeSection === 'events' && <AllEvents />}
                        {activeSection === 'users' && <AllUsers />}
                        {activeSection === 'pendingEvents' && <PendingEvents />}
                        {activeSection === 'forgotPassword' && <ForgotPassword />}
                        {activeSection === '' && <div className={styles.account__lower_right_default} style={{ padding: "1rem" }}><h2>Select a section to view</h2></div>}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    )
}

export default Account