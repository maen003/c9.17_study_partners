import React, {Component} from 'react';
import { connect } from 'react-redux';
import EventDetails from './eventItem';

class EventList extends Component {
    constructor (props) {
        super (props);
    }

    render() { 
        // console.log('LIST EVENTS - props: ', this.props);
        const arrayCheck = this.props.events;
        if (arrayCheck.length !== 0) {
            const eventArray = this.props.events.data;
            const eventElements = eventArray.map((eventItem, index) => {
                return <EventDetails key={index} info={eventItem}/>
            });
            return (
                <div className="container">
                    <h3>All Events</h3>
                    <ul>
                        {eventElements}
                    </ul>
                </div>
            )
        }

        return (
            <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        events: state.event.all
    }
}

export default connect(mapStateToProps)(EventList);
