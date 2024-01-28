import React from 'react';

import Card from '../Card/Card';

const Hotels = (props) => {
    // console.log(props.places[0].images[0])
    return (
        <div className='hotel-container'>
            <h2 className='heading'>Recommended Hotels</h2>
            <div className='cards-container2'>
                <Card
                    cardtype='card-reshot'
                    reshottype='hotel'
                    name={props.places[0].name}
                    description={props.places[0].description}
                    url={props.places[0].gmaps_url}
                    image={props.places[0].images[0]}
                    rating={props.places[0].rating}
                />
                <Card
                    cardtype='card-reshot'
                    reshottype='hotel'
                    name={props.places[1].name}
                    description={props.places[1].description}
                    url={props.places[1].gmaps_url}
                    image={props.places[1].images[0]}
                    rating={props.places[1].rating}

                />
                <Card
                    cardtype='card-reshot'
                    reshottype='hotel'
                    name={props.places[2].name}
                    description={props.places[2].description}
                    url={props.places[2].gmaps_url}
                    image={props.places[2].images[0]}
                    rating={props.places[2].rating}
                />
            </div>
        </div>
    );
};

export default Hotels;
