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
                <h2>You don't have to be lonely, with stubbies!</h2>
            </div>
            <div className="info-about">
                <h2>About/Info</h2>
                <p>Put info here</p>
            </div>
        </div>
    )
}