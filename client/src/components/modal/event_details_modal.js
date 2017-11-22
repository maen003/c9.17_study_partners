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
                            <h4 className="modal-title">Details</h4>
                        </div>
                        <div className="modal-body">
                            <p>{`Title: ${details.title}`}</p>
                            <p>{`Subject: ${details.subject}`}</p>
                            <p>{`Max Group Size: ${details.max}`}</p>
                            <p>{`Date of Event: ${details.date}`}</p>
                            <p>{`Time of Event: ${details.time}`}</p>
                            <p>{`Duration of Event: ${details.duration}`}</p>
                            <p>{`Contact Phone: ${details.phone}`}</p>
                            <p>{`Contact Email: ${details.email}`}</p>
                            <p>{`Details: ${details.details}`}</p>
                            <p>{`Location: ${details.location}`}</p>
                            <div className="singleMap" id="singleMap">loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsModal;
