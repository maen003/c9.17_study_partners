import React, {Component} from 'react';
import { connect } from 'react-redux';
import EventDetails from './eventItemProfile';

const listDiv = {
    overflowY: 'auto',
    height: '85vmin',
    /* border: '1px dashed lightcoral' */
}

class EventList extends Component {
    constructor (props) {
        super (props);
    }

    render() { 
        console.log('LIST EVENTS - props: ', this.props);
        const arrayCheck = this.props.events;
        if (arrayCheck.length !== 0) {
            const eventArray = this.props.events.data;
            const eventElements = eventArray.map((eventItem, index) => {
                return <EventDetails key={index} info={eventItem}/>
            });
            return (
                <div style={listDiv}>
                    <ul style={{padding: 0}}>
                        {eventElements}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No events found</div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        events: state.event.all
    }
}

export default connect(mapStateToProps)(EventList);
