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
    }

    componentDidMount() {
        axios({
            method: 'Get',
            url: `http://13.211.150.239:3002/weather?type=current`,
        }).then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            this.setState({err: err})
        })
    }

    handleClick(event) {
        this.setState({
            displayWeather: !this.state.displayWeather
        });
    }


    render() {
        return (
            <div className="weather">

                <div className="card text-center">
                    {this.state.weather ? <img className="weather-image" src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`}
                                               onClick={this.handleClick}/> : <div className="lds-css ng-scope loading">
                        <div className="lds-eclipse">
                            <div></div>
                        </div>
                    </div>

                    }

                    <div className="card-body">

                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">body</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherService;

