import React from 'react';

import './join.css';

export default () => {
    return (
        <div className="col-sm-6 join" id="join">
            {/* <h1 className="joinHeader">Join an Event!</h1> */}
            <div className="findEvent">
                <div className="filter">
                    <form>
                        <div className="filterCheckbox">
                            <label className="checkbox-inline filterSubject" for="lifeSciences">Filter Subjects
                                <input type="checkbox" id="lifeSciences" value="Life sciences"/>
                            </label>
                            <label className="checkbox-inline filterSubject" for="vpArts">Visual and Perfomance Arts
                                <input type="checkbox" id="vpArts" value="Visual and Perfomance Arts"/>
                            </label>
                            <label className="checkbox-inline filterSubject" for="libArts">Liberal Arts
                                <input type="checkbox" id="libArts" value="Liberal Arts"/>
                            </label>
                            <label className="checkbox-inline filterSubject" for="engTech">Engineering and technology
                                <input type="checkbox" id="engTech" value="Engineering and technology"/>
                            </label>
                            <label className="checkbox-inline filterSubject" for="business">Business
                                <input type="checkbox" id="business" value="Business"/>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="map">

                </div>
                <button className="btn btn-warning" type="button">Search Again</button>
            </div>
        </div>
    )
}