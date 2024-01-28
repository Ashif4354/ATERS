import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import BasicDatePicker from "./Components/BasicDatePicker";
// import DateRangePickerValue from "./Components/DateRangePicker";

import "./Home.css";
import { useNavigate } from "react-router-dom";
import submitToServer from "./scripts/submitToServer";

const Home = () => {
    
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [placeData, setPlaceData] = useState(null);

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
        } else if (fromDate > toDate) {
            setErrorMessage('*"FROM" date cannot be greater than "TO" date');
            return
        }
        // console.log(toDate - fromDate);
        setErrorMessage('');
        
        const data = {
            destination,
            fromDate: fromDate.format('DD-MM-YYYY'),
            toDate: toDate.format('DD-MM-YYYY'),
            days: ((toDate - fromDate) / 86400000) + 1
        }
        submitToServer(data, setPlaceData)        
    }

    useEffect(() => {
        if (placeData) {
            navigate('/results', { state: placeData });
        }
    }, [placeData])


    return (
        <div className="main-container">
            <div className="middle-container">
                <h2 className="heading">Plan your Adventure</h2>
                <div className="form-fields">
                    <TextField
                        className="form-input"
                        label="Destination"
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



                    <button className="set-sail-btn" onClick={submitSetSail}>Set Sail</button>


                </div>

            </div>

        </div>
    );
}
export default Home;