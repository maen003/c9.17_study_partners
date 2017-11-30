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
        this.modalClickDetect = this.modalClickDetect.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    modalClickDetect(event) {
        if (document.getElementById("modalBody").contains(event.target)) {
            console.log('clicked inside modal');
        } else {
            console.log('clicked outside modal');
        }
    }

    convertDate() {
        var date = this.state.details.date;
        var time = this.state.details.time;
        var convert = new Date(`${date} " " ${ time}`);
        var newDate = convert.toLocaleDateString();
        return newDate;
    }

    convertTime() {
        var date = this.state.details.date;
        var time = this.state.details.time;
        var d = new Date(`${date} " " ${ time}`);
        var hh = d.getHours();
        var m = d.getMinutes();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
          h = hh - 12;
          dd = "PM";
        }
        if (h == 0) {
          h = 12;
        }
        m = m < 10 ? "0" + m : m;
      
        var pattern = new RegExp("0?" + hh + ":" + m);
      
        var replacement = h + ":" + m;
        replacement += " " + dd;
        return replacement;
    }

    render() { 
        const {showModal, details} = this.state;

        if(!showModal){
            return null;
        }

        return (
            <div className={`modal detailsModal ${showModal ? '' : ' hidden'}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content modalBody" id="modalBody">
                        <div className="modal-header">
                            <button onClick={this.toggleModal} type="button" className="close">&times;</button>
                            <h4 className="modal-title">{`Details: ${details.title}`}</h4>
                        </div>
                        <div className="modal-body col-sm-12">
                            <div className="col-sm-6 col-xs-12">
                                <p><b>Subject: </b>{details.e_s_subj}</p>
                                <p><b>Max Group Size: </b>{details.max}</p>
                                <p><b>Date of Event: </b>{this.convertDate()}</p>
                                <p><b>Time of Event: </b>{this.convertTime()}</p>
                                <p><b>Duration of Event: </b>{details.duration}</p>
                                <p><b>Contact Phone: </b>{details.phone}</p>
                                <p><b>Contact Email: </b>{details.email}</p>
                                <p><b>Description: </b>{details.description}</p>
                                <p><b>Location: </b>{details.location}</p>
                            </div>
                            <div className="singleMap col-sm-6 col-xs-12" id="singleMap"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-default" onClick={this.toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsModal;
