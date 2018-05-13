import React, {Component} from 'react';
import axios from 'axios'

import './Weather.css'

class WeatherService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayWeather:false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'Get',
            url: `http://13.211.150.239:3002/weather?type=current`,
        }).then((response) =>{
            this.setState(response.data);
        }).catch((err)=>{
            this.setState({err:err})
        })
    }

    handleClick(event) {
        this.setState({
            displayWeather:!this.state.displayWeather
        });
    }


    render() {
        return (
            <div className="weather">
                <ul className="list-group list-group-flush weather-card">
                    <li className="list-group-item text-center">{this.state.weather && <img className="weather-image"
                                                                     onClick={this.handleClick}
                                                                     src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`}/>}
                    </li>
                </ul>
                {this.state.displayWeather &&
                <ul className="list-group list-group-flush weather-card">
                    <li className="list-group-item text-center"><h5>{this.state.name}</h5></li>
                    <li className="list-group-item text-center"><p>{this.state.weather[0].description}</p></li>
                    <li className="list-group-item text-center">
                        <table className="text-center">
                            <tbody>
                            <tr >
                                <td>{this.state.main.temp}</td>
                                <td>{this.state.weather[0].icon}</td>
                                <td>{this.state.main.temp}</td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                </ul>}
            </div>
        );
    }
}

export default WeatherService;

