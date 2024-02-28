import React, { useEffect, useState, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import './App.css';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
// import Footer from './Components/Footer/Footer';
import SignIn from './Pages/SignIn/SignIn';
import Schedule from './Pages/Schedule/Schedule';
import Profile from './Pages/Profile/Profile';
// import { ScheduleBlank } from './Pages/Schedule/Schedule';

import { VisitCountContext } from './scripts/ContextAPI';
import { updateAndLoadVisitCount } from './scripts/VisitCount';

const App = () => {
    const recaptchaRef = useRef(null);
    const [invisibleRecaptchaToken, setInvisibleRecaptchaToken] = useState('');
    const [visitCount, setVisitCount] = useState(0);


    useEffect(() => {
        // console.log('invisibleRecaptchaToken', invisibleRecaptchaToken);
        if (invisibleRecaptchaToken) {
            updateAndLoadVisitCount(invisibleRecaptchaToken, setVisitCount);
        }

    }, [invisibleRecaptchaToken]);


    return (
        <VisitCountContext.Provider value={visitCount}>
            <BrowserRouter>
                {/* <AppHeader /> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path='/profile' element={<Profile />} />
                    {/* <Route path='/schedule/:id' element={<Schedule />} /> */}

                </Routes>
                {/* <Footer /> */}
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_g_recaptcha_invisible_site_key}
                    size='invisible'
                    ref={recaptchaRef}
                    onChange={(token) => setInvisibleRecaptchaToken(token)}
                    asyncScriptOnLoad={() => { recaptchaRef.current.execute() }}
                />
            </BrowserRouter>
        </VisitCountContext.Provider>
    );
}

export default App;
