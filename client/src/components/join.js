import React, {Component} from 'react';

import './join.css';

class Join extends Component {
    constructor (props) {
        super (props);

        this.state = {
            thing: null
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.joinDiv = this.joinDiv.bind(this);
    }

    clickHandler() {
        console.log('header was clicked');
        this.setState({
            thing: true
        })
        // return (
        //     <div>Sup dawg</div>
        // )
    }

    joinDiv() {
        return (
            <div>Sup dawg</div>
        )
    }

    render() {
        if (this.state.thing) {
            console.log("Sup");
            return (
                <div className="col-sm-6 col-xs-12 join" id="join">
                    <h1 className="joinHeader">Join an Event!</h1>
                    { this.joinDiv() }
                    <div className="findEvent">
                        <div className="filter"> {/* pressing filter will animate filter options to left */}
                            <form>
                                <div className="col-sm-5 col-xs-12 leftSideFilter">    
                                    <div className="form-group zipInput">
                                        <input type="text" id="zipcode" className="zipcode" placeholder="Zip Code"/>
                                    </div>
                                    <h3>Filter By Subject</h3>
                                    <button className="btn btn-warning" type="button">Search Again</button>
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
    
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-sm-6 col-xs-12 join" id="join">
                    <h1 className="joinHeader" onClick={this.clickHandler}>Join an Event!</h1>
                    
                    <div className="findEvent">
                        <div className="filter"> {/* pressing filter will animate filter options to left */}
                            <form>
                                <div className="col-sm-5 col-xs-12 leftSideFilter">    
                                    <div className="form-group zipInput">
                                        <input type="text" id="zipcode" className="zipcode" placeholder="Zip Code"/>
                                    </div>
                                    <h3>Filter By Subject</h3>
                                    <button className="btn btn-warning" type="button">Search Again</button>
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
    
                        </div>
                    </div>
                </div>
            )
        } 
    }
}

export default Join;