import React, {Component} from 'react'
import socket from "../tools/getSocket";
import {inputState, setPicture} from "../actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
};

class FacebookButton extends Component {

    render() {
        return (<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
                     data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"></div>)
    }
}
const Facebook = connect(mapStateToProps)(FacebookButton);


export default Facebook;