import React, {Component} from 'react';
import ModalWrapper from 

import './login_modal.css';

class LoginModal extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            show: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    submitLogin(event) {
        event.preventDefault();
        console.log('login button was pressed');
    }

    handleInputChange(event) {
        const {value, name} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.state({
            form: {...form}
        });
        // console.log('state: ', this.state);
    }

    render() {
        let close = () => this.setState({ show: false });
        
        return (
            <div className="modal-container" style={{ height: 200 }}>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}
                >
                    Launch contained modal
                </Button>

                <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.submitLogin}>
                            <div className="form-group inputArea col-sm-12 col-xs-12">
                                <div className="col-sm-8 col-sm-offset-2 col-xs-12">
                                    <label htmlFor="email">Email</label><br/>
                                        <input value={email} onChange={this.handleInputChange} name="email" id="email" className="email form-control" type="email"/>
                                </div>
                            </div>
                            <div className="form-group inputArea col-sm-12 col-xs-12">
                                <div className="col-sm-8 col-sm-offset-2 col-xs-12">
                                    <label htmlFor="email">Password</label><br/>
                                        <input value={password} onChange={this.handleInputChange} name="password" id="password" className="password form-control" type="password"/>
                                </div>
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary">Login</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;