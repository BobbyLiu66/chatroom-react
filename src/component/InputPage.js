import React, {Component} from 'react'
import {connect} from 'react-redux'
import './InputPage.css'
import socket from '../tools/getSocket'
import {inputState} from "../actions";
import Canvas from './Canvas';

const INPUT_ERROR_STYLE = "text-danger form-text";

const displayMessage = {
    LOGIN: 'Login Here',
    FRIEND: "Friend's Name"
};

const labelMessage = {
    LOGIN: 'nick name',
    FRIEND: 'friend name'
};

const mapDispatchToProps = dispatch => {
    return {inputState: () => dispatch(inputState())}
};

const mapStateToProps = state => {
    return { currentStatus: state.currentStatus };
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            inputPassword: '',
            inputValue: '',
            inputValueMessage: '',
            inputPasswordMessage: '',
            disableButton: '',
            alertMessageStatus: false,
            alertMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            disableButton: true
        });
        event.preventDefault();
        if (this.validateInput()) {
            if (this.props.currentStatus === "LOGIN") {
                socket.emit('USER_LOGIN', {
                    nickname: this.state.inputValue,
                    password: this.state.inputPassword,
                    event: event.target.value
                });
            }
            else if (this.props.currentStatus === "FRIEND") {
                socket.emit('ADD_FRIEND', {
                    inviteName: this.state.inputValue,
                    nickname: window.sessionStorage.username,
                    messageTime: (new Date()).getTime(),
                    event: event.target.value
                });
            }
        }
    }

    handleClick() {
        this.props.inputState()
    }

    handleChange(event) {
        event.preventDefault();
        if (event.target.id === "inputValue") {
            this.setState({inputValue: event.target.value});
        }
        else {
            this.setState({inputPassword: event.target.value});
        }
    }

    validateInput() {
        let state = {status: true};
        if (this.state.inputValue.length < 5) {
            state.status = false;
            state.inputValueMessage = 'nick name should be more than 5 character';
            state.inputValueMessageStyle = INPUT_ERROR_STYLE
        }
        if (this.props.submit) {
            if (this.state.inputPassword.length < 5) {
                state.status = false;
                state.inputPasswordMessage = 'password should be more than 5 character';
                state.inputPasswordMessageStyle = INPUT_ERROR_STYLE
            }
        }
        if (!state.status) {
            state.inputPassword = '';
            state.disableButton = '';
            this.setState(state);
            return false
        }
        return true
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '373082293212192',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.0'
            });
            window.FB.getLoginStatus(function(response) {
                //TODO global
                console.log(response)
            });
        }.bind(this);

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=373082293212192&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        socket.on('REQUEST_RESULT', (data) => {
            if (data.err) {
                this.setState({
                    inputValueMessage: data.err,
                    inputValueMessageStyle: INPUT_ERROR_STYLE
                })
            }
            else {
                window.sessionStorage.username = this.state.inputValue;
                this.setState({
                    alertMessageStatus: true,
                    alertMessage: 'Login success!'
                });
                setTimeout(function () {
                    this.setState({
                        alertMessageStatus: true,
                    });
                    this.props.inputState()
                }.bind(this), 2000);
            }
        });

        socket.on('ADD_FRIEND_RESULT', (data) => {
            if (data.err) {
                this.setState({
                    inputValueMessage: data.err,
                    inputValueMessageStyle: INPUT_ERROR_STYLE
                })
            }
            else {
                this.setState({
                    alertMessageStatus: true,
                    alertMessage: 'Invite friend success!'
                });
                setTimeout(function () {
                    this.setState({
                        alertMessageStatus: true,
                    });
                    this.props.handleClick(data)
                }.bind(this), 2000);
            }
        })
    }

    checkLoginState() {
        window.FB.getLoginStatus(function(response) {
            //TODO global
            console.log(response)
        }.bind(this));
    }

    render() {
        return (
            <React.Fragment>
                <Canvas/>
                <div className="text-center login-page">
                    {window.sessionStorage.username &&
                    <button type="button" className="close close-button" aria-label="Close" onClick={this.handleClick}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    }
                    <form className="form-signin">
                        {this.state.alertMessageStatus &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            {this.state.alertMessage}
                        </div>}
                        <h1 className="h3 mb-3 font-weight-bold">{displayMessage[this.props.currentStatus]}</h1>

                        <div className="form-group">
                            <input id="inputValue" className="form-control" type="text"
                                   placeholder={labelMessage[this.props.currentStatus]}
                                   value={this.state.inputValue} onChange={this.handleChange}
                                   required autoFocus/>
                            {this.state.inputValueMessage &&
                            <span className={this.state.inputValueMessageStyle}>{this.state.inputValueMessage}</span>}
                        </div>
                        {this.props.currentStatus === "LOGIN" &&
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="password"
                                   value={this.state.inputPassword} onChange={this.handleChange}
                                   required/>
                            {this.state.inputPasswordMessage &&
                            <span
                                className={this.state.inputPasswordMessageStyle}>{this.state.inputPasswordMessage}</span>}
                        </div>
                        }

                        <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block submit-button" type="submit"
                                    onClick={this.handleSubmit}
                                    value="submit" disabled={this.state.disableButton}>Submit
                            </button>
                        </div>

                        <div className="fb-login-button" data-width="220px" data-max-rows="1" data-size="large"
                             data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false"
                             data-use-continue-as="false"></div>
                    </form>
                </div>

            </React.Fragment>
        )
    }
}

const InputPage = connect(mapStateToProps, mapDispatchToProps)(Login);

export default InputPage;