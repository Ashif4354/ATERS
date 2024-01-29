import React from 'react';
import { useLocation } from 'react-router-dom';

import './Result.css';
import EachDay from './Components/EachDay/EachDay';
import Restaurants from './Components/Restaurants/Restaurants';
import Hotels from './Components/Hotels/Hotels';
import AppHeader from '../../Components/AppHeader/AppHeader';

const Result = () => {
    const { state } = useLocation();
    // console.log(state);
    return (
        <div className='main-container'>
            <AppHeader />
            <div className='scroll-container'>
                <div className='day-container'>
                    {
                        Object.keys(state.places).map((day, index) => {
                            return <EachDay key={index} day={index + 1} places={state.places[`day${index + 1}`]}/>
                        })
                    }
                </div>


                <Hotels places={state.hotels}/>

                <Restaurants places={state.restaurants}/>
            </div>
        </div>
    )
}

export default Result;