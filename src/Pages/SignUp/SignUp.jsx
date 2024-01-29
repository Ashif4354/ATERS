import React, { useState, useRef, useEffect } from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import GoogleButton from 'react-google-button';
import ReCAPTCHA from "react-google-recaptcha";

import "./SignUp.css";
import { Link } from "react-router-dom";


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [user, setUser] = useState(null);
    const recaptchaRef = useRef();

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else if (recaptchaRef.current.getValue() == "") {
            alert("Complete the captcha")
            return
        }

        const data = {
            name: name,
            email: email,
            password: password,
            recaptchaToken: recaptchaRef.current.getValue()
        }

        const headers = {
            'Content-Type': 'application/json'
        }
        
        fetch('http://127.0.0.1:5000/signup',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })


        //     createUserWithEmailAndPassword(auth, email, password)
        //         .then((user) => {
        //             setUser(user)
        //             console.log(user);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
    };

    const handleGoogleSignIn = async () => {

        signInWithPopup(auth, provider)
            // signInWithRedirect(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // console.log("TOKEN", token);
                // console.log("USER", user);
            })

    };

    const displayCaptcha = () => {
        console.log("CAPTCHA", typeof recaptchaRef.current.getValue())
        console.log(recaptchaRef.current.getValue());
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    return (
        <div className="main-container">

            <div className="form-container">
                <h2 className="heading">Sign Up</h2>
                <form onSubmit={handleSignUp} className="form-fields">
                    <TextField
                        className="form-input"
                        label="Name"
                        variant="outlined"
                        size="small"
                        margin="dense"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
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
                    <TextField
                        className="form-input"
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        margin="dense"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                    <div className="checkbox-container">
                        <Checkbox {...label} required />
                        <p className="check-box-text">I agree to the <Link to="/tc">Terms and Conditions</Link> and <Link to="/privacypolicy">Privacy Policy</Link></p>
                    </div>
                    <div className="captcha-container">
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_g_recaptcha_site_key}
                            ref={recaptchaRef}
                        />
                    </div>

                    <button className='signup-btn' type="submit">Sign Up</button>
                    {/* <button className='signup-btn'onClick={displayCaptcha}>Sign Up</button> */}

                </form>
                <p className="or-text">or</p>
                <div className='google-btn-container'>
                    <GoogleButton onClick={handleGoogleSignIn}>Sign Up with Google</GoogleButton>
                </div>
                <p>
                    {/* Already have an account? <Link to="/signin">Sign In</Link> */}
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
