import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';
import axios from 'axios';

import './joinEvent.css';

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            eventList: null,
            zipcode: null
        }

        this.getJoinData = this.getJoinData.bind(this);
        this.filterEvents = this.filterEvents.bind(this);
        this.zipcode = this.zipcode.bind(this);

        this.renderMapAfterSubmit = this.renderMapAfterSubmit.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
        this.joinMap = this.joinMap.bind(this);
    }

    componentDidMount() {
        this.getJoinData();
    }

    getJoinData() {
        this.props.getAll().then(function(response){
            console.log('response: ', response.payload.data);
        });
    }

    filterEvents(event) {
        const {checked, value} = event.target
        if(checked === true){
            console.log('checkbox toggled: ', value);
        }
    }

    zipcode(event) {
        const {value} = event.target;
        console.log('zipcode: ', value);
        this.setState({
            zipcode: value
        })
    }

    ///////////////////////MAP/////////////////////
    renderMapAfterSubmit(){
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
    ///////////////////////MAP/////////////////////

    render() {
        return (
            <div className="container">
                <div className="filterContainer col-sm-8 col-xs-12">
                    <h3>Filter Results</h3>
                    <form>
                        <div>
                            <h4>By Subject</h4>
                            <label className="checkbox filterCheck">
                                <input onChange={this.filterEvents} name="lifeSci" type="checkbox" value="Life sciences"/> Life Sciences
                            </label>
                            <label className="checkbox filterCheck">
                                <input onChange={this.filterEvents} name="vpArts" type="checkbox" value="Visual and Perfomance Arts"/> Visual and Perfomance Arts
                            </label>
                            <label className="checkbox filterCheck">
                                <input onChange={this.filterEvents} name="libArts" type="checkbox" value="Liberal Arts"/> Liberal Arts
                            </label>
                            <label className="checkbox filterCheck">
                                <input onChange={this.filterEvents} name="engTech" type="checkbox" value="Engineering and technology"/> Engineering and technology
                            </label>
                            <label className="checkbox filterCheck">
                                <input onChange={this.filterEvents} name="business" type="checkbox" value="Business"/> Business
                            </label>
                        </div>
                        <div className="form-group zipInput">
                            <h4>By Location</h4>
                            <input onBlur={this.zipcode} type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
                    </form>
                    <button onClick={this.renderMapAfterSubmit} className="btn btn-warning" type="button">Search</button>

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