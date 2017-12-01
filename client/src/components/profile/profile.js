import React, { Component } from 'react';
import {connect} from 'react-redux';
import {allCreateEvent, allJoinEvent} from '../../actions';
import EventListCreate from './listEventsProfileCreate';
import EventListJoin from './listEventsProfileJoin';

import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            contact: null,
            photo: null
        }
    }

    componentWillMount() {  
        this.props.allCreateEvent();
        this.props.allJoinEvent();

        this.setState({
            firstName: this.props.all.data.profile.user.name.givenName,
            lastName: this.props.all.data.profile.user.name.familyName,
            contact: this.props.all.data.profile.user.emails[0].value,
            photo: this.props.all.data.profile.user.photos[0].value
        })
    }

    render() {
        console.log('PROPS FOR PROFILE:', this.props);
        console.log("PROPS FOR PROFILE INFO: ", this.props.all);
        const {firstName, lastName, contact, photo} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                {/* <div className="col-sm-3 col-xs-12">                                   
                                    <img className="img-circle img-thumbnail" src={photo} />
                                    <div><h4>{firstName} {lastName} </h4></div>
                                    <div>{contact}</div>
                                </div> */}
                                <div id="joinDiv"className="col-sm-4 col-sm-offset-1 col-xs-12">
                                    <h1>Events Joined</h1>
                                    <div>   
                                        <EventListJoin joinedEvents={this.props.joined} eventList={this.props.events}/>
                                    </div>
                                </div>
                                <div id="createDiv"className="col-sm-4 col-xs-12">
                                    <h1>Events Created</h1>
                                    <div>   
                                        <EventListCreate createdEvents={this.props.created} eventList={this.props.events}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        created: state.event.userCreatedEvents,
        joined: state.event.userJoinedEvents,
        all: state.event.all
    }
}

export default connect(mapStateToProps, {allCreateEvent, allJoinEvent})(Profile);
