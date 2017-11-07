import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginModal from '../modal/login_modal';

import './nav.css';
// import Logo from'../assets/images/logo.png';

class Nav extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(event) {
        this.setState({
            showModal: !this.state.showModal,
            form: {
                email: '',
                password: ''
            }
        })
    }

    render() {
        const display = {display: 'block'}
        const hide = {display: 'none'}

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
                                    <Link to='/' onClick={this.toggleModal}>Login <span className="glyphicon glyphicon-log-in"></span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <LoginModal showModal={this.state.showModal} toggleModal={this.toggleModal}/>
            </div>
        )
    }
}

export default Nav;
