import React, {Component} from 'react';
// import BoardController from './BoardController'
// import ChatController from './ChatController'
import './Navbar.css'

class Navbar extends Component {

    handleClick(){
        window.FB.logout(function(response) {
            console.log(response);
            window.sessionStorage.username = '';
            this.props.inputState()
        });
    }

    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">{window.sessionStorage.username}</a>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link" href="" onClick={this.handleClick}>Sign out</a>
                        </li>
                    </ul>
            </nav>
        );
    }
}

export default Navbar;
