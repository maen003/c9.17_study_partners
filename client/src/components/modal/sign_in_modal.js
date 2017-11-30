import React, { Component } from 'react';
import FacebookLogin from '../home_page/fbLogin';

import './sign_in.css';

class SignInModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignInModal: this.props.showSignInModal,
        }

        this.toggleSignInModal = this.props.toggleSignInModal;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showSignInModal: nextProps.showSignInModal
        })
    }

    render() {
        const { showSignInModal } = this.props;

        if (!showSignInModal) {
            return null;
        }
        return (
            <div className={`modal signInModal ${showSignInModal ? '' : ' hidden'}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.toggleSignInModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">Please Log In</h4>
                        </div>
                        <div className="modal-body">
                            <p>Please Log in if you would like to create an event.</p>
                                <FacebookLogin/>
                             
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SignInModal;

