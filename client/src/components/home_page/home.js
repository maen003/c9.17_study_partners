import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './home.css';
import Logo from '../../assets/images/logo.png';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="container-fluid banner">
                    <img src={Logo}/>
                    <h2>You don't have to study lonely, with stubbies!</h2>
                </div>

                <div className="about col-sm-8 col-xs-12">
                    <h1>Get Started</h1>
                    <hr/>
                    <p>Find others who are studying the same subject as you and meet up with them with just a few easy clicks!</p>
                    <p>Click <b>Create Event</b> to create an event that others can join.</p>
                    <p>Click <b>Join Event</b> to browse through all the events to find the one you want</p>
                    <p><b>Warning</b>: must be signed in to create or join an event!</p>
                </div>

                <div className="info col-sm-4 col-xs-12">
                    <h1>GitHub Links<i className="devicon-github-plain"></i></h1>
                    <hr style={{borderTop: '1px solid black'}}/>
                    <div className="col-sm-12 col-xs-12 indiv">
                        <Link to="https://github.com/maen003" target="_blank">Michael: Backend</Link>
                    </div>
                    <div className="col-sm-12 col-xs-12 indiv">
                        <Link to="https://github.com/kryseno" target="_blank">Krystal: Backend</Link>
                    </div>
                    <div className="col-sm-12 col-xs-12 indiv">
                        <Link to="https://github.com/pk316" target="_blank">Prosith: Frontend</Link>
                    </div>
                    <div className="col-sm-12 col-xs-12 indiv">
                        <Link to="https://github.com/ericyoon1" target="_blank">Eric: Frontend</Link>
                    </div>
                    <div className="col-sm-12 col-xs-12 indiv">
                        <Link to="https://github.com/oowretep" target="_blank">Peter: Frontend</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;