import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userEvents} from '../../actions/index';

import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstName: null,
          lastName: null
        };

        this.getUserData = this.getUserData.bind(this);
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserData() {
        this.props.userEvents().then((resp) => {
            console.log('response for user: ', resp);
            this.setState({
                firstName: resp.payload.data.profile.user.name.givenName,
                lastName: resp.payload.data.profile.user.name.familyName
            });
            console.log(this.props);
        })
    }

    render() {
        const { firstName, lastName } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 ">
                        <div className="panel panel-default">
                            <div className="panel-heading">  <h3 >User Profile</h3></div>
                            <div className="panel-body">
                                <div className="col-sm-3">                                   
                                    <img className="img-circle img-thumbnail" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" />
                                    <div className="" ><h4>First Name: { firstName  }</h4></div>
                                    <div className="" >Last Name: { lastName } </div>
                                    <div className="" >Contact: </div>
                                    <div className="" >School: </div>
                                    <div className="" >Major/Subject: </div>
                                    <div className="" >Grade: </div>
                                </div>
                                <div id="joinDiv"className="col-sm-4 col-sm-offset-1">
                                    <h1>Events Joined</h1>
                                    <div>   
                                        LIST OF EVENTS JOINED
                                    </div>
                                </div>
                                <div id="createDiv"className="col-sm-4">
                                    <h1>Events Created</h1>
                                    <div>   

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
export default connect(null, {userEvents})(Profile);