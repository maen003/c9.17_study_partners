import React, { Component } from 'react';

import './confirmation_success.css';

class SignInModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.showModal,
        }

        this.toggleSignInModal = this.props.toggleSignInModal; /*passed by prop*/
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() {
        const { showModal} = this.props;

        if (!showModal) {
            return null;
        }
            return (
                <div className={`modal confirmModal ${showModal ? '' : ' hidden'}`} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.toggleSignInModal} type="button" className="close">&times;</button>
                                <h4 className="modal-title">Please Sign In</h4>
                            </div>
                            <div className="modal-body">
                                <p>Please Sign In to Create an Event</p>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


export default SignInModal;
