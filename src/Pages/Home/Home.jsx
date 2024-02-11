import React, { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import BasicDatePicker from "./Components/BasicDatePicker/BasicDatePicker";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ReCAPTCHA from "react-google-recaptcha";

import "./Home.css";
import { useNavigate } from "react-router-dom";
import submitToServer from "./scripts/submitToServer";
import AppHeader from "../../Components/AppHeader/AppHeader";
import SimpleDialog from "./Components/SimpleDialog/SimpleDialog";
import { getSession } from "../../scripts/Session";
import Footer from "../../Components/Footer/Footer";

const Home = () => {

    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultID, setResultID] = useState('');
    const [submit, setSubmit] = useState(false);
    const recaptchaRef = useRef();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const setFromDatehandler = (date) => {
        setFromDate(date);
        // console.log(date.format('DD-MM-YYYY'));
    }
    const setToDatehandler = (date) => {
        setToDate(date);
        // console.log(date.format('DD-MM-YYYY'));
    }

    const submitSetSail = () => {
        // console.log(fromDate?.format('DD-MM-YYYY'));
        if (!destination) {
            setErrorMessage('*Please enter a destination');
            return
        } else if (!fromDate) {
            setErrorMessage('*Please select a "FROM" date');
            return
        } else if (!toDate) {
            setErrorMessage('*Please select a "TO" date');
            return
        } else if (fromDate < new Date().getTime()){
            console.log(fromDate, new Date().getTime());
            setErrorMessage('* Select a date in the future');
            return

        } else if (fromDate > toDate) {
            setErrorMessage('*"FROM" date cannot be greater than "TO" date');
            return
        } else if (recaptchaRef.current.getValue() === "") {
            setErrorMessage('*Please complete the captcha');
            return
        } else if (!getSession()) {
            setDialogOpen(true);
            return
        }
        // console.log(toDate - fromDate);
        setErrorMessage('');

        const data = {
            email: user.email,
            destination: destination,
            fromDate: fromDate.format('DD-MM-YYYY'),
            toDate: toDate.format('DD-MM-YYYY'),
            days: ((toDate - fromDate) / 86400000) + 1,
            recaptchaToken: recaptchaRef.current.getValue()
        }
        setSubmit(true);
        submitToServer(data, setResultID, setSubmit, setErrorMessage, recaptchaRef)
    }

    useEffect(() => {
        if (resultID) {
            // console.log(resultID);
            navigate(`/schedule?id=${resultID}`);
        }
    }, [resultID, navigate])

    useEffect(() => {
        setUser(getSession());
    }, [])

    return (
        <div className="main-container">
            <AppHeader />
            <SimpleDialog open={dialogOpen} setOpen={setDialogOpen}/>
            <div className="middle-container">
                <h2 className="heading">Plan your Adventure</h2>
                <div className="form-fields">
                    <TextField
                        className="form-input"
                        label="Destination City"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />

                    {/* <DateRangePickerValue/> */}
                    <div className="date-container">
                        <div className="date-picker-from">
                            <BasicDatePicker label='FROM' value={fromDate} setDate={setFromDatehandler} />
                        </div>
                        <div className="date-picker-to">
                            <BasicDatePicker label='TO' value={toDate} setDate={setToDatehandler} />
                        </div>
                    </div>
                    <p className='error-message'>
                        {errorMessage}
                    </p>
                    <div className="recaptcha-container">
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_g_recaptcha_site_key}
                            ref={recaptchaRef}
                            size="normal"
                            // type='audio'
                            // theme="dark"
                            // size="invisible"
                        />
                    </div> 
                    <button className="set-sail-btn" onClick={submitSetSail}>
                        {
                            submit ? (
                                <div className='loading-container'>
                                    <p className='loading-text'>Loading  </p>
                                    {<Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>}
                                </div>
                            ) : 'Set Sail'
                        }
                    </button>



                </div>

            </div>

        </div>
    );
}
export default Home;