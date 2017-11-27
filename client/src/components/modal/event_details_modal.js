import React, {Component} from 'react';

import './event_details_modal.css';

class DetailsModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            showModal: this.props.showModal,
            details: this.props.details
        }

        this.toggleModal = this.props.toggleModal; /*passed by prop*/
        // this.animateModal = this.animateModal.bind(this);
    }

    // componentDidMount() {
    //     this.animateModal();
    // }

    // animateModal() {
    //     var detailModal = document.getElementsByClassName("animateModal")[0];

    //     if (detailModal.classList.contains('expandDetails')) {
    //         join.className += " closeDetails"
    //     }
    // }

    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    render() { 
        const {showModal, details} = this.state;

        if(!showModal){
            return null;
        }

        return (
            <div className={`modal detailsModal ${showModal ? '' : ' hidden'}`} role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content animateModal">
                        <div className="modal-header">
                            <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">{`Details: ${details.title}`}</h4>
                        </div>
                        <div className="modal-body">
                            <p><b>Subject: </b>{details.subject}</p>
                            <p><b>Max Group Size: </b>{details.max}</p>
                            <p><b>Date of Event: </b>{details.date}</p>
                            <p><b>Time of Event: </b>{details.time}</p>
                            <p><b>Duration of Event: </b>{details.duration}</p>
                            <p><b>Contact Phone: </b>{details.phone}</p>
                            <p><b>Contact Email: </b>{details.email}</p>
                            <p><b>Description: </b>{details.description}</p>
                            <p><b>Location: </b>{details.location}</p>
                            <div className="singleMap" id="singleMap"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsModal;
