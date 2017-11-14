import React, {Component} from 'react';
// import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createEvent} from '../../actions';
import axios from 'axios';

import './createEvent.css';

class CreateEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                title: 'asdf',
                subject: 'Life Sciences',
                max: '2-5',
                date: '',
                time: '',
                duration: 'Less than 1 Hour',
                phone: '1234567890',
                email: 'asdf@asdf.com',
                location: 'Learning Fuze',
                description: 'asdf'
            },
            coordinates: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);

        this.renderMapAfterText = this.renderMapAfterText.bind(this);
        this.axiosThenFunction = this.axiosThenFunction.bind(this);
        this.createMap = this.createMap.bind(this);
    }

    ///////////////////////MAP/////////////////////////
    renderMapAfterText(){
        console.log('location input focus changed');
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.form.location+'&key=AIzaSyBtOIVlRonYB8yoKftnhmhRT_Z8Ef-op3o')
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
    ///////////////////////MAP/////////////////////////

    handleInputChange(event){
        const {value, name} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.setState({
            form: {...form}
        });
    }

    submitData(event) {
        event.preventDefault();
        const formData = {...this.state.form, coordinates: this.state.coordinates};
        console.log('form values: ', formData);
        this.props.createEvent(formData).then(function(resp){
            console.log('add events successful');
            console.log(resp);
        });

        this.setState({
            form: {
                title: '',
                subject: '',
                max: '',
                date: '',
                time: '',
                duration: '',
                phone: '',
                email: '',
                location: '',
                description: ''
            },
            coordinates: ''
        })
    }



    render() {
        const {title, subject, max, date, time, duration, phone, email, location, description} = this.state.form;

        return(
            <div className="container">
                <form onSubmit={this.submitData}>
                    <div className="form-group">
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="title">Title of event</label><br/>
                                <input value={title} onChange={this.handleInputChange} name="title" type="text" id="title" className="form-control" placeholder="Title"/><br/>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="subjects">Event Subject</label><br/>
                                <select value={subject} onChange={this.handleInputChange} name="subject" id="subjects" className="form-control">
                                    <option disabled>Set subject</option>
                                    <option>Life sciences</option>
                                    <option>Visual and Perfomance Arts</option>
                                    <option>Liberal Arts</option>
                                    <option>Engineering and technology</option>
                                    <option>Business</option>
                                </select>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                                <label htmlFor="max">Group Size</label><br/>
                                    <select value={max} onChange={this.handleInputChange} name="max" id="max" className="form-control">
                                        <option disabled>Set group size</option>
                                        <option>2-5</option>
                                        <option>6-10</option>
                                        <option>11-15</option>
                                        <option>16-20</option>
                                        <option>21-25</option>
                                        <option>26-30</option>
                                        <option>> 30</option>
                                    </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="date">Date of event</label><br/>
                                <input value={date} onChange={this.handleInputChange} name="date" type="date" id="date" className="form-control" placeholder="MM/DD/YYYY"/>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="time">Time of event</label><br/>
                                <input value={time} onChange={this.handleInputChange} name="time" type="time" id="time" className="form-control"/>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="duration">Duration of event</label><br/>
                                <select value={duration} onChange={this.handleInputChange} name="duration" id="duration" className="form-control">
                                    <option disabled>Set duration</option>
                                    <option>Less than 1 Hour</option>
                                    <option>1 - 2 Hours</option>
                                    <option>2 - 3 Hours</option>
                                    <option>3 - 4 Hours</option>
                                    <option>4 - 5 Hours</option>
                                    <option>> 5 Hours</option>
                                </select>          
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="phone">Phone Number</label><br/>
                                <input value={phone} onChange={this.handleInputChange} name="phone" type="tel" id="phone" className="form-control"/>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="email">Email</label><br/>
                                <input value={email} onChange={this.handleInputChange} name="email" type="email" id="email" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 col-xs-12">
                            <div className="col-sm-4 col-xs-12 locationFormComp"> 
                                <label htmlFor="location">Location of event</label><br/>
                                    <input onBlur={this.renderMapAfterText} value={location} onChange={this.handleInputChange} name="location" name="location" id="location" className="form-control"/>
                            </div>
                            <div className="col-sm-8 col-xs-12 locationFormComp">
                                <div className="mapView">
                                    <div className="createMap" id="createMap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea value={description} onChange={this.handleInputChange} name="description" className="form-group col-sm-12 col-xs-12" rows="3" id="description" placeholder="Description of event..."></textarea>
                    </div>
                </form>
                <div className="bottons col-sm-12 col-xs-12"> {/* bottom buttons */}
                    <button className="form-group btn btn-danger" type="button">Back</button>
                    <button className="form-group btn btn-success submitForm" type="submit" onClick={this.submitData}>Create Event</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {createEvent})(CreateEvent);
