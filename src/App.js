import React, {Component} from 'react';
import Navbar from './component/Navbar';
import Slidebar from './component/Slidebar'
import ChatRoom from './component/ChatRoom';
import InputPage from './component/InputPage';
import Weather from './component/Weather'
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

    componentWillMount() {
        window.sessionStorage.username && this.handleInputClick()
    }

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


    render() {
        return (
            <React.Fragment>
                <Weather/>
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
