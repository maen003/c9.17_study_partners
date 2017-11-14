import React, {Component} from 'react';
import DetailsModal from '../modal/event_details_modal';

import './eventItem.css';

class EventDetails extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(event) {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const {info} = this.props;
        // console.log('info passed down: ', info);
        const display = {display: 'block'}
        const hide = {display: 'none'}

        return (
            <div className="col-sm-12 col-xs-12 singleItem">
                <div className="col-sm-8">
                    <h4>Title: {info.title}</h4>
                    <p>Subject: {info.subject}</p>
                    <p>{`On ${info.date} at ${info.time}`}</p>
                </div>
                <div className="col-sm-4 buttonContainer">
                    <button onClick={this.toggleModal} className="btn btn-success infoButton" type="button">More Info</button>
                </div>
                <hr/>
                <DetailsModal details={info} showModal={this.state.showModal} toggleModal={this.toggleModal}/>
            </div>
        );
    }
}

export default EventDetails;