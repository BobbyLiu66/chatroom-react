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

const mapStateToProps = state => {
    return {inputPage: state.inputPage, mainAreaDisplayed: state.mainAreaDisplayed};
};

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.inputPage ?
                    <InputPage/> :
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

const Home = connect(mapStateToProps)(HomePage);

export default Home;
