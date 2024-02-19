import React, { useEffect, useState, useRef } from 'react';
import Footer from '../../Components/Footer/Footer';
import AppHeader from '../../Components/AppHeader/AppHeader';
import LoginToContinue from './Components/LoginToContinue/LoginToContinue';
import { getSession } from '../../scripts/Session';


import './Profile.css';
import ScheduleCard from './Components/ScheduleCard/ScheduleCard';
import ReCAPTCHA from 'react-google-recaptcha';
import getUserData from './scripts/getUserData';

const Profile = () => {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState(null);
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const recaptchaRef = useRef(null);

    useEffect(() => {
        recaptchaRef.current.execute()
        setUser(getSession());

    }, []);

    useEffect(() => {
        if (recaptchaToken) {
            getUserData(user.email, recaptchaToken, setUserData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recaptchaToken]);


    return (
        <div>
            <div className='main-container'>
                <AppHeader user={user} setUser={setUser} />

                {
                    user ? (
                        userData ? (
                            <div className='profile-page'>
                                <div className='profile-container'>
                                    <h1 className='heading'>Profile</h1>
                                    <div className='profile-photo-container'>
                                        <img className='profile-photo' src={user.photoURL} alt='profile' />
                                    </div>
                                    <div className='user-profile-details-container'>
                                        <p><span className='detail-title'>Name:</span> <span className='detail-value'>{user.name}</span></p>
                                        <div className='space-between-details' />
                                        <p><span className='detail-title'>Email:</span> <span className='detail-value'>{user.email}</span></p>
                                    </div>
                                </div>

                                <div className='schedules-container'>
                                    <h1 className='heading'>Your Schedules</h1>

                                    <div className='schedules-scroll'>
                                        {
                                            userData.schedules.map((schedule, index) => {
                                                return (
                                                    <ScheduleCard key={index} schedule={schedule} />
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <Footer />
                            </div>
                        ) : (
                            <div className='middle-container'>
                                <h1>Loading...</h1>
                            </div>
                        )
                    )

                        :
                        (
                            <LoginToContinue />
                        )
                }

            </div>
            {
                !user && <Footer />
            }
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_g_recaptcha_invisible_site_key}
                size="invisible"
                ref={recaptchaRef}
                onChange={(token) => setRecaptchaToken(token)}
            />


        </div>
    );
};

export default Profile;
