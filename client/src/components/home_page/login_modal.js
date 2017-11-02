import React, {Component} from 'react';

class LoginModal extends Component {
    constructor (props) {
        super (props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            modalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
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
        console.log('state: ', this.state);
    }

    render() {
        return (
            <div className="container">
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button onClick={this.closeModal} type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Login</h4>
                            </div>
                            <div class="modal-body">
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
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default LoginModal;