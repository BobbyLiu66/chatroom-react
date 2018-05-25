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
            let data = response.data;
            let img = "https://storage.googleapis.com/chatroom.geekliubo.com/weather/";
            switch (true) {
                case (data.weather[0].description.includes('sky')):
                    img += "sky.jpeg";
                    break;
                case (data.weather[0].description.includes('rain')):
                    img += "rain.jpeg";
                    break;
                case (data.weather[0].description.includes('clouds')):
                    img += "clouds.jpeg";
                    break;
                case (data.weather[0].description.includes('thunderstorm')):
                    img += "thunder.jpeg";
                    break;
                case (data.weather[0].description.includes('snow')):
                    img += "snow.jpeg";
                    break;
                case (data.weather[0].description.includes('mist')):
                    img += "mist.jpeg";
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
                                                   src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`}
                                                   onClick={this.handleClick}
                                                   alt={this.state.weather[0].description}/> :
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
                        <div className="card weather-card text-center">
                            <img className="card-img-top weather-bg" src={this.state.img}
                                 alt={this.state.weather[0].description}/>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.name}</h5>
                                <p className="card-text text-muted">{this.state.weather[0].description}</p>
                                <p className="card-text">{this.state.main.temp - 273.15}°C</p>
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

