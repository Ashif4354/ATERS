import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = (props) => {
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (props.cardtype === 'card-places') {
            if (props.index === 0) {
                setDay('MORNING');
                setTime('10:00 AM');
            } else if (props.index === 1) {
                setDay('AFTERNOON');
                setTime('3:00 PM');
            } else if (props.index === 2) {
                setDay('EVENING');
                setTime('7:00 PM')
            }
        } else {
            if (props.reshottype === 'hotel') {
                setPrice((Math.floor(Math.random() * 10) + 1) * 1000);
            } else if (props.reshottype === 'restaurant') {
                setPrice((Math.floor(Math.random() * 10) + 1) * 100);
            }
        }
    }, [props.cardtype, props.index, props.reshottype])

    return (
        <div className='card'>
            <div className='card-left' />
            <div className='content-container'>
                <div className='titleContainer' onClick={() => window.open(props.url)}>{props.name}</div>
                <div className='image-container'>

                    <img className='image' src={props.image} alt='place' />

                </div>
                <div className='bottomContainer'>
                    <div className={props.type === 'card-places' ? 'heading1-container' : 'heading1-container2'}>
                        {
                            props.cardtype === 'card-places' ? day : 'Rating  ' + props.rating
                        }
                    </div>
                    <div className={props.type === 'card-places' ? 'heading2-container' : 'heading2-container2'}>
                        {
                            props.cardtype === 'card-places' ? time : '₹' + price
                        }
                    </div>
                    <div className={props.cardtype === 'card-places' ? 'description-container' : 'description-container2'}>
                        {props.description}
                    </div>
                </div>
            </div>
            <div className='card-right' />

        </div >
    );
};

export default Card;
