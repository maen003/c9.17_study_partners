import React from 'react';

import './home.css';

export default () => {
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
            <div className="info-about">
                <h2>About</h2>
                <hr/>
                <p>Stubbies is a place where people go, to feel like they belong. Find others who are studying the same subject as you and meet up with them!</p>
                <p>Click <b>create</b> to create an event that others can join.</p>
                <p>Click <b>Join</b> to browse through all the events to find the one you want</p>
                <p><b>Warning</b>: must be signed in to create or join an event!</p>
            </div>
            <footer>
                <div className="col-sm-6 col-xs-12">
                    <h3>GitHub</h3>
                    <ul>
                        <li><a href="https://github.com/maen003" target="_blank">Michael - Back End</a></li>
                        <li><a href="https://github.com/kryseno" target="_blank">Krystal - Back End</a></li>
                        <li><a href="https://github.com/pk316" target="_blank">Prosith - Front End</a></li>
                        <li><a href="https://github.com/ericyoon1" target="_blank">Eric - Front End</a></li>
                        <li><a href="https://github.com/oowretep" target="_blank">Peter - Front End</a></li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <h3>Technologies Used</h3>
                    <ul>
                        <h4>Front End</h4>
                        <li>React</li>
                        <li>Redux</li>
                        <li>CSS3</li>
                        <li>Boostrap</li>
                    </ul>
                    <ul>
                        <h4>Back End</h4>
                        <li>MySql</li>
                        <li>Node.JS</li>
                        <li>Passport</li>
                    </ul>
                    <ul>
                        <h4>Others</h4>
                        <li>MeisterTask</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
