import React, {Component} from 'react';
import DetailsModal from '../modal/event_details_modal';
import axios from 'axios';

import './eventItem.css';

class EventDetails extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.renderMapAfterClick = this.renderMapAfterClick.bind(this);
        this.singleMap = this.singleMap.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
    }

    /////////////////////////MAP////////////////////////
    renderMapAfterClick(){
        console.log('More info button clicked');
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+'uci'+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
            .then(this.axiosThenFunction);
    }

    //***//^^^^^//REPLACE 'UCI' WITH INFO.LOCATION//^^^^^//***//

    axiosThenFunction(response){
        this.setState({
            coordinates: response.data.results[0].geometry.location
        });
        console.log('coordinates: ', this.state.coordinates);
        this.singleMap();
    }

    singleMap() {
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
        this.renderMapAfterClick();
    }

    render() {
        const {info} = this.props;
        // console.log('info passed down: ', info);
        const display = {display: 'block'}
        const hide = {display: 'none'}

        return (
            <div className="col-sm-12 col-xs-12 singleItem">
                <div className="col-sm-8">
                    <h4>Title: {info.title}</h4>
                    <p>Subject: {info.subject}</p>
                    <p>{`On ${info.date} at ${info.time}`}</p>
                </div>
                <div className="col-sm-4 buttonContainer">
                    <button onClick={this.toggleModal} className="btn btn-success infoButton" type="button">More Info</button>
                </div>
                <DetailsModal details={info} showModal={this.state.showModal} toggleModal={this.toggleModal}/>
            </div>
        );
    }
}

export default EventDetails;
