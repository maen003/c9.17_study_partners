import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createEvent} from '../../actions';
import axios from 'axios';
import ConfirmationModal from '../modal/confirmation_success';

import './createEvent.css';

class CreateEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            coordinates: null,
            showModal: false,
            modalMessage: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.submitData = this.submitData.bind(this);

        this.renderMapAfterText = this.renderMapAfterText.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
        this.createMap = this.createMap.bind(this);
        this.createMapOnLoad = this.createMapOnLoad.bind(this);
    }

    renderInputText({className, placeholder, input, label, type, meta: {touched, error}}) { //deconstructing (es6) prop values so you dont have to write "prop." before everything
        return (
            <div className={className}>
                <label>{label}</label>
                <input {... input} type={type} placeholder={placeholder} className="form-control"/>
                <p style={{color: 'red'}}>{touched && error}</p>
            </div>
        )
    }

    ///////////////////////MAP/////////////////////////
    renderMapAfterText(location){
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+location.currentTarget.value+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
            .then(this.axiosThenFunction);
    }

    axiosThenFunction(response){
        this.setState({
            coordinates: response.data.results[0].geometry.location
        });
        console.log('coordinates: ', this.state.coordinates);
        this.createMap();
    }

    createMap() {
        const uluru = this.state.coordinates;
        const map = new google.maps.Map(document.getElementById('createMap'), {
            zoom: 14,
            center: uluru
        });
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
            animation: google.maps.Animation.DROP, //BOUNCE //DROP
        });
    }

    /* Map Display on Load */

    createMapOnLoad() {
        const map = new google.maps.Map(document.getElementById('createMap'), {
            zoom: 3,
            center: {lat: 37.09024, lng: -95.712891}
        });
    }

    componentDidMount() {
        window.addEventListener('load', this.createMapOnLoad);
        this.createMapOnLoad();
    }

    // componentDidUpdate() {
    //     this.createMapOnLoad();
    //     console.log('hi');
    // }

    /////////////////////////

    toggleModal(message) {
        this.setState({
            showModal: !this.state.showModal,
            modalMessage: message
        })
    }

    submitData(values) {
        const {reset} = this.props;
        const formData = {values, coordinates: JSON.stringify(this.state.coordinates)};
        console.log('form values: ', formData);
        this.props.createEvent(formData).then(function(resp){
            console.log('add events successful');
            console.log(resp);
            reset();
            this.toggleModal("success");
        }).catch(() => {
            toggleModal("error");
        });

        this.setState({
            coordinates: ''
        })
    }

    render() {
        // console.log('props: ', this.props);
        const {handleSubmit, reset} = this.props;

        return (
            <div className="container">
                <div className="form-group">
                    <form onSubmit={handleSubmit((values) => this.submitData(values))}>
                        <Field className="col-sm-12 col-xs-12" name="title" component={this.renderInputText} type="text" label="Title" placeholder="Title of Event"/>
                        <div className="col-sm-4 col-xs-12">
                            <label htmlFor="subject">Subject</label>
                            <Field className="form-control selectInput" id="subject" name="subject" component="select" placeholder="Set Subject" label="Event Subject">
                                <option disabled>Select a Subject</option>
                                <option value="1">Life Sciences</option>
                                <option value="2">Visual and Perfomance Arts</option>
                                <option value="3">Liberal Arts</option>
                                <option value="4">Engineering and Technology</option>
                                <option value="5">Business</option>
                            </Field>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <label>Event Duration</label>
                            <Field className="form-control selectInput" name="duration" component="select" placeholder="Duration" label="Event Duration">
                                <option disabled>Select event duration</option>
                                <option>Less than 1 Hour</option>
                                <option>1 - 2 Hours</option>
                                <option>2 - 3 Hours</option>
                                <option>3 - 4 Hours</option>
                                <option>4 - 5 Hours</option>
                                <option>> 5 Hours</option>
                            </Field>
                        </div>
                        <Field className="col-sm-4 col-xs-12 selectInput" name="max" component={this.renderInputText} type="number" min="2" max="100" placeholder="Group Size" label="Max Group Size"/>
                        <Field className="col-sm-4 col-sm-offset-1 col-xs-12" name="date" component={this.renderInputText} type="date" label="Date" placeholder="Date of Event"/>
                        <Field className="col-sm-4 col-sm-offset-2 col-xs-12" name="time" component={this.renderInputText} type="time" label="Time" placeholder="Time of Event"/>
                        <div className="col-sm-12 col-xs-12">
                            <div className="leftOfMap col-sm-4">
                                <Field name="phone" component={this.renderInputText} type="text" label="Phone" placeholder="xxx-xxx-xxxx"/>
                                <Field name="email" component={this.renderInputText} type="email" label="Email" placeholder="e.g. johndoe@gmail.com"/>
                                <Field className="locationPadding" name="location" component={this.renderInputText} onBlur={this.renderMapAfterText} type="text" label="Event Location" placeholder="e.g. Starbucks, Irvine or 8539 Irvine Center"/>
                            </div>
                            <div className="col-sm-8 col-xs-12 locationFormComp">
                                <div className="mapView">
                                    <div className="createMap" id="createMap"></div>
                                </div>
                            </div>
                        </div>
                        <Field className="form-control" name="description" component="textarea" type="text" label="Event Description" placeholder="Description here..."/>
                        <div className="bottons col-sm-12 col-xs-12">
                            <button className="form-group btn btn-danger" type="button" onClick={reset}>Reset From</button>
                            <button className="form-group btn btn-success submitForm">Create Event</button>
                        </div>
                    </form>
                    <ConfirmationModal confirmStatus={this.state.modalMessage} showModal={this.state.showModal} toggleModal={this.toggleModal}/>
                </div>
            </div>
        )
    }
}

function validation(values) {
    const emailRegex = /^[a-zA-Z0-9&$._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}\s*$/
    const phoneRegex = /^[1]?[- ]?[(]?([0-9]{3})[)]?[- ]*?([0-9]{3})[- ]*?([0-9]{4})$/
    const error = {};
    if (!values.title) {
        error.title = 'Please enter a title';
    }
    if (!values.date) {
        error.date = 'Please specify the event date';
    }
    if (!values.time) {
        error.time = 'Please specify the event time';
    }
    if (!phoneRegex.test(values.phone)) {
        error.phone = 'Please enter a valid phone number';
    }
    if (!emailRegex.test(values.email)) {
        error.email = 'Please enter your email';
    }
    if (!values.location) {
        error.location = 'Please enter the event location';
    }
    if (!values.description) {
        error.description = 'Please enter description of event';
    }
    if (values.max <= 1) {
        error.max = 'Please enter a number between 2-100';
    }
    return error;
}

CreateEvent = reduxForm({
    form: 'create-event',
    validate: validation
})(CreateEvent);

export default connect(null, {createEvent})(CreateEvent);
