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
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            showModal: this.props.showModal
        }

        this.toggleModal = this.props.toggleModal;
        this.submitLogin = this.submitLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const {value, name} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.setState({
            form: {...form}
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        })
    }

    submitLogin(event) {
        event.preventDefault();
        console.log('Log In -> Email: ' + this.state.form.email + '. Password: ' + this.state.form.password + '.');
        this.toggleModal();
    }

    render() {
        const {email, password, showModal} = this.state;
        
        return (
            // <div className="container">
                <div className={`modal loginModal ${showModal ? '' : ' hidden'}`} id="loginModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.toggleModal} type="button" className="close">&times;</button>
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
                                <button onClick={this.submitLogin} type="button" className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                /* <button onClick={this.toggleModal} className="btn btn-success login">Login</button> */
            /* </div> */
        );
    }
}

export default LoginModal;

  