import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../actions';
import EventList from './listEvents';

import './joinEvent.css';

class JoinEvent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            eventList: null
        }

        this.getJoinData = this.getJoinData.bind(this);
    }

    componentDidMount() {
        this.getJoinData();
    }

    getJoinData() {
        this.props.getAll().then(function(response){
            console.log('response: ', response.payload.data);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="filter">
                    <form>
                        <div className="col-sm-5 col-xs-12 leftSideFilter">    
                            <div className="form-group zipInput">
                                <input type="text" id="zipcode" className="zipcode form-control" placeholder="Zip Code"/>
                            </div>
                            <h3>Filter By Subject</h3>
                            <button onClick={this.getJoinData} className="btn btn-warning" type="button">Search Again</button>
                            <button className="btn btn-success" type="button">Toh gleh</button>
                        </div>
                        <div className="col-sm-7 col-xs-12 rightSideFilter">
                            <label className="checkbox-inline filterSubject" htmlFor="lifeSciences">
                                <input type="checkbox" id="lifeSciences" value="Life sciences"/> Filter Subjects
                            </label>
                            <label className="checkbox-inline filterSubject" htmlFor="vpArts">
                                <input type="checkbox" id="vpArts" value="Visual and Perfomance Arts"/> Visual and Perfomance Arts
                            </label>
                            <label className="checkbox-inline filterSubject" htmlFor="libArts">
                                <input type="checkbox" id="libArts" value="Liberal Arts"/> Liberal Arts
                            </label>
                            <label className="checkbox-inline filterSubject" htmlFor="engTech">
                                <input type="checkbox" id="engTech" value="Engineering and technology"/> Engineering and technology
                            </label>
                            <label className="checkbox-inline filterSubject" htmlFor="business">
                                <input type="checkbox" id="business" value="Business"/> Business
                            </label>
                        </div>
                    </form>
                </div>
                <div className="map">
                    <p>map goes here</p>
                </div>
                <div className="list">
                    <EventList eventList={this.props.events}/>
                </div>
            </div>
            
        )
    }
}

export default connect(null, {getAll})(JoinEvent);