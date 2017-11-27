import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userJoin, getAll} from '../../actions';
import DetailsModal from '../modal/event_details_modal';

import './eventItem.css';

class EventDetails extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.userJoinEvent = this.userJoinEvent.bind(this);

        this.renderMapAfterClick = this.renderMapAfterClick.bind(this);
        this.singleMap = this.singleMap.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
    }

    /////////////////////////MAP////////////////////////
    renderMapAfterClick(){
        console.log('More info button clicked');
        const {info} = this.props;
        console.log('event location: ', info.location);
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+info.location+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
            .then(this.axiosThenFunction);
    }

    axiosThenFunction(response){
        this.setState({
            coordinates: response.data.results[0].geometry.location
        });
        console.log('coordinates: ', this.state.coordinates);
        this.toggleModal();
        this.singleMap();
    }

    singleMap() {
        console.log('SINGLE MAP CALLED', document.getElementById('singleMap'));
        const uluru = this.state.coordinates;
        const map = new google.maps.Map(document.getElementById('singleMap'), {
            zoom: 14,
            center: uluru
        });
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
            animation: google.maps.Animation.DROP, //BOUNCE //DROP
            // label: 'z'
        });
    }
    /////////////////////////MAP////////////////////////

    toggleModal(event) {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    userJoinEvent() {
        const {info} = this.props;

        console.log('You joined this event');
        this.props.userJoin().then(function(response){
            console.log('response from eventItem: ', this);
            console.log('le response: ', response);
            console.log('la informacion: ', info);

        });
    }

    render() {
        const {info} = this.props;
        // console.log('info passed down: ', info);
        const display = {display: 'block'}
        const hide = {display: 'none'}

        return (
            <div className="col-sm-12 col-xs-12 singleItem">
                <div className="col-sm-12">
                    <h4>Title: {info.title}</h4>
                    <p>Subject: {info.e_s_subj}</p>
                    <p>{`On ${info.date} at ${info.time}`}</p>
                </div>
                <div className="col-sm-12 buttonContainer">
                    <button onClick={this.renderMapAfterClick} className="col-sm-4 col-sm-offset-1 btn btn-primary infoButton" type="button">More Info</button>
                    <button onClick={this.userJoinEvent} className="col-sm-4 col-sm-offset-3 btn btn-success infoButton" type="button">Join Event</button>
                </div>
                <DetailsModal details={info} showModal={this.state.showModal} toggleModal={this.toggleModal}/>
            </div>
        );
    }
}

export default connect(null, {userJoin, getAll})(EventDetails);
