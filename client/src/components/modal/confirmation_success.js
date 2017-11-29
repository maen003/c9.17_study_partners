import React, {Component} from 'react';

import './confirmation_success.css';

class ConfirmationModal extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showModal: this.props.showModal,
            confirmStatus: this.props.confirmStatus
        }

        this.toggleModal = this.props.toggleModal; /*passed by prop*/
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() { 
        const {showModal, confirmStatus} = this.props;

        if(!showModal){
            return null;
        }

        if (confirmStatus === "success") {
            return (
                <div className={`modal confirmModal ${showModal ? '' : ' hidden'}`} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                                <h4 className="modal-title">Success</h4>
                            </div>
                            <div className="modal-body">
                                <p>Your event has been created! A confirmation email will be sent within the hour.</p><br/>
                                <p>You can check the event you created on your profile or the Join page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`modal confirmModal ${showModal ? '' : ' hidden'}`} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                                <h4 className="modal-title">Error</h4>
                            </div>
                            <div className="modal-body">
                                <p>Something went wrong. Your event has not been created. Try again!</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ConfirmationModal;
