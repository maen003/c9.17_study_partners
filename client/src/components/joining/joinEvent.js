import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';
import axios from 'axios';
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
            zipcode: null,
            filterValues: []
        }

        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.createCheckboxes = this.createCheckboxes.bind(this);
        this.getJoinData = this.getJoinData.bind(this);

        this.zipcode = this.zipcode.bind(this);
        this.renderMapAfterSubmit = this.renderMapAfterSubmit.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
        this.joinMap = this.joinMap.bind(this);
    }

    ///////////////////////MAP/////////////////////
    zipcode(event) {
        event.preventDefault();
        const {value} = event.target;
        console.log('zipcode: ', value);
        this.setState({
            zipcode: value
        })
    }

    renderMapAfterSubmit(){
        this.handleFormSubmit();
        console.log('zipcode input focus changed');
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.zipcode+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
            .then(this.axiosThenFunction);
    }

    axiosThenFunction(response){
        this.setState({
            zipcode: response.data.results[0].geometry.location
        });
        console.log('zipcode coords: ', this.state.zipcode);
        this.joinMap();
    }

    joinMap() {
        this.props.getAll().then((response) => {
            console.log("data: ", response.payload.data.data);
            console.log("data coords: ", response.payload.data.data[0].coordinates);
            const map = new google.maps.Map(document.getElementById('joinMap'), {
                zoom: 10,
                center: this.state.zipcode
            });
    
            for (var i = 0; i < response.payload.data.data.length; i++) {
                const latLng = JSON.parse(response.payload.data.data[i].coordinates);
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    //label: 'z'
                });
            }
        });
        // var map_data_array = [{lat: 33.6404952, lng: -117.8442962}, {lat: 33.6471628, lng: -117.8411294}];
        // var zipcode = {lat: 33.6588951, lng: -117.8282121};
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

    handleFormSubmit() {
        // = formSubmitEvent => 
        const filterCheckbox = [];
        // formSubmitEvent.preventDefault();
    
        for (const checkbox of this.selectedCheckboxes) {
            filterCheckbox.push(checkbox);
        }
        this.setState({
            filterValues: filterCheckbox
        })
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
    
    createCheckbox = label => (
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label}/>
    )
    
    createCheckboxes = () => (
        filterCheck.map(this.createCheckbox)
    )

    render() {
        console.log('filter values: ', this.state.filterValues);
        return (
            <div className="container">
                <div className="filterContainer col-sm-8 col-xs-12">
                    <h3>Filter Results</h3>
                    <form onSubmit={this.zipcode}>
                        <div>
                            <h4>By Subject</h4>
                            {this.createCheckboxes()}
                        </div>
                        <div className="form-group zipInput">
                            <h4>By Location</h4>
                            <input onBlur={this.zipcode} type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
                        {/* <button className="btn btn-default" type="submit">Filter</button> */}
                    </form>
                    <button onClick={this.renderMapAfterSubmit} className="btn btn-warning" type="button">Search</button>

                    <div className="map col-sm-12 col-xs-12">
                        <div className="joinMap" id="joinMap"></div>
                    </div>
                </div>
                <div className="list col-sm-4 col-xs-12">
                    <h3>All Events</h3>
                    <EventList eventList={this.props.events} filterValues={this.state.filterValues}/>
                </div>
            </div>
            
        )
    }
}

export default connect(null, {getAll})(JoinEvent);
