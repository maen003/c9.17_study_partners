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
        const joinStatus = null;
        const statusHeader = null;
        if (confirmStatus === "success") {
            statusHeader = "Success"
            joinStatus = "You have joined this event! A confirmation email will be sent within the hour. You can check the event you joined in your profile."
        } else if (confirmStatus === "error1") {
            statusHeader = "Error"
            joinStatus = "Can not join this event: Check profile to see if you are already registered in this event."
        } else if (confirmStatus === "error2") {
            statusHeader = "Error"
            joinStatus = "Can not join this event: The group size has reached its max."
        } else {
            joinStatus = "An error occured... Try again later."
        }

        if(!showModal){
            return null;
        }

        return (
            <div className={`modal confirmModal ${showModal ? '' : ' hidden'}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">{statusHeader}</h4>
                        </div>
                        <div className="modal-body">
                            <p>{joinStatus}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-default" onClick={this.toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmationModalJoin;
