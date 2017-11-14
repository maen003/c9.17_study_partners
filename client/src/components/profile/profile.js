import React, { Component } from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

    }


//     </div>
//     <div className=" ">
//         <div className="form-group mainContentInfo col-sm-12 col-xs-12">
//             <div className="profileImg">
//                 <img src='http://cdn2-www.dogtime.com/assets/uploads/2011/01/file_23244_what-is-the-appenzeller-sennenhunde-dog-300x189.jpg' width='200px' height='200px' />
//             </div>
//             <div className="profileInfo">
//                 <h1>FIRST LAST HERE</h1>
//                 <h5>SCHOOL NAME HERE</h5>
//                 <h6>SUBJECT HERE</h6>
//                 <h6>GRADE HERE</h6>
//                 <h6>CONTACT INFO HERE</h6>
//             </div>
//         </div>
//     </div>
// </div>

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 ">
                        <div className="panel panel-default">
                            <div className="panel-heading">  <h3 >User Profile</h3></div>
                            <div className="panel-body">
                                <div className="col-sm-3">                                   
                                    <img className="img-circle img-thumbnail" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" />
                                    <div className="" ><h4>First Name: </h4></div>
                                    <div className="" >Last Name: </div>
                                    <div className="" >Contact: </div>
                                    <div className="" >School: </div>
                                    <div className="" >Major/Subject: </div>
                                    <div className="" >Grade: </div>
                                </div>
                                <div id="joinDiv"className="col-sm-4 col-sm-offset-1">
                                    <h1>Events Joined</h1>
                                    <div>   
                                        LIST OF EVENTS JOINED
                                    </div>
                                </div>
                                <div id="createDiv"className="col-sm-4">
                                    <h1>Events Created</h1>
                                    <div>   

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Profile;