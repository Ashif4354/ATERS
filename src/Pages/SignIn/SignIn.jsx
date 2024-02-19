import React, { useState, useRef, useEffect } from 'react';
import './SignIn.css';

import { auth, provider } from "../../config/firebase";// eslint-disable-next-line
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

import TextField from '@mui/material/TextField';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../../Components/AppHeader/AppHeader';
import { createSession, getSession } from '../../scripts/Session';
import Footer from '../../Components/Footer/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import createProfileInDB from '../../scripts/createProfileInDB';
import SignOutToContinue from '../../Components/SignOutToContinue/SignOutToContinue';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');// eslint-disable-next-line
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const recaptchaRef = useRef(null);
    const navigate = useNavigate();

    const handleEmailSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // setUser(result.user);
                const user = result.user;
                const loggedInUser = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
                setUser(loggedInUser)
                createSession(loggedInUser)
                navigate('/')

            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleGoogleSignIn = async () => {

        signInWithPopup(auth, provider)
            // signInWithRedirect(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                // console.log("TOKEN", token);
                // console.log("USER", user);
                const loggedInUser = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }

                setUser(loggedInUser)
                createSession(loggedInUser)
                navigate('/')

                createProfileInDB(recaptchaRef, user.displayName, user.email)


            })
            .catch((error) => {
                console.log(error);
            })

    };

    useEffect(() => {
        recaptchaRef.current.execute();
        setUser(getSession());
    }, [])

    return (
        <div>
            <div className='main-container'>
                <AppHeader user={user} setUser={setUser}/>

                {
                    !user ? (
                        <div className='form-container'>
                            <h2 className="heading">Sign In</h2>
                            <div className='form-fields'>
                                <TextField
                                    className="form-input"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <TextField
                                    className="form-input"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />

                                <p className='error-message'>
                                    {error}
                                </p>

                                <button className='signin-btn' onClick={handleEmailSignIn}>Sign In</button>

                                <p className="or-text">or</p>
                                <div className='google-btn-container'>
                                    <GoogleButton onClick={handleGoogleSignIn}>Sign Up with Google</GoogleButton>
                                </div>

                                <p className="signin-text">Don't have an account? <Link to='/signup'>Sign Up</Link></p>

                            </div>
                        </div>
                    ) : (
                        <SignOutToContinue />   
                    )
                }
            </div>
            <Footer />
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_g_recaptcha_invisible_site_key}
                size="invisible"
                // onChange={() => { console.log("Captcha was resolved", recaptchaRef.current.getValue()) }}
                ref={recaptchaRef}
            />
        </div>
    );
};

export default SignIn;
