import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

import './AppHeader.css';
import aters_sh from '../../assets/logos/aters_sh.png';
import LoginBtn from './Components/LoginBtn/LoginBtn';
import { Logout, getSession } from '../../scripts/Session';
import ProfileDropDown from './Components/ProfileDropDown/ProfileDropDown';

const AppHeader = (props) => {
    // const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location.pathname);

    const logout = () => {
        Logout();
        props.setUser(null);

        if (location.pathname !== '/schedule'){
            navigate(location.pathname);
        }

        if (location.pathname === '/profile'){
            navigate('/');
        }
    }

    const onProfileClick = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        props.setUser(getSession());
        // console.log(user)
        // eslint-disable-next-line
    }, []);

    return (
        <header className='header'>
            <div className='left'>
                <img className='aters-sh-logo' src={aters_sh} alt='logo' onClick={() => navigate('/')} />
            </div>

            {/* <h1>App Header</h1> */}
            <div className='mid'></div>
            <div className='right'>
                {props.user ? (
                    <div className='user'>

                        {
                            location.pathname === '/' ? (
                                <div className='username-container'>
                                    <p className='user-name'>Welcome, {props.user.name}</p>
                                </div>
                            ) : <div className='username-container'></div>
                        }
                        <div className='profile-btn-container'>
                            <div className='profile-btn' onClick={onProfileClick}>
                                <PersonIcon fontSize='large' className='user-icon' />
                            </div>
                        </div>
                        {
                            showMenu ? (
                                <div className='menu'>
                                    {/* <button className='logout-btn' onClick={logout}>Logout</button> */}
                                    <ProfileDropDown name={props.user.name} image={props.user.photoURL} logout={logout} />

                                </div>

                            ) : <div/>
                        }
                    </div>
                ) : (location.pathname !== '/signin' && location.pathname !== '/signup' ? (
                    <div className='login-btn'>
                        <LoginBtn />
                    </div>
                ) : <></>)
                }
            </div>


        </header>
    );
};

export default AppHeader;
