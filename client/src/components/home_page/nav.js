import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import ProfileModal from '../modal/profile_modal';
import FacebookLogin from './fbLogin';
import {getAll} from '../../actions';

import './nav.css';
// import Logo from'../assets/images/logo.png';

// class Nav extends Component {
//     constructor (props) {
//         super (props);

//         this.state = {
//             showModal: false
//         }

//         this.toggleModal = this.toggleModal.bind(this);
//     }

//     toggleModal(event) {
//         this.setState({
//             showModal: !this.state.showModal,
//         })
//     }

//     render() {
//         const display = {display: 'block'}
//         const hide = {display: 'none'}

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
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
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
                                    <Link to='/profile'>Profile</Link>
                                    {/* <Link to='/' onClick={this.toggleModal}>Profile</Link> */}
                                </li>
                                <li className="facebookLogin">
                                    <FacebookLogin/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <ProfileModal showModal={this.state.showModal} toggleModal={this.toggleModal}/> */}
            </div>
        )
    
}

export default Nav;
