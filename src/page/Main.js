import React, {Component} from 'react';
import Navbar from '../component/Navbar';
import Slidebar from '../component/Slidebar'
import LoginPage from '../component/LoginPage';
import WeatherService from '../component/Weather'
import './page.css';
import {connect} from 'react-redux'
import Chat from './Chat';
import Friend from '../page/Friend'
import Loading from '../component/Loading'
import socket from '../tools/getSocket';
import {inputState, setLoading} from '../actions';
import Setting from './Setting';

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
        setLoading: (state) => dispatch(setLoading(state))
    }
};

const mapStateToProps = state => {
    return {inputPage: state.inputPage, mainAreaDisplayed: state.mainAreaDisplayed, loading: state.loading};
};


class HomePage extends Component {
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
                    window.FB.api('/me', 'GET', (res) => {
                        socket.emit('USER_LOGIN', {
                            nickname: res.name,
                            password: res.id,
                            event: 'FACEBOOK'
                        });
                        window.sessionStorage.setItem('username', res.name);
                        this.props.setLoading(false);
                        this.props.inputState(false);
                    }).then(()=>{
                        window.FB.api(
                            `/${response.authResponse.userId}/picture`,
                            'GET',
                            {'redirect': 'false'},
                            () => {
                                socket.emit('AVATAR', {
                                    nickname: window.sessionStorage.getItem('username'),
                                    photo: this.editor.getImage().toDataURL('image/png'),
                                    fileType: this.state.fileType
                                });
                                //TODO
                                //this.props.setPicture(res.data.url)
                            }
                        );
                    });
                }
                else {
                    if (window.sessionStorage.getItem('username')) {
                        this.props.inputState(false);
                        this.props.setLoading(false);
                    }
                    else {
                        this.props.setLoading(false);
                        this.props.inputState(true);
                    }
                }
            });
        };
        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loading ? <Loading/> : this.props.inputPage ? <LoginPage/> :
                    <React.Fragment>
                        <WeatherService/>
                        <Navbar/>
                            <div className='row-container fill'>
                                <Slidebar/>
                                <div className='main'>
                                    {this.props.mainAreaDisplayed === 'CHAT' && <Chat/>}
                                    {this.props.mainAreaDisplayed === 'FRIEND' && <Friend/>}
                                    {this.props.mainAreaDisplayed === 'SETTING' && <Setting/>}
                                </div>
                            </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;
