import React, { Component } from 'react';

export default () => {
    return (
        <div>
            <a href="/auth/facebook" className="btn-sm btn-primary"><span className="fa fa-facebook"></span> Log in With Facebook</a>
            <a href="/logout" className="btn-sm btn-primary"><span className="fa fa-facebook"></span> Log Out</a>
            {/* <a href="/auth/facebook" className="btn-sm btn-primary"><span className="fa fa-facebook"></span> {isLoggedIn ? 'Log Out' : 'Log in With Facebook'}</a> */}
        </div>
    )
}