import React, {Component} from 'react';

import './confirmation_join.css';

class ConfirmationModalJoin extends Component {
    constructor (props) {
        super (props);

        this.toggleModal = this.props.toggleModal;
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() {
        console.log("PROPS FOR CONFIRM JOIN EVENT MODAL: ", this.props);
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
                                <p>You have joined this event! A confirmation email will be sent within the hour.</p><br/>
                                <p>You can check the event you joined in your profile.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" class="btn btn-default" onClick={this.toggleModal}>Close</button>
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
                                <p>Can not join this event</p>
                                <p>Check profile to see if you are already registered in this event</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" onClick={this.toggleModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ConfirmationModalJoin;
