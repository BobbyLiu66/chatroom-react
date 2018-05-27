import React, {Component} from 'react';
import Navbar from './component/Navbar';
import Slidebar from './component/Slidebar'
import Chat from './page/Chat';
import InputPage from './component/InputPage';
import WeatherService from './component/Weather'
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            submit: true,
            data: 'LOGIN',
            display: {
                status: false,
                displayChat: false
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
    }
    componentDidMount() {
        // {
        //     status: 'connected',
        //         authResponse: {
        //     accessToken: '...',
        //         expiresIn:'...',
        //         signedRequest:'...',
        //         userID:'...'
        // }
        // }
        FB.getLoginStatus(function(response) {
            this.setState({facebook:response});
        });
    }

    componentWillMount() {
        window.sessionStorage.username && this.handleInputClick()
    }
    //TODO not useful anymore change the logic to react router
    handleClick(event) {
        // display chat room or whiteboard
        if (event.target.value === "switch") {
            this.setState({
                display: {
                    status: true,
                    displayChat: !this.state.display.displayChat,
                    displayBoard: this.state.display.displayChat,
                }
            });
        }
        // login invite room success
        else if (event.target.value === "submit") {
            this.setState({
                submit: false,
                login: false,
                display: {
                    status: true,
                    displayChat: true,
                    displayBoard: false,
                }
            });
        }
        // navbar action
        else {
            this.setState({
                submit: false,
                login: true,
                display: {
                    status: false,
                    displayChat: false,
                    displayBoard: false
                },
                data: event.target.value.toUpperCase()
            })
        }
    }

    handleInputClick() {
        this.setState({
            login: false,
            submit: false,
            display: {
                status: true,
                displayChat: true,
            },
        });
    }

    //TODO change logic to react router
    render() {
        return (
            <React.Fragment>
                <WeatherService />
                {this.state.login ? <InputPage {...this.state} handleClick={this.handleInputClick}/> :
                    <React.Fragment>
                        <Navbar {...this.state} handleClick={this.handleClick}/>
                        <Slidebar {...this.state}/>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default App;
