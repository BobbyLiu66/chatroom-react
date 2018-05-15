import React, {Component} from 'react'
import './InputPage.css'
import socket from '../tools/getSocket'

const INPUT_ERROR_STYLE = "text-danger form-text";

const displayMessage = {
    LOGIN: 'Input nick name',
    FRIEND: 'Input friend name'
};

const labelMessage = {
    LOGIN: 'nick name',
    FRIEND: 'friend name'
};

class InputPage extends Component {
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
            if (this.props.data === "LOGIN") {
                socket.emit('USER_LOGIN', {
                    nickname: this.state.inputValue,
                    password: this.state.inputPassword,
                    event: event.target.value
                });
            }
            else if (this.props.data === "FRIEND") {
                socket.emit('ADD_FRIEND', {
                    inviteName: this.state.inputValue,
                    nickname: window.sessionStorage.username,
                    messageTime: (new Date()).getTime(),
                    event: event.target.value
                });
            }
        }
    }

    handleClick(event) {
        event.preventDefault();
        this.props.handleClick(event)
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
                    this.props.handleClick(data)
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


    render() {
        return (
            <React.Fragment>
                <div className="text-center login-page">
                    {this.props.data !== "LOGIN" &&
                    <button type="button" className="close close-button" aria-label="Close" onClick={this.handleClick}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    }
                    <form className="form-signin">
                        {this.state.alertMessageStatus &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            {this.state.alertMessage}
                        </div>}
                        <h1 className="h3 mb-3 font-weight-normal">{displayMessage[this.props.data]}</h1>

                        <div className="form-group">
                            <input id="inputValue" className="form-control" type="text"
                                   placeholder={labelMessage[this.props.data]}
                                   value={this.state.inputValue} onChange={this.handleChange}
                                   required autoFocus/>
                            {this.state.inputValueMessage &&
                            <span className={this.state.inputValueMessageStyle}>{this.state.inputValueMessage}</span>}
                        </div>
                        {this.props.submit &&
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
                            <button className="btn btn-lg btn-primary btn-block" type="submit"
                                    onClick={this.handleSubmit}
                                    value="submit" disabled={this.state.disableButton}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default InputPage;