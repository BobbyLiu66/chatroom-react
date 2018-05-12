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
                    <li className="list-group-item text-center"><img className="weather-image"
                                                                     onClick={this.handleClick}
                                                                     src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4MCA0ODAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4MCA0ODA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjQwLDM2Yy00LjQxOCwwLTgsMy41ODItOCw4djQ4YzAsNC40MTgsMy41ODIsOCw4LDhzOC0zLjU4Miw4LThWNDRDMjQ4LDM5LjU4MiwyNDQuNDE4LDM2LDI0MCwzNnoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xNzYuOTc2LDEwMi45NDRsLTEyLjI0OC0yOS41NmMtMS44MDgtNC4wMzEtNi41NDItNS44MzMtMTAuNTc0LTQuMDI1Yy0zLjg2NywxLjczNS01LjcxLDYuMTg0LTQuMjAyLDEwLjE0NSAgICBsMTIuMjQsMjkuNTY4YzEuNjkyLDQuMDgyLDYuMzczLDYuMDIsMTAuNDU2LDQuMzI4QzE3Ni43MywxMTEuNzA4LDE3OC42NjgsMTA3LjAyNiwxNzYuOTc2LDEwMi45NDR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNzMuMDk2LDE5OC4xOTJsLTI5LjU2LTEyLjI0Yy00LjA4My0xLjY5LTguNzYyLDAuMjUtMTAuNDUyLDQuMzMyYy0xLjY5LDQuMDgyLDAuMjUsOC43NjIsNC4zMzIsMTAuNDUyaC0wLjAzMiAgICBsMjkuNiwxMi4yNGMwLjk2NiwwLjQwMiwyLjAwMiwwLjYwOSwzLjA0OCwwLjYwOGM0LjQxOCwwLjAwMyw4LjAwMi0zLjU3Nyw4LjAwNS03Ljk5NSAgICBDNzguMDM5LDIwMi4zNSw3Ni4wODgsMTk5LjQzLDczLjA5NiwxOTguMTkyeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ0Ni45OCwxOTAuMjg0Yy0xLjY5LTQuMDgzLTYuMzctNi4wMjItMTAuNDUyLTQuMzMybC0yOS41NiwxMi4yNGMtNC4wOSwxLjY3Mi02LjA1LDYuMzQzLTQuMzc4LDEwLjQzMiAgICBjMC4wMDMsMC4wMDgsMC4wMDYsMC4wMTYsMC4wMSwwLjAyNGMxLjI0LDIuOTkxLDQuMTYyLDQuOTQsNy40LDQuOTM2YzEuMDQ2LDAuMDAxLDIuMDgyLTAuMjA2LDMuMDQ4LTAuNjA4bDI5LjYtMTIuMjQgICAgQzQ0Ni43MzEsMTk5LjA0Niw0NDguNjcsMTk0LjM2Niw0NDYuOTgsMTkwLjI4NHoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zMjUuNDE3LDY5LjE1Yy0zLjk2MS0xLjUwOC04LjQxLDAuMzM2LTEwLjE0NSw0LjIwMmwtMTIuMjQ4LDI5LjZjLTEuNjg4LDQuMDgsMC4yNDksOC43NTcsNC4zMjgsMTAuNDQ4ICAgIGM0LjA4MSwxLjY5Myw4Ljc2Mi0wLjI0MywxMC40NTUtNC4zMjVjMC0wLjAwMSwwLjAwMS0wLjAwMiwwLjAwMS0wLjAwM2wxMi4yNC0yOS42QzMzMS42Miw3NS4zNDMsMzI5LjU0Niw3MC43MjEsMzI1LjQxNyw2OS4xNXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xMTUuNTQ0LDE0MC4yMzJMODEuNiwxMDYuMjk2Yy0yLjk5Mi0zLjI1MS04LjA1My0zLjQ2MS0xMS4zMDQtMC40NjljLTMuMjUxLDIuOTkyLTMuNDYxLDguMDUzLTAuNDY5LDExLjMwNCAgICBjMC4xNSwwLjE2MywwLjMwNiwwLjMxOSwwLjQ2OSwwLjQ2OWwzMy45MzYsMzMuOTQ0YzMuMTc4LDMuMDY5LDguMjQzLDIuOTgxLDExLjMxMi0wLjE5NyAgICBDMTE4LjUzOCwxNDguMjQ3LDExOC41MzgsMTQzLjMzMiwxMTUuNTQ0LDE0MC4yMzJ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTYsMjY4SDhjLTQuNDE4LDAtOCwzLjU4Mi04LDhzMy41ODIsOCw4LDhoNDhjNC40MTgsMCw4LTMuNTgyLDgtOFM2MC40MTgsMjY4LDU2LDI2OHoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NzIsMjY4aC00OGMtNC40MTgsMC04LDMuNTgyLTgsOHMzLjU4Miw4LDgsOGg0OGM0LjQxOCwwLDgtMy41ODIsOC04UzQ3Ni40MTgsMjY4LDQ3MiwyNjh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBvbHlnb24gcG9pbnRzPSIzNzAuMTIsMTUzLjg4OCAzNzAuMTE2LDE1My44ODggMzcwLjExMiwxNTMuODg4ICAgICIgZmlsbD0iI0ZGRkZGRiIvPgoJCQk8cGF0aCBkPSJNNDEwLjE3MiwxMDYuMjk2Yy0yLjk5Mi0zLjI1MS04LjA1My0zLjQ2MS0xMS4zMDQtMC40NjhjLTAuMTYzLDAuMTUtMC4zMTksMC4zMDYtMC40NjgsMC40NjhsLTMzLjkzNiwzMy45MzYgICAgIGMtMy4xMjQsMy4xMjUtMy4xMjMsOC4xOSwwLjAwMiwxMS4zMTRjMS40OTksMS40OTgsMy41MzEsMi4zNDEsNS42NSwyLjM0MmMyLjEyLTAuMDAyLDQuMTUzLTAuODQ0LDUuNjUyLTIuMzQ0bDMzLjkzNi0zMy45NDQgICAgIEM0MTIuOTU1LDExNC42MDgsNDEzLjE2NSwxMDkuNTQ3LDQxMC4xNzIsMTA2LjI5NnoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDcyLDMzMmgtNzMuOGMzMS4yMjYtODcuMzcxLTE0LjI4OS0xODMuNTE0LTEwMS42Ni0yMTQuNzRTMTEzLjAyNiwxMzEuNTQ5LDgxLjgsMjE4LjkyICAgIGMtMTMuMDY3LDM2LjU2MS0xMy4wNjcsNzYuNTE5LDAsMTEzLjA4SDhjLTQuNDE4LDAtOCwzLjU4Mi04LDhzMy41ODIsOCw4LDhoNDY0YzQuNDE4LDAsOC0zLjU4Miw4LThTNDc2LjQxOCwzMzIsNDcyLDMzMnogICAgIE0zODEuMzEyLDMzMkg5OC42ODhjLTMwLjkyMy03OC4wNDQsNy4yNzctMTY2LjM4LDg1LjMyMi0xOTcuMzAyczE2Ni4zOCw3LjI3NywxOTcuMzAyLDg1LjMyMiAgICBDMzk1LjU2MywyNTUuOTg2LDM5NS41NjMsMjk2LjAzMywzODEuMzEyLDMzMnoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MjQsMzY0SDU2Yy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4aDM2OGM0LjQxOCwwLDgtMy41ODIsOC04UzQyOC40MTgsMzY0LDQyNCwzNjR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzg0LDM5Nkg5NmMtNC40MTgsMC04LDMuNTgyLTgsOHMzLjU4Miw4LDgsOGgyODhjNC40MTgsMCw4LTMuNTgyLDgtOFMzODguNDE4LDM5NiwzODQsMzk2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMzNiw0MjhIMTQ0Yy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4aDE5MmM0LjQxOCwwLDgtMy41ODIsOC04UzM0MC40MTgsNDI4LDMzNiw0Mjh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="/>
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

