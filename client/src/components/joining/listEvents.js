import React, {Component} from 'react';

class EventList extends Component {
    constructor (props) {
        super (props);


    }

    render() {       
        console.log('props: ', this.props);
        // const eventElements = this.props.allEvents.map((eventItem, index) => {
        //     return <EventItem key={index} index={index} item={eventItem}/>
        // });

        return (
            <div className="container">
                <h3>All Events</h3>
                {/* <ul>
                    {eventElements}
                </ul> */}
            </div>
        )
    }
}

export default EventList;