import React, {Component} from 'react';

import './profile_modal.css';

const display = {
    display: 'block'
}

const hide = {
    display: 'none'
}

class ProfileModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            showModal: this.props.showModal
        }

        this.toggleModal = this.props.toggleModal;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() {
        const {showModal} = this.state;
        
        return (
            <div className={`modal profileModal ${showModal ? '' : ' hidden'}`} id="profileModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">Profile</h4>
                        </div>
                        <div className="modal-body">
                            <h1>Profile body goes here</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileModal;

  