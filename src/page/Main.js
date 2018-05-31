import React, {Component} from 'react';
import Navbar from '../component/Navbar';
import Slidebar from '../component/Slidebar'
import InputPage from '../component/InputPage';
import WeatherService from '../component/Weather'
import './Main.css';
import {connect} from 'react-redux'


const mapStateToProps = state => {
    return {inputPage: state.inputPage, currentStatus: state.currentStatus};
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
                        <Slidebar/>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const Home = connect(mapStateToProps)(HomePage);

export default Home;
