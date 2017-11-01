import React, {Component} from 'react';
import JoinEvent from './joinEvent';

import './join.css';

class Join extends Component {
    constructor (props) {
        super (props);

        this.state = {
            thing: null
        }

        this.clickHandlerTrue = this.clickHandlerTrue.bind(this);
        this.clickHandlerFalse = this.clickHandlerFalse.bind(this);
        this.joinDivShow = this.joinDivShow.bind(this);
        this.joinDivHide = this.joinDivHide.bind(this);
    }

    clickHandlerTrue() {
        console.log('header was clicked'); /* add ajax call here */
        this.setState({
            thing: true
        })
    }

    clickHandlerFalse() {
        console.log('header was clicked');
        this.setState({
            thing: false
        })
    }

    joinDivShow() {
        return (
            <div className="join" id="join">
                <h1 className="joinHeader" onClick={this.clickHandlerFalse}>Join an Event!</h1>
                <JoinEvent/>
            </div>
        )
    }

    joinDivHide() {
        return (
            <div className="join" id="join">
                <h1 className="joinHeader" onClick={this.clickHandlerTrue}>Join an Event!</h1>
            </div>
        )
    }

    render() {
        if (this.state.thing) {
            console.log(this.state.thing = true);
            return (
                <div className="col-sm-6 col-xs-12 joinContainer">
                    {this.joinDivShow()}
                </div>
            )
        } else {
            console.log(this.state.thing = false);
            return (
                <div className="col-sm-6 col-xs-12 joinContainer">
                    {this.joinDivHide()}
                </div>
            )
        } 
    }
}

export default Join;