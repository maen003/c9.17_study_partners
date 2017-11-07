import React, { Component } from 'react';

class FacebookLogin extends Component {

    constructor(props) {
        super(props);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.testAPI = this.fetchDataFromFb.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
    }
    componentDidMount() {
        window.fbAsyncInit = function() {
        FB.init({
        appId      : '180201912542782',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.1'
    });

    FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
            this.checkLoginState();
        } else {
            console.log('User did not authorize.');
        }
    }.bind(this));
    }.bind(this);

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    handleClick() {
        FB.login(this.checkLoginState());
    }
    fetchDataFromFb() {
        console.log('Login with Facebook button clicked');
        FB.api('/me?fields=id,name, first_name,last_name, email, picture', function(response) {
            console.log('Successfully logged in as ' + response.name);
            console.log('The data response from facebook : ', response);
        });
    }
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            let accessToken = FB.getAuthResponse()['accessToken']
            console.log('This is the access Token : ', accessToken )
        this.fetchDataFromFb();
        } else if (response.status === 'not_authorized') {
            console.log('please log in to continue')
        }
    }

    checkLoginState() {
        FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
        }.bind(this));
    }

    render() {
        return(
            <div onClick= { this.handleClick }
            className="fb-login-button" data-width="150" 
            data-max-rows="1" data-size="medium"
            data-button-type="continue_with" data-show-faces="false" 
            data-auto-logout-link="false" data-use-continue-as="true">
            </div>
            )
    }
}

export default FacebookLogin;
