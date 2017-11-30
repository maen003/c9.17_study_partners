import React, {Component} from 'react';
import {connect} from 'react-redux';
import EventDetails from './eventItemCreate';

const listDiv = {
    overflowY: 'auto',
    height: '77vmin',
    /* border: '1px dashed lightcoral' */
}

class EventList extends Component {
    constructor (props) {
        super (props);
    }

    render() { 
        const arrayCheck = this.props.createdEvents;
        if (arrayCheck.length !== 0) {
            const eventArray = this.props.createdEvents;
            const eventElements = eventArray.map((eventItem, index) => {
                return <EventDetails key={index} info={eventItem} buttonClick={this.getUserDataCreate}/>
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
