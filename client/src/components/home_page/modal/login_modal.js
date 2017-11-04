import React, {Component} from 'react';

import './login_modal.css';

class LoginModal extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
        }

        this.submitLogin = this.submitLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.openModal = this.openModal.bind(this);
    }

    submitLogin(event) {
        event.preventDefault();
        console.log('login button was pressed in modal');
    }

    handleInputChange(event) {
        const {value, name} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.state({
            form: {...form}
        });
    }

    render() {
        let close = () => this.setState({show: false});
        const { email, password } = this.state;
        
        return (
            <div className="modal fade" id="loginModal" role="dialog">
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
        );
    }
}

export default LoginModal;

  