import React, {Component} from 'react';
import EventDetails from './eventItemJoin';

const listDiv = {
    overflowY: 'auto',
    height: '77vmin',
}

class EventList extends Component {
    constructor (props) {
        super (props);
    }

    render() { 
        const arrayCheck = this.props.joined;
        
        if (arrayCheck.length !== 0) {
            const eventElements = arrayCheck.map((eventItem, index) => {
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

