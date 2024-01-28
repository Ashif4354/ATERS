import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginBtn.css';

import skeleton from '../../../../assets/logos/skeleton.png';

const LoginBtn = () => {

    const navigate = useNavigate();

    return (
        <button className='btn' onClick={() => navigate('/signin')}>
            <div className='btn-content'>
                <div className='logo'>
                    <img className='skeleton' src={skeleton} alt='sh_logo' />
                </div>
                <div className='text-container'>
                    <p className='text'>Join</p>
                </div>
            </div>
        </button>
    );
};

export default LoginBtn;
