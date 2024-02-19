import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import './ScheduleCard.css';
// import { useNavigate } from 'react-router-dom';

const ScheduleCard = (props) => {
    // const navigate = useNavigate();

    const onClickLink = () => {
        // navigate(`/schedule/&id=${props.schedule._id}`);
        const url = process.env.REACT_APP_client_url + '/schedule?id=' + props.schedule._id;
        console.log(url);
        window.open(url);
    }

    return (
        <div className='schedule-card'>
            <div className='schedule-card-image-container'>
                <img className='schedule-image' src={props.schedule.randomImage} alt="place" />
            </div>
            <div className='schedule-card-details-container'>
                <p className='schedule-card-attribute'><span className='attribute-title'>Destination: {props.schedule.destination}</span></p>
                <p className='schedule-card-attribute'><span className='attribute-title'>From: </span>{props.schedule.from}</p>
                <p className='schedule-card-attribute'><span className='attribute-title'>To: </span>{props.schedule.to}</p>
                <p className='schedule-card-attribute'><span className='attribute-title'>Days: </span>{props.schedule.days}</p>
                <p className='schedule-card-attribute'><span className='attribute-title'>Generated On: </span>{props.schedule.generatedDate}</p>

            </div>

            <div className='link-btn-container'>
                <button className='link-btn' onClick={onClickLink}><OpenInNewIcon fontSize='large'/></button>
            </div>
        </div>
    );
};

export default ScheduleCard;
