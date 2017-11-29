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
            showModal: false,
            info: this.props.info
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
        console.log('event location: ', this.state.location);
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.info.location+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
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

    convertDate() {
        var date = this.state.info.date;
        var time = this.state.info.time;
        var convert = new Date(`${date} " " ${ time}`);
        var newDate = convert.toLocaleDateString();
        return newDate;
    }

    convertTime() {
        var date = this.state.info.date;
        var time = this.state.info.time;
        var d = new Date(`${date} " " ${ time}`);
        var hh = d.getHours();
        var m = d.getMinutes();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
          h = hh - 12;
          dd = "PM";
        }
        if (h == 0) {
          h = 12;
        }
        m = m < 10 ? "0" + m : m;
      
        var pattern = new RegExp("0?" + hh + ":" + m);
      
        var replacement = h + ":" + m;
        replacement += " " + dd;
        return replacement;
    }

    userJoinEvent() {
        console.log('You joined this event');
        this.props.userJoin(this.state.info).then(function(response){
            console.log('response from eventItem: ', this);
            console.log('le response: ', response);
            console.log('la informacion: ', info);
        });
    }

    render() {
        const {info} = this.props;
        const {isLoggedIn} = this.state;
        // console.log('info passed down: ', info);
        
        return (
            <div className="col-sm-12 col-xs-12 singleItem">
                <div className="col-sm-12">
                    <h4>Title: {info.title}</h4>
                    <p>Subject: {info.e_s_subj}</p>
                    <p>{`On ${this.convertDate()} at ${this.convertTime()}`}</p>
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
