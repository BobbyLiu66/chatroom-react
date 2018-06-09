import React, {Component} from 'react';
import axios from 'axios'
import './Weather.css'
import './Loading.css'
import Loading from './Loading'
import {weatherUrl, imgUrl, weatherCode, weatherImg} from "../tools/weatherType";

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
    }

    componentWillUnmount() {
        this.setState({displayWeather: false})
    }

    getWeather() {
        axios({
            method: 'Get',
            url: weatherUrl,
        }).then((response) => {
            let data = response.data;
            let img = imgUrl;
            switch (true) {
                case (data.weather[0].id === weatherCode.sunny):
                    img += weatherImg.sunny;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.rain):
                    img += weatherImg.rain;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.clouds):
                    img += weatherImg.clouds;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.thunder):
                    img += weatherImg.thunder;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.snow):
                    img += weatherImg.snow;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.mist):
                    img += weatherImg.mist;
                    break;
                case (Math.floor(data.weather[0].id / 100) === weatherCode.drizzle):
                    img += weatherImg.drizzle;
                    break;
                default:
                    break
            }
            data.img = img;
            this.setState(data);
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
                                                   src={`https://openweathermap.org/img/w/${this.state.weather[0].icon}.png`}
                                                   onClick={this.handleClick}
                                                   alt={this.state.weather[0].description}/> :
                            <Loading/>}
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        {this.state.displayWeather &&
                        <div className="card weather-card text-center">
                            <img className="card-img-top weather-bg" src={this.state.img}
                                 alt={this.state.weather[0].description}/>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.name}</h5>
                                <p className="card-text text-muted">{this.state.weather[0].description}</p>
                                <p className="card-text">{Math.round(this.state.main.temp - 273.15)}°C</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherService;

