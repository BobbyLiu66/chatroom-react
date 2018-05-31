import React, {Component} from 'react'
import socket from "../tools/getSocket";
import {inputState, setPicture} from "../actions";
import {connect} from "react-redux";


const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
        setPicture: (url) => {
            dispatch(setPicture(url))
        }
    }
};

const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
};

class FacebookButton extends Component {
    componentDidMount() {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '373082293212192',
                cookie: true,
                xfbml: true,
                version: 'v3.0'
            });
            window.FB.getLoginStatus((response) => {
                if (response.authResponse) {
                    window.FB.api(
                        `/${response.authResponse.userId}/picture`,
                        'GET',
                        {"redirect": "false"},
                        (response) => {
                            this.props.setPicture(response.data.url)
                        }
                    );

                    window.FB.api('/me', 'GET', (response) => {
                        socket.emit('USER_LOGIN', {
                            nickname: response.name,
                            password: response.id,
                            event:"FACEBOOK"
                        });
                        window.sessionStorage.username = response.name;
                        this.props.inputState(false)
                    });
                }
                else {
                    window.sessionStorage.username = undefined;
                    this.props.inputState(true)
                }

            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=373082293212192&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        return (<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
                     data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"></div>)
    }
}
const Facebook = connect(mapStateToProps, mapDispatchToProps)(FacebookButton);


export default Facebook;