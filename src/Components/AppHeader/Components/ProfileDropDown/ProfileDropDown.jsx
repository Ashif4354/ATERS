import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ProfileDropDown.css';
import DefaultProfilePic from '../../../../assets/images/default-profile-image.png';

const ProfileDropDown = (props) => {
    const navigate = useNavigate();

    const onProfileClick = () => {
        navigate('/profile');
    }

    const onLogoutClick = () => {
        props.logout();
    }

    return (
        <div className='profile-drop-down'>
            <div className='name-container'>
                <p className='name'>{props.name}</p>
            </div>

            <div className='photo-container'>
                <div className='left-space' />
                <div className='image-canvas'>
                    {
                        props.image ? (
                            <img src={props.image} alt='profile' className='profile-image' />
                        ) : (
                            <img src={DefaultProfilePic} alt='profile' className='profile-image' />
                        )
                    }

                </div>
                <div className='right-space' />
            </div>

            <div className='btn-container'>
                <button className='profile-btn button' onClick={onProfileClick}>Profile</button>
                <button className='logout-btn button' onClick={onLogoutClick}>Logout</button>
            </div>
        </div>
    );
};

export default ProfileDropDown;