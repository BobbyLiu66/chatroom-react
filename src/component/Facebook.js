import React, {Component} from 'react'
import socket from '../tools/getSocket';
import {inputState, setLoading} from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
};

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
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
                    {'redirect': 'false'},
                    (response) => {
                        window.sessionStorage.setItem('avatar',response.data.url)
                    }
                );

                window.FB.api('/me', 'GET', (response) => {
                    socket.emit('USER_LOGIN', {
                        nickname: response.name,
                        password: response.id,
                        event: 'FACEBOOK'
                    });
                    window.sessionStorage.setItem('username',response.name);
                    this.props.inputState(false);
                    this.props.setLoading(false)
                });
            }
            else {
                window.sessionStorage.removeItem('username');
                this.props.inputState(true);
                this.props.setLoading(true)
            }
        }, {scope: 'public_profile,email'});
    }

    render(){
        return (<button type='button' className='facebook-button' onClick={this.handleClick}/>)
    }
}

const Facebook = connect(mapStateToProps,mapDispatchToProps)(FacebookButton);

export default Facebook;