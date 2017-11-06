import React, {Component} from 'react';
import CreateEvent from './createEvent';

import './create.css';

class Create extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showCreateDiv: false,
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.createDivShow = this.createDivShow.bind(this);
        this.createDivHide = this.createDivHide.bind(this);
    }

    clickHandler() {
        this.setState({
            showCreateDiv: !this.state.showCreateDiv
        })
    }

    createDivShow() {
        return (
            <div className="create" id="create">
                <h1 className="createHeader" onClick={this.clickHandler}>Create an Event!</h1>
                <CreateEvent show={this.state.showCreateDiv}/>
            </div>
        )
    }

    createDivHide() {
        return (
            <div className="create" id="create">
                <h1 className="createHeader" onClick={this.clickHandler}>Create an Event!</h1>
            </div>
        )
    }

    render() {
        return (
            <div className="col-sm-6 col-xs-12 createContainer">
                {this.createDivShow()}
            </div>
        )
    }
}

export default Create;