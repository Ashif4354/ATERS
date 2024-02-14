import React from "react"

import Card from "../Card/Card";

const Restaurants = (props) => {
    return (
        <div className='restaurant-container'>
            <h2 className='heading'>Recommended Restaurants</h2>
            <div className='cards-container'>
                <div className='each-card'>
                    <Card
                        // cardtype='card-reshot'
                        reshottype='restaurant'
                        name={props.places[0].name}
                        description={props.places[0].description}
                        url={props.places[0].gmaps_url}
                        image={props.places[0].images}
                        rating={props.places[0].rating}
                        price={props.places[0].price}

                    />
                </div>
                <div className='each-card'>
                    <Card
                        // cardtype='card-reshot'
                        reshottype='restaurant'
                        name={props.places[1].name}
                        description={props.places[1].description}
                        url={props.places[1].gmaps_url}
                        image={props.places[1].images}
                        rating={props.places[1].rating}
                        price={props.places[1].price}
                    />
                </div>
                <div className='each-card'>
                    <Card
                        // cardtype='card-reshot'
                        reshottype='restaurant'
                        name={props.places[2].name}
                        description={props.places[2].description}
                        url={props.places[2].gmaps_url}
                        image={props.places[2].images}
                        rating={props.places[2].rating}
                        price={props.places[2].price}
                    />
                </div>
            </div>
            <h2 className='return'>Price are based per person</h2>
        </div>

    )
}

export default Restaurants;