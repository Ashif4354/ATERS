import './EachDay.css';
import Card from '../Card/Card';

const EachDay = (props) => {
    // console.log(props.places[0].images);
    return (
        <div className='day-container'>
            <h2 className="heading">Day {props.day}</h2>
            <div className='cards-container'>
                <div className='each-card'>
                    <Card
                        index={0}
                        name={props.places[0].name}
                        description={props.places[0].description}
                        url={props.places[0].gmaps_url}
                        image={props.places[0].images[0]}
                        cardtype='card-places'
                    />

                </div>

                <p className='foodInfo'>Lunch</p>

                <div className='each-card'>
                    <Card
                        index={1}
                        name={props.places[1].name}
                        description={props.places[1].description}
                        url={props.places[1].gmaps_url}
                        image={props.places[1].images[0]}
                        cardtype='card-places'
                    />

                </div>

                <p className='foodInfo'>Snack</p>
                
                <div className='each-card'>
                    <Card
                        index={2}
                        name={props.places[2].name}
                        description={props.places[2].description}
                        url={props.places[2].gmaps_url}
                        image={props.places[2].images[0]}
                        cardtype='card-places'
                    />

                </div>
            </div>
        </div>
    )
}

export default EachDay;