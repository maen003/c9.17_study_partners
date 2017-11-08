import React, {Component} from 'react';
import DetailsModal from '../modal/event_details_modal';

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
            <div>
                <h3>{info.title}</h3>
                <p>{info.subject}</p>
                <p>{`On ${info.date} at ${info.time}`}</p>
                <button className="btn btn-danger" type="button">Delete</button>
                <button onClick={this.toggleModal} className="btn btn-success" type="button">More Info</button>
                <DetailsModal details={info} showModal={this.state.showModal} toggleModal={this.toggleModal}/>
            </div>
        );
    }
}

export default EventDetails;