import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';
import Checkbox from './checkbox';

import './joinEvent.css';

const filterCheck = [
    'Life sciences',
    'Visual and Perfomance Arts',
    'Liberal Arts',
    'Engineering and technology',
    'Business'
];

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            eventList: null,
        }

        this.getJoinData = this.getJoinData.bind(this);

        this.renderMapAfterText = this.renderMapAfterText.bind(this);
        this.joinMap = this.joinMap.bind(this);

        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.createCheckboxes = this.createCheckboxes.bind(this);
    }

    ///////////////////////MAP/////////////////////
    renderMapAfterText(){
        console.log('zipcode input focus changed');
        // this.props.getAll().then(function(response){
        //     console.log("map: ", response.payload.data.data);
        // });
        this.joinMap();
    }

    joinMap() {
        var map_data_array = [{lat: 33.6404952, lng: -117.8442962}, {lat: 33.6471628, lng: -117.8411294}];
        var zipcode = {lat: 33.6588951, lng: -117.8282121};

        const map = new google.maps.Map(document.getElementById('joinMap'), {
            zoom: 12,
            center: zipcode
        });

        for (var i = 0; i < map_data_array.length; i++) {
            const latLng = map_data_array[i];
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                //label: 'z'
            });
        }
    }

    /* getting all events from axios call */
    componentDidMount() {
        this.getJoinData();
    }

    getJoinData() {
        this.props.getAll().then(function(response){
            console.log('response: ', response.payload.data);
        });
    }

    /* checkboxes */
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }
    
    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }
    
    createCheckbox = label => (
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label}/>
    )
    
    createCheckboxes = () => (
        filterCheck.map(this.createCheckbox)
    )

    render() {
        return (
            <div className="container">
                <div className="filterContainer col-sm-8 col-xs-12">
                    <h3>Filter Results</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <div>
                            <h4>By Subject</h4>
                            {this.createCheckboxes()}
                        </div>
                        <div className="form-group zipInput">
                            <h4>By Location</h4>
                            <input onBlur={this.renderMapAfterText} type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
                        <button className="btn btn-default" type="submit">Filter</button>
                    </form>
                    <button onClick={this.getJoinData} className="btn btn-warning" type="button">Search Again</button>

                    <div className="map col-sm-12 col-xs-12">
                        <div className="joinMap" id="joinMap"></div>
                    </div>
                </div>
                <div className="list col-sm-4 col-xs-12">
                    <h3>All Events</h3>
                    <EventList eventList={this.props.events}/>
                </div>
            </div>
            
        )
    }
}

export default connect(null, {getAll})(JoinEvent);
