import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';

import './joinEvent.css';

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            eventList: null
        }

        this.getJoinData = this.getJoinData.bind(this);
        this.filterEvents = this.filterEvents.bind(this);

        this.renderMapAfterText = this.renderMapAfterText.bind(this);
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
                //when you loop
                //use const lng = req.body.coordinates.lng   && const lat = req.body.coordinates.lat
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
                            <input onBlur={this.renderMapAfterText} type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
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