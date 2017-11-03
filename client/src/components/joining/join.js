import React, {Component} from 'react';
import JoinEvent from './joinEvent';

import './join.css';

class Join extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showJoinDiv: false,
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.joinDivShow = this.joinDivShow.bind(this);
        this.joinDivHide = this.joinDivHide.bind(this);
    }

    clickHandler() {
        this.setState({
            showJoinDiv: !this.state.showJoinDiv
        })
    }

    joinDivShow() {
        return (
            <div className="join" id="join">
                <h1 className="joinHeader" onClick={this.clickHandler}>Join an Event!</h1>
            </div>
        )
    }

    joinDivHide() {
        return (
            <div className="join" id="join">
                <h1 className="joinHeader" onClick={this.clickHandler}>Join an Event!</h1>
                <JoinEvent show={this.state.showJoinDiv}/>
            </div>
        )
    }

    render() {
        return (
            <div className="col-sm-6 col-xs-12 joinContainer">
                {this.joinDivHide()}
            </div>
        )
    }
}

export default Join;