import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FacebookLogin from './fbLogin';
import {getAll} from '../../actions';
import ProfileToggle from './profile_toggle';


import './nav.css';
// import Logo from'../assets/images/logo.png';

const Nav =() => {
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
                    <div className="collapse navbar-collapse">
                         <ul className="navbar-right">
                            <li className="facebookLogin">
                                <FacebookLogin />
                            </li>
                        </ul>
                        <ul className="nav nav-tabs navbar-right">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/join-event'>Join</Link>
                            </li>
                            <li>
                                <Link to='/create-event'>Create</Link>
                            </li>
                            <li>
                                <ProfileToggle/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
    
}

export default Nav;
