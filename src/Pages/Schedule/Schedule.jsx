import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import './Schedule.css';
import EachDay from './Components/EachDay/EachDay';
import Restaurants from './Components/Restaurants/Restaurants';
import Hotels from './Components/Hotels/Hotels';
import AppHeader from '../../Components/AppHeader/AppHeader';

const Schedule = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const resultID = searchParams.get('id');
    const [schedule, setSchedule] = useState(null);
   
    useEffect(() => {
        console.log("fetching schedule");
        fetch(`${process.env.REACT_APP_server_url}/schedule?id=${resultID}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setSchedule(res)
            })
            .catch(err => console.log(err))

    }, []);

    if (schedule === null) {
        return <ScheduleBlank />
    }

    return (
        <div className='main-container'>
            <AppHeader />
            <div className='scroll-container'>
                <div>
                    {
                        Object.keys(schedule.places).map((day, index) => {
                            return <EachDay key={index} day={index + 1} places={schedule.places[`day${index + 1}`]} />
                        })
                    }
                </div>


                <Hotels places={schedule.hotels} />

                <Restaurants places={schedule.restaurants} />
            </div>
        </div>
    )
}

const ScheduleBlank = () => {
    return (
        <div className='main-container'>
            <AppHeader />
            <div className='middle-container'>
                <div className='mistake-text-container'>
                    <h1 >It seems you have reached this page by mistake</h1>
                    <h2 >Go back to the <Link to='/'>Home</Link> page and try again</h2>
                </div>
            </div>
        </div>
    )
}

export default Schedule;