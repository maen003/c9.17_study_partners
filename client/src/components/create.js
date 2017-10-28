import React from 'react';

import './create.css';

export default () => {
    return (
        <div className="col-sm-6 create" id="create">
            {/* <h1 className="createHeader">Create an Event!</h1> */}
            <div className="createEvent">
                <form>
                    <div className="form-group inputArea">
                        <div className="col-sm-6">
                            <label for="title">Title of event</label><br/>
                                <input type="text" id="title" className="title" placeholder="Title"/><br/>
                        </div>
                        <div className="col-sm-4">
                            <label for="subjects">Event Subject</label><br/>
                                <select id="subjects" className="subjects form-control">
                                    <option>Life sciences</option>
                                    <option>Visual and Perfomance Arts</option>
                                    <option>Liberal Arts</option>
                                    <option>Engineering and technology</option>
                                    <option>Business</option>
                                </select>
                        </div>
                        <div className="col-sm-2">
                                <label for="groupSize">Group Size</label><br/>
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
                    <div className="form-group inputArea">
                        <div className="col-sm-4 form-group">
                            <label for="date">Date of event</label><br/>
                                <input type="date" id="date" className="input-group date dateEvent" placeholder="MM/DD/YYYY"/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label for="time">Time of event</label><br/>
                                <input type="time" id="time" className="time"/>
                        </div>
                        <div className="col-sm-4">
                            <label for="duration">Duration of event</label><br/>
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
                    <div className="form-group inputArea">
                        <div className="col-sm-5">
                            <label for="phone">Phone Number</label><br/>
                                <input type="tel" id="phone" className="phone"/>
                        </div>
                        <div className="col-sm-5">
                            <label for="email">Email</label><br/>
                                <input type="email" id="email" className="email"/>
                        </div>
                    </div>
                    <div class="form-group inputArea">
                        <div className="col-sm-12">
                            <label for="location">Location of event</label><br/>
                                <input name="location" id="location" className="location"/>
                                <div className="mapView"></div>
                        </div>
                    </div>
                    <div className="form-group inputArea">
                        <textarea className="form-group col-sm-12 description" rows="3" id="description" placeholder="Description of event..."></textarea>
                    </div>
                </form>
                <button className="btn btn-danger col-sm-6" type="button">Back</button>
                <button className="form-group btn btn-success submitForm col-sm-6" type="submit">Create Event</button>
            </div>
        </div>
    )
}