import React, {Component} from 'react';

import './create.css';

class Create extends Component {
    constructor (props) {
        super (props);

        this.submitData = this.submitData.bind(this);
    }

    submitData() {
        console.log('submit button was clicked');
        
    }

    render() {
        return (
            <div className="col-sm-6 col-xs-12 create" id="create">
                {/* <h1 className="createHeader">Create an Event!</h1> */}
                <div className="createEvent">
                    <form>
                        <div className="form-group inputArea col-sm-12 col-xs-12 row1">
                            <div className="col-sm-4 col-xs-12">
                                <label htmlFor="title">Title of event</label><br/>
                                    <input type="text" id="title" className="title" placeholder="Title"/><br/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <label htmlFor="subjects">Event Subject</label><br/>
                                    <select id="subjects" className="subjects form-control">
                                        <option>Life sciences</option>
                                        <option>Visual and Perfomance Arts</option>
                                        <option>Liberal Arts</option>
                                        <option>Engineering and technology</option>
                                        <option>Business</option>
                                    </select>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                    <label htmlFor="groupSize">Group Size</label><br/>
                                        <select id="groupSize" className="size form-control">
                                            <option>2-5</option>
                                            <option>6-10</option>
                                            <option>11-15</option>
                                            <option>16-20</option>
                                            <option>21-25</option>
                                            <option>26-30</option>
                                            <option>> 30</option>
                                        </select>
                            </div>
                        </div>
                        <div className="form-group inputArea col-sm-12 col-xs-12 row2">
                            <div className="col-sm-4 col-xs-12 form-group">
                                <label htmlFor="date">Date of event</label><br/>
                                    <input type="date" id="date" className="input-group date dateEvent" placeholder="MM/DD/YYYY"/>
                            </div>
                            <div className="col-sm-4 col-xs-12 form-group">
                                <label htmlFor="time">Time of event</label><br/>
                                    <input type="time" id="time" className="time"/>
                            </div>
                            <div className="col-sm-4 col-xs-12">
                                <label htmlFor="duration">Duration of event</label><br/>
                                    <select id="duration" className="duration form-control">
                                        <option>Less than 1 Hour</option>
                                        <option>1 - 2 Hours</option>
                                        <option>2 - 3 Hours</option>
                                        <option>3 - 4 Hours</option>
                                        <option>4 - 5 Hours</option>
                                        <option>> 5 Hours</option>
                                    </select>          
                            </div>
                        </div>
                        <div className="form-group inputArea col-sm-12 col-xs-12 row3">
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="phone">Phone Number</label><br/>
                                    <input type="tel" id="phone" className="phone"/>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="email">Email</label><br/>
                                    <input type="email" id="email" className="email"/>
                            </div>
                        </div>
                        <div className="form-group inputArea col-sm-12 col-xs-12 row4">
                            <div className="col-sm-12 col-xs-12 locationForm">
                                <div className="col-sm-4 col-xs-12 locationFormComp"> 
                                    <label htmlFor="location">Location of event</label><br/>
                                        <input name="location" id="location" className="location"/>
                                </div>
                                <div className="col-sm-8 col-xs-12 locationFormComp">
                                    <div className="mapView"></div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group inputArea col-sm-12 col-xs-12 row5">
                            <textarea className="form-group col-sm-10 col-sm-offset-1 col-xs-10 description" rows="3" id="description" placeholder="Description of event..."></textarea>
                        </div>
                    </form>
                    <div className="bottons col-sm-12 col-xs-12"> {/* bottom buttons */}
                        <button className="btn btn-danger" type="button">Back</button>
                        <button className="form-group btn btn-success submitForm" type="submit" onClick={this.submitData}>Create Event</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;