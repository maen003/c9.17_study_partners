import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';
import Checkbox from './checkbox';

import './joinEvent.css';

const subjects = [
    'Life Sciences',
    'Visual and Perfomance Arts',
    'Liberal Arts',
    'Engineering and technology',
    'Business'
  ];

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            eventList: null
        }

        this.getJoinData = this.getJoinData.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.createCheckboxes = this.createCheckboxes.bind(this);
    }

    getJoinData() {
        this.props.getAll().then(function(response){
            console.log('response: ', response.payload.data);
        });
    }

    componentWillMount() {
        this.getJoinData();
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }

    createCheckbox = label => (
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label}/>
    )

    createCheckboxes = () => (
        subjects.map(this.createCheckbox)
    )

    render() {
        return (
            <div className="container">
                <div className="filterContainer col-sm-8 col-xs-12">
                    <h3>Filter Results</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <div>
                            <h4>By Subject</h4>
                            {this.createCheckboxes()}
                        </div>
                        <div className="form-group zipInput">
                            <h4>By Location</h4>
                            <input type="text" className="zipcode form-control" placeholder="Zip Code"/>
                        </div>
                    </form>
                    <button className="btn btn-warning" type="submit">Search Again</button>

                    <div className="map col-sm-12 col-xs-12">
                        <p>map goes here</p>
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