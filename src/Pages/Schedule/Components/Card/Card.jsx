import React, { useEffect, useState } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './Card.css';

const Card = (props) => {
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [imageIndex, setImageIndex] = useState(0);

    const incrementImageIndex = () => {
        if (imageIndex < 9) {
            setImageIndex((prev) => prev + 1);
        }
    }

    const decrementImageIndex = () => {
        if (imageIndex > 0) {
            setImageIndex((prev) => prev - 1);
        }
    }

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
            // if (props.reshottype === 'hotel') {
            //     setPrice((Math.floor(Math.random() * 10) + 1) * 1000);
            // } else if (props.reshottype === 'restaurant') {
            //     setPrice((Math.floor(Math.random() * 10) + 1) * 100);
            // }
            setPrice(props.price);
        }
    }, [props.cardtype, props.index, props.price])

    return (
        <div className='card'>
            <div className='card-left' />
            <div className='content-container'>
                <div className='titleContainer' onClick={() => window.open(props.url)}>{props.name}</div>
                <div className='image-container' style={{ backgroundImage: `url(${props.image[imageIndex]})`, backgroundSize: 'cover' }}>
                    <div className='left-arrow-container'>
                        <button className='left-arrow arrow' style={{display:imageIndex === 0 ? 'none' : ''}} onClick={decrementImageIndex}><ArrowLeftIcon fontSize='large'/></button>

                    </div>

                    <div className='space-between-arrows'/>

                    <div className='right-arrow-container'>
                        <button className='right-arrow arrow' style={{display:imageIndex === 9 ? 'none' : ''}} onClick={incrementImageIndex}><ArrowRightIcon fontSize='large'/></button>
                    </div>

                    {/* <img className='image' src={props.image} alt='place' /> */}

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
