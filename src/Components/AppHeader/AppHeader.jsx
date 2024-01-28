import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './AppHeader.css';

import aters_sh from '../../assets/logos/aters_sh.png';
import LoginBtn from './Components/LoginBtn/LoginBtn';

const AppHeader = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(user);
    }, []);

    return (
        <header className='header'>
            <div className='left' onClick={() => navigate('/')}>
                <img className='aters-sh-logo' src={aters_sh} onClick={() => console.log(1)} />
            </div>

            {/* <h1>App Header</h1> */}
            <div className='mid'></div>
            <div className='right'>
                {user ? (
                    <div className='user'>
                        <span className='user-name'>Welcome, {user.display_name}</span>
                        <button className='logout-btn'>Logout</button>
                    </div>
                ) : (location.pathname === '/' ? <LoginBtn /> : <></>)
                }
            </div>


        </header>
    );
};

export default AppHeader;
