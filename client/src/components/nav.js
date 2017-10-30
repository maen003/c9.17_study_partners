import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './nav.css';

import Logo from'../assets/images/stubbieslogo.png';

class Nav extends Component {
    constructor (props) {
        super (props);
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid navbarCustom">
                        <div className="navbar-header">
                            {/* <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#site-nav">
                                <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                            </button>
                            <img src={Logo}/> */}
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav leftNav col-sm-3 col-xs-3">
                                <li>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li>
                                    <Link to='/create-join'>Create or Join</Link>
                                </li>
                            </ul>
                            <div className="navbar-header headerName col-sm-6 col-xs-6">
                                <span className="letter" data-letter="S">S</span>
                                <span className="letter" data-letter="T">T</span>
                                <span className="letter" data-letter="U">U</span>
                                <span className="letter" data-letter="B">B</span>
                                <span className="letter" data-letter="B">B</span>
                                <span className="letter" data-letter="I">I</span>
                                <span className="letter" data-letter="E">E</span>
                                <span className="letter" data-letter="S">S</span>
                            </div>
                            <ul className="nav navbar-nav navbar-right rightNav col-sm-3 col-xs-3">
                                <li>
                                    <Link to='/profile'>Profile</Link>
                                </li>
                                <li>
                                    <Link to='/login'>Login <span className="glyphicon glyphicon-log-in"></span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;
