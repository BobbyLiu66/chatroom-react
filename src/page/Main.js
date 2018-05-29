import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import Slidebar from '../component/Slidebar'
import InputPage from '../component/InputPage';
import WeatherService from '../component/Weather'
import './Main.css';
import {connect} from 'react-redux'
//TODO redux
const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
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
            window.FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    window.FB.api('/me', function (response) {
                        console.log(response);
                        window.sessionStorage.username = response.name;
                        this.props.inputState()
                    });
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
        window.sessionStorage.username && this.props.handleInputClick()
    }

    //TODO
    render() {
        return (
            <React.Fragment>
                {(!window.sessionStorage.username && this.props.currentStatus === "LOGIN") || (this.props.currentStatus !== "LOGIN" && this.props.inputPage) ?
                    <InputPage/> :
                    <React.Fragment>
                        <WeatherService/>
                        <Navbar/>
                        <Slidebar/>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const Home = connect(mapStateToProps)(HomePage);

export default Home;
