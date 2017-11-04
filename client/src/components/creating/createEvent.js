import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createEvent} from '../../actions';

import './createEvent.css';

class CreateEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                title: '',
                subject: '',
                groupSize: '',
                date: '',
                time: '',
                duration: '',
                phone: '',
                email: '',
                location: '',
                description: ''
            }
        }

        this.getDomElement = this.getDomElement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount() {
        this.getDomElement();
    }

    getDomElement() {
        var create = document.getElementsByClassName("createEvent")[0];

        if (create.classList.contains('animateExpandCreate')) {
            join.className += " animateCloseCreate"
        }
    }

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
        console.log('form values: ', this.state.form);
        this.props.createEvent(this.state.form).then(function(resp){
            console.log('add events successful');
            console.log(resp);
        });

        this.setState({
            form: {
                title: '',
                subject: '',
                groupSize: '',
                date: '',
                time: '',
                duration: '',
                phone: '',
                email: '',
                location: '',
                description: ''
            }
        })
    }

    render() {
        const {title, subject, groupSize, date, time, duration, phone, email, location, description} = this.state.form; 
        return(
            <div className={`createEvent ${this.props.show ? 'animateExpandCreate' : 'animateCloseCreate'}`}>
                <form onSubmit={this.submitData}>
                    <div className="form-group inputArea col-sm-12 col-xs-12 row1">
                        <div className="col-sm-4 col-xs-12">
                            <label htmlFor="title">Title of event</label><br/>
                                <input value={title} onChange={this.handleInputChange} name="title" type="text" id="title" className="title form-control" placeholder="Title"/><br/>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <label htmlFor="subjects">Event Subject</label><br/>
                                <select value={subject} onChange={this.handleInputChange} name="subject" id="subjects" className="subjects form-control">
                                    <option>Set subject</option>
                                    <option>Life sciences</option>
                                    <option>Visual and Perfomance Arts</option>
                                    <option>Liberal Arts</option>
                                    <option>Engineering and technology</option>
                                    <option>Business</option>
                                </select>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                                <label htmlFor="groupSize">Group Size</label><br/>
                                    <select value={groupSize} onChange={this.handleInputChange} name="groupSize" id="groupSize" className="size form-control">
                                        <option>Set group size</option>
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
                    <div className="form-group inputArea col-sm-12 col-xs-12 row2">
                        <div className="col-sm-4 col-xs-12 form-group">
                            <label htmlFor="date">Date of event</label><br/>
                                <input value={date} onChange={this.handleInputChange} name="date" type="date" id="date" className="input-group date dateEvent form-control" placeholder="MM/DD/YYYY"/>
                        </div>
                        <div className="col-sm-4 col-xs-12 form-group">
                            <label htmlFor="time">Time of event</label><br/>
                                <input value={time} onChange={this.handleInputChange} name="time" type="time" id="time" className="time form-control"/>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <label htmlFor="duration">Duration of event</label><br/>
                                <select value={duration} onChange={this.handleInputChange} name="duration" id="duration" className="duration form-control">
                                    <option>Set duration</option>
                                    <option>Less than 1 Hour</option>
                                    <option>1 - 2 Hours</option>
                                    <option>2 - 3 Hours</option>
                                    <option>3 - 4 Hours</option>
                                    <option>4 - 5 Hours</option>
                                    <option>> 5 Hours</option>
                                </select>          
                        </div>
                    </div>
                    <div className="form-group inputArea col-sm-12 col-xs-12 row3">
                        <div className="col-sm-6 col-xs-12">
                            <label htmlFor="phone">Phone Number</label><br/>
                                <input value={phone} onChange={this.handleInputChange} name="phone" type="tel" id="phone" className="phone form-control"/>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <label htmlFor="email">Email</label><br/>
                                <input value={email} onChange={this.handleInputChange} name="email" type="email" id="email" className="email form-control"/>
                        </div>
                    </div>
                    <div className="form-group inputArea col-sm-12 col-xs-12 row4">
                        <div className="col-sm-12 col-xs-12 locationForm">
                            <div className="col-sm-4 col-xs-12 locationFormComp"> 
                                <label htmlFor="location">Location of event</label><br/>
                                    <input value={location} onChange={this.handleInputChange} name="location" name="location" id="location" className="location form-control"/>
                            </div>
                            <div className="col-sm-8 col-xs-12 locationFormComp">
                                <div className="mapView"></div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group inputArea col-sm-12 col-xs-12 row5">
                        <textarea value={description} onChange={this.handleInputChange} name="description" className="form-group col-sm-10 col-sm-offset-1 col-xs-10 description" rows="3" id="description" placeholder="Description of event..."></textarea>
                    </div>
                </form>
                <div className="bottons col-sm-12 col-xs-12"> {/* bottom buttons */}
                    <button className="btn btn-danger" type="button">Back</button>
                    <button className="form-group btn btn-success submitForm" type="submit" onClick={this.submitData}>Create Event</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {createEvent})(CreateEvent);
