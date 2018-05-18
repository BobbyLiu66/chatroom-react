import React, {Component} from 'react';
import axios from 'axios'

import './Weather.css'
import './Loading.css'

class WeatherService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayWeather: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }

    componentDidMount() {
        this.getWeather();
        setInterval(() => {
        }, 60 * 60 * 1000);
    }

    getWeather() {
        axios({
            method: 'Get',
            url: `http://13.211.150.239:3002/weather?type=current`,
        }).then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            this.setState({err: err})
        })
    }

    handleClick() {
        this.setState({
            displayWeather: !this.state.displayWeather
        });
    }

    render() {
        return (
            <div className="weather">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        {this.state.weather ? <img className="weather-image"
                                                   src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`}
                                                   onClick={this.handleClick}/> :
                            <div className="lds-css ng-scope loading">
                                <div className="lds-eclipse">
                                    <div></div>
                                </div>
                            </div>}
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-auto">

                        {this.state.displayWeather &&
                        <ul className="list-group list-group-flush weather-card">
                            <li className="list-group-item text-center"><h5>{this.state.name}</h5></li>
                            <li className="list-group-item text-center"><p>{this.state.weather[0].description}</p></li>
                            <li className="list-group-item text-center">
                                <table className="text-center">
                                    <tbody>
                                    <tr>
                                        <td>High:{this.state.main.temp - 273.15}°C</td>
                                        <td>Low:{this.state.main.temp - 273.15}°C</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>}
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherService;

