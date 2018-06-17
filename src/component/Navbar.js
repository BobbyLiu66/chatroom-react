import React, {Component} from 'react';
import {connect} from "react-redux";
import {inputState} from "../actions";

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
    }
};

class Nav extends Component {
    constructor() {
        super();
        this.state = {imgUrl: ''};
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.FB.getLoginStatus((response) => {
            if (response.authResponse) {
                window.FB.logout();
            }
            window.sessionStorage.removeItem('username');
            this.props.inputState(true);
        });
    }

    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
                    <img
                        src={"https://s3.amazonaws.com/chat-picture/" + window.sessionStorage.getItem('username') + ".png"}
                        alt="" className="image-size"/>
                    {window.sessionStorage.getItem('username')}
                </a>

                <ul className="navbar-nav px-3">
                    <button type="button" className="btn btn-dark" onClick={this.handleClick}>Log out</button>
                </ul>
            </nav>
        );
    }
}


const Navbar = connect(null, mapDispatchToProps)(Nav);

export default Navbar;
