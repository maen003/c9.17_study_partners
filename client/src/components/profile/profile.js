import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userEvents, getProfileJoin} from '../../actions/index';
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
            photo: null,
            userCreated: [],
            userJoined: []
        };

        this.getUserDataCreate = this.getUserDataCreate.bind(this);
        this.getJoinedEvents = this.getJoinedEvents.bind(this);
    }

    componentWillMount() {
        this.getUserDataCreate();
        this.getJoinedEvents();
    }

    getUserDataCreate() {
        this.props.userEvents().then((resp) => {
            console.log('response for user CREATED: ', resp);
            this.setState({
                firstName: resp.payload.data.profile.user.name.givenName,
                lastName: resp.payload.data.profile.user.name.familyName,
                contact: resp.payload.data.profile.user.emails[0].value,
                photo: resp.payload.data.profile.user.photos[0].value,
                userCreated: resp.payload.data.data
            });
            console.log(this.props);
        })
    }

    getJoinedEvents() {
        this.props.getProfileJoin().then((resp) => {
            console.log('response for events joined: ', resp);
            this.setState({
                userJoined: resp.payload.data.data
            })
        })
    }

    render() {
        const { firstName, lastName, contact, photo } = this.state;
        console.log('props', this.props)
        console.log('events: ', this.props.events)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 ">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-sm-3">                                   
                                    <img className="img-circle img-thumbnail" src={photo} />
                                    <div className="" ><h4>{firstName} {lastName} </h4></div>
                                    <div className="" >{ contact} </div>
                                </div>
                                <div id="joinDiv"className="col-sm-4 col-sm-offset-1">
                                    <h1>Events Joined</h1>
                                    <div>   
                                        <EventListJoin joinedEvents={this.state.userJoined} eventList={this.props.events}/>
                                    </div>
                                </div>
                                <div id="createDiv"className="col-sm-4">
                                    <h1>Events Created</h1>
                                    <div>   
                                        <EventListCreate createdEvents={this.state.userCreated} eventList={this.props.events}/>
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

export default connect(null, {userEvents, getProfileJoin})(Profile);
