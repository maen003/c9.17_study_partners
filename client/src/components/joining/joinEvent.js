import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';
import axios from 'axios';
import Checkbox from './checkbox';

import './joinEvent.css';

const filterCheck = [
    'Life Sciences',
    'Visual and Perfomance Arts',
    'Liberal Arts',
    'Engineering and Technology',
    'Business'
];

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            zipcode: null,
            filterValues: [],
            coords: null
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
        this.joinMapOnLoad = this.joinMapOnLoad.bind(this);
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
            coords: response.data.results[0].geometry.location
        });
        console.log('zipcode coords: ', this.state.zipcode);
        this.joinMap();
    }

    joinMap() {
        this.props.getAll().then((response) => {
            console.log("data: ", response.payload.data.data);
            console.log("data coords: ", response.payload.data.data[0].coordinates);
            if(this.state.filterValues.length < 1){
            const map = new google.maps.Map(document.getElementById('joinMap'), {
                zoom: 10,
                center: this.state.coords
            });
            
            for (var i = 0; i < response.payload.data.data.length; i++) {
                const contentString = '</div>'+
                '<h5><u>'+response.payload.data.data[i].title+'</u></h5>'+
                '<p>Location: '+response.payload.data.data[i].location+'</p>'+
                '<p>Subject: '+response.payload.data.data[i].subject+'</p>'+
                '<p>Max Group Size: '+response.payload.data.data[i].max+'</p>'+
                '<p>Date of Event: '+response.payload.data.data[i].date+'</p>'+
                '<p>Time of Event: '+response.payload.data.data[i].time+'</p>'+
                '<p>Duration of Event: '+response.payload.data.data[i].duration+'</p>'+
                '<p>Contact Phone: '+response.payload.data.data[i].phone+'</p>'+
                '<p>Contact Email: '+response.payload.data.data[i].email+'</p>'+
                '<p>Description: '+response.payload.data.data[i].description+'</p>'+
                '</div>';
                const infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                const latLng = JSON.parse(response.payload.data.data[i].coordinates);
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });

                map.addListener('click', function() {
                    infoWindow.close();
                });
            }
        }
        });
    }

    /* Map Display on Load */

    joinMapOnLoad() {
        const map = new google.maps.Map(document.getElementById('joinMap'), {
            zoom: 3,
            center: {lat: 37.09024, lng: -95.712891}
        });
    }

    // componentDidUpdate() {
    //     this.joinMapOnLoad();
    //     console.log('hi');
    // }

    /* getting all events from axios call */
    componentDidMount() {
        this.getJoinData();
        window.addEventListener('load', this.joinMapOnLoad);
        this.joinMapOnLoad();
    }

    getJoinData() {
        this.props.getAll().then(function(response){
            console.log('response from join event: ', response.payload.data);
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
                        <div className="form-group zipInput">
                            <h4>By Location</h4>
                            <input onBlur={this.zipcode} type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
                        <div>
                            <h4>By Subject</h4>
                            {this.createCheckboxes()}
                        </div>
                    </form>
                    <button onClick={this.renderMapAfterSubmit} className="btn btn-warning" type="button">Search</button>

                    <div className="map col-sm-12 col-xs-12">
                        <div className="joinMap" id="joinMap"></div>
                    </div>
                </div>
                <div className="list col-sm-4 col-xs-12">
                    <h3>All Events</h3>
                    <EventList filterValues={this.state.filterValues} zipcodeCoords={this.state.coords}/>
                </div>
            </div>
            
        )
    }
}

export default connect(null, {getAll})(JoinEvent);
