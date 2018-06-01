import React, {Component} from 'react';
import Navbar from '../component/Navbar';
import Slidebar from '../component/Slidebar'
import InputPage from '../component/InputPage';
import WeatherService from '../component/Weather'
import './Main.css';
import {connect} from 'react-redux'
import Chat from "./Chat";
import Friend from '../page/Friend'
import Setting from '../page/Setting'
import Loading from '../component/Loading'
import socket from "../tools/getSocket";
import {inputState, setPicture, setLoading} from "../actions";

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

const mapStateToProps = state => {
    return {inputPage: state.inputPage, mainAreaDisplayed: state.mainAreaDisplayed, loading: state.loading};
};


class HomePage extends Component {
    constructor() {
        super()
    }

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
        return (
            <React.Fragment>
                {this.props.loading ? <Loading/> : this.props.inputPage ? <InputPage/> :
                    <React.Fragment>
                        <WeatherService/>
                        <Navbar/>
                        <div className="container-fluid fill">
                            <div className="row fill">
                                <Slidebar/>
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
