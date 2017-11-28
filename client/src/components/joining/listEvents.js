import React, {Component} from 'react';
import { connect } from 'react-redux';
import EventDetails from './eventItem';

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
        if (this.props.filterValues.length > 0) {
            const arrayCheck = this.props.events;
            if (arrayCheck.length !== 0) {
                const acceptedValues = [];
                const eventArray = this.props.events.data;
                for (var f = 0; f < this.props.filterValues.length; f++) {
                    for (var i = 0; i < eventArray.length; i++) {
                        if (eventArray[i].e_s_subj === this.props.filterValues[f]) {
                            acceptedValues.push(eventArray[i]);
                        }
                    }
                }
                console.log('filtered events:', acceptedValues);
                console.log('zipcode:', this.props.zipcodeCoords);
                if (acceptedValues.length > 0) {
                    const eventElements = acceptedValues.map((eventItem, index) => {
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
                        <div>
                            <h3>No Events Match Filtered Values</h3>
                        </div>
                    )
                }
            }
        } else {
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
}

function mapStateToProps(state) {
    return {
        events: state.event.all
    }
}

export default connect(mapStateToProps)(EventList);
