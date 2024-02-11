import React from 'react';

import './Footer.css';
import opWorldHat from '../../assets/logos/op-world-hat.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='footer'>
            <div className='icon-container'>
                <img src={opWorldHat} alt='op-world-hat' />
            </div>

            <div className='links-container'>
                <button
                    className='footer-button'
                    onClick={() => { navigate('/developers') }}
                > Developers
                </button>
                <button
                    className='footer-button'
                    onClick={() => { navigate('/tc') }}
                > Terms & Conditions
                </button>
                <button
                    className='footer-button'
                    onClick={() => { navigate('/privacypolicy')}}
                > Privacy Policy
                </button>
                <button
                    className='footer-button'
                    onClick={() => { navigate('/contactus')}}
                > Contact Us
                </button>
            </div>
        </footer>
    );
};

export default Footer;
