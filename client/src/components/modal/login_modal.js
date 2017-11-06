import React, {Component} from 'react';

import './login_modal.css';

const display = {
    display: 'block'
}

const hide = {
    display: 'none'
}

class LoginModal extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            showModal: false
        }

        this.submitLogin = this.submitLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(event) {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleInputChange(event) {
        const {value, name} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.state({
            form: {...form}
        });
    }

    submitLogin(event) {
        event.preventDefault();
        console.log('login button was pressed inside modal');
    }

    render() {
        const { email, password } = this.state;
        
        return (
            <div className="container">
                <div onClick={this.toggleModal} className="modal loginModal" id="loginModal" role="dialog" style={this.state.showModal ? display : hide}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Login</h4>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        </div>
                    </div>
                </div>
                <button onClick={this.toggleModal} className="btn btn-success login">Login</button>
            </div>
        );
    }
}

export default LoginModal;

  