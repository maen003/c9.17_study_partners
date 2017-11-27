import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './home.css';
import Passport from '../../assets/images/passport_js.png';
import MeisterTask from '../../assets/images/meistertask.png';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleTech: true
        };
    
        this.clickHandler = this.clickHandler.bind(this);
    }
    
    clickHandler() {
        this.setState(prevState => ({
            toggleTech: !prevState.toggleTech
        }));
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="navbar-header headerName col-sm-12">
                        <span className="letter" data-letter="S">S</span>
                        <span className="letter" data-letter="T">T</span>
                        <span className="letter" data-letter="U">U</span>
                        <span className="letter" data-letter="B">B</span>
                        <span className="letter" data-letter="B">B</span>
                        <span className="letter" data-letter="I">I</span>
                        <span className="letter" data-letter="E">E</span>
                        <span className="letter" data-letter="S">S</span>
                    </div>
                    <h2>You don't have to study lonely, with stubbies!</h2>
                </div>

                <div className="about col-sm-8 col-xs-12">
                    <h2>About</h2>
                    <hr/>
                    <p>Find others who are studying the same subject as you and meet up with them with just a few easy clicks!</p>
                    <p>Click <b>create</b> to create an event that others can join.</p>
                    <p>Click <b>Join</b> to browse through all the events to find the one you want</p>
                    <p><b>Warning</b>: must be signed in to create or join an event!</p>
                </div>
    
                <div className="info col-sm-4 col-xs-12">
                    <h2 onClick={this.clickHandler} style={{cursor: 'pointer', textAlign: 'center'}}>Tech Stack</h2>
                    <hr/>
                    <div style={this.state.toggleTech ? {display: 'none'} : {height: 'auto'}}>
                        <div className="col-sm-12 techCategory">
                            <h4>Front End</h4>
                            <ul className="listTech">
                                <li>
                                    <i className="deviconicon devicon-react-original colored"></i>
                                    <br/>React.JS
                                </li>
                                <li>
                                    <i className="deviconicon devicon-css3-plain colored"></i>
                                    <br/>CSS3
                                </li>
                                <li>
                                    <i className="deviconicon devicon-bootstrap-plain colored"></i>
                                    <br/>Boostrap
                                </li>
                                <li>
                                    <i className="deviconicon devicon-javascript-plain colored"></i>
                                    <br/>JavaScript
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 techCategory">
                            <h4>Back End</h4>
                            <ul className="listTech">
                                <li>
                                    <i className="deviconicon devicon-nodejs-plain colored"></i>
                                    <br/>Node.JS
                                </li>
                                <li>
                                    <i className="deviconicon devicon-mysql-plain colored"></i>
                                    <br/>MySql
                                </li>
                                <li>
                                    <i className="deviconicon devicon-express-original"></i>
                                    <br/>Express
                                </li>
                                <li>
                                    <img className="passport" src={Passport}/>
                                    <br/>Passport
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 techCategory">
                            <h4>Misc</h4>
                            <ul className="listTech">
                                <li>
                                    <img className="meistertask" src={MeisterTask}/>
                                    <br/>MeisterTask
                                </li>
                                <li>
                                    <i className="deviconicon devicon-git-plain colored"></i>
                                    <br/>Git
                                </li>
                                <li>
                                    <i className="deviconicon devicon-github-plain colored"></i>
                                    <br/>GitHub
                                </li>
                                <li>
                                    <i className="deviconicon devicon-slack-plain colored"></i>
                                    <br/>Slack
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr/>
                    
                <div className="col-sm-12 col-xs-12 footer">
                    <h4 className="col-sm-2">GitHub Links<i className="devicon-github-plain"></i></h4>
                    <div className="col-sm-2 col-xs-6 indiv">
                        <Link to="https://github.com/maen003" target="_blank">Michael - Back End</Link>
                    </div>
                    <div className="col-sm-2 col-xs-6 indiv">                    
                        <Link to="https://github.com/kryseno" target="_blank">Krystal - Back End</Link>
                    </div>
                    <div className="col-sm-2 col-xs-6 indiv">
                        <Link to="https://github.com/pk316" target="_blank">Prosith - Front End</Link>
                    </div>
                    <div className="col-sm-2 col-xs-6 indiv">
                        <Link to="https://github.com/ericyoon1" target="_blank">Eric - Front End</Link>
                    </div>
                    <div className="col-sm-2 col-xs-12 indiv">
                        <Link to="https://github.com/oowretep" target="_blank">Peter - Front End</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;