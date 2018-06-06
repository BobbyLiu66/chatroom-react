import React, {Component} from 'react'
import socket from "../tools/getSocket";
import {inputState, setLoading, setPicture} from "../actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
};

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
        setPicture: (url) => {
            dispatch(setPicture(url))
        },
        setLoading: (state) => {
            dispatch(setLoading(state))
        }
    }
};

class FacebookButton extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        window.FB.login((response) => {
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
                        event: "FACEBOOK"
                    });
                    window.sessionStorage.username = response.name;
                    this.props.inputState(false);
                    this.props.setLoading(false)
                });
            }
            else {
                window.sessionStorage.username = undefined;
                this.props.inputState(true);
                this.props.setLoading(true)
            }
        }, {scope: 'public_profile,email'});
    }

    // render() {
    //     return (<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ1NS43MyA0NTUuNzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1NS43MyA0NTUuNzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojM0E1NTlGOyIgZD0iTTAsMHY0NTUuNzNoMjQyLjcwNFYyNzkuNjkxaC01OS4zM3YtNzEuODY0aDU5LjMzdi02MC4zNTNjMC00My44OTMsMzUuNTgyLTc5LjQ3NSw3OS40NzUtNzkuNDc1ICBoNjIuMDI1djY0LjYyMmgtNDQuMzgyYy0xMy45NDcsMC0yNS4yNTQsMTEuMzA3LTI1LjI1NCwyNS4yNTR2NDkuOTUzaDY4LjUyMWwtOS40Nyw3MS44NjRoLTU5LjA1MVY0NTUuNzNINDU1LjczVjBIMHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt="" onClick={this.handleClick}/>)
    // }
    render(){
        return (<button type="button" className="facebook-button" onClick={this.handleClick}/>)
    }
}
const Facebook = connect(mapStateToProps,mapDispatchToProps)(FacebookButton);


export default Facebook;