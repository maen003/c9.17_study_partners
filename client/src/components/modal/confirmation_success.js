import React, {Component} from 'react';

import './confirmation_success.css';

class ConfirmationModal extends Component {
    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() { 
        const {showModal} = this.props;

        if(!showModal){
            return null;
        }

        return (
            <div className={`modal confirmModal ${showModal ? '' : ' hidden'}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">Confirmation</h4>
                        </div>
                        <div className="modal-body">
                            <p>Your event has been created! A confirmation email will be sent within the hour. You can check the event you created on your profile or the Join page.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationModal;
