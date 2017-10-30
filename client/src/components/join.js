import React, {Component} from 'react';

import './join.css';

class Join extends Component {
    constructor (props) {
        super (props);

        this.state = {

        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        console.log('header was clicked');
        this.setState({

        })
    }

    render() {
        return (
            <div className="col-sm-6 join" id="join">
                {/* {<h1 className="joinHeader" onClick={this.clickHandler}>Join an Event!</h1>} */}
                <div className="findEvent">
                    <div className="map">

                    </div>
                    <div className="filter"> {/* pressing filter will animate filter options to left */}
                        <form>
                            <div className="formFilter">
                                <div className="col-sm-5">    
                                    <div className="form-group zipInput">
                                        <input type="text" id="zipcode" className="zipcode" placeholder="Zip Code"/>
                                    </div>
                                    <h3>Filter By Subject</h3>
                                    <button className="btn btn-warning" type="button">Search Again</button>
                                </div>
                                <div className="col-sm-7">
                                    <div className="filterCheckbox">
                                        <label className="checkbox-inline filterSubject" htmlFor="lifeSciences">Filter Subjects
                                            <input type="checkbox" id="lifeSciences" value="Life sciences"/>
                                        </label>
                                        <label className="checkbox-inline filterSubject" htmlFor="vpArts">Visual and Perfomance Arts
                                            <input type="checkbox" id="vpArts" value="Visual and Perfomance Arts"/>
                                        </label>
                                        <label className="checkbox-inline filterSubject" htmlFor="libArts">Liberal Arts
                                            <input type="checkbox" id="libArts" value="Liberal Arts"/>
                                        </label>
                                        <label className="checkbox-inline filterSubject" htmlFor="engTech">Engineering and technology
                                            <input type="checkbox" id="engTech" value="Engineering and technology"/>
                                        </label>
                                        <label className="checkbox-inline filterSubject" htmlFor="business">Business
                                            <input type="checkbox" id="business" value="Business"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Join;